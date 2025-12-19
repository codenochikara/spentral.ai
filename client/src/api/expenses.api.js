import api from './axios';

export const fetchExpenses = (userId) =>
  api.get('/expenses', { params: { userId } });