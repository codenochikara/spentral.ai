import ChartPlaceholder from '../../components/dashboard/Chart';
import StatCard from '../../components/dashboard/StatCard';
import TransactionsList from '../../components/dashboard/TransactionsList';
import Sidebar from '../../components/layout/Sidebar';

import {
  fetchDashboardSummary,
  fetchExpensesByCategory,
  fetchSpendingTrend
} from '../../api/dashboard.api';

import { fetchExpenses } from '../../api/expenses.api';
import { getUserId } from '../../store/auth.store';

export default function Dashboard() {
  const page = document.createElement('div');
  page.className = 'dashboard-page';

  const sidebar = Sidebar();
  const main = document.createElement('main');
  main.className = 'dashboard-main';

  const grid = document.createElement('section');
  grid.className = 'dashboard-grid';

  // Placeholder cards (loading state)
  const balanceCard = StatCard('Total Balance', '—');
  const expenseCard = StatCard('Total Expenses', '—');
  const incomeCard = StatCard('Total Income', '—');

  const trendChart = ChartPlaceholder('Spending Trend');
  const categoryChart = ChartPlaceholder('Expenses by Category');
  const transactions = TransactionsList([]);

  grid.append(
    balanceCard,
    expenseCard,
    incomeCard,
    trendChart,
    categoryChart,
    transactions
  );

  main.appendChild(grid);
  page.append(sidebar, main);

  loadDashboardData({
    balanceCard,
    expenseCard,
    trendChart,
    categoryChart,
    transactions
  });

  return page;
}

async function loadDashboardData(refs) {
  try {
    const userId = getUserId();

    const [
      summaryRes,
      categoryRes,
      trendRes,
      expensesRes
    ] = await Promise.all([
      fetchDashboardSummary(userId),
      fetchExpensesByCategory(userId),
      fetchSpendingTrend(userId),
      fetchExpenses(userId)
    ]);

    const summary = summaryRes.data.data;
    const categories = categoryRes.data.data;
    const trend = trendRes.data.data;
    const expenses = expensesRes.data.data;

    refs.balanceCard.update(`₹${summary.balance}`);
    refs.expenseCard.update(`₹${summary.totalExpenses}`);

    refs.categoryChart.render(categories);
    refs.trendChart.render(trend);
    refs.transactions.update(expenses.slice(0, 5));

  } catch (err) {
    console.error('Dashboard load failed', err);
  }
}
