import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { Users, UserCircle2, FolderKanban, TrendingUp } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AdminDashboard() {
  const { users, projects, monthlyData, weeklyData } = useData();

  const totalEmployees = users.filter(u => u.role === 'Employee').length;
  const totalManagers = users.filter(u => u.role === 'Manager').length;
  const totalProjects = projects.length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-[#1E293B]/80 hover:border-yellow-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalEmployees}</div>
            <p className="text-xs text-slate-500 mt-1">Cross-functional staff</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E293B]/80 hover:border-yellow-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Managers</CardTitle>
            <UserCircle2 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalManagers}</div>
            <p className="text-xs text-slate-500 mt-1">Division Leads</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B]/80 hover:border-yellow-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalProjects}</div>
            <p className="text-xs text-slate-500 mt-1">Active portfolios</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B]/80 hover:border-yellow-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Org Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">92%</div>
            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">+2.4% vs last QTR</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#1E293B]/80 border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white">Global Productivity (Monthly)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="global" name="Total Organization" stroke="#EAB308" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B]/80 border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white">Department Output (Weekly)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff' }} />
                <Legend />
                <Bar dataKey="MGR-01" name="Engineering" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="MGR-02" name="Marketing" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="MGR-03" name="Sales" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
