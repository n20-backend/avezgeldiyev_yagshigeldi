import { eventValidationSchema } from "../validators/eventValidator.js";
import * as EventService from "../services/events.services.js";

export const getAllEvents = async (req, res, next) => {
    try {
        const events = await EventService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

export const getEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID bo'sh bo'lmasligi kerak" });
        }
        const event = await EventService.getEventById(id);
        if (!event) {
            return res.status(404).json({ error: "Tadbir topilmadi" });
        }
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};

export const createEvent = async (req, res, next) => {
    try {
        const { error } = eventValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const event = await EventService.createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID kerak" });
    }
    try {
        const { error } = eventValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const event = await EventService.updateEvent(id, req.body);
        if (!event) {
            return res.status(404).json({ error: "Tadbir topilmadi" });
        }
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID kerak" });
        }
        const deletedEvent = await EventService.deleteEvent(id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Tadbir topilmadi" });
        }
        res.status(200).json({ message: "Tadbir o'chirildi", data: deletedEvent });
    } catch (error) {
        next(error);
    }
};