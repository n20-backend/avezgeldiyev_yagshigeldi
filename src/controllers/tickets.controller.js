import { ticketValidationSchema } from "../validators/ticketValidator.js";
import * as TicketService from "../services/tickets.services.js";

export const getAllTickets = async (req, res, next) => {
    try {
        const tickets = await TicketService.getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        next(error);
    }
};

export const getTicketById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID bo'sh bo'lmasligi kerak" });
        }
        const ticket = await TicketService.getTicketById(id);
        if (!ticket) {
            return res.status(404).json({ error: "Chipta topilmadi" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        next(error);
    }
};

export const createTicket = async (req, res, next) => {
    try {
        const { error } = ticketValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const ticket = await TicketService.createTicket(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        next(error);
    }
};

export const updateTicket = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID kerak" });
    }
    try {
        const { error } = ticketValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const ticket = await TicketService.updateTicket(id, req.body);
        if (!ticket) {
            return res.status(404).json({ error: "Chipta topilmadi" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        next(error);
    }
};

export const deleteTicket = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID kerak" });
        }
        const deletedTicket = await TicketService.deleteTicket(id);
        if (!deletedTicket) {
            return res.status(404).json({ error: "Chipta topilmadi" });
        }
        res.status(200).json({ message: "Chipta o'chirildi", data: deletedTicket });
    } catch (error) {
        next(error);
    }
};