// ============================================================
//  VIEW: KPI Configuration
// ============================================================
(function() {
  window.BB.views = window.BB.views || {};

  window.BB.views['kpi-config'] = {
    title: 'KPI Configuration',
    _tab: 'hq',

    render() {
      return `
      <div class="animate-fade">
        <div class="page-header">
          <div class="page-header-left">
            <h1>⚙️ KPI Configuration</h1>
            <p>Define and manage Key Performance Indicators and their weightages</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="BB.views['kpi-config']._save()">💾 Save Changes</button>
        </div>

        <div class="tabs" style="max-width:360px;margin-bottom:20px;" id="kpi-tabs">
          <button class="tab-btn active" id="tab-hq" onclick="BB.views['kpi-config']._switchTab('hq')">🏛 HQ KPIs</button>
          <button class="tab-btn" id="tab-field" onclick="BB.views['kpi-config']._switchTab('field')">🏗 Field KPIs</button>
        </div>

        <div id="kpi-tab-hq">${this._renderKPISet('hq')}</div>
        <div id="kpi-tab-field" style="display:none;">${this._renderKPISet('field')}</div>

        <!-- Scoring Formula Explainer -->
        <div class="card" style="margin-top:24px;background:linear-gradient(145deg,rgba(99,102,241,0.08),rgba(20,184,166,0.06));border-color:rgba(99,102,241,0.2);">
          <div class="card-title" style="margin-bottom:12px;">📐 Weighted Scoring Formula</div>
          <div style="font-size:13px;color:var(--text-secondary);line-height:1.8;">
            <strong style="color:var(--brand-primary);">Final Score</strong> = Σ (Normalised KPI Score × Weight%) / 100
            <br><br>
            <strong style="color:var(--text-primary);">Normalisation rules:</strong>
            <ul style="margin-top:6px;padding-left:16px;color:var(--text-muted);">
              <li>For % metrics: raw value maps directly to 0–100</li>
              <li>For /10 metrics: raw value × 10 = normalised score</li>
              <li>For inverse metrics (e.g. Turnaround Time): lower is better, mapped to 0–100 scale</li>
            </ul>
            <br>
            <strong style="color:var(--text-primary);">Rating Scale:</strong>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
              <span class="score-badge score-outstanding">Outstanding ≥ 90</span>
              <span class="score-badge score-verygood">Very Good ≥ 75</span>
              <span class="score-badge score-good">Good ≥ 60</span>
              <span class="score-badge score-average">Average ≥ 45</span>
              <span class="score-badge score-below">Below Average &lt; 45</span>
            </div>
          </div>
        </div>
      </div>`;
    },

    afterRender() {
      this._bindSliders('hq');
      this._bindSliders('field');
    },

    _switchTab(tab) {
      this._tab = tab;
      document.getElementById('kpi-tab-hq').style.display   = tab==='hq'    ? '' : 'none';
      document.getElementById('kpi-tab-field').style.display = tab==='field' ? '' : 'none';
      document.getElementById('tab-hq').classList.toggle('active',   tab==='hq');
      document.getElementById('tab-field').classList.toggle('active', tab==='field');
    },

    _renderKPISet(type) {
      const kpis = type==='hq' ? window.BB.HQ_KPIS : window.BB.FIELD_KPIS;
      const totalW = kpis.reduce((s,k)=>s+k.weight,0);
      return `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div class="card-title">KPI Definitions</div>
          <div style="font-size:12px;color:var(--text-muted);">Total weight: <strong id="${type}-total-w" style="color:${totalW===100?'var(--brand-success)':'var(--brand-warning)'};">${totalW}%</strong> <span style="font-size:10px;">(must = 100%)</span></div>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>KPI Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Benchmark</th>
              <th>Weight (%)</th>
              <th>Adjust</th>
            </tr>
          </thead>
          <tbody>
            ${kpis.map((k,i)=>`<tr>
              <td style="color:var(--text-muted);">${i+1}</td>
              <td style="font-weight:600;">${k.name}</td>
              <td><span class="type-badge type-${k.category==='quantitative'?'field':'hq'}">${k.category}</span></td>
              <td style="color:var(--text-muted);">${k.unit}</td>
              <td style="color:var(--brand-secondary);">${k.benchmark}${k.unit}</td>
              <td>
                <strong id="${type}-w-${k.id}" style="font-size:15px;color:var(--brand-primary);">${k.weight}%</strong>
              </td>
              <td style="min-width:140px;">
                <input type="range" min="0" max="50" value="${k.weight}"
                  class="kpi-slider" id="slider-${type}-${k.id}"
                  data-type="${type}" data-id="${k.id}"
                  oninput="BB.views['kpi-config']._onSlider('${type}','${k.id}',this.value)">
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
    },

    _bindSliders(type) { /* sliders already bound inline */ },

    _onSlider(type, id, val) {
      const kpis = type==='hq' ? window.BB.HQ_KPIS : window.BB.FIELD_KPIS;
      const kpi = kpis.find(k=>k.id===id);
      if(kpi) kpi.weight = +val;
      const wEl = document.getElementById(`${type}-w-${id}`);
      if(wEl) wEl.textContent = val+'%';
      const totalW = kpis.reduce((s,k)=>s+k.weight,0);
      const totEl = document.getElementById(`${type}-total-w`);
      if(totEl) { totEl.textContent = totalW+'%'; totEl.style.color = totalW===100?'var(--brand-success)':'var(--brand-warning)'; }
    },

    _save() {
      const { HQ_KPIS, FIELD_KPIS } = window.BB;
      const hqTotal = HQ_KPIS.reduce((s,k)=>s+k.weight,0);
      const fTotal  = FIELD_KPIS.reduce((s,k)=>s+k.weight,0);
      if(hqTotal!==100||fTotal!==100) {
        alert('⚠️ Weights must sum to exactly 100% for both HQ and Field KPIs.\nHQ: '+hqTotal+'  Field: '+fTotal);
        return;
      }
      alert('✅ KPI configuration saved successfully!');
    }
  };
})();
