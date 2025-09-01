import axios from 'axios';
import { TMDB_ACCESS_TOKEN, TMDB_BASE_URL, endpoints } from '../config/constants.js';


export async function getMovieType(movieType) {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}${endpoints[movieType]}`, {
            headers: {
                'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching movie type ${movieType}:`, error);
        throw error;
    }
}