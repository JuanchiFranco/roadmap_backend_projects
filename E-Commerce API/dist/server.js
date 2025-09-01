import express from 'express';
const app = express();
// Middleware for parsing JSON requests
app.use(express.json());
// Route for handling GET requests to the root URL
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
export default app;
//# sourceMappingURL=server.js.map