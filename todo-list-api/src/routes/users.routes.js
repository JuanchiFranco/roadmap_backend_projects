import { Router } from 'express';
import { registerUser, loginUser, refreshToken } from '../controllers/usersController.js';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/refresh-token', refreshToken);

export default router;