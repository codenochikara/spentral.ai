import api from './axios';

export const fetchDashboardSummary = (userId) =>
  api.get(`/dashboard/summary`, { params: { userId } });

export const fetchExpensesByCategory = (userId) =>
  api.get(`/dashboard/expenses-by-category`, { params: { userId } });

export const fetchSpendingTrend = (userId, range = 'month') =>
  api.get(`/dashboard/spending-trend`, {
    params: { userId, range }
  });
