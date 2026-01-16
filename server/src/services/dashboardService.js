import * as dashboardRepository from '../repositories/dashboardRepository.js';

export const processDashboardSummary = async (userId) => {
  const summary = await dashboardRepository.getDashboardSummary(userId);

  return {
    balance: Number((summary.total_income - summary.total_expenses).toFixed(2)),
    totalIncome: summary.total_income,
    totalExpenses: summary.total_expenses,
    expenseCount: summary.expense_count,
    incomeCount: summary.income_count
  };
};

export const processRecentTransactions = async (userId, limit) => {
  return await dashboardRepository.getRecentTransactions(userId, limit);
};

export const processExpensesByCategory = async (userId) => {
  return await dashboardRepository.getExpensesByCategory(userId);
};

export const processIncomesBySource = async (userId) => {
  return await dashboardRepository.getIncomesBySource(userId);
};

export const processSpendingTrend = async (userId, range) => {
  return await dashboardRepository.getSpendingTrend(userId, range);
};
