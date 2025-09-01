import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { slowDown } from 'express-slow-down';

import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expensesRoutes.js';

process.loadEnvFile();

const app = express();

try {
    const port = process.env.PORT || 3000;

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: 'Too many requests, please try again later.',
    });

    const speedLimiter = slowDown({
        windowMs: 15 * 60 * 1000, // 15 minutes
        delayAfter: 100, // Allow 100 requests per windowMs before limiting
        delayMs: (hits) => hits * 500, // Delay requests by 500ms for each hit over the limit
    });

    app.use(limiter);
    app.use(speedLimiter);
    app.use(express.json());
    app.use(express.static('public'));
    app.use(cors());

    app.get('/', (req, res) => {
        res.sendFile('index.html', { root: 'public' });
    });

    app.use('/api/auth', authRoutes);
    app.use('/api', expenseRoutes);

    app.use((req, res) => {
        res.sendFile('404.html', { root: 'public' });
    });
    
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

} catch (error) {
  console.error('Error loading environment variables:', error);
  process.exit(1);
}

app.use(express.json());
