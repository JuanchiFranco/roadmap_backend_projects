process.loadEnvFile();
export const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
export const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

export const endpoints = {
    popular: '/movie/popular',
    top: '/movie/top_rated',
    upcoming: '/movie/upcoming',
    playing: '/movie/now_playing'
}