import * as dashboardRepository from '../repositories/dashboardRepository.js';

export const processDashboardSummary = async (userId) => {
  const summary = await dashboardRepository.getDashboardSummary(userId);
  return {
    balance: -summary.total_expenses,
    totalExpenses: summary.total_expenses,
    expenseCount: summary.expense_count
  };
};

export const processExpensesByCategory = async (userId) => {
  return await dashboardRepository.getExpensesByCategory(userId);
};

export const processSpendingTrend = async (userId, range) => {
  return await dashboardRepository.getSpendingTrend(userId, range);
};
