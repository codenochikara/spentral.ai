import express from 'express';
const router = express.Router();

import { createExpense, deleteExpenseById, getExpensesByUserId, updateExpenseById } from '../../controllers/expensesController.js';
import { validateCreateExpense, validateUpdateExpense } from '../../middleware/inputValidator.js';

router.get('/', getExpensesByUserId);
router.post('/', validateCreateExpense, createExpense);
router.put('/:id', validateUpdateExpense, updateExpenseById);
router.delete('/:id', deleteExpenseById);

export default router;
