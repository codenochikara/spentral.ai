export default function StatCard(title, icon = '') {
  const card = document.createElement('div');
  card.className = 'stat-card card stat-card-horizontal';

  const iconEl = document.createElement('div');
  iconEl.className = 'stat-icon';
  iconEl.innerHTML = icon;

  const content = document.createElement('div');
  content.className = 'stat-content';

  const titleEl = document.createElement('span');
  titleEl.className = 'stat-title';
  titleEl.textContent = title;

  const valueEl = document.createElement('div');
  valueEl.className = 'stat-value';
  valueEl.innerHTML = `
    <div class="skeleton skeleton-text" style="height:1.6rem;width:100%"></div>
  `;

  content.append(titleEl, valueEl);
  card.append(iconEl, content);

  card.update = (value) => {
    valueEl.textContent = value;
  };

  return card;
}
