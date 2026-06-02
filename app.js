// ============================================================
//  APP.JS — SPA Router, Auth, Navigation
// ============================================================

(function () {
  // ─── Auth State ──────────────────────────────────────────
  window.BB.currentUser = null;

  // ─── Navigation Config ───────────────────────────────────
  const NAV = [
    { id: 'dashboard',       label: 'Dashboard',       icon: '📊', roles: ['admin','manager','employee'] },
    { id: 'employees',       label: 'Employees',       icon: '👷', roles: ['admin','manager'] },
    { id: 'teams',           label: 'Teams & Divisions',icon: '🗂️', roles: ['admin','manager'] },
    { id: 'projects',        label: 'Projects',        icon: '🔧', roles: ['admin','manager','employee'] },
    { id: 'my-performance',  label: 'My Performance',  icon: '🏅', roles: ['employee','manager'] },
    { id: 'kpi-config',      label: 'KPI Config',      icon: '⚙️', roles: ['admin'] },
  ];

  // ─── Router ──────────────────────────────────────────────
  let _currentView = null;
  let _currentParam = null;

  window.BB.navigate = function (viewId, param) {
    if (!window.BB.currentUser) { showLogin(); return; }
    _currentView  = viewId;
    _currentParam = param || null;
    const view = window.BB.views[viewId];
    if (!view) return;

    // Update page title
    document.getElementById('topbar-title').textContent = view.title || viewId;
    document.title = view.title + ' — Brahmaputra Board KPI';

    // Destroy existing charts
    Chart.helpers && Object.values(Chart.instances || {}).forEach(c => c.destroy());

    // Render view
    const app = document.getElementById('app');
    app.innerHTML = view.render(param);

    // After-render hook (for charts etc.)
    if (view.afterRender) setTimeout(() => view.afterRender(param), 0);

    // Update active nav
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === viewId);
    });

    // Close mobile sidebar
    closeSidebar();
    window.scrollTo(0, 0);
  };

  // ─── Login ───────────────────────────────────────────────
  function showLogin() {
    document.getElementById('root').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
  }

  function hideLogin() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('root').style.display = 'flex';
  }

  window.BB.doLogin = function () {
    const userId = document.getElementById('login-user').value;
    const pass   = document.getElementById('login-pass').value;
    const user   = window.BB.AUTH_USERS.find(u => u.id === userId && u.password === pass);
    if (!user) {
      document.getElementById('login-error').textContent = '❌ Invalid credentials. Please try again.';
      return;
    }
    window.BB.currentUser = user;
    hideLogin();
    buildSidebar();
    updateUserCard();
    window.BB.navigate('dashboard');
  };

  window.BB.doLogout = function () {
    window.BB.currentUser = null;
    showLogin();
    document.getElementById('root').style.display = 'none';
  };

  // ─── Sidebar ─────────────────────────────────────────────
  function buildSidebar() {
    const user    = window.BB.currentUser;
    const navEl   = document.getElementById('sidebar-nav');
    const allowed = NAV.filter(n => n.roles.includes(user.role));

    navEl.innerHTML = `
      <span class="nav-label">Main Menu</span>
      ${allowed.map(n => `
        <div class="nav-item${n.id===_currentView?' active':''}" data-view="${n.id}" onclick="BB.navigate('${n.id}')">
          <span class="nav-icon">${n.icon}</span>
          <span>${n.label}</span>
        </div>`).join('')}
      <span class="nav-label" style="margin-top:12px;">Reports</span>
      <div class="nav-item" onclick="alert('📄 Export to PDF coming soon!')">
        <span class="nav-icon">📄</span><span>Export Report</span>
      </div>
      <div class="nav-item" onclick="alert('🔔 Notification centre coming soon!')">
        <span class="nav-icon">🔔</span><span>Notifications</span>
        <span class="nav-badge">3</span>
      </div>`;
  }

  function updateUserCard() {
    const user = window.BB.currentUser;
    document.getElementById('user-name').textContent  = user.name;
    document.getElementById('user-role').textContent  = user.role;
    document.getElementById('user-initials').textContent = user.name.split(' ').map(w=>w[0]).join('').slice(0,2);
  }

  // ─── Sidebar Mobile Toggle ────────────────────────────────
  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('open');
  }

  window.BB.toggleSidebar = function () {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('open');
  };

  // ─── Export stub ─────────────────────────────────────────
  window.BB.printDash = function () { window.print(); };

  // ─── Init ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    // Show login first
    showLogin();
    // Live clock
    function tick() {
      const now = new Date();
      const el  = document.getElementById('topbar-date');
      if(el) el.textContent = now.toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short', year:'numeric' });
    }
    tick();
    setInterval(tick, 60000);
  });
})();
