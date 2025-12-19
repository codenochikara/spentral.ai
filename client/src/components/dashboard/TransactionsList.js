export default function TransactionsList(items = []) {
  const card = document.createElement('div');
  card.className = 'transactions card';

  const list = document.createElement('ul');

  card.innerHTML = `<h3>Recent Transactions</h3>`;
  card.appendChild(list);

  card.update = (transactions) => {
    list.innerHTML = '';

    transactions.forEach(tx => {
      const li = document.createElement('li');
      li.textContent = `${tx.category} — ₹${tx.amount}`;
      list.appendChild(li);
    });
  };

  card.update(items);

  return card;
}
