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

import '../../styles/dashboard.css';

export default function Dashboard() {
  const page = document.createElement('div');
  page.className = 'dashboard-page';

  const sidebar = Sidebar();
  const main = document.createElement('main');
  main.className = 'dashboard-main';

  const grid = document.createElement('section');
  grid.className = 'dashboard-grid';

  // Placeholder / Loading cards
  const balanceCard = StatCard('Total Balance');
  const expenseCard = StatCard('Total Expenses');
  const incomeCard = StatCard('Total Income');

  const trendChart = ChartPlaceholder('Spending Trend');
  const categoryChart = ChartPlaceholder('Expenses by Category');
  const transactions = TransactionsList([]);

  // Set all cards to loading initially
  balanceCard.setLoading(true);
  expenseCard.setLoading(true);
  incomeCard.setLoading(true);
  trendChart.setLoading(true);
  categoryChart.setLoading(true);
  transactions.setLoading(true);

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

  // Load dashboard data from API
  loadDashboardData({
    balanceCard,
    expenseCard,
    incomeCard,
    trendChart,
    categoryChart,
    transactions
  });

  return page;
}

// ------------------ Load Dashboard Data ------------------
async function loadDashboardData(refs) {
  try {
    // Start loading skeletons
    refs.balanceCard.setLoading(true);
    refs.expenseCard.setLoading(true);
    refs.incomeCard.setLoading(true);
    refs.trendChart.setLoading(true);
    refs.categoryChart.setLoading(true);
    refs.transactions.setLoading(true);

    const [summaryRes, categoryRes, trendRes, expensesRes] = await Promise.all([
      fetchDashboardSummary(),
      fetchExpensesByCategory(),
      fetchSpendingTrend(),
      fetchExpenses()
    ]);

    const summary = summaryRes.data.data;
    const categories = categoryRes.data.data;
    const trend = trendRes.data.data;
    const expenses = expensesRes.data.data;

    // Update StatCards
    refs.balanceCard.update(`₹${summary.balance}`);
    refs.balanceCard.setLoading(false);

    refs.expenseCard.update(`₹${summary.totalExpenses}`);
    refs.expenseCard.setLoading(false);

    refs.incomeCard.update(`₹${summary.totalIncome || 0}`);
    refs.incomeCard.setLoading(false);

    // Update Charts
    refs.categoryChart.render(categories);
    refs.categoryChart.setLoading(false);

    refs.trendChart.render(trend);
    refs.trendChart.setLoading(false);

    // Update Transactions List
    refs.transactions.update(expenses.slice(0, 5));
    refs.transactions.setLoading(false);
  } catch (err) {
    console.error('Dashboard load failed', err);
    // If failed, keep skeletons but optionally display error
  }
}
