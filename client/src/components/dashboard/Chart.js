export default function Chart(title) {
  const card = document.createElement("div");
  card.className = "chart-card card";

  const header = document.createElement("h3");
  header.textContent = title;

  const body = document.createElement("div");
  body.className = "chart-placeholder";
  body.innerHTML = `<div class="skeleton" style="height:100%"></div>`;

  card.append(header, body);

  card.render = (data) => {
    body.innerHTML = `
      <pre style="font-size:0.7rem;opacity:0.7">
        ${JSON.stringify(data, null, 2)}
      </pre>
    `;
  };

  return card;
}
