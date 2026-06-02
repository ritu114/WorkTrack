import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import KPIManagementPage from './pages/KPIManagementPage';
import ProjectsPage from './pages/ProjectsPage';
import PerformanceAnalyticsPage from './pages/PerformanceAnalyticsPage';
import GoalsWorkspacePage from './pages/GoalsWorkspacePage';
import ProductivityHubPage from './pages/ProductivityHubPage';

// Simple placeholder page for incomplete routes
const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-slate-400">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>This page is under construction.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/performance" element={<DashboardPage />} />
            <Route path="/team" element={<EmployeesPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/goals" element={<GoalsWorkspacePage />} />
            <Route path="/productivity" element={<ProductivityHubPage />} />
            <Route path="/kpis" element={<KPIManagementPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/reports" element={<PerformanceAnalyticsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
