// ============================================================
//  VIEW: My Performance (self-view for logged-in employee)
// ============================================================
(function() {
  window.BB.views = window.BB.views || {};

  window.BB.views['my-performance'] = {
    title: 'My Performance',

    render() {
      const { AUTH_USERS, EMPLOYEES, MONTHS, getLatestScore, getRating } = window.BB;
      const user = window.BB.currentUser;
      if(!user || user.role==='admin') {
        return `<div class="empty-state">
          <div class="empty-icon">🔒</div>
          <h3>Not available for Admin</h3>
          <p>Switch to an employee or manager account to view personal performance</p>
          <button class="btn btn-secondary" style="margin-top:16px;" onclick="BB.navigate('dashboard')">← Back to Dashboard</button>
        </div>`;
      }
      const emp = EMPLOYEES.find(e=>e.id===user.employeeId);
      if(!emp) return `<div class="empty-state"><div class="empty-icon">❌</div><h3>Employee data not found</h3></div>`;

      // Just delegate to employee-detail render
      return `<div id="my-perf-wrap"></div>`;
    },

    afterRender() {
      const user = window.BB.currentUser;
      if(!user || !user.employeeId) return;
      const { EMPLOYEES } = window.BB;
      const emp = EMPLOYEES.find(e=>e.id===user.employeeId);
      if(!emp) return;
      // Render inline using employee-detail view
      const wrap = document.getElementById('my-perf-wrap');
      if(wrap) {
        wrap.innerHTML = window.BB.views['employee-detail'].render(emp.id);
        window.BB.views['employee-detail'].afterRender(emp.id);
      }
    }
  };
})();
