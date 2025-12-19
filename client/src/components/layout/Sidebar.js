import api from '../../api/axios';
import { navigate } from '../../router/router';
// import '../../styles/dashboard.css';

export default function Sidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar expanded';

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <span class="logo">Spentral.ai</span>
      <button class="btn collapse-btn">≡</button>
    </div>

    <nav class="sidebar-nav">
      <ul>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></g></svg>
          <a data-route="/dashboard">Dashboard</a>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></g></svg>
          <a data-route="/expenses">Expenses</a>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></g></svg>
          <a data-route="/income">Income</a>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></g></svg>
          <a data-route="/profile">Profile</a>
        </li>
      </ul>
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

  sidebar.querySelector('#logout-btn').onclick = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      navigate('/login');
    }
  };

  return sidebar;
}
