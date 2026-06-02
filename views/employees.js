// ============================================================
//  VIEW: Employees List
// ============================================================
(function() {
  window.BB.views = window.BB.views || {};

  window.BB.views.employees = {
    title: 'Employees',
    _filter: { q: '', type: 'all', div: 'all', rating: 'all' },

    render() {
      const { DIVISIONS } = window.BB;
      return `
      <div class="animate-fade">
        <div class="page-header">
          <div class="page-header-left">
            <h1>👷 Employee Directory</h1>
            <p>Search, filter and view individual KPI performance</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="BB.navigate('employee-detail','new')">＋ Add Employee</button>
        </div>

        <!-- Filters -->
        <div class="card" style="margin-bottom:20px;padding:14px 20px;">
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
            <div class="search-wrap" style="max-width:300px;flex:1;">
              <span class="search-icon">🔍</span>
              <input id="emp-search" type="text" class="form-input" placeholder="Search by name, role…" oninput="BB.views.employees._onSearch(this.value)">
            </div>
            <select class="form-select" style="width:auto;" id="emp-type" onchange="BB.views.employees._onFilter('type',this.value)">
              <option value="all">All Types</option>
              <option value="HQ">HQ</option>
              <option value="Field">Field</option>
            </select>
            <select class="form-select" style="width:auto;" id="emp-div" onchange="BB.views.employees._onFilter('div',this.value)">
              <option value="all">All Divisions</option>
              ${DIVISIONS.map(d=>`<option value="${d.id}">${d.name}</option>`).join('')}
            </select>
            <select class="form-select" style="width:auto;" id="emp-rating" onchange="BB.views.employees._onFilter('rating',this.value)">
              <option value="all">All Ratings</option>
              <option value="Outstanding">Outstanding</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Below Average">Below Average</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="card" style="padding:0;overflow:hidden;">
          <div id="emp-table-wrap"></div>
        </div>
      </div>`;
    },

    afterRender() {
      this._filter = { q: '', type: 'all', div: 'all', rating: 'all' };
      this._renderTable();
    },

    _onSearch(q) { this._filter.q = q.toLowerCase(); this._renderTable(); },
    _onFilter(key, val) { this._filter[key] = val; this._renderTable(); },

    _renderTable() {
      const { EMPLOYEES, DIVISIONS, getLatestScore, getRating } = window.BB;
      const { q, type, div, rating } = this._filter;

      let list = EMPLOYEES.filter(e => {
        if(type !== 'all' && e.type !== type) return false;
        if(div  !== 'all' && e.division !== div) return false;
        const s = getLatestScore(e);
        const r = getRating(s).label;
        if(rating !== 'all' && r !== rating) return false;
        if(q && !e.name.toLowerCase().includes(q) && !e.role.toLowerCase().includes(q)) return false;
        return true;
      });

      const el = document.getElementById('emp-table-wrap');
      if(!el) return;

      if(!list.length) {
        el.innerHTML = `<div class="empty-state"><div class="empty-icon">👤</div><h3>No employees found</h3><p>Adjust your filters or search query</p></div>`;
        return;
      }

      el.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Division</th>
            <th>Type</th>
            <th>Role</th>
            <th>Score (Latest)</th>
            <th>6-Mo Trend</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(e => {
            const s = getLatestScore(e);
            const r = getRating(s);
            const rc = r.label.toLowerCase().replace(' ','');
            const divInfo = DIVISIONS.find(d=>d.id===e.division);
            const series = window.BB.getScoreSeries(e);
            const sparkId = 'spark-'+e.id;
            return `<tr onclick="BB.navigate('employee-detail','${e.id}')">
              <td>
                <div style="display:flex;align-items:center;gap:10px;">
                  <div class="avatar avatar-md" style="background:${this._color(e.name)}">${e.name[0]}</div>
                  <div>
                    <div style="font-weight:600;font-size:13px;">${e.name}</div>
                    <div style="font-size:11px;color:var(--text-muted);">ID: ${e.id}</div>
                  </div>
                </div>
              </td>
              <td style="font-size:12.5px;">${divInfo?.name||'—'}</td>
              <td><span class="type-badge type-${e.type.toLowerCase()}">${e.type}</span></td>
              <td style="font-size:12.5px;color:var(--text-secondary);">${e.role}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div style="width:60px;">
                    <div class="progress-wrap" style="height:5px;">
                      <div class="progress-bar" style="width:${s}%;background:${r.color};height:5px;"></div>
                    </div>
                  </div>
                  <span style="font-weight:700;font-size:13px;">${s}</span>
                </div>
              </td>
              <td><canvas id="${sparkId}" width="80" height="32"></canvas></td>
              <td><span class="score-badge score-${rc}">${r.label}</span></td>
              <td><button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();BB.navigate('employee-detail','${e.id}')">View →</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>`;

      // Draw sparklines
      setTimeout(() => {
        list.forEach(e => {
          const series = window.BB.getScoreSeries(e);
          const r = window.BB.getRating(window.BB.getLatestScore(e));
          const c = document.getElementById('spark-'+e.id);
          if(!c) return;
          const ctx = c.getContext('2d');
          const w=80, h=32, mn=Math.min(...series)-5, mx=Math.max(...series)+5;
          const pts = series.map((v,i)=>({ x: (i/(series.length-1))*w, y: h - ((v-mn)/(mx-mn))*h }));
          ctx.strokeStyle = r.color; ctx.lineWidth = 2; ctx.lineJoin = 'round';
          ctx.beginPath(); pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)); ctx.stroke();
          ctx.fillStyle = r.color; const last=pts[pts.length-1]; ctx.beginPath(); ctx.arc(last.x,last.y,3,0,Math.PI*2); ctx.fill();
        });
      }, 50);
    },

    _color(name) {
      const c=['#6366F1','#14B8A6','#F59E0B','#EF4444','#8B5CF6','#3B82F6','#EC4899'];
      let h=0; for(let ch of name) h=(h*31+ch.charCodeAt(0))%c.length;
      return c[Math.abs(h)];
    }
  };
})();
