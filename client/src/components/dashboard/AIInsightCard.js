export default function AIInsightCard() {
  const card = document.createElement('section');
  card.className = 'card ai-insight-card';

  const header = document.createElement('div');
  header.className = 'ai-header';

  const title = document.createElement('h3');
  title.textContent = 'AI Financial Insights';

  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.textContent = 'Generate Insights';

  header.append(title, btn);

  const content = document.createElement('div');
  content.className = 'ai-content';
  content.innerHTML = `
    <p class="muted-text">
      Generate AI-powered insights based on your income and expenses.
    </p>
  `;

  card.append(header, content);

  card.setLoading = () => {
    content.innerHTML = `
      <div class="skeleton" style="height: 120px"></div>
    `;
  };

  card.setInsights = (text) => {
    const lines = text.split('\n').filter(Boolean);

    content.innerHTML = `
      <ul class="ai-list">
        ${lines.map(l => `<li>${l}</li>`).join('')}
      </ul>
    `;
  };

  card.setError = () => {
    content.innerHTML = `
      <p class="muted-text">Failed to generate insights.</p>
    `;
  };

  card.onGenerate = (handler) => {
    btn.onclick = handler;
  };

  return card;
}
