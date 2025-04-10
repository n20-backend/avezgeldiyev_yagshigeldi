import express from "express";
import {eventsRoutes, ticketRoutes, userRoutes, orderRoutes, paymentRoutes} from './routes/index.js';

import db from "./config/db.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Assalomu aleykum!");
});

app.use("/events", eventsRoutes);
app.use("/tickets", ticketRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});