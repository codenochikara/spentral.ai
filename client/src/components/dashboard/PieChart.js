import { Chart } from 'chart.js/auto';

export default function PieChart(title) {
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
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              '#A7C7E7', // pastel blue
              '#F7CAC9', // pastel pink
              '#B5EAD7', // pastel mint
              '#FFF2B2', // pastel yellow
              '#FFDAC1', // pastel peach
              '#CBAACB', // pastel purple
              '#FFB7B2', // pastel coral
              '#B5D8FA', // pastel sky
              '#E2F0CB', // pastel green
              '#D6E2E9'  // pastel gray
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            align: 'center',
            labels: {
              boxWidth: 12,
              padding: 12
            }
          }
        }
      }
    });
  };

  return card;
}
