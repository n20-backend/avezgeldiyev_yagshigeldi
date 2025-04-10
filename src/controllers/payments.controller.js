import { paymentValidationSchema } from "../validators/paymentValidator.js";
import * as PaymentService from "../services/payments.services.js";

export const getAllPayments = async (req, res, next) => {
    try {
        const payments = await PaymentService.getAllPayments();
        res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};

export const getPaymentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID bo'sh bo'lmasligi kerak" });
        }
        const payment = await PaymentService.getPaymentById(id);
        if (!payment) {
            return res.status(404).json({ error: "To'lov topilmadi" });
        }
        res.status(200).json(payment);
    } catch (error) {
        next(error);
    }
};

export const createPayment = async (req, res, next) => {
    try {
        const { error } = paymentValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const payment = await PaymentService.createPayment(req.body);
        res.status(201).json(payment);
    } catch (error) {
        next(error);
    }
};

export const updatePayment = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID kerak" });
    }
    try {
        const { error } = paymentValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const payment = await PaymentService.updatePayment(id, req.body);
        if (!payment) {
            return res.status(404).json({ error: "To'lov topilmadi" });
        }
        res.status(200).json(payment);
    } catch (error) {
        next(error);
    }
};

export const deletePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID kerak" });
        }
        const deletedPayment = await PaymentService.deletePayment(id);
        if (!deletedPayment) {
            return res.status(404).json({ error: "To'lov topilmadi" });
        }
        res.status(200).json({ message: "To'lov o'chirildi", data: deletedPayment });
    } catch (error) {
        next(error);
    }
};