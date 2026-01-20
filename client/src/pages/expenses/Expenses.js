import LineChart from '../../components/dashboard/LineChart';
import TransactionsList from '../../components/dashboard/TransactionsList';
import ExpensesModal from '../../components/expenses/ExpensesModal';
import Sidebar from '../../components/layout/Sidebar';

import { deleteExpense, getExpenses } from '../../api/expenses.api';

import '../../styles/dashboard.css';
import '../../styles/scrollbar.css';

export default function Expenses() {
  const page = document.createElement('div');
  page.className = 'dashboard-page';

  const sidebar = Sidebar();
  const main = document.createElement('main');
  main.className = 'dashboard-main scrollbar';

  const grid = document.createElement('section');
  grid.className = 'dashboard-grid';

  /* ================= COMPONENTS ================= */

  const expenseTrendChart = LineChart('Expense Trend (Day Wise)');
  expenseTrendChart.style.gridColumn = '1 / -1';

  const expensesList = TransactionsList('All Expenses', 'expense', false, '#', true);
  expensesList.style.gridColumn = '1 / -1';

  const expensesModal = ExpensesModal();

  /* ================= HEADER ACTION ================= */

  expensesList.setActionButton({
    label: 'Add Expense',
    onClick: () => expensesModal.open()
  });

  /* ================= HANDLERS ================= */

  expensesList.onEdit = (expense) => {
    expensesModal.open(expense);
  };

  expensesList.onDelete = async (expense) => {
    if (!confirm('Delete this expense?')) return;

    try {
      await deleteExpense(expense.id);
      expenses = expenses.filter(e => e.id !== expense.id);
      expensesList.update(expenses);
      renderChart(expenses);
    } catch (err) {
      console.error('Failed to delete expense', err);
    }
  };

  expensesModal.onSave = (savedExpense, isEdit) => {
    expenses = isEdit
      ? expenses.map(e => e.id === savedExpense.id ? savedExpense : e)
      : [savedExpense, ...expenses];

    expensesList.update(expenses);
    renderChart(expenses);
  };

  grid.append(expenseTrendChart, expensesList);
  main.append(grid, expensesModal);
  page.append(sidebar, main);

  /* ================= DATA ================= */

  let expenses = [];

  loadExpenseData();

  async function loadExpenseData() {
    try {
      const res = await getExpenses();
      expenses = res.data.data;

      expensesList.update(expenses);
      renderChart(expenses);
    } catch (err) {
      console.error('Failed to load expenses', err);
    }
  }

  /* ================= DAY-WISE LINE CHART ================= */

  function renderChart(data) {
    const grouped = {};

    data.forEach(e => {
      const d = new Date(e.created_at);

      // LOCAL date key (no UTC shift)
      const key = [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, '0'),
        String(d.getDate()).padStart(2, '0')
      ].join('-'); // YYYY-MM-DD

      grouped[key] = (grouped[key] || 0) + Number(e.amount);
    });

    // Proper chronological sorting
    const sortedDates = Object.keys(grouped).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    expenseTrendChart.render({
      labels: sortedDates.map(date =>
        new Date(date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      ),
      data: sortedDates.map(date => grouped[date])
    });
  }

  return page;
}
