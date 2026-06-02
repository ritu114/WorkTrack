// ============================================================
//  BRAHMAPUTRA BOARD — Mock Data Layer
// ============================================================

const MONTHS = ['Oct 2024','Nov 2024','Dec 2024','Jan 2025','Feb 2025','Mar 2025'];

const DIVISIONS = [
  { id: 'hq',      name: 'Headquarters',         type: 'HQ',    location: 'Guwahati' },
  { id: 'div-1',   name: 'Brahmaputra Division',  type: 'Field', location: 'Dibrugarh' },
  { id: 'div-2',   name: 'Barak Valley Division', type: 'Field', location: 'Silchar' },
  { id: 'div-3',   name: 'North Bank Division',   type: 'Field', location: 'Tezpur' },
  { id: 'div-4',   name: 'South Bank Division',   type: 'Field', location: 'Jorhat' },
];

const ROLES = {
  HQ: [
    'Under Secretary',
    'Section Officer',
    'Assistant Director',
    'Stenographer',
    'Upper Division Clerk',
  ],
  Field: [
    'Executive Engineer',
    'Assistant Executive Engineer',
    'Sub-Divisional Officer',
    'Junior Engineer',
    'Survey Officer',
  ],
};

// HQ KPI Definitions
const HQ_KPIS = [
  { id: 'hq1', name: 'File Disposal Rate',        weight: 25, unit: '%',      category: 'quantitative', benchmark: 90 },
  { id: 'hq2', name: 'Turnaround Time',            weight: 20, unit: 'days',   category: 'quantitative', benchmark: 2 , higherIsBetter: false },
  { id: 'hq3', name: 'Drafting Quality Score',     weight: 20, unit: '/10',    category: 'qualitative',  benchmark: 8 },
  { id: 'hq4', name: 'Digital Adoption Rate',      weight: 15, unit: '%',      category: 'quantitative', benchmark: 85 },
  { id: 'hq5', name: 'Responsiveness Index',       weight: 10, unit: '/10',    category: 'qualitative',  benchmark: 8 },
  { id: 'hq6', name: 'Initiative & Innovation',    weight: 10, unit: '/10',    category: 'qualitative',  benchmark: 7 },
];

// Field KPI Definitions
const FIELD_KPIS = [
  { id: 'f1',  name: 'DPR Preparation Timeliness', weight: 20, unit: '%',    category: 'quantitative', benchmark: 90 },
  { id: 'f2',  name: 'Survey Accuracy',             weight: 15, unit: '%',    category: 'quantitative', benchmark: 95 },
  { id: 'f3',  name: 'Project Timeline Adherence',  weight: 20, unit: '%',    category: 'quantitative', benchmark: 85 },
  { id: 'f4',  name: 'Budget Utilization',          weight: 15, unit: '%',    category: 'quantitative', benchmark: 90 },
  { id: 'f5',  name: 'Physical Progress',           weight: 15, unit: '%',    category: 'quantitative', benchmark: 80 },
  { id: 'f6',  name: 'Technical Compliance',        weight: 10, unit: '/10',  category: 'qualitative',  benchmark: 9 },
  { id: 'f7',  name: 'Teamwork & Leadership',       weight:  5, unit: '/10',  category: 'qualitative',  benchmark: 8 },
];

function rand(min, max) { return +(Math.random() * (max - min) + min).toFixed(1); }
function randInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

function genHQScores() {
  return MONTHS.map(() => ({
    hq1: rand(60, 100),
    hq2: rand(1, 5),
    hq3: rand(5, 10),
    hq4: rand(55, 100),
    hq5: rand(5, 10),
    hq6: rand(5, 10),
  }));
}

function genFieldScores() {
  return MONTHS.map(() => ({
    f1: rand(60, 100),
    f2: rand(70, 100),
    f3: rand(55, 100),
    f4: rand(60, 100),
    f5: rand(50, 100),
    f6: rand(6, 10),
    f7: rand(6, 10),
  }));
}

