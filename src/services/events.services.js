import db from "../config/db.js";

export const getAllEvents = async () => {
    const result = await db.query("SELECT * FROM events");
    return result.rows;
};

export const getEventById = async (id) => {
    const result = await db.query("SELECT * FROM events WHERE id = $1", [id]);
    return result.rows[0];
};

export const createEvent = async (event) => {
    const { name, description, location, date, time, total_tickets, available_tickets } = event;
    const result = await db.query(
        "INSERT INTO events (name, description, location, date, time, total_tickets, available_tickets) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [name, description, location, date, time, total_tickets, available_tickets]
    );
    return result.rows[0];
};

export const updateEvent = async (id, event) => {
    const { name, description, location, date, time, total_tickets, available_tickets } = event;
    const result = await db.query(
        "UPDATE events SET name = $1, description = $2, location = $3, date = $4, time = $5, total_tickets = $6, available_tickets = $7 WHERE id = $8 RETURNING *",
        [name, description, location, date, time, total_tickets, available_tickets, id]
    );
    return result.rows[0];
};

export const deleteEvent = async (id) => {
    const result = await db.query("DELETE FROM events WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};