import express from 'express';
const router = express.Router();

import { createUser, getAllUsers, getUserById, updateUserById } from '../../controllers/usersController.js';
import { validateUser } from '../../middleware/inputValidator.js';

/* Routes */

router.route('/')
  .get(getAllUsers)
  .post(validateUser, createUser)

router.get('/:id', getUserById);

router.put('/:id', validateUser, updateUserById);

export default router;
