import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
process.loadEnvFile();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let connectedUsers = [];

export const startServer = () => {
    io.on('connection', (socket) => {
        console.log('a user connected, ID:', socket.id);
        connectedUsers.push(socket.id);

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('message', 'Id:' + socket.id + ' - ' + msg);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected, ID:', socket.id);
            connectedUsers = connectedUsers.filter(id => id !== socket.id);
            console.log('Connected users:', connectedUsers);
        });
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};