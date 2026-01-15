export default function TransactionsList() {
  const card = document.createElement('div');
  card.className = 'transactions card';

  const title = document.createElement('h3');
  title.textContent = 'Recent Transactions';

  const list = document.createElement('div');
  list.className = 'transactions-list';

  // Initial skeleton state
  list.innerHTML = `
    ${Array.from({ length: 4 })
      .map(
        () => `
      <div class="transaction-item skeleton" style="height:56px"></div>
    `
      )
      .join('')}
  `;

  card.append(title, list);

  card.update = (transactions) => {
    list.innerHTML = '';

    if (!transactions.length) {
      list.innerHTML = `<p style="opacity:0.6;font-size:0.9rem">No recent transactions</p>`;
      return;
    }

    transactions.forEach(tx => {
      const item = document.createElement('div');
      item.className = 'transaction-item';

      const isIncome = tx.type === 'income';

      item.innerHTML = `
        <div class="tx-left">
          <div class="tx-icon ${isIncome ? 'income' : 'expense'}">
            ${isIncome ? '↑' : '↓'}
          </div>
          <div class="tx-meta">
            <span class="tx-category">${tx.category}</span>
            <span class="tx-date">${formatDate(tx.date)}</span>
          </div>
        </div>

        <div class="tx-amount ${isIncome ? 'income' : 'expense'}">
          ${isIncome ? '+' : '-'} ₹${tx.amount}
        </div>
      `;

      list.appendChild(item);
    });
  };

  return card;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
