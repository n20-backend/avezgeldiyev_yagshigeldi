import express from "express";
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/", getAllOrders);         
router.get("/:id", getOrderById);     
router.post("/", createOrder);         
router.put("/:id", updateOrder);       
router.delete("/:id", deleteOrder);   

export { router as orderRoutes };