// ============================================================
//  VIEW: Employee Detail
// ============================================================
(function() {
  window.BB.views = window.BB.views || {};

  window.BB.views['employee-detail'] = {
    title: 'Employee Profile',
    _empId: null,

    render(params) {
      this._empId = params;
      const { EMPLOYEES, DIVISIONS, MONTHS, getLatestScore, getRating, getKPIBreakdown, getScoreSeries } = window.BB;
      const emp = EMPLOYEES.find(e=>e.id===params);
      if(!emp) return `<div class="empty-state"><div class="empty-icon">❌</div><h3>Employee not found</h3><p>ID: ${params}</p></div>`;

      const div    = DIVISIONS.find(d=>d.id===emp.division);
      const score  = getLatestScore(emp);
      const rating = getRating(score);
      const rc     = rating.label.toLowerCase().replace(' ','');
      const series = getScoreSeries(emp);
      const kpis   = getKPIBreakdown(emp, MONTHS.length-1);
      const color  = this._color(emp.name);

      return `
      <div class="animate-fade">
        <!-- Back -->
        <button class="btn btn-ghost btn-sm" onclick="BB.navigate('employees')" style="margin-bottom:16px;">← Back to Employees</button>

        <!-- Profile Header -->
        <div class="card" style="margin-bottom:20px;background: linear-gradient(145deg, var(--bg-card), var(--bg-elevated));">
          <div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap;">
            <div class="avatar avatar-xl" style="background:${color};box-shadow:0 0 24px ${color}66;">${emp.name[0]}</div>
            <div style="flex:1;">
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px;">
                <h2 style="font-size:22px;font-weight:800;">${emp.name}</h2>
                <span class="type-badge type-${emp.type.toLowerCase()}">${emp.type}</span>
                <span class="score-badge score-${rc}">${rating.label}</span>
              </div>
              <div style="font-size:14px;color:var(--text-secondary);margin-bottom:4px;">🎖️ ${emp.role}</div>
              <div style="font-size:13px;color:var(--text-muted);">📍 ${div?.name||'—'} • ${div?.location||'—'}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">📧 ${emp.email} &nbsp;|&nbsp; 🗓️ Joined ${emp.joinYear} &nbsp;|&nbsp; ID: ${emp.id}</div>
            </div>
            <div style="text-align:center;min-width:100px;">
              <svg class="score-ring" width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="8"/>
                <circle cx="50" cy="50" r="42" fill="none" stroke="${rating.color}" stroke-width="8"
                  stroke-dasharray="${2*Math.PI*42}" stroke-dashoffset="${2*Math.PI*42*(1-score/100)}"
                  stroke-linecap="round" transform="rotate(-90 50 50)" style="transition:stroke-dashoffset 1s ease;"/>
                <text x="50" y="45" text-anchor="middle" fill="${rating.color}" font-size="20" font-weight="800" font-family="Plus Jakarta Sans,sans-serif">${score}</text>
                <text x="50" y="62" text-anchor="middle" fill="#9B9BBF" font-size="9" font-family="Inter,sans-serif">/ 100</text>
              </svg>
              <div style="font-size:11px;color:var(--text-muted);">Overall Score</div>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-2" style="margin-bottom:20px;">
          <div class="card">
            <div class="card-header"><div class="card-title">📈 6-Month Score Trend</div></div>
            <div class="chart-container" style="height:200px;"><canvas id="chart-emp-trend"></canvas></div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-title">🕸️ KPI Dimension Radar</div></div>
            <div class="chart-container" style="height:200px;"><canvas id="chart-emp-radar"></canvas></div>
          </div>
        </div>

        <!-- KPI Breakdown Table -->
        <div class="card" style="margin-bottom:20px;">
          <div class="card-header">
            <div class="card-title">📋 KPI Breakdown — ${MONTHS[MONTHS.length-1]}</div>
            <select class="form-select" style="width:auto;" id="kpi-month-sel" onchange="BB.views['employee-detail']._onMonthChange(this.value,'${emp.id}')">
              ${MONTHS.map((m,i)=>`<option value="${i}" ${i===MONTHS.length-1?'selected':''}>${m}</option>`).join('')}
            </select>
          </div>
          <div id="kpi-breakdown-table">${this._renderKPITable(kpis)}</div>
        </div>

        <!-- Performance History -->
        <div class="card">
          <div class="card-header"><div class="card-title">📅 Monthly Score History</div></div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            ${series.map((s,i)=>{
              const r=getRating(s); const rc2=r.label.toLowerCase().replace(' ','');
              return `<div style="text-align:center;background:var(--bg-elevated);border-radius:10px;padding:12px 16px;min-width:100px;flex:1;">
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">${MONTHS[i]}</div>
                <div style="font-size:22px;font-weight:800;color:${r.color};">${s}</div>
                <span class="score-badge score-${rc2}" style="font-size:10px;">${r.label}</span>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>`;
    },

    afterRender(params) {
      const { EMPLOYEES, MONTHS, getScoreSeries, getKPIBreakdown } = window.BB;
      const emp = EMPLOYEES.find(e=>e.id===params);
      if(!emp) return;

      const series = getScoreSeries(emp);
      const kpis   = getKPIBreakdown(emp, MONTHS.length-1);
      const r      = window.BB.getRating(window.BB.getLatestScore(emp));

      // Trend Chart
      const tCtx = document.getElementById('chart-emp-trend');
      if(tCtx) new Chart(tCtx, {
        type:'line',
        data:{ labels: MONTHS.map(m=>m.split(' ')[0]),
          datasets:[{ label:'Score', data:series, borderColor:r.color, backgroundColor:r.color+'22', fill:true, tension:0.4, pointBackgroundColor:r.color, pointRadius:4 }]
        },
        options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } },
          scales:{ y:{ min:30, max:100, grid:{color:'rgba(255,255,255,0.05)'}, ticks:{color:'#9B9BBF'} }, x:{ grid:{display:false}, ticks:{color:'#9B9BBF'} } }
        }
      });

      // Radar Chart
      const rCtx = document.getElementById('chart-emp-radar');
      if(rCtx) new Chart(rCtx, {
        type:'radar',
        data:{
          labels: kpis.map(k=>k.name.length>16?k.name.slice(0,14)+'…':k.name),
          datasets:[{ label:'Score', data:kpis.map(k=>k.normScore),
            borderColor:r.color, backgroundColor:r.color+'25', pointBackgroundColor:r.color, pointRadius:3 }]
        },
        options:{ responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ display:false } },
          scales:{ r:{ min:0, max:100, ticks:{ color:'#9B9BBF', font:{size:9}, backdropColor:'transparent' }, grid:{color:'rgba(255,255,255,0.1)'}, pointLabels:{color:'#9B9BBF', font:{size:10}} } }
        }
      });
    },

    _onMonthChange(monthIdx, empId) {
      const { EMPLOYEES, getKPIBreakdown } = window.BB;
      const emp = EMPLOYEES.find(e=>e.id===empId);
      if(!emp) return;
      const kpis = getKPIBreakdown(emp, +monthIdx);
      const el = document.getElementById('kpi-breakdown-table');
      if(el) el.innerHTML = this._renderKPITable(kpis);
    },

    _renderKPITable(kpis) {
      return `<table class="data-table">
        <thead><tr><th>KPI Name</th><th>Category</th><th>Weight</th><th>Raw Value</th><th>Normalised (0-100)</th><th>Contribution</th></tr></thead>
        <tbody>
          ${kpis.map(k=>{
            const color = k.normScore>=75?'#10B981':k.normScore>=60?'#6366F1':k.normScore>=45?'#F59E0B':'#EF4444';
            return `<tr>
              <td style="font-weight:600;">${k.name}</td>
              <td><span class="type-badge type-${k.category==='quantitative'?'field':'hq'}" style="font-size:10px;">${k.category}</span></td>
              <td>${k.weight}%</td>
              <td>${k.rawValue} ${k.unit}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div class="progress-wrap" style="height:5px;width:80px;">
                    <div class="progress-bar" style="width:${k.normScore}%;background:${color};height:5px;"></div>
                  </div>
                  <span style="font-weight:600;color:${color};">${k.normScore}</span>
                </div>
              </td>
              <td style="font-weight:600;font-size:13px;">${k.contribution}</td>
            </tr>`;
          }).join('')}
          <tr style="background:var(--bg-elevated);">
            <td colspan="5" style="font-weight:700;text-align:right;">Total Score</td>
            <td style="font-weight:800;font-size:16px;color:var(--brand-primary);">
              ${kpis.reduce((s,k)=>+(s+k.contribution).toFixed(1),0)}
            </td>
          </tr>
        </tbody>
      </table>`;
    },

    _color(name) {
      const c=['#6366F1','#14B8A6','#F59E0B','#EF4444','#8B5CF6','#3B82F6','#EC4899'];
      let h=0; for(let ch of name) h=(h*31+ch.charCodeAt(0))%c.length;
      return c[Math.abs(h)];
    }
  };
})();
