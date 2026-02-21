import express from "express";
import todoRouter from "./routes/todoRoute.js";

const app = express();

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
