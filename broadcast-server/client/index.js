import { io } from 'socket.io-client';
import readline from 'readline';
process.loadEnvFile();

const socket = io(`http://localhost:${process.env.PORT || 3000}`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const connectToServer = () => {
    socket.on('connect', () => {
        console.log('Connected to server with ID:', socket.id);
    });

    socket.on('message', (message) => {
        console.log(message);
    });

    rl.on('line', (input) => {
        socket.emit('chat message', input);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });
};

