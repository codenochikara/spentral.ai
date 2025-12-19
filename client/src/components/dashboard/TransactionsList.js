export default function TransactionsList(items = []) {
  const card = document.createElement('div');
  card.className = 'transactions card';

  const header = document.createElement('h3');
  header.textContent = 'Recent Transactions';

  const list = document.createElement('ul');
  card.append(header, list);

  card.update = (transactions) => {
    list.innerHTML = '';
    transactions.forEach(tx => {
      const li = document.createElement('li');
      li.textContent = `${tx.category} — ₹${tx.amount}`;
      list.appendChild(li);
    });
  };

  card.setLoading = (isLoading) => {
    if (isLoading) {
      list.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<div class="skeleton skeleton-text" style="width: 80%; height:1rem;"></div>`;
        list.appendChild(li);
      }
    }
  };

  card.update(items);
  return card;
}
