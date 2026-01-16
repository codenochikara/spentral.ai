import api from './axios';

export const fetchDashboardSummary = () =>
  api.get('api/dashboard/summary');

export const fetchRecentTransactions = (limit = 10) =>
  api.get('api/dashboard/recent-transactions', {
    params: { limit }
  });

export const fetchExpensesByCategory = () =>
  api.get('api/dashboard/expenses-by-category');

export const fetchIncomesBySource = () =>
  api.get('api/dashboard/incomes-by-source');

export const fetchSpendingTrend = (range = 'month') =>
  api.get('api/dashboard/spending-trend', {
    params: { range }
  });
