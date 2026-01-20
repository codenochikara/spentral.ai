export function buildFinanceSnapshot({
  incomes = [],
  expenses = []
}) {
  const totalIncome = incomes.reduce((a, i) => a + Number(i.amount), 0);
  const totalExpense = expenses.reduce((a, e) => a + Number(e.amount), 0);

  const categoryMap = {};

  expenses.forEach(e => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + Number(e.amount);
  });

  const categoryBreakdown = Object.entries(categoryMap).map(
    ([name, amount]) => ({ name, amount })
  );

  const recentTransactions = [
    ...incomes.map(i => ({ ...i, type: 'income' })),
    ...expenses.map(e => ({ ...e, type: 'expense' }))
  ]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 8);

  return {
    totalIncome,
    totalExpense,
    savings: totalIncome - totalExpense,
    categoryBreakdown,
    recentTransactions
  };
}
