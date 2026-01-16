import api from './axios';

export const getExpenses = () =>
  api.get('api/expenses');

export const createExpense = (expenseData) =>
  api.post('api/expenses', expenseData);

export const updateExpense = (id, expenseData) =>
  api.put(`api/expenses/${id}`, expenseData);

export const deleteExpense = (id) =>
  api.delete(`api/expenses/${id}`);
