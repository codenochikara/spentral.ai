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
  const balanceCard = StatCard('Total Balance', totalBalanceIcon);
  const expenseCard = StatCard('Total Expenses', totalExpensesIcon);
  const incomeCard = StatCard('Total Income', totalIncomeIcon);

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
      labels: spendingTrend.map(d => new Date(d.date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })),
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

/* ICONS */
const totalBalanceIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></g></svg>`;
const totalExpensesIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 17h6v-6"/><path d="m22 17l-8.5-8.5l-5 5L2 7"/></g></svg>`;
const totalIncomeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 7h6v6"/><path d="m22 7l-8.5 8.5l-5-5L2 17"/></g></svg>`;