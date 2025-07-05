import express from 'express';
import { getUserDetails, login, registerUser } from './controllers/user.controller.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Auth service is running');
});

router.post('/auth/register/', registerUser);
router.post('/auth/login/', login);
router.get('/auth/me/', authMiddleware, getUserDetails)

export default router;