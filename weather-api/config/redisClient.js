import { createClient } from 'redis';
process.loadEnvFile();

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: `${process.env.REDIS_HOST ? process.env.REDIS_HOST : 'localhost'}`,
        port: `${process.env.REDIS_PORT ? process.env.REDIS_PORT : 6379}`
    }
});

client.on('error', err => console.log('Redis Client Error', err));

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.connect();

export default client;