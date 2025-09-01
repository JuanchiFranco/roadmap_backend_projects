import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const argv = yargs(hideBin(process.argv)).parse()

// se optendra el tipo de pelicula o serie y se retorna ese tipo si se encuentra entre 'popular', 'top', 'upcoming' y 'playing', si no se encuentra entre esos tipos se lanzara un error y se ejecutará el args help para mostrar la ayuda
export function getArgMovieType() {
    const movieType = argv.type;
    const validTypes = ['popular', 'top', 'upcoming', 'playing'];

    if (validTypes.includes(movieType)) {
        console.log(`Movie type selected: ${movieType}`);
        return movieType;
    } else {
        // Mostrar ayuda y mensaje de error si el tipo no es válido
        yargs(hideBin(process.argv))
            .usage('Usage: $0 --type <popular|top|upcoming|playing>')
            .help()
            .showHelp();
        process.exit(1);
    }
}
