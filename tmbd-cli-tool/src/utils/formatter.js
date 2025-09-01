import chalk from "chalk";

export function formatMovies(movies) {
    if (!Array.isArray(movies) || movies.length === 0) {
        return chalk.yellow("No movies found.");
    }

    return movies.map(movie => {
        const title = movie.title || movie.name || "Unknown Title";
        const releaseDate = movie.release_date || movie.first_air_date || "Unknown Date";
        const overview = movie.overview || "No overview available.";
        
        return `${chalk.blue(title)} (${chalk.green(releaseDate)})\n${chalk.gray(overview)}\n`;
    }).join("\n");
}