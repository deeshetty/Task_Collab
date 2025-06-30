import express from 'express';
import { login, registerUser } from './controllers/user.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Auth service is running');
});

router.post('/auth/register/', registerUser);
router.post('/auth/login/', login);

export default router;