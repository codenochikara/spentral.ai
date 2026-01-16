import { navigate } from "../../router/router";

export default function TransactionsList(titleText = 'Recent Transactions', listType = 'all', showAllButton = false, seeAllRoute = '#') {
  const card = document.createElement('div');
  card.className = 'transactions card';

  const header = document.createElement('div');
  header.className = 'transactions-header';

  const title = document.createElement('h3');
  title.textContent = titleText;

  const seeAll = document.createElement('button');
  seeAll.className = 'btn btn-link';
  seeAll.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"/></svg>
    See All
  `;
  seeAll.onclick = () => navigate(seeAllRoute);

  header.append(title, showAllButton ? seeAll : '');

  const list = document.createElement('div');
  list.className = 'transactions-list';

  list.innerHTML = `
    ${Array.from({ length: 5 })
      .map(() => `<div class="transaction-item skeleton" style="height:56px"></div>`)
      .join('')}
  `;

  card.append(header, list);

  const lucideTrendingUpIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 7h6v6"/><path d="m22 7l-8.5 8.5l-5-5L2 17"/></g></svg>`;
  const lucideTrendingDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 17h6v-6"/><path d="m22 17l-8.5-8.5l-5 5L2 7"/></g></svg>`;

  card.update = (transactions) => {
    list.innerHTML = '';

    if (!transactions?.length) {
      list.innerHTML = `<p style="opacity:0.6;font-size:0.9rem">No transactions to display</p>`;
      return;
    }

    transactions.forEach(tx => {
      const item = document.createElement('div');
      item.className = 'transaction-item';

      let isIncome, txLabel;

      if (listType === 'all') {
        isIncome = tx.type === 'income';
        txLabel = tx.label;
      } else if (listType === 'income') {
        isIncome = true;
        txLabel = tx.source;
      } else if (listType === 'expense') {
        isIncome = false;
        txLabel = tx.category;
      }

      item.innerHTML = `
        <div class="tx-left">
          <div class="tx-icon ${isIncome ? 'income' : 'expense'}">
            ${isIncome ? lucideTrendingUpIcon : lucideTrendingDownIcon}
          </div>
          <div class="tx-meta">
            <span class="tx-label">
              ${txLabel}
            </span>
            <span class="tx-date">
              ${formatDate(tx.created_at || tx.date)}
            </span>
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
