export default function StatCard(title, value = '—') {
  const card = document.createElement('div');
  card.className = 'stat-card card';

  const titleEl = document.createElement('span');
  titleEl.className = 'stat-title';
  titleEl.textContent = title;

  const valueEl = document.createElement('strong');
  valueEl.className = 'stat-value';
  valueEl.textContent = value;

  card.append(titleEl, valueEl);

  card.update = (newValue) => {
    valueEl.textContent = newValue;
  };

  card.setLoading = (isLoading) => {
    if (isLoading) {
      valueEl.innerHTML = `<div class="skeleton skeleton-text" style="width: 60%; height:1.5rem;"></div>`;
    } else {
      valueEl.textContent = valueEl.textContent || '—';
    }
  };

  return card;
}