const EMPLOYEES = [
  // --- HQ ---
  { id: 'E001', name: 'Rajiv Kumar Sharma',    photo: null, role: 'Under Secretary',         division: 'hq', type: 'HQ', email: 'rajiv.sharma@brahmaputraboard.in',  joinYear: 2008, scores: genHQScores() },
  { id: 'E002', name: 'Priya Devi Borthakur',  photo: null, role: 'Section Officer',          division: 'hq', type: 'HQ', email: 'priya.borthakur@brahmaputraboard.in', joinYear: 2012, scores: genHQScores() },
  { id: 'E003', name: 'Amit Gogoi',            photo: null, role: 'Assistant Director',       division: 'hq', type: 'HQ', email: 'amit.gogoi@brahmaputraboard.in',     joinYear: 2015, scores: genHQScores() },
  { id: 'E004', name: 'Sunita Das',            photo: null, role: 'Section Officer',          division: 'hq', type: 'HQ', email: 'sunita.das@brahmaputraboard.in',      joinYear: 2016, scores: genHQScores() },
  { id: 'E005', name: 'Deepak Nath',           photo: null, role: 'Upper Division Clerk',     division: 'hq', type: 'HQ', email: 'deepak.nath@brahmaputraboard.in',     joinYear: 2018, scores: genHQScores() },
  { id: 'E006', name: 'Meenakshi Hazarika',    photo: null, role: 'Stenographer',             division: 'hq', type: 'HQ', email: 'meenakshi.h@brahmaputraboard.in',    joinYear: 2019, scores: genHQScores() },

  // --- Brahmaputra Division ---
  { id: 'E007', name: 'Dinesh Barua',          photo: null, role: 'Executive Engineer',       division: 'div-1', type: 'Field', email: 'dinesh.barua@brahmaputraboard.in',   joinYear: 2007, scores: genFieldScores() },
  { id: 'E008', name: 'Rekha Phukan',          photo: null, role: 'AEE',                      division: 'div-1', type: 'Field', email: 'rekha.phukan@brahmaputraboard.in',   joinYear: 2011, scores: genFieldScores() },
  { id: 'E009', name: 'Anupam Kalita',         photo: null, role: 'Sub-Divisional Officer',   division: 'div-1', type: 'Field', email: 'anupam.kalita@brahmaputraboard.in',  joinYear: 2014, scores: genFieldScores() },
  { id: 'E010', name: 'Bimal Chetia',          photo: null, role: 'Junior Engineer',          division: 'div-1', type: 'Field', email: 'bimal.chetia@brahmaputraboard.in',   joinYear: 2017, scores: genFieldScores() },

  // --- Barak Valley Division ---
  { id: 'E011', name: 'Lalitha Roy',           photo: null, role: 'Executive Engineer',       division: 'div-2', type: 'Field', email: 'lalitha.roy@brahmaputraboard.in',    joinYear: 2009, scores: genFieldScores() },
  { id: 'E012', name: 'Sachin Deb',            photo: null, role: 'AEE',                      division: 'div-2', type: 'Field', email: 'sachin.deb@brahmaputraboard.in',     joinYear: 2013, scores: genFieldScores() },
  { id: 'E013', name: 'Prerna Singha',         photo: null, role: 'Survey Officer',           division: 'div-2', type: 'Field', email: 'prerna.singha@brahmaputraboard.in',  joinYear: 2016, scores: genFieldScores() },
  { id: 'E014', name: 'Ravi Kumar Tiwari',     photo: null, role: 'Junior Engineer',          division: 'div-2', type: 'Field', email: 'ravi.tiwari@brahmaputraboard.in',    joinYear: 2020, scores: genFieldScores() },

  // --- North Bank Division ---
  { id: 'E015', name: 'Hemanta Buragohain',    photo: null, role: 'Executive Engineer',       division: 'div-3', type: 'Field', email: 'hemanta.b@brahmaputraboard.in',     joinYear: 2006, scores: genFieldScores() },
  { id: 'E016', name: 'Anjali Medhi',          photo: null, role: 'Sub-Divisional Officer',   division: 'div-3', type: 'Field', email: 'anjali.medhi@brahmaputraboard.in',   joinYear: 2014, scores: genFieldScores() },
  { id: 'E017', name: 'Pranab Das',            photo: null, role: 'Junior Engineer',          division: 'div-3', type: 'Field', email: 'pranab.das@brahmaputraboard.in',     joinYear: 2019, scores: genFieldScores() },

  // --- South Bank Division ---
  { id: 'E018', name: 'Suresh Borah',          photo: null, role: 'Executive Engineer',       division: 'div-4', type: 'Field', email: 'suresh.borah@brahmaputraboard.in',   joinYear: 2010, scores: genFieldScores() },
  { id: 'E019', name: 'Nilima Saikia',         photo: null, role: 'AEE',                      division: 'div-4', type: 'Field', email: 'nilima.saikia@brahmaputraboard.in',  joinYear: 2015, scores: genFieldScores() },
  { id: 'E020', name: 'Kamal Boruah',          photo: null, role: 'Survey Officer',           division: 'div-4', type: 'Field', email: 'kamal.boruah@brahmaputraboard.in',   joinYear: 2018, scores: genFieldScores() },
  { id: 'E021', name: 'Puja Tamuli',           photo: null, role: 'Junior Engineer',          division: 'div-4', type: 'Field', email: 'puja.tamuli@brahmaputraboard.in',    joinYear: 2022, scores: genFieldScores() },
];

