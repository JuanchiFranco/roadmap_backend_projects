try { process.loadEnvFile(); } catch { /* no .env file — env vars already set (Docker) */ }

export default {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/todos",
    },
};
