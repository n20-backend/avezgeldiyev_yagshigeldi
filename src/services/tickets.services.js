import db from "../config/db.js";

export const getAllTickets = async () => {
    const result = await db.query("SELECT * FROM tickets");
    return result.rows;
};

export const getTicketById = async (id) => {
    const result = await db.query("SELECT * FROM tickets WHERE id = $1", [id]);
    return result.rows[0];
};

export const createTicket = async (ticket) => {
    const { event_id, type, price, currency, seat_number, status } = ticket;
    const result = await db.query(
        "INSERT INTO tickets (event_id, type, price, currency, seat_number, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [event_id, type, price, currency, seat_number, status]
    );
    return result.rows[0];
};

export const updateTicket = async (id, ticket) => {
    const { event_id, type, price, currency, seat_number, status } = ticket;
    const result = await db.query(
        "UPDATE tickets SET event_id = $1, type = $2, price = $3, currency = $4, seat_number = $5, status = $6 WHERE id = $7 RETURNING *",
        [event_id, type, price, currency, seat_number, status, id]
    );
    return result.rows[0];
};

export const deleteTicket = async (id) => {
    const result = await db.query("DELETE FROM tickets WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};