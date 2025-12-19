import api from './axios';

export const fetchExpenses = () =>
  api.get('api/expenses');
