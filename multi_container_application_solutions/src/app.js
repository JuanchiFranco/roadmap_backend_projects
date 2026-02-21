import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routes/todoRoute.js";
import constants from "./config/constants.js";

const app = express();

// ── Database ────────────────────────────────────────────────
mongoose
    .connect(constants.db.uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err.message));

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use("/todos", todoRouter);

// ── Global error handler ────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: message });
});

export default app;
