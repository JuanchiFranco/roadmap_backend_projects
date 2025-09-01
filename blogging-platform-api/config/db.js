import mysql2 from 'mysql2/promise';
import 'dotenv/config';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test_bd',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
};

let pool;

async function initDb() {
    if (!pool) {
        pool = mysql2.createPool(dbConfig);
    }
    try {
        const conn= await pool.getConnection();
        conn.release();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}

async function getConnection() {
    if (!pool) {
        await initDb();
    }
    const conn = await pool.getConnection();
    return conn;
}

async function query(sql, params = []) {
    if (!pool) {
        await initDb();
    }
    const [rows] = await pool.query(sql, params);
    return rows;
}

async function closeDb() {
    if (pool) {
        await pool.end();
        console.log('Database connection closed');
    }
}

export default {
    initDb,
    query,
    closeDb,
    getConnection
};