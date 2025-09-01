import { Router } from "express";
import { getWeather } from "../controllers/weatherController.js";

const weatherRouter = Router();
// Define the route for getting weather data
weatherRouter.get("/weather", getWeather);
// Export the router
export default weatherRouter;