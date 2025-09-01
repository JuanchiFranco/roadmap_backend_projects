import { startServer } from './server/index.js';
import { connectToServer } from './client/index.js';

// leemos los parametros de entrada por linea de comandos
const { argv } = process;

switch (argv[2]) {
    case 'start':
        startServer();
        break;
    case 'connect':
        connectToServer();
        break;
    default:
        console.log('Unknown command');
        console.log('Usage: node index.js [start] or node index.js [connect]');
        break;
}


