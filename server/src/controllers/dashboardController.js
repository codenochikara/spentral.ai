import {
  processDashboardSummary,
  processExpensesByCategory,
  processSpendingTrend
} from '../services/dashboardService.js';
import responseDTO from '../utils/responseDTO.js';

export const getDashboardSummary = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const summary = await processDashboardSummary(userId);
    res.status(200).json(responseDTO(res, 200, 'Dashboard summary fetched.', summary));
  } catch (error) {
    next(error);
  }
};

export const getExpensesByCategory = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const data = await processExpensesByCategory(userId);
    res.status(200).json(responseDTO(res, 200, 'Expenses grouped by category.', data));
  } catch (error) {
    next(error);
  }
};

export const getSpendingTrend = async (req, res, next) => {
  const userId = req.user.userId;
  const { range = 'month' } = req.query;

  try {
    const trend = await processSpendingTrend(userId, range);
    res.status(200).json(responseDTO(res, 200, 'Spending trend fetched.', trend));
  } catch (error) {
    next(error);
  }
};
