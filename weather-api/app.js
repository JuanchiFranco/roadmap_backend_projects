import express from 'express';
import rateLimit from 'express-rate-limit';
import weatherRouter from './routes/weatherRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// colocamos un rate-limiter para evitar que se hagan muchas peticiones al servidor
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
}));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Use the weather routes
app.use('/api', weatherRouter);

app.use((req, res) => {
  res.sendFile('404.html', { root: 'public' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});