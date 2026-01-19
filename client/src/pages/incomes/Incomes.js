import BarChart from '../../components/dashboard/BarChart';
import TransactionsList from '../../components/dashboard/TransactionsList';
import IncomesModal from '../../components/incomes/IncomesModal';
import Sidebar from '../../components/layout/Sidebar';

import { deleteIncome, getIncomes } from '../../api/incomes.api';

import '../../styles/dashboard.css';
import '../../styles/scrollbar.css';

export default function IncomesPage() {
  const page = document.createElement('div');
  page.className = 'dashboard-page';

  const sidebar = Sidebar();
  const main = document.createElement('main');
  main.className = 'dashboard-main scrollbar';

  const grid = document.createElement('section');
  grid.className = 'dashboard-grid';

  /* ================= COMPONENTS ================= */

  const incomeTrendChart = BarChart('Income Trend (Day Wise)');
  incomeTrendChart.style.gridColumn = '1 / -1';

  const incomesList = TransactionsList('All Incomes', 'income', false, '#', true);
  incomesList.style.gridColumn = '1 / -1';

  const incomesModal = IncomesModal();

  /* ================= HEADER ACTION ================= */

  incomesList.setActionButton({
    label: 'Add Income',
    onClick: () => incomesModal.open()
  });

  /* ================= HANDLERS ================= */

  incomesList.onEdit = (income) => {
    incomesModal.open(income);
  };

  incomesList.onDelete = async (income) => {
    if (!confirm('Delete this income?')) return;

    try {
      await deleteIncome(income.id);
      incomes = incomes.filter(i => i.id !== income.id);
      incomesList.update(incomes);
      renderChart(incomes);
    } catch (err) {
      console.error('Failed to delete income', err);
    }
  };

  incomesModal.onSave = (savedIncome, isEdit) => {
    incomes = isEdit
      ? incomes.map(i => i.id === savedIncome.id ? savedIncome : i)
      : [savedIncome, ...incomes];

    incomesList.update(incomes);
    renderChart(incomes);
  };

  grid.append(incomeTrendChart, incomesList);
  main.append(grid, incomesModal);
  page.append(sidebar, main);

  /* ================= DATA ================= */

  let incomes = [];

  loadIncomeData();

  async function loadIncomeData() {
    try {
      const res = await getIncomes();
      incomes = res.data.data;
      incomesList.update(incomes);
      renderChart(incomes);
    } catch (err) {
      console.error('Failed to load incomes', err);
    }
  }

  /* ================= DAY-WISE CHART ================= */

  function renderChart(data) {
    const grouped = {};

    data.forEach(i => {
      const key = new Date(i.created_at).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short'
      });

      grouped[key] = (grouped[key] || 0) + Number(i.amount);
    });

    /* Ensure chronological order */
    const sortedKeys = Object.keys(grouped).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    incomeTrendChart.render({
      labels: sortedKeys,
      data: sortedKeys.map(k => grouped[k])
    });
  }

  return page;
}
