import api from '../../api/axios';
import { navigate } from '../../router/router';

export default function Sidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-width="2"
          d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
      </svg>
      <span class="logo-text">Spentral.ai</span>
    </div>

    <nav class="sidebar-nav">
      <ul>
        ${navItem('/dashboard', 'Dashboard', dashboardIcon)}
        ${navItem('/expenses', 'Expenses', expenseIcon)}
        ${navItem('/incomes', 'Incomes', incomeIcon)}
        ${navItem('/profile', 'Profile', profileIcon)}
      </ul>
    </nav>

    <div class="sidebar-footer">
      <button class="btn btn-primary" id="logout-btn">
        ${logoutIcon}
        <span>Logout</span>
      </button>

      <button class="btn collapse-btn" title="Collapse sidebar">
        ${collapseIcon}
      </button>
    </div>
  `;

  /* ---------- Collapse ---------- */
  sidebar.querySelector('.collapse-btn').onclick = () => {
    sidebar.classList.toggle('collapsed');
  };

  /* ---------- Navigation ---------- */
  const links = sidebar.querySelectorAll('[data-route]');
  links.forEach(link => {
    link.onclick = () => {
      setActive(link.dataset.route);
      navigate(link.dataset.route);
    };
  });

  /* ---------- Logout ---------- */
  sidebar.querySelector('#logout-btn').onclick = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      navigate('/login');
    }
  };

  /* ---------- Active route on load ---------- */
  setActive(window.location.pathname);

  function setActive(route) {
    links.forEach(link => {
      link.classList.toggle('active', link.dataset.route === route);
    });
  }

  return sidebar;
}

/* ================= HELPERS ================= */

function navItem(route, label, icon) {
  return `
    <li>
      <a data-route="${route}">
        ${icon}
        <span>${label}</span>
      </a>
    </li>
  `;
}

/* ================= ICONS ================= */

const dashboardIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
  <g fill="none" stroke="currentColor" stroke-width="2">
    <rect width="7" height="9" x="3" y="3" rx="1"/>
    <rect width="7" height="5" x="14" y="3" rx="1"/>
    <rect width="7" height="9" x="14" y="12" rx="1"/>
    <rect width="7" height="5" x="3" y="16" rx="1"/>
  </g>
</svg>`;

const expenseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 17h6v-6"/><path d="m22 17l-8.5-8.5l-5 5L2 7"/></g></svg>`;

const incomeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 7h6v6"/><path d="m22 7l-8.5 8.5l-5-5L2 17"/></g></svg>`;

const profileIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
  <path fill="none" stroke="currentColor" stroke-width="2"
    d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm7 9a7 7 0 0 0-14 0"/>
</svg>`;

const logoutIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
  <path fill="none" stroke="currentColor" stroke-width="2"
    d="m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
</svg>`;

const collapseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
  <path fill="none" stroke="currentColor" stroke-width="2"
    d="m9 6l-6 6l6 6m-6-6h14m4 7V5"/>
</svg>`;
