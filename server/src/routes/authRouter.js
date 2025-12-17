import express from 'express';
const router = express.Router();

import { handleLogin, handleLogout, refreshJwt } from '../controllers/authController.js';
import { validateLoginSchema } from '../middleware/inputValidator.js';

/* Routes */

router.post('/login', validateLoginSchema, handleLogin);
router.post('/refresh', refreshJwt);
router.post('/logout', handleLogout);

export default router;
