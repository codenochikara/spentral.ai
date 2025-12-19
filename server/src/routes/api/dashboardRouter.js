import express from 'express';
import {
  getDashboardSummary,
  getExpensesByCategory,
  getSpendingTrend
} from '../../controllers/dashboardController.js';

const router = express.Router();

router.get('/summary', getDashboardSummary);
router.get('/expenses-by-category', getExpensesByCategory);
router.get('/spending-trend', getSpendingTrend);

export default router;