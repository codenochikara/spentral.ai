import { Chart } from 'chart.js/auto';

export default function LineChart(title) {
  const card = document.createElement('div');
  card.className = 'chart-card card';

  const header = document.createElement('h3');
  header.textContent = title;

  const body = document.createElement('div');
  body.className = 'chart-placeholder';
  body.innerHTML = `<div class="skeleton" style="height:100%"></div>`;

  const canvas = document.createElement('canvas');

  card.append(header, body);

  let chartInstance = null;

  card.render = ({ labels, data }) => {
    body.innerHTML = '';
    body.appendChild(canvas);

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Expenses',
            data,
            borderWidth: 2,
            fill: false,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  };

  return card;
}
