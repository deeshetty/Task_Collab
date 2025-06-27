import express from 'express';
import dotenv from 'dotenv';

import pool from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Auth service is running');
    res.send('Auth service is running');
});

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);

    pool.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.error('Database connection error:', err);
        } else {
            console.log('Database connected successfully:', res.rows[0]);
        }
        pool.end();
    });
});