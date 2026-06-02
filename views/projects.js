// ============================================================
//  VIEW: Projects
// ============================================================
(function() {
  window.BB.views = window.BB.views || {};

  window.BB.views.projects = {
    title: 'Projects',

    render() {
      const { PROJECTS, DIVISIONS } = window.BB;
      return `
      <div class="animate-fade">
        <div class="page-header">
          <div class="page-header-left">
            <h1>🔧 Project Monitoring</h1>
            <p>Track project timelines, budgets, and physical progress</p>
          </div>
          <button class="btn btn-primary btn-sm">＋ New Project</button>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-4" style="margin-bottom:20px;">
          ${this._sumCard('📋','Total Projects', PROJECTS.length,'','rgba(99,102,241,.15)')}
          ${this._sumCard('⚡','In Progress', PROJECTS.filter(p=>p.status==='In Progress').length,'Active','rgba(59,130,246,.15)')}
          ${this._sumCard('✅','Completed',   PROJECTS.filter(p=>p.status==='Completed').length,'On target','rgba(16,185,129,.15)')}
          ${this._sumCard('📝','Planning',    PROJECTS.filter(p=>p.status==='Planning').length,'Upcoming','rgba(245,158,11,.15)')}
        </div>

        <!-- Budget utilisation chart -->
        <div class="grid grid-2" style="margin-bottom:20px;">
          <div class="card">
            <div class="card-header"><div class="card-title">💰 Budget Utilisation by Project</div></div>
            <div class="chart-container" style="height:260px;"><canvas id="chart-budget"></canvas></div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-title">📊 Physical Progress by Project</div></div>
            <div class="chart-container" style="height:260px;"><canvas id="chart-progress"></canvas></div>
          </div>
        </div>

        <!-- Projects Table -->
        <div class="card" style="padding:0;overflow:hidden;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Division</th>
                <th>Status</th>
                <th>Budget (₹L)</th>
                <th>Spent</th>
                <th>Budget Util.</th>
                <th>Physical Progress</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              ${PROJECTS.map(p=>{
                const div = DIVISIONS.find(d=>d.id===p.division);
                const buPct = Math.round((p.spent/p.budget)*100);
                const cls   = p.status==='Completed'?'status-completed':p.status==='In Progress'?'status-inprogress':'status-planning';
                const pColor= p.progress>=75?'#10B981':p.progress>=50?'#3B82F6':p.progress>=25?'#F59E0B':'#EF4444';
                const bColor= buPct<=100?'#10B981':'#EF4444';
                return `<tr>
                  <td>
                    <div style="font-weight:600;font-size:13px;max-width:240px;">${p.name}</div>
                    <div style="font-size:11px;color:var(--text-muted);">ID: ${p.id}</div>
                  </td>
                  <td style="font-size:12.5px;">${div?.name||'—'}</td>
                  <td><span class="status-pill ${cls}">${p.status}</span></td>
                  <td style="font-weight:600;">₹${p.budget}L</td>
                  <td style="color:var(--text-secondary);">₹${p.spent}L</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:6px;">
                      <div class="progress-wrap" style="height:5px;width:70px;">
                        <div class="progress-bar" style="width:${Math.min(buPct,100)}%;background:${bColor};height:5px;"></div>
                      </div>
                      <span style="font-size:12px;font-weight:600;color:${bColor};">${buPct}%</span>
                    </div>
                  </td>
                  <td>
                    <div style="display:flex;align-items:center;gap:6px;">
                      <div class="progress-wrap" style="height:5px;width:70px;">
                        <div class="progress-bar" style="width:${p.progress}%;background:${pColor};height:5px;"></div>
                      </div>
                      <span style="font-size:12px;font-weight:600;color:${pColor};">${p.progress}%</span>
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--text-muted);">${p.dueDate}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    },

    afterRender() {
      const { PROJECTS } = window.BB;
      const names = PROJECTS.map(p=>p.name.length>25?p.name.slice(0,23)+'…':p.name);

      // Budget chart
      const bCtx = document.getElementById('chart-budget');
      if(bCtx) new Chart(bCtx, {
        type:'bar', indexAxis:'y',
        data:{ labels:names, datasets:[
          { label:'Budget', data:PROJECTS.map(p=>p.budget), backgroundColor:'rgba(99,102,241,0.3)', borderRadius:4 },
          { label:'Spent',  data:PROJECTS.map(p=>p.spent),  backgroundColor:'rgba(99,102,241,0.75)', borderRadius:4 },
        ]},
        options:{ responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ labels:{color:'#9B9BBF',font:{size:11}} } },
          scales:{ x:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{color:'#9B9BBF'}}, y:{grid:{display:false},ticks:{color:'#9B9BBF',font:{size:10}}} }
        }
      });

      // Progress chart
      const pCtx = document.getElementById('chart-progress');
      if(pCtx) new Chart(pCtx, {
        type:'bar', indexAxis:'y',
        data:{ labels:names, datasets:[{
          label:'Progress %', data:PROJECTS.map(p=>p.progress),
          backgroundColor: PROJECTS.map(p=>p.progress>=75?'rgba(16,185,129,0.75)':p.progress>=50?'rgba(59,130,246,0.75)':'rgba(245,158,11,0.75)'),
          borderRadius:4
        }]},
        options:{ responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ display:false } },
          scales:{ x:{min:0,max:100,grid:{color:'rgba(255,255,255,0.05)'},ticks:{color:'#9B9BBF'}}, y:{grid:{display:false},ticks:{color:'#9B9BBF',font:{size:10}}} }
        }
      });
    },

    _sumCard(icon, label, val, sub, bg) {
      return `<div class="stat-card" style="--stat-bg:${bg};--stat-accent:${bg};">
        <div class="stat-icon" style="background:${bg}">${icon}</div>
        <div class="stat-body">
          <div class="stat-value">${val}</div>
          <div class="stat-label">${label}</div>
          ${sub?`<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${sub}</div>`:''}
        </div>
      </div>`;
    }
  };
})();
