import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkIfUserExists, insertUser } from "../models/users.model.js";

const registerUser = async (req, res) => {
    console.log('Register user endpoint hit');
    const reqBody = req.body;

    if (!reqBody?.userName || !reqBody?.password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    console.log('Request body:', reqBody);

    let userName = reqBody.userName;
    let password = reqBody.password;

    if(!userName.trim() || !password.trim()) {
        return res.status(400).send({ error: 'Username and password cannot be empty' });
    }

    //check if user exists in the datbase in users table
    //if user exists, return error
    let userExists = await checkIfUserExists(userName);
    console.log('Checking if user exists:', userExists);
    if (userExists?.length > 0) {
        console.log('User already exists:', userName);
        return res.status(400).send({ error: 'User already exists' });
    }

    console.log('User does not exist, proceeding to insert user');

    // Hash the password before inserting
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hashedPassword);

    let userInsersion = await insertUser(userName, hashedPassword);
    
    if (userInsersion.error) {
        return res.status(500).send({ error: 'Error inserting user' });
    }
    
    console.log('User registered successfully:', userName);
    res.status(201).send({ message: 'User registered successfully' });
}

const login = async (req, res) => {
    console.log('Login endpoint hit');
    const reqBody = req.body;

    if (!reqBody?.userName || !reqBody?.password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    let userName = reqBody.userName;
    let password = reqBody.password;

    if(!userName.trim() || !password.trim()) {
        return res.status(400).send({ error: 'Username and password cannot be empty' });
    }

    // Check if user exists
    let userExists = await checkIfUserExists(userName);
    if (!userExists.length) {
        return res.status(400).send({ error: 'User does not exist' });
    }

    if(userExists.length > 1) {
        return res.status(500).send({ error: 'Multiple users found with the same username' });
    }

    let userRecord = userExists[0];

    console.log('User found:', userRecord);

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, userRecord.password);
    if (!passwordMatch) {
        return res.status(401).send({ error: 'Invalid password' });
    }

    let token = jwt.sign(
        { 
            userId: userRecord.id, 
            userName: userRecord.username 
        },
        process.env.JWT_SECRET,
        { 
            expiresIn: process.env.JWT_EXPIRATION 
        }
    );

    res.status(200).send({ message: 'Login successful', token: token, userId: userRecord.id, userName: userRecord.username });
}

export {
    registerUser,
    login
};