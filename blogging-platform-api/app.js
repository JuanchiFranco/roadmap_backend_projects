import express from 'express';
import blogRoutes from './modules/blog/routes/blogRoutes.js';
import 'dotenv/config.js';
import db from './config/db.js';

const app = express();

async function initApp() {
  try {
    await db.initDb();

    const PORT = process.env.PORT || 3000;

    app.use(express.json());
    app.use(express.static('public'));

    app.get('/', (req, res) => {
      res.sendFile('index.html', { root: 'public' });
    });

    app.use('/api', blogRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  }
}

initApp();