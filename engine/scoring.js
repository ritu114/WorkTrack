// ============================================================
//  BRAHMAPUTRA BOARD — Scoring Engine
// ============================================================

(function () {
  const { HQ_KPIS, FIELD_KPIS, MONTHS, EMPLOYEES, DIVISIONS } = window.BB;

  /**
   * Normalise a raw KPI value to 0–100 based on benchmark and direction.
   */
  function normalise(kpi, rawValue) {
    if (kpi.higherIsBetter === false) {
      // Lower is better (e.g. turnaround time)
      const best = 1, worst = 7;
      return Math.max(0, Math.min(100, ((worst - rawValue) / (worst - best)) * 100));
    }
    // Higher is better — data is already 0-100 for % values or 0-10 for /10
    if (kpi.unit === '/10') return Math.max(0, Math.min(100, rawValue * 10));
    return Math.max(0, Math.min(100, rawValue));
  }

  /**
   * Compute weighted score for an employee on a given month index (0-5).
   * Returns 0–100.
   */
  function calculateWeightedScore(employee, monthIdx = 5) {
    const kpis  = employee.type === 'HQ' ? HQ_KPIS : FIELD_KPIS;
    const raw   = employee.scores[monthIdx];
    let total   = 0;
    let totalW  = 0;

    kpis.forEach(k => {
      const norm = normalise(k, raw[k.id]);
      total  += norm * k.weight;
      totalW += k.weight;
    });

    return +(total / totalW).toFixed(1);
  }

  /** Return 6-month series of weighted scores for an employee. */
  function getScoreSeries(employee) {
    return MONTHS.map((_, i) => calculateWeightedScore(employee, i));
  }

  /** Get latest (most recent month) score. */
  function getLatestScore(employee) {
    return calculateWeightedScore(employee, MONTHS.length - 1);
  }

  /** Rating label from score */
  function getRating(score) {
    if (score >= 90) return { label: 'Outstanding',   color: '#10B981' };
    if (score >= 75) return { label: 'Very Good',     color: '#3B82F6' };
    if (score >= 60) return { label: 'Good',          color: '#8B5CF6' };
    if (score >= 45) return { label: 'Average',       color: '#F59E0B' };
    return              { label: 'Below Average',    color: '#EF4444' };
  }

  /** KPI breakdown for a specific employee and month */
  function getKPIBreakdown(employee, monthIdx = 5) {
    const kpis = employee.type === 'HQ' ? HQ_KPIS : FIELD_KPIS;
    const raw  = employee.scores[monthIdx];
    return kpis.map(k => ({
      ...k,
      rawValue:      raw[k.id],
      normScore:     +normalise(k, raw[k.id]).toFixed(1),
      contribution:  +( normalise(k, raw[k.id]) * k.weight / 100 ).toFixed(1),
    }));
  }

  /** Organisation-level summary */
  function getOrgSummary() {
    const hqEmps    = EMPLOYEES.filter(e => e.type === 'HQ');
    const fieldEmps = EMPLOYEES.filter(e => e.type === 'Field');
    const avg = arr => +(arr.reduce((s,v)=>s+v,0)/arr.length).toFixed(1);

    const hqScores    = hqEmps.map(e => getLatestScore(e));
    const fieldScores = fieldEmps.map(e => getLatestScore(e));
    const allScores   = EMPLOYEES.map(e => getLatestScore(e));

    return {
      overall:        avg(allScores),
      hqAvg:          avg(hqScores),
      fieldAvg:       avg(fieldScores),
      topPerformers:  [...EMPLOYEES].sort((a,b)=>getLatestScore(b)-getLatestScore(a)).slice(0,5),
      needsAttention: [...EMPLOYEES].sort((a,b)=>getLatestScore(a)-getLatestScore(b)).slice(0,3),
      totalEmployees: EMPLOYEES.length,
      hqCount:        hqEmps.length,
      fieldCount:     fieldEmps.length,
    };
  }

  /** Division-level summary */
  function getDivisionSummaries() {
    return DIVISIONS.map(div => {
      const emps   = EMPLOYEES.filter(e => e.division === div.id);
      const scores = emps.map(e => getLatestScore(e));
      const avg    = scores.length ? +(scores.reduce((s,v)=>s+v,0)/scores.length).toFixed(1) : 0;
      return { ...div, avg, count: emps.length, scores, employees: emps };
    });
  }

  /** Monthly org trend */
  function getOrgTrend() {
    return MONTHS.map((m, i) => {
      const scores = EMPLOYEES.map(e => calculateWeightedScore(e, i));
      return +(scores.reduce((s,v)=>s+v,0)/scores.length).toFixed(1);
    });
  }

  // Expose
  Object.assign(window.BB, {
    calculateWeightedScore,
    getScoreSeries,
    getLatestScore,
    getRating,
    getKPIBreakdown,
    getOrgSummary,
    getDivisionSummaries,
    getOrgTrend,
  });
})();
