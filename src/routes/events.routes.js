import express from "express";
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from "../controllers/events.controller.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export { router as eventsRoutes };