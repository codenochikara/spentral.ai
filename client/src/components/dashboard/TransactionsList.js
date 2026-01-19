import { navigate } from "../../router/router";

export default function TransactionsList(
  titleText = 'Recent Transactions',
  listType = 'all',
  showAllButton = false,
  seeAllRoute = '#',
  enableActions = false
) {
  /* ================= DOM ================= */

  const card = document.createElement('div');
  card.className = 'transactions card';

  const header = document.createElement('div');
  header.className = 'transactions-header';

  const title = document.createElement('h3');
  title.textContent = titleText;

  const headerActions = document.createElement('div');
  headerActions.className = 'transactions-header-actions';

  const seeAll = document.createElement('button');
  seeAll.className = 'btn btn-link';
  seeAll.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"/>
    </svg>
    See All
  `;
  seeAll.onclick = () => navigate(seeAllRoute);

  headerActions.append(showAllButton ? seeAll : '');
  header.append(title, headerActions);

  const list = document.createElement('div');
  list.className = 'transactions-list';

  list.innerHTML = Array.from({ length: 5 })
    .map(() => `<div class="transaction-item skeleton" style="height:56px"></div>`)
    .join('');

  card.append(header, list);

  /* ================= ICONS ================= */

  const incomeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 7h6v6"/>
        <path d="m22 7l-8.5 8.5l-5-5L2 17"/>
      </g>
    </svg>
  `;

  const expenseIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 17h6v-6"/>
        <path d="m22 17l-8.5-8.5l-5 5L2 7"/>
      </g>
    </svg>
  `;

  const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>`;

  const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;

  /* ================= API ================= */

  card.setActionButton = ({ label, onClick }) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary btn-sm';
    btn.textContent = label;
    btn.onclick = onClick;
    headerActions.append(btn);
  };

  card.onEdit = null;
  card.onDelete = null;

  card.update = (transactions) => {
    list.innerHTML = '';

    if (!transactions?.length) {
      list.innerHTML = `<p style="opacity:.6;font-size:.9rem">No transactions to display</p>`;
      return;
    }

    transactions.forEach(tx => {
      const item = document.createElement('div');
      item.className = 'transaction-item';

      let isIncome, label, desc, notes;

      if (listType === 'all') {
        isIncome = tx.type === 'income';
        label = tx.label;
      } else if (listType === 'income') {
        isIncome = true;
        label = tx.source;
      } else {
        isIncome = false;
        label = tx.category;
      }

      if (enableActions) {
        desc = tx.description;
        notes = tx.notes;
      }

      item.innerHTML = `
        <div class="tx-left">
          <div class="tx-icon ${isIncome ? 'income' : 'expense'}">
            ${isIncome ? incomeIcon : expenseIcon}
          </div>
          <div class="tx-meta">
            <span class="tx-label">${label}</span>
            <span class="tx-date">${formatDate(tx.created_at || tx.date)}</span>
            ${desc ? `<span class="tx-desc"><b>Description:</b> ${desc}</span>` : ''}
            ${notes ? `<span class="tx-notes"><b>Notes:</b> ${notes}</span>` : ''}
          </div>
        </div>

        <div class="tx-right">
          <div class="tx-amount ${isIncome ? 'income' : 'expense'}">
            ${isIncome ? '+' : '-'} ₹${tx.amount}
          </div>
          ${enableActions
          ? `
                <div class="tx-actions">
                  <button class="icon-btn edit">${editIcon}</button>
                  <button class="icon-btn delete">${deleteIcon}</button>
                </div>
              `
          : ''
        }
        </div>
      `;

      if (enableActions) {
        item.querySelector('.edit')?.addEventListener('click', () => card.onEdit?.(tx));
        item.querySelector('.delete')?.addEventListener('click', () => card.onDelete?.(tx));
      }

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
