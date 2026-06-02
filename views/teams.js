// ============================================================
//  VIEW: Teams / Divisions
// ============================================================
(function() {
  window.BB.views = window.BB.views || {};

  window.BB.views.teams = {
    title: 'Teams & Divisions',

    render() {
      const { getDivisionSummaries, MONTHS } = window.BB;
      const divs = getDivisionSummaries();

      return `
      <div class="animate-fade">
        <div class="page-header">
          <div class="page-header-left">
            <h1>🗂️ Teams & Divisions</h1>
            <p>Division-wise aggregated KPI performance overview</p>
          </div>
        </div>

        <!-- Division Cards -->
        <div class="grid grid-3" style="margin-bottom:24px;">
          ${divs.map(d=>this._divCard(d)).join('')}
        </div>

        <!-- Side-by-side comparison chart -->
        <div class="card" style="margin-bottom:24px;">
          <div class="card-header">
            <div class="card-title">📊 Division Comparison — Latest Month</div>
            <div class="card-subtitle">${MONTHS[MONTHS.length-1]}</div>
          </div>
          <div class="chart-container" style="height:260px;"><canvas id="chart-div-compare"></canvas></div>
        </div>

        <!-- Employees by Division -->
        ${divs.map(d=>this._divSection(d)).join('')}
      </div>`;
    },

    afterRender() {
      const { getDivisionSummaries, getRating } = window.BB;
      const divs = getDivisionSummaries();
      const ctx = document.getElementById('chart-div-compare');
      if(!ctx) return;

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: divs.map(d=>d.name.length>20?d.name.slice(0,18)+'…':d.name),
          datasets: [{
            label: 'Avg KPI Score',
            data:  divs.map(d=>d.avg),
            backgroundColor: divs.map(d=>d.type==='HQ'?'rgba(99,102,241,0.75)':'rgba(20,184,166,0.75)'),
            borderRadius: 6,
          }]
        },
        options: {
          indexAxis: 'y', responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9B9BBF' } },
            y: { grid: { display: false }, ticks: { color: '#9B9BBF' } }
          }
        }
      });
    },

    _divCard(div) {
      const r = window.BB.getRating(div.avg);
      const rc = r.label.toLowerCase().replace(' ','');
      const color = div.type==='HQ'?'#6366F1':'#14B8A6';
      return `
      <div class="stat-card" style="--stat-accent:${color};--stat-bg:${color}22;flex-direction:column;gap:14px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;width:100%;">
          <div>
            <div style="font-size:15px;font-weight:700;">${div.name}</div>
            <div style="font-size:12px;color:var(--text-muted);">📍 ${div.location}</div>
          </div>
          <span class="type-badge type-${div.type.toLowerCase()}">${div.type}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;width:100%;">
          <div>
            <div style="font-size:36px;font-weight:800;color:${r.color};font-family:'Plus Jakarta Sans',sans-serif;line-height:1;">${div.avg}</div>
            <span class="score-badge score-${rc}" style="margin-top:4px;">${r.label}</span>
          </div>
          <div style="text-align:right;">
            <div style="font-size:22px;font-weight:700;">${div.count}</div>
            <div style="font-size:11px;color:var(--text-muted);">Employees</div>
          </div>
        </div>
        <div class="progress-wrap" style="height:6px;width:100%;">
          <div class="progress-bar" style="width:${div.avg}%;background:${r.color};height:6px;"></div>
        </div>
      </div>`;
    },

    _divSection(div) {
      const { getLatestScore, getRating } = window.BB;
      if(!div.employees.length) return '';
      return `
      <div class="card" style="margin-bottom:20px;">
        <div class="card-header">
          <div>
            <div class="card-title">${div.name}</div>
            <div class="card-subtitle">${div.count} employees • Avg: ${div.avg}</div>
          </div>
          <span class="type-badge type-${div.type.toLowerCase()}">${div.type}</span>
        </div>
        <table class="data-table">
          <thead><tr><th>Employee</th><th>Role</th><th>Score</th><th>Rating</th><th></th></tr></thead>
          <tbody>
            ${div.employees.map(e=>{
              const s=getLatestScore(e); const r=getRating(s); const rc=r.label.toLowerCase().replace(' ','');
              const c=['#6366F1','#14B8A6','#F59E0B','#EF4444','#8B5CF6','#3B82F6','#EC4899'];
              let h=0; for(let ch of e.name) h=(h*31+ch.charCodeAt(0))%c.length;
              return `<tr onclick="BB.navigate('employee-detail','${e.id}')">
                <td><div style="display:flex;align-items:center;gap:8px;">
                  <div class="avatar avatar-sm" style="background:${c[Math.abs(h)]}">${e.name[0]}</div>
                  <span style="font-weight:600;">${e.name}</span>
                </div></td>
                <td style="font-size:12.5px;color:var(--text-secondary);">${e.role}</td>
                <td><strong style="color:${r.color};">${s}</strong></td>
                <td><span class="score-badge score-${rc}">${r.label}</span></td>
                <td><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();BB.navigate('employee-detail','${e.id}')">→</button></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
    }
  };
})();
