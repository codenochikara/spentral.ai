import { Chart } from 'chart.js/auto';

export default function BarChart(title) {
  const card = document.createElement('div');
  card.className = 'chart-card card';

  const header = document.createElement('h3');
  header.textContent = title;

  const body = document.createElement('div');
  body.className = 'chart-placeholder';
  body.innerHTML = `<div class="skeleton" style="height:100%"></div>`;

  const canvas = document.createElement('canvas');

  card.append(header, body);

  let chart;

  card.render = ({ labels, data }) => {
    body.innerHTML = '';
    body.appendChild(canvas);

    if (chart) chart.destroy();

    chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: 'rgba(99,102,241,0.6)',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 600,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            ticks: {
              callback: v => `₹${v}`
            }
          }
        }
      }
    });
  };

  return card;
}
