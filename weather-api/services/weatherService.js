process.loadEnvFile();

import axios from 'axios';
import redisClient from '../config/redisClient.js';

const URL_WEATHER_API = process.env.URL_WEATHER_API;
const WHEATER_API_KEY = process.env.WHEATER_API_KEY;

async function cacheWeatherData(city, data) {
    try {
        const cacheKey = city;
        const cacheValue = JSON.stringify(data);
        // Set the cache with an expiration time of 1 hour (3600 seconds)
        await redisClient.set(cacheKey, cacheValue, 'EX', 3600);
    } catch (error) {
        console.error("Error caching weather data in Redis:", error);
        throw new Error("Internal server error while caching data");
    }
}

async function getCachedWeatherData(city) {
    try {
        const cachedData = await redisClient.get(city);
        return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
        console.error("Error fetching cached data from Redis:", error);
        throw new Error("Internal server error");
    }
}

export const getWeatherData = async (city) => {

    try {
        // Check in Redis cache first
        const cachedWeatherData = await getCachedWeatherData(city);
        if (cachedWeatherData) {
            return {
                result: true,
                data: cachedWeatherData,
            };
        }
        const response = await axios.get(`${URL_WEATHER_API}/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${WHEATER_API_KEY}&contentType=json`);
        const weatherData = response.data;

        if (!weatherData) {
            console.error("Weather data is not in the expected format:", weatherData);
            return { result: false, error: "Weather data not found" };
        }

        // Cache the weather data in Redis
        await cacheWeatherData(city, weatherData);

        return {
            result: true,
            data: weatherData,
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Internal server error");
    }
}