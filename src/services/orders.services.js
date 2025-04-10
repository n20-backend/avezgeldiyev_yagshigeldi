import db from "../config/db.js";

export const getAllOrders = async () => {
    const result = await db.query("SELECT * FROM orders");
    return result.rows;
};

export const getOrderById = async (id) => {
    const result = await db.query("SELECT * FROM orders WHERE id = $1", [id]);
    return result.rows[0];
};

export const createOrder = async (order) => {
    const { user_id, tickets, total_amount, currency, status } = order;
    const result = await db.query(
        "INSERT INTO orders (user_id, tickets, total_amount, currency, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [user_id, tickets, total_amount, currency, status]
    );
    return result.rows[0];
};

export const updateOrder = async (id, order) => {
    const { user_id, tickets, total_amount, currency, status } = order;
    const result = await db.query(
        "UPDATE orders SET user_id = $1, tickets = $2, total_amount = $3, currency = $4, status = $5 WHERE id = $6 RETURNING *",
        [user_id, tickets, total_amount, currency, status, id]
    );
    return result.rows[0];
};

export const deleteOrder = async (id) => {
    const result = await db.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};