import db from "../config/db.js";

export const getAllPayments = async () => {
    const result = await db.query("SELECT * FROM payments");
    return result.rows;
};

export const getPaymentById = async (id) => {
    const result = await db.query("SELECT * FROM payments WHERE id = $1", [id]);
    return result.rows[0];
};

export const createPayment = async (payment) => {
    const { order_id, amount, method, status, transaction_id } = payment;
    const result = await db.query(
        "INSERT INTO payments (order_id, amount, method, status, transaction_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [order_id, amount, method, status, transaction_id]
    );
    return result.rows[0];
};

export const updatePayment = async (id, payment) => {
    const { order_id, amount, method, status, transaction_id } = payment;
    const result = await db.query(
        "UPDATE payments SET order_id = $1, amount = $2, method = $3, status = $4, transaction_id = $5 WHERE id = $6 RETURNING *",
        [order_id, amount, method, status, transaction_id, id]
    );
    return result.rows[0];
};

export const deletePayment = async (id) => {
    const result = await db.query("DELETE FROM payments WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};