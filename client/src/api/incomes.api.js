import api from './axios';

export const getIncomes = () =>
  api.get('api/incomes');

export const createIncome = (incomeData) =>
  api.post('api/incomes', incomeData);

export const updateIncome = (id, incomeData) =>
  api.put(`api/incomes/${id}`, incomeData);

export const deleteIncome = (id) =>
  api.delete(`api/incomes/${id}`);
