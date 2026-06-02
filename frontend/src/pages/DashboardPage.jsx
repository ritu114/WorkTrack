import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/ui';

// Import dashboards
import AdminDashboard from '../components/dashboards/AdminDashboard';
import ManagerDashboard from '../components/dashboards/ManagerDashboard';
import EmployeeDashboard from '../components/dashboards/EmployeeDashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Universal Greeting Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            Welcome back, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-slate-400">
            {user?.role === 'Admin' ? "Here's an overview of the organization's performance." :
             user?.role === 'Manager' ? "Manage your team's projects and assign tasks." :
             "Here is your personalized performance breakdown."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="primary" className="px-3 py-1 text-sm bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
            Role: {user?.role}
          </Badge>
        </div>
      </div>

      {/* Render Role-Specific Dashboard Component */}
      {user?.role === 'Admin' && <AdminDashboard />}
      {user?.role === 'Manager' && <ManagerDashboard />}
      {user?.role === 'Employee' && <EmployeeDashboard />}
      
    </motion.div>
  );
}
