const express = require('express');
const cors = require('cors');
const articlesRouter = require('./router/articles'); 
const authRouter = require('./router/auth');
process.loadEnvFile();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', articlesRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});