import express from 'express';
import {
  getDashboardSummary,
  getExpensesByCategory,
  getIncomesBySource,
  getRecentTransactions,
  getSpendingTrend
} from '../../controllers/dashboardController.js';

const router = express.Router();

router.get('/summary', getDashboardSummary);
router.get('/recent-transactions', getRecentTransactions);
router.get('/expenses-by-category', getExpensesByCategory);
router.get('/incomes-by-source', getIncomesBySource);
router.get('/spending-trend', getSpendingTrend);

export default router;
