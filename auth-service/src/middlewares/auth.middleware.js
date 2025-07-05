import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    console.log('Auth middleware hit');
    
    // Check if the request has an Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Authorization header is missing' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Token is missing' });
    }

    // Verify the token (this is a placeholder, implement your own verification logic)
    try {
        // Assuming you have a function verifyToken that checks the token validity
        const user = verifyToken(token);
        req.user = user; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).send({ error: 'Invalid token' });
    }
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            throw new Error('Token verification failed');
        }
        return user; // Return the user info from the token
    })
}

export {
    authMiddleware
}