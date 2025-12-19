import { processCreateExpense, processDeleteExpenseById, processGetExpensesByUserId, processUpdateExpenseById } from "../services/expensesService.js";
import responseDTO from "../utils/responseDTO.js";

const createExpense = async (req, res, next) => {
  const { amount, category, description, notes } = req.body;
  const userId = req.user.userId;

  try {
    const expense = await processCreateExpense(userId, amount, category, description, notes);
    res.status(201).json(responseDTO(res, 201, 'Expense created successfully.', expense));
  } catch (error) {
    next(error);
  }
};

const getExpensesByUserId = async (req, res, next) => {
  const { limit } = req.query || 10;
  const userId = req.user.userId;

  try {
    const expenses = await processGetExpensesByUserId(userId, limit);
    res.status(200).json(responseDTO(res, 200, 'Expenses fetched successfully.', expenses));
  } catch (error) {
    next(error);
  }
};

const updateExpenseById = async (req, res, next) => {
  const { id } = req.params;
  const { amount, category, description, notes } = req.body;

  try {
    const expense = await processUpdateExpenseById(id, amount, category, description, notes);
    res.status(200).json(responseDTO(res, 200, 'Expense updated successfully.', expense));
  } catch (error) {
    next(error);
  }
};

const deleteExpenseById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await processDeleteExpenseById(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export { createExpense, deleteExpenseById, getExpensesByUserId, updateExpenseById };

