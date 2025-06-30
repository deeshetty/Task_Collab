import express from 'express';
import dotenv from 'dotenv';

import pool from './config/db.js';
import router from './router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
    //add a query to create users table if it does not exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS userss (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    pool.query(createTableQuery)
        .then(() => {
            console.log('Users table is ready');
        })
        .catch((err) => {
            console.error('Error creating users table:', err);
        });
});