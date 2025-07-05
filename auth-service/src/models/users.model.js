import pool from '../config/db.js';

const checkIfUserExists = async (username) => {
    if (typeof username !== 'string' || !username.trim()) {
        throw new Error('Invalid username');
    }

    const query = 'SELECT * FROM userss WHERE username = $1';
    const values = [username];

    try {
        const result = await pool.query(query, values);
        console.log('User existence check result:', result.rows.length);
        return result.rows.length > 0 ? result.rows : [];
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw new Error('Database error');
    }
};

const insertUser = async (username, password) => {
    if (typeof username !== 'string' || !username.trim() || typeof password !== 'string' || !password.trim()) {
        throw new Error('Invalid username or password');
    }

    const query = 'INSERT INTO userss (username, password) VALUES ($1, $2)';
    const values = [username, password];

    try {
        await pool.query(query, values);
        return { message: 'User registered successfully' };
    } catch (error) {
        console.error('Error inserting user:', error);
        throw new Error('Database error');
    }
};

export { checkIfUserExists, insertUser };