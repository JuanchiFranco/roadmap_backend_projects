import { getWeatherData } from "../services/weatherService.js";

export const getWeather = async (req, res) => {
    let { city } = req.query;
    // Default city if not provided
    if (!city) {
        res.status(400).json({ error: "City parameter is required" });
        return;
    }

    try {
        const weatherData = await getWeatherData(city);
        if (!weatherData.result) {
            res.status(404).json({ error: "Weather data not found" });
            return;
        }

        res.status(200).json(weatherData.data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
        
}