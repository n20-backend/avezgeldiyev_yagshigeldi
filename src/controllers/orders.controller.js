import { orderValidationSchema } from "../validators/orderValidator.js";
import * as OrderService from "../services/orders.services.js";

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID bo'sh bo'lmasligi kerak" });
        }
        const order = await OrderService.getOrderById(id);
        if (!order) {
            return res.status(404).json({ error: "Buyurtma topilmadi" });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const createOrder = async (req, res, next) => {
    try {
        const { error } = orderValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const order = await OrderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID kerak" });
    }
    try {
        const { error } = orderValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const order = await OrderService.updateOrder(id, req.body);
        if (!order) {
            return res.status(404).json({ error: "Buyurtma topilmadi" });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID kerak" });
        }
        const deletedOrder = await OrderService.deleteOrder(id);
        if (!deletedOrder) {
            return res.status(404).json({ error: "Buyurtma topilmadi" });
        }
        res.status(200).json({ message: "Buyurtma o'chirildi", data: deletedOrder });
    } catch (error) {
        next(error);
    }
};