import express from 'express';
import type { Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// routes
import { authRoutes } from './components/Auth/index.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route for handling GET requests to the root URL
app.get('/', (_req: Request, res: Response) => {
  res.render('home', { title: 'Home' });
});

// Use authRoutes for all routes starting with /auth
app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

export default app;
