import app from "./app.js";
import config from './config/config.js';

// set the port
const PORT = config.port;
const NODE_ENV = config.nodeEnv;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`);
}).on('error', (error) => {
  console.error('Error starting server:', error);
});
