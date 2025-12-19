import * as expensesRepository from "../repositories/expensesRepository.js";
import { NotFoundError } from "../utils/errors.js";

export const processCreateExpense = async (userId, amount, category, description, notes) => {
  const newExpense = await expensesRepository.createExpense(userId, amount, category, description, notes);
  return newExpense;
};

export const processGetExpensesByUserId = async (userId, limit) => {
  const expenses = await expensesRepository.getExpensesByUserId(userId, limit);
  if (!expenses || expenses.length === 0) {
    throw new NotFoundError(null, "Expenses not found");
  }
  return expenses;
};

export const processUpdateExpenseById = async (id, amount, category, description, notes) => {
  const updatedExpense = await expensesRepository.updateExpenseById(id, amount, category, description, notes);
  if (!updatedExpense) {
    throw new NotFoundError(null, "Expense not found");
  }
  return updatedExpense;
};

export const processDeleteExpenseById = async (id) => {
  const deletedCount = await expensesRepository.deleteExpenseById(id);
  if (deletedCount === 0) {
    throw new NotFoundError(null, "Expense not found");
  }
};
