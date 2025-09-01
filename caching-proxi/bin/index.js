import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { clearCache } from '../src/cache.js';
import { startServer } from '../src/server.js';

const argv = yargs(hideBin(process.argv)).parse();

// si el parametro es --clear-cache, entonces se limpia la cache
if (argv.clearCache) {
    clearCache();
    console.log('Cache cleared');
    process.exit(0);
}

if (!argv.port || !argv.origin) {
    console.error('Error: --port and --origin are required');
    process.exit(1);
}

startServer(argv.port, argv.origin);