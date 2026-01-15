import express from 'express';
const router = express.Router();

import { createIncome, deleteIncomeById, getIncomesByUserId, updateIncomeById } from '../../controllers/incomesController.js';
import { validateCreateIncome, validateUpdateIncome } from '../../middleware/inputValidator.js';

router.get('/', getIncomesByUserId);
router.post('/', validateCreateIncome, createIncome);
router.put('/:id', validateUpdateIncome, updateIncomeById);
router.delete('/:id', deleteIncomeById);

export default router;