const PROJECTS = [
  { id: 'P001', name: 'Brahmaputra Embankment Strengthening Phase III', division: 'div-1', status: 'In Progress', budget: 1250, spent: 880, progress: 72, dueDate: '2025-06-30' },
  { id: 'P002', name: 'Anti-Erosion Works — Majuli Island',             division: 'div-1', status: 'In Progress', budget: 680,  spent: 310, progress: 45, dueDate: '2025-09-30' },
  { id: 'P003', name: 'Barak Flood Management DPR',                     division: 'div-2', status: 'Planning',    budget: 340,  spent: 40,  progress: 12, dueDate: '2025-03-31' },
  { id: 'P004', name: 'North Bank Survey & Master Plan',                 division: 'div-3', status: 'In Progress', budget: 520,  spent: 290, progress: 56, dueDate: '2025-08-15' },
  { id: 'P005', name: 'South Bank Drainage Improvement',                 division: 'div-4', status: 'Completed',   budget: 410,  spent: 398, progress: 100,dueDate: '2024-12-31' },
  { id: 'P006', name: 'Brahmaputra Bandh Renovation — Jorhat',          division: 'div-4', status: 'In Progress', budget: 890,  spent: 540, progress: 61, dueDate: '2025-11-30' },
  { id: 'P007', name: 'Tezpur Town Protection Works',                   division: 'div-3', status: 'In Progress', budget: 730,  spent: 200, progress: 28, dueDate: '2026-02-28' },
];

const NOTICES = [
  { id: 'N001', date: '2025-03-28', title: 'Q1 KPI Review scheduled for April 5, 2025', type: 'info' },
  { id: 'N002', date: '2025-03-20', title: 'Annual Performance Appraisal window opens April 1–30', type: 'warning' },
  { id: 'N003', date: '2025-03-15', title: 'New DPR submission guidelines effective from April 1', type: 'success' },
  { id: 'N004', date: '2025-03-10', title: 'Training programme on e-Office for field staff — April 12', type: 'info' },
];

// Auth Users
const AUTH_USERS = [
  { id: 'U-ADM', name: 'Administrator',       role: 'admin',    employeeId: null,   password: 'admin123' },
  { id: 'U-MGR', name: 'Rajiv Kumar Sharma',  role: 'manager',  employeeId: 'E001', password: 'manager123' },
  { id: 'U-EMP', name: 'Dinesh Barua',        role: 'employee', employeeId: 'E007', password: 'emp123' },
];

// Expose
window.BB = window.BB || {};
Object.assign(window.BB, {
  MONTHS, DIVISIONS, ROLES, HQ_KPIS, FIELD_KPIS, EMPLOYEES, PROJECTS, NOTICES, AUTH_USERS
});
