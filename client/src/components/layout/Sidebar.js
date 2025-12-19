import { navigate } from '../../router/router';
// import '../../styles/dashboard.css';

export default function Sidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar expanded';

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <span class="logo">Spentral</span>
      <button class="collapse-btn">≡</button>
    </div>

    <nav class="sidebar-nav">
      <a data-route="/dashboard">Dashboard</a>
      <a data-route="/expenses">Expenses</a>
      <a data-route="/income">Income</a>
      <a data-route="/profile">Profile</a>
    </nav>

    <div class="sidebar-footer">
      <button class="btn btn-primary" id="logout-btn">Logout</button>
    </div>
  `;

  sidebar.querySelector('.collapse-btn').onclick = () => {
    sidebar.classList.toggle('collapsed');
  };

  sidebar.querySelectorAll('[data-route]').forEach(link => {
    link.onclick = () => navigate(link.dataset.route);
  });

  sidebar.querySelector('#logout-btn').onclick = () => {
    navigate('/login');
  };

  return sidebar;
}
