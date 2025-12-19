import api from './axios';

export const fetchDashboardSummary = () =>
  api.get('api/dashboard/summary');

export const fetchExpensesByCategory = () =>
  api.get('api/dashboard/expenses-by-category');

export const fetchSpendingTrend = (range = 'month') =>
  api.get('api/dashboard/spending-trend', {
    params: { range }
  });
