// src/data/mockData.js

export const usersModel = [
  // ADMIN
  { id: 'ADM-01', name: 'Neeraj Singh', role: 'Admin', email: 'neeraj@worktrack.com', avatar: 'https://ui-avatars.com/api/?name=Neeraj+Singh&background=0F172A&color=EAB308' },
  
  // MANAGERS
  { id: 'MGR-01', name: 'Rajiv Kumar', role: 'Manager', division: 'Engineering', email: 'rajiv@worktrack.com', experience: '8 Years', avatar: 'https://ui-avatars.com/api/?name=Rajiv+Kumar&background=334155&color=F8FAFC' },
  { id: 'MGR-02', name: 'Priya Sharma', role: 'Manager', division: 'Marketing', email: 'priya@worktrack.com', experience: '6 Years', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=334155&color=F8FAFC' },
  { id: 'MGR-03', name: 'Amit Patel', role: 'Manager', division: 'Sales', email: 'amit@worktrack.com', experience: '10 Years', avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=334155&color=F8FAFC' },

  // EMPLOYEES (Under Rajiv - Engineering)
  { id: 'EMP-01', name: 'Rahul Dev', role: 'Employee', title: 'Senior Dev', managerId: 'MGR-01', email: 'rahul@worktrack.com', experience: '4 Years', avatar: 'https://ui-avatars.com/api/?name=Rahul+Dev&background=1E293B&color=EAB308' },
  { id: 'EMP-02', name: 'Sneha Gupta', role: 'Employee', title: 'QA Engineer', managerId: 'MGR-01', email: 'sneha@worktrack.com', experience: '2 Years', avatar: 'https://ui-avatars.com/api/?name=Sneha+Gupta&background=1E293B&color=EAB308' },
  { id: 'EMP-03', name: 'Vikram Singh', role: 'Employee', title: 'Backend Dev', managerId: 'MGR-01', email: 'vikram@worktrack.com', experience: '5 Years', avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=1E293B&color=EAB308' },
  { id: 'EMP-04', name: 'Anjali Verma', role: 'Employee', title: 'Frontend Dev', managerId: 'MGR-01', email: 'anjali@worktrack.com', experience: '3 Years', avatar: 'https://ui-avatars.com/api/?name=Anjali+Verma&background=1E293B&color=EAB308' },
  { id: 'EMP-05', name: 'Rohit Mehta', role: 'Employee', title: 'DevOps', managerId: 'MGR-01', email: 'rohit@worktrack.com', experience: '4 Years', avatar: 'https://ui-avatars.com/api/?name=Rohit+Mehta&background=1E293B&color=EAB308' },

  // EMPLOYEES (Under Priya - Marketing)
  { id: 'EMP-06', name: 'Karthik Nair', role: 'Employee', title: 'SEO Specialist', managerId: 'MGR-02', email: 'karthik@worktrack.com', experience: '3 Years', avatar: 'https://ui-avatars.com/api/?name=Karthik+Nair&background=1E293B&color=3B82F6' },
  { id: 'EMP-07', name: 'Neha Chawla', role: 'Employee', title: 'Content Writer', managerId: 'MGR-02', email: 'neha@worktrack.com', experience: '2 Years', avatar: 'https://ui-avatars.com/api/?name=Neha+Chawla&background=1E293B&color=3B82F6' },
  { id: 'EMP-08', name: 'Aditya Rao', role: 'Employee', title: 'Designer', managerId: 'MGR-02', email: 'aditya@worktrack.com', experience: '5 Years', avatar: 'https://ui-avatars.com/api/?name=Aditya+Rao&background=1E293B&color=3B82F6' },
  { id: 'EMP-09', name: 'Megha Iyer', role: 'Employee', title: 'Ad Manager', managerId: 'MGR-02', email: 'megha@worktrack.com', experience: '4 Years', avatar: 'https://ui-avatars.com/api/?name=Megha+Iyer&background=1E293B&color=3B82F6' },
  { id: 'EMP-10', name: 'Siddharth Jain', role: 'Employee', title: 'Analyst', managerId: 'MGR-02', email: 'siddharth@worktrack.com', experience: '1 Year', avatar: 'https://ui-avatars.com/api/?name=Siddharth+Jain&background=1E293B&color=3B82F6' },

  // EMPLOYEES (Under Amit - Sales)
  { id: 'EMP-11', name: 'Ravi Teja', role: 'Employee', title: 'Enterprise Sales', managerId: 'MGR-03', email: 'ravi@worktrack.com', experience: '6 Years', avatar: 'https://ui-avatars.com/api/?name=Ravi+Teja&background=1E293B&color=22C55E' },
  { id: 'EMP-12', name: 'Pooja Reddy', role: 'Employee', title: 'Account Executive', managerId: 'MGR-03', email: 'pooja@worktrack.com', experience: '4 Years', avatar: 'https://ui-avatars.com/api/?name=Pooja+Reddy&background=1E293B&color=22C55E' },
  { id: 'EMP-13', name: 'Sanjay Dutt', role: 'Employee', title: 'SDR', managerId: 'MGR-03', email: 'sanjay@worktrack.com', experience: '2 Years', avatar: 'https://ui-avatars.com/api/?name=Sanjay+Dutt&background=1E293B&color=22C55E' },
  { id: 'EMP-14', name: 'Arjun Das', role: 'Employee', title: 'SDR', managerId: 'MGR-03', email: 'arjun@worktrack.com', experience: '1 Year', avatar: 'https://ui-avatars.com/api/?name=Arjun+Das&background=1E293B&color=22C55E' },
  { id: 'EMP-15', name: 'Divya Desai', role: 'Employee', title: 'Client Success', managerId: 'MGR-03', email: 'divya@worktrack.com', experience: '5 Years', avatar: 'https://ui-avatars.com/api/?name=Divya+Desai&background=1E293B&color=22C55E' },
];

export const projectsModel = [
  { id: 'PRJ-101', name: 'Q3 Analytics Dashboard v2', managerId: 'MGR-01', status: 'In Progress', progress: 65, dueDate: '2026-10-15', members: ['EMP-01', 'EMP-03', 'EMP-04'] },
  { id: 'PRJ-102', name: 'Database Migration', managerId: 'MGR-01', status: 'Pending', progress: 10, dueDate: '2026-11-20', members: ['EMP-03', 'EMP-05'] },
  { id: 'PRJ-103', name: 'Diwali Ad Campaign', managerId: 'MGR-02', status: 'In Progress', progress: 80, dueDate: '2026-10-30', members: ['EMP-08', 'EMP-09', 'EMP-10'] },
  { id: 'PRJ-104', name: 'Content Strategy 2027', managerId: 'MGR-02', status: 'Pending', progress: 0, dueDate: '2026-12-01', members: ['EMP-06', 'EMP-07'] },
  { id: 'PRJ-105', name: 'Enterprise Lead Gen', managerId: 'MGR-03', status: 'In Progress', progress: 45, dueDate: '2026-11-15', members: ['EMP-11', 'EMP-13'] },
];

export const tasksModel = [
  // Under PRJ-101 (Engineering)
  { id: 'TSK-001', projectId: 'PRJ-101', title: 'Implement UI components', assignee: 'EMP-04', status: 'In Progress', priority: 'High', dueDate: '2026-09-25' },
  { id: 'TSK-002', projectId: 'PRJ-101', title: 'Setup GraphQL server', assignee: 'EMP-03', status: 'Completed', priority: 'High', dueDate: '2026-09-10' },
  { id: 'TSK-003', projectId: 'PRJ-101', title: 'Review API payload structure', assignee: 'EMP-01', status: 'Pending', priority: 'Medium', dueDate: '2026-09-28' },
];

export const notificationsModel = [
  { id: 'NOTIF-1', userId: 'EMP-04', message: 'You were assigned a new task: "Implement UI components".', type: 'assignment', read: false, date: '2026-09-20' },
  { id: 'NOTIF-2', userId: 'MGR-01', message: 'Vikram Singh completed task "Setup GraphQL server".', type: 'update', read: false, date: '2026-09-10' },
];

// Mock Chart data for Productivity
export const monthlyProductivityModel = [
  { name: 'Jan', global: 45, 'MGR-01': 12, 'MGR-02': 20, 'MGR-03': 13 },
  { name: 'Feb', global: 52, 'MGR-01': 18, 'MGR-02': 18, 'MGR-03': 16 },
  { name: 'Mar', global: 61, 'MGR-01': 22, 'MGR-02': 21, 'MGR-03': 18 },
  { name: 'Apr', global: 58, 'MGR-01': 19, 'MGR-02': 24, 'MGR-03': 15 },
  { name: 'May', global: 70, 'MGR-01': 30, 'MGR-02': 22, 'MGR-03': 18 },
  { name: 'Jun', global: 85, 'MGR-01': 35, 'MGR-02': 28, 'MGR-03': 22 },
  { name: 'Jul', global: 73, 'MGR-01': 28, 'MGR-02': 25, 'MGR-03': 20 },
];

export const weeklyProductivityModel = [
  { name: 'Week 1', global: 12, 'MGR-01': 4, 'MGR-02': 5, 'MGR-03': 3 },
  { name: 'Week 2', global: 19, 'MGR-01': 7, 'MGR-02': 8, 'MGR-03': 4 },
  { name: 'Week 3', global: 25, 'MGR-01': 10, 'MGR-02': 9, 'MGR-03': 6 },
  { name: 'Week 4', global: 22, 'MGR-01': 8, 'MGR-02': 8, 'MGR-03': 6 },
];
