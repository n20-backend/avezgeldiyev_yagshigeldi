import express from "express";
import { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment } from "../controllers/payments.controller.js";

const router = express.Router();

router.get("/", getAllPayments);         
router.get("/:id", getPaymentById);      
router.post("/", createPayment);          
router.put("/:id", updatePayment);      
router.delete("/:id", deletePayment);

export { router as paymentRoutes };