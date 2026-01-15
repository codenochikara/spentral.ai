export default function StatCard(title) {
  const card = document.createElement('div');
  card.className = 'stat-card card';

  const titleEl = document.createElement('span');
  titleEl.className = 'stat-title';
  titleEl.textContent = title;

  const valueEl = document.createElement('div');
  valueEl.className = 'stat-value';
  valueEl.innerHTML = `<div class="skeleton skeleton-text" style="height:1.6rem;width:60%"></div>`;

  card.append(titleEl, valueEl);

  card.update = (value) => {
    valueEl.textContent = value;
  };

  return card;
}
