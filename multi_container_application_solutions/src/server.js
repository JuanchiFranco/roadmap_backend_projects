import app from "./app.js";
import constants from "./config/constants.js";
process.loadEnvFile();

const PORT = constants.app.port;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error(`Error occurred: ${err.message}`);
});
