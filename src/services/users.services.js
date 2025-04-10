import db from "../config/db.js";
// import bcrypt from "bcrypt";

export const getAllUsers = async () => {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
};

export const getUserById = async (id) => {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

export const createUser = async (body) => {
    try {
        const newUser = { ...body };

        if (!newUser.email || !newUser.username || !newUser.password || !newUser.role || !newUser.status) {
            throw new Error("Foydalanuvchi yaratishda maydonlar to'liq emas!");
        }

        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        const result = await db.query(
            `INSERT INTO users (email, username, password, role, status) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [newUser.email, newUser.username, hashedPassword, newUser.role, newUser.status]
        );

        return result.rows;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (id, body) => {
    try {
        const oldUserQuery = 'SELECT * FROM users WHERE id = $1';
        const oldUserResult = await db.query(oldUserQuery, [id]);
        const oldUser = oldUserResult.rows[0];

        if (!oldUser) {
            throw new Error("Foydalanuvchi topilmadi");
        }

        const updatedUser = {
            email: body.email || oldUser.email,
            username: body.username || oldUser.username,
            password: body.password ? await bcrypt.hash(body.password, 10) : oldUser.password,
            role: body.role || oldUser.role,
            status: body.status || oldUser.status,
        };

        const query = `UPDATE users SET 
            email = $1, 
            username = $2, 
            password = $3, 
            role = $4, 
            status = $5
            WHERE id = $6 
            RETURNING *`;

        const values = [
            updatedUser.email,
            updatedUser.username,
            updatedUser.password,
            updatedUser.role,
            updatedUser.status,
            id
        ];

        const result = await db.query(query, values);
        return result.rows[0];

    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

export const findUserByEmail = async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};
