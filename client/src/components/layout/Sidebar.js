import api from '../../api/axios';
import { navigate } from '../../router/router';

export default function Sidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-width="2"
          d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
      </svg>
      <h2 class="logo-text">Spentral.ai</h2>
    </div>

    <nav class="sidebar-nav">
      <ul>
        ${navItem('/dashboard', 'Dashboard', dashboardIcon)}
        ${navItem('/expenses', 'Expenses', expenseIcon)}
        ${navItem('/incomes', 'Incomes', incomeIcon)}
        ${navItem('/profile', `${window.localStorage.getItem("spentralUser")}`, profileIcon)}
      </ul>
    </nav>

    <div class="sidebar-footer">
      <div class="theme-switch" title="Toggle theme">
        <i class="theme-icon sun">${sunIcon}</i>
        <label class="switch">
          <input type="checkbox" id="theme-toggle">
          <span class="slider"></span>
        </label>
        <i class="theme-icon moon">${moonIcon}</i>
      </div>

      <button class="btn icon-btn" id="logout-btn" title="Logout">
        ${logoutIcon}
      </button>

      <button class="btn icon-btn collapse-btn" title="${sidebar.classList.contains('collapsed') ? 'Expand sidebar' : 'Collapse sidebar (Ctrl+B)'}">
        ${collapseIcon}
      </button>
    </div>
  `;

  /* ---------------- Theme logic ---------------- */
  const root = document.documentElement;
  const toggle = sidebar.querySelector('#theme-toggle');

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  const savedTheme = localStorage.getItem('theme') || 'system';
  applyTheme(savedTheme);

  toggle.checked = root.dataset.theme === 'dark';

  toggle.onchange = () => {
    const theme = toggle.checked ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  };

  function applyTheme(mode) {
    if (mode === 'system') {
      root.dataset.theme = systemTheme;
    } else {
      root.dataset.theme = mode;
    }
    toggle.checked = root.dataset.theme === 'dark';
  }

  /* ---------------- Navigation ---------------- */
  const links = sidebar.querySelectorAll('[data-route]');
  links.forEach(link => {
    link.onclick = () => {
      setActive(link.dataset.route);
      navigate(link.dataset.route);
    };
  });

  function setActive(route) {
    links.forEach(link => {
      link.classList.toggle('active', link.dataset.route === route);
    });
  }
  setActive(window.location.pathname);

  /* ---------------- Collapse ---------------- */
  const collapseBtn = sidebar.querySelector('.collapse-btn');
  collapseBtn.onclick = toggleCollapse;

  function toggleCollapse() {
    sidebar.classList.toggle('collapsed');
  }

  /* Keyboard shortcut: Ctrl + B */
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleCollapse();
    }
  });

  /* ---------------- Logout ---------------- */
  sidebar.querySelector('#logout-btn').onclick = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      navigate('/login');
    }
  };

  return sidebar;
}

/* ================= HELPERS ================= */

function navItem(route, label, icon) {
  return `
    <li>
      <a data-route="${route}" title="${label}">
        ${icon}
        <span class="nav-label">${label}</span>
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

const expenseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
  <path fill="none" stroke="currentColor" stroke-width="2"
    d="M16 17h6v-6m0 6l-8.5-8.5l-5 5L2 7"/>
</svg>`;

const incomeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
  <path fill="none" stroke="currentColor" stroke-width="2"
    d="M16 7h6v6m0-6l-8.5 8.5l-5-5L2 17"/>
</svg>`;

const profileIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g></svg>`;

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

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></g></svg>`;

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`;
