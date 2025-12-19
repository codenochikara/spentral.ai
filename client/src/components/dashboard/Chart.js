export default function ChartPlaceholder(title) {
  const card = document.createElement('div');
  card.className = 'chart-card card';

  const body = document.createElement('div');
  body.className = 'chart-placeholder';

  card.innerHTML = `<h3>${title}</h3>`;
  card.appendChild(body);

  card.render = (data) => {
    body.innerHTML = `
      <pre style="font-size: 0.7rem; opacity: 0.7">
${JSON.stringify(data, null, 2)}
      </pre>
    `;
  };

  return card;
}
