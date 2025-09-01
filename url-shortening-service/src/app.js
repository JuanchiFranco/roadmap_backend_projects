import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import urlRoutes from './urls/urlRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.send('URL Shortening Service');
});

app.use('/api/urls', urlRoutes);


app.use((req, res) => {
    res.status(404).send("Not Found");
})

export default app;