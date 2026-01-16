import LineChart from '../../components/dashboard/LineChart';
import PieChart from '../../components/dashboard/PieChart';
import StatCard from '../../components/dashboard/StatCard';
import TransactionsList from '../../components/dashboard/TransactionsList';
import Sidebar from '../../components/layout/Sidebar';

import '../../styles/scrollbar.css';

import {
  fetchDashboardSummary,
  fetchExpensesByCategory,
  fetchIncomesBySource,
  fetchRecentTransactions,
  fetchSpendingTrend
} from '../../api/dashboard.api';

import { getExpenses } from '../../api/expenses.api';
import { getIncomes } from '../../api/incomes.api';
import '../../styles/dashboard.css';

export default function Dashboard() {
  const page = document.createElement('div');
  page.className = 'dashboard-page';

  const sidebar = Sidebar();
  const main = document.createElement('main');
  main.className = 'dashboard-main scrollbar';

  const grid = document.createElement('section');
  grid.className = 'dashboard-grid';

  // Cards
  const balanceCard = StatCard('Total Balance');
  const expenseCard = StatCard('Total Expenses');
  const incomeCard = StatCard('Total Income');

  // Charts
  const financialOverviewPieChart = PieChart('Financial Overview');
  const spendingTrendLineChart = LineChart('Spending Trend');
  const expensesByCategoryPieChart = PieChart('Expenses by Category');
  const incomesBySourcePieChart = PieChart('Incomes by Source');

  // Lists
  const recentTransactionsList = TransactionsList('Recent Transactions', 'all', false);
  const expensesList = TransactionsList('Recent Expenses', 'expense', true, 'expenses');
  const incomesList = TransactionsList('Recent Incomes', 'income', true, 'incomes');

  grid.append(
    balanceCard,
    expenseCard,
    incomeCard,
    financialOverviewPieChart,
    spendingTrendLineChart,
    expensesByCategoryPieChart,
    incomesBySourcePieChart,
    recentTransactionsList,
    expensesList,
    incomesList
  );

  main.appendChild(grid);
  page.append(sidebar, main);

  loadDashboardData({
    balanceCard,
    expenseCard,
    incomeCard,
    financialOverviewPieChart,
    spendingTrendLineChart,
    expensesByCategoryPieChart,
    incomesBySourcePieChart,
    recentTransactionsList,
    expensesList,
    incomesList
  });

  return page;
}

async function loadDashboardData(refs) {
  try {
    const [
      dashboardSummaryData,
      dashboardRecentTransactionsData,
      dashboardExpensesByCategoryData,
      dashboardIncomesBySourceData,
      dashboardSpendingTrendData,
      expensesData,
      incomesData
    ] = await Promise.all([
      fetchDashboardSummary(),
      fetchRecentTransactions(10),
      fetchExpensesByCategory(),
      fetchIncomesBySource(),
      fetchSpendingTrend(),
      getExpenses(),
      getIncomes()
    ]);

    const summary = dashboardSummaryData.data.data;
    const recentTransactions = dashboardRecentTransactionsData.data.data;
    const expensesByCategory = dashboardExpensesByCategoryData.data.data;
    const incomesBySource = dashboardIncomesBySourceData.data.data;
    const spendingTrend = dashboardSpendingTrendData.data.data;
    const expenses = expensesData.data.data;
    const incomes = incomesData.data.data;

    // Cards
    refs.balanceCard.update(`₹${summary.balance}`);
    refs.expenseCard.update(`₹${summary.totalExpenses}`);
    refs.incomeCard.update(`₹${summary.totalIncome}`);

    // Charts
    refs.financialOverviewPieChart.render({
      labels: ['Income', 'Expenses', 'Balance'],
      data: [
        summary.totalIncome,
        summary.totalExpenses,
        summary.balance
      ]
    });

    refs.spendingTrendLineChart.render({
      labels: spendingTrend.map(d => d.date),
      data: spendingTrend.map(d => d.amount)
    });

    refs.expensesByCategoryPieChart.render({
      labels: expensesByCategory.map(e => e.category),
      data: expensesByCategory.map(e => e.amount)
    });

    refs.incomesBySourcePieChart.render({
      labels: incomesBySource.map(i => i.source),
      data: incomesBySource.map(i => i.amount)
    });

    // Lists
    refs.recentTransactionsList.update(recentTransactions);
    refs.expensesList.update(expenses);
    refs.incomesList.update(incomes);

  } catch (err) {
    console.error('Dashboard load failed', err);
  }
}
