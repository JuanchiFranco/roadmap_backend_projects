import { getArgMovieType } from "../src/cli/argsParser.js";
import { getMovieType } from "../src/api/tmdbService.js";
import { formatMovies } from "../src/utils/formatter.js";

(async () => {
    try {
        const movieType = getArgMovieType();

        const movieData = await getMovieType(movieType);
        
        if (!movieData.results || movieData.results.length === 0) {
            console.log("No movies found for the selected type.");
            return;
        }
        const formattedMovies = formatMovies(movieData.results);
        console.log(formattedMovies);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
})();