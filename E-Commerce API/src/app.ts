import express from 'express';
import type { Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';

// routes
import { authRoutes } from './components/Auth/index';

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Route for handling GET requests to the root URL
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

// Use authRoutes for all routes starting with /auth
app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;
