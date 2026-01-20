import AIInsightCard from '../../components/dashboard/AIInsightCard';
import LineChart from '../../components/dashboard/LineChart';
import PieChart from '../../components/dashboard/PieChart';
import StatCard from '../../components/dashboard/StatCard';
import TransactionsList from '../../components/dashboard/TransactionsList';
import Sidebar from '../../components/layout/Sidebar';
import { buildFinanceSnapshot } from '../../utils/financeSnapshot';

import '../../styles/dashboard.css';
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
import { getAIInsights } from '../../api/insights.api';

/* ================== DASHBOARD ================== */

export default function Dashboard() {
  const page = document.createElement('div');
  page.className = 'dashboard-page';

  const sidebar = Sidebar();
  const main = document.createElement('main');
  main.className = 'dashboard-main scrollbar';

  const grid = document.createElement('section');
  grid.className = 'dashboard-grid';

  /* ================== GREETING ================== */

  const greeting = document.createElement('h2');
  const userName = window.localStorage.getItem('spentralUser') || 'User';
  const hours = new Date().getHours();

  let timeOfDay = 'Morning';
  if (hours >= 12 && hours < 18) timeOfDay = 'Afternoon';
  else if (hours >= 18) timeOfDay = 'Evening';

  greeting.innerHTML = `
    Good ${timeOfDay},
    <span class="greeting-username">${userName}!</span>
    Let's manage your finances.
  `;

  /* ================== STAT CARDS ================== */

  const balanceCard = StatCard('Total Balance', totalBalanceIcon);
  const expenseCard = StatCard('Total Expenses', totalExpensesIcon);
  const incomeCard = StatCard('Total Income', totalIncomeIcon);

  /* Force stat cards into first row */
  balanceCard.style.gridColumn = 'span 4';
  expenseCard.style.gridColumn = 'span 4';
  incomeCard.style.gridColumn = 'span 4';

  /* ================== AI INSIGHT CARD ================== */

  const aiInsightCard = AIInsightCard();
  aiInsightCard.style.gridColumn = '1 / -1'; // full-width row

  /* ================== CHARTS ================== */

  const financialOverviewPieChart = PieChart('Financial Overview');
  const spendingTrendLineChart = LineChart('Spending Trend');
  const expensesByCategoryPieChart = PieChart('Expenses by Category');
  const incomesBySourcePieChart = PieChart('Incomes by Source');

  /* ================== LISTS ================== */

  const recentTransactionsList = TransactionsList(
    'Recent Transactions',
    'all',
    false
  );

  const expensesList = TransactionsList(
    'Recent Expenses',
    'expense',
    true,
    'expenses'
  );

  const incomesList = TransactionsList(
    'Recent Incomes',
    'income',
    true,
    'incomes'
  );

  /* ================== GRID APPEND ORDER ================== */

  grid.append(
    balanceCard,
    expenseCard,
    incomeCard,
    aiInsightCard, // full-width row
    financialOverviewPieChart,
    spendingTrendLineChart,
    expensesByCategoryPieChart,
    incomesBySourcePieChart,
    recentTransactionsList,
    expensesList,
    incomesList
  );

  main.append(greeting, grid);
  page.append(sidebar, main);

  loadDashboardData({
    balanceCard,
    expenseCard,
    incomeCard,
    aiInsightCard,
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

/* ================== DATA LOADING ================== */

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

    /* ================== STAT CARDS ================== */

    refs.balanceCard.update(`₹${summary.balance}`);
    refs.expenseCard.update(`₹${summary.totalExpenses}`);
    refs.incomeCard.update(`₹${summary.totalIncome}`);

    /* ================== AI INSIGHTS ================== */

    refs.aiInsightCard.onGenerate(async () => {
      refs.aiInsightCard.setLoading();

      try {
        const snapshot = buildFinanceSnapshot({ incomes, expenses });
        const res = await getAIInsights(snapshot);

        const rawMarkdown = res.data.data;
        const html = markdownToHtml(rawMarkdown);

        refs.aiInsightCard.setInsights(html);
      } catch (err) {
        console.error(err);
        refs.aiInsightCard.setError();
      }
    });

    /* ================== CHARTS ================== */

    refs.financialOverviewPieChart.render({
      labels: ['Income', 'Expenses', 'Balance'],
      data: [
        summary.totalIncome,
        summary.totalExpenses,
        summary.balance
      ]
    });

    refs.spendingTrendLineChart.render({
      labels: spendingTrend.map(d =>
        new Date(d.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      ),
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

    /* ================== LISTS ================== */

    refs.recentTransactionsList.update(recentTransactions);
    refs.expensesList.update(expenses);
    refs.incomesList.update(incomes);
  } catch (err) {
    console.error('Dashboard load failed', err);
  }
}

/* ================== MARKDOWN → HTML ================== */

function markdownToHtml(md = '') {
  return md
    .replace(/^### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^## (.*$)/gim, '<h3>$1</h3>')
    .replace(/^# (.*$)/gim, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^- (.*)$/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')
    .replace(/\n/gim, '<br>');
}

/* ================== ICONS ================== */

const totalBalanceIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></g></svg>`;
const totalExpensesIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 17h6v-6"/><path d="m22 17l-8.5-8.5l-5 5L2 7"/></g></svg>`;
const totalIncomeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 7h6v6"/><path d="m22 7l-8.5 8.5l-5-5L2 17"/></g></svg>`;
