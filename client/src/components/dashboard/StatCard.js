export default function StatCard(title, value) {
  const card = document.createElement('div');
  card.className = 'stat-card card';

  const valueEl = document.createElement('strong');

  card.innerHTML = `<span class="stat-title">${title}</span>`;
  valueEl.className = 'stat-value';
  valueEl.textContent = value;

  card.appendChild(valueEl);

  card.update = (newValue) => {
    valueEl.textContent = newValue;
  };

  return card;
}
