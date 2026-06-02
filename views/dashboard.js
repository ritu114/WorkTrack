// ============================================================
//  VIEW: Dashboard
// ============================================================
(function() {
  window.BB.views = window.BB.views || {};

  window.BB.views.dashboard = {
    title: 'Dashboard',

    render() {
      const { getOrgSummary, getDivisionSummaries, getOrgTrend, getRating, getLatestScore, MONTHS, PROJECTS } = window.BB;
      const summary = getOrgSummary();
      const rating  = getRating(summary.overall);
      const divs    = getDivisionSummaries();
      const trend   = getOrgTrend();

      const projects = PROJECTS.slice(0, 5);

      return `
      <div class="animate-fade">
        <div class="page-header">
          <div class="page-header-left">
            <h1>📊 Performance Dashboard</h1>
            <p>Real-time KPI monitoring — Brahmaputra Board (FY 2024-25)</p>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <select class="form-select" style="width:auto;" id="dash-month-sel">
              ${MONTHS.map((m,i)=>`<option value="${i}" ${i===MONTHS.length-1?'selected':''}>${m}</option>`).join('')}
            </select>
            <button class="btn btn-primary btn-sm" onclick="window.BB.printDash()">⬇ Export</button>
          </div>
        </div>

        <!-- KPI Summary Cards -->
        <div class="grid grid-4" style="margin-bottom:20px;">
          ${this._statCard('🏢','Overall Score',summary.overall+'/100','+2.3 from last month','var(--grad-brand)',rating.label,'score-'+rating.label.toLowerCase().replace(' ',''))}
          ${this._statCard('🏛','HQ Performance',summary.hqAvg+'/100',summary.hqCount+' employees','rgba(99,102,241,.15)','')}
          ${this._statCard('🏗','Field Performance',summary.fieldAvg+'/100',summary.fieldCount+' employees','rgba(20,184,166,.15)','')}
          ${this._statCard('👷','Total Employees',summary.totalEmployees,`${divs.length} divisions active`,'rgba(245,158,11,.15)','')}
        </div>

        <!-- Charts Row -->
        <div class="grid grid-2" style="margin-bottom:20px;">
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">📈 Monthly Score Trend</div>
                <div class="card-subtitle">Organisation-wide weighted KPI average</div>
              </div>
            </div>
            <div class="chart-container" style="height:220px;">
              <canvas id="chart-trend"></canvas>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">⚖️ HQ vs Field Comparison</div>
                <div class="card-subtitle">Average weighted scores by unit type</div>
              </div>
            </div>
            <div class="chart-container" style="height:220px;">
              <canvas id="chart-hq-field"></canvas>
            </div>
          </div>
        </div>

        <!-- Division Cards + Top Performers -->
        <div class="grid grid-2" style="margin-bottom:20px;">
          <div class="card">
            <div class="card-header"><div class="card-title">🗺️ Division Performance</div></div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${divs.map(d => this._divisionRow(d)).join('')}
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="card-title">🏆 Top Performers</div>
            </div>
            <table class="data-table">
              <thead><tr><th>Employee</th><th>Division</th><th>Score</th><th>Rating</th></tr></thead>
              <tbody>
                ${summary.topPerformers.map(e=>{
                  const s = getLatestScore(e); const r = getRating(s);
                  const div = window.BB.DIVISIONS.find(d=>d.id===e.division);
                  return `<tr onclick="BB.navigate('employee-detail','${e.id}')">
                    <td><div style="display:flex;align-items:center;gap:8px;">
                      <div class="avatar avatar-sm" style="background:${this._avatarColor(e.name)}">${e.name[0]}</div>
                      <div><div style="font-weight:600;font-size:13px;">${e.name}</div><div style="font-size:11px;color:var(--text-muted);">${e.role}</div></div>
                    </div></td>
                    <td><span class="type-badge type-${e.type.toLowerCase()}">${div?div.name:'—'}</span></td>
                    <td><strong>${s}</strong></td>
                    <td><span class="score-badge score-${r.label.toLowerCase().replace(' ','')}">${r.label}</span></td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Projects + Notices -->
        <div class="grid grid-2">
          <div class="card">
            <div class="card-header"><div class="card-title">🔧 Active Projects</div></div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${projects.map(p=>this._projectRow(p)).join('')}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-title">📢 Notices & Alerts</div></div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              ${window.BB.NOTICES.map(n=>`
                <div class="notice-item">
                  <span style="font-size:18px;">${{info:'ℹ️',warning:'⚠️',success:'✅'}[n.type]}</span>
                  <div>
                    <div style="font-size:13px;font-weight:500;">${n.title}</div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">${n.date}</div>
                  </div>
                </div>`).join('')}
              <div class="notice-item" style="background:rgba(239,68,68,0.06);border-color:rgba(239,68,68,0.2);">
                <span style="font-size:18px;">🔴</span>
                <div>
                  <div style="font-size:13px;font-weight:500;">3 employees need attention (score &lt; 50)</div>
                  <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Review recommended</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    },

    afterRender() {
      const { getOrgTrend, MONTHS, EMPLOYEES, getLatestScore } = window.BB;
      const trend = getOrgTrend();
      const hqEmps = EMPLOYEES.filter(e=>e.type==='HQ');
      const fieldEmps = EMPLOYEES.filter(e=>e.type==='Field');
      const hqAvgs = MONTHS.map((_,i) => +(hqEmps.map(e=>window.BB.calculateWeightedScore(e,i)).reduce((s,v)=>s+v,0)/hqEmps.length).toFixed(1));
      const fieldAvgs = MONTHS.map((_,i) => +(fieldEmps.map(e=>window.BB.calculateWeightedScore(e,i)).reduce((s,v)=>s+v,0)/fieldEmps.length).toFixed(1));

      // Trend chart
      const tCtx = document.getElementById('chart-trend');
      if(tCtx) new Chart(tCtx, {
        type: 'line',
        data: {
          labels: MONTHS.map(m=>m.split(' ')[0]),
          datasets: [{
            label: 'Org Score', data: trend,
            borderColor: '#6366F1', backgroundColor: 'rgba(99,102,241,0.12)',
            fill: true, tension: 0.4, pointBackgroundColor: '#6366F1', pointRadius: 4
          }]
        },
        options: this._chartOpts()
      });

      // HQ vs Field chart
      const hfCtx = document.getElementById('chart-hq-field');
      if(hfCtx) new Chart(hfCtx, {
        type: 'bar',
        data: {
          labels: MONTHS.map(m=>m.split(' ')[0]),
          datasets: [
            { label:'HQ',    data: hqAvgs,    backgroundColor: 'rgba(99,102,241,0.7)',  borderRadius: 4 },
            { label:'Field', data: fieldAvgs, backgroundColor: 'rgba(20,184,166,0.7)', borderRadius: 4 },
          ]
        },
        options: { ...this._chartOpts(), scales: { y: { min: 40, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9B9BBF' } }, x: { grid: { display: false }, ticks: { color: '#9B9BBF' } } } }
      });
    },

    _chartOpts() {
      return {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#9B9BBF', font: { size: 11 } } } },
        scales: {
          y: { min: 40, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9B9BBF' } },
          x: { grid: { display: false }, ticks: { color: '#9B9BBF' } }
        }
      };
    },

    _statCard(icon, label, value, sub, iconBg, badge, badgeClass) {
      return `<div class="stat-card">
        <div class="stat-icon" style="background:${iconBg}">${icon}</div>
        <div class="stat-body">
          <div class="stat-value">${value}</div>
          <div class="stat-label">${label}</div>
          <div class="stat-delta">${badge ? `<span class="score-badge ${badgeClass}" style="font-size:10px;">${badge}</span>` : ''} <span style="color:var(--text-muted);font-size:11px;">${sub}</span></div>
        </div>
      </div>`;
    },

    _divisionRow(div) {
      const pct = div.avg;
      const color = pct>=75?'#10B981':pct>=60?'#6366F1':pct>=45?'#F59E0B':'#EF4444';
      return `<div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <div>
            <span style="font-size:13px;font-weight:600;">${div.name}</span>
            <span class="type-badge type-${div.type.toLowerCase()}" style="margin-left:6px;">${div.type}</span>
          </div>
          <span style="font-size:14px;font-weight:700;color:${color}">${pct}</span>
        </div>
        <div class="progress-wrap" style="height:6px;">
          <div class="progress-bar" style="width:${pct}%;background:${color};height:6px;"></div>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:3px;">${div.count} employees • ${div.location}</div>
      </div>`;
    },

    _projectRow(p) {
      const cls = p.status==='Completed'?'status-completed':p.status==='In Progress'?'status-inprogress':'status-planning';
      const budget = Math.round((p.spent/p.budget)*100);
      return `<div style="display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--border-subtle);">
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:600;">${p.name}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Budget: ₹${p.budget}L spent ₹${p.spent}L (${budget}%)</div>
          <div class="progress-wrap" style="height:4px;margin-top:6px;">
            <div class="progress-bar" style="width:${p.progress}%;background:var(--brand-secondary);height:4px;"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-top:3px;"><span>Progress ${p.progress}%</span><span>Due: ${p.dueDate}</span></div>
        </div>
        <span class="status-pill ${cls}">${p.status}</span>
      </div>`;
    },

    _avatarColor(name) {
      const colors = ['#6366F1','#14B8A6','#F59E0B','#EF4444','#8B5CF6','#3B82F6','#EC4899'];
      let hash = 0; for(let c of name) hash = (hash*31+c.charCodeAt(0))%colors.length;
      return colors[Math.abs(hash)];
    }
  };
})();
