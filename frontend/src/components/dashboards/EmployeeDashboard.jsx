import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Briefcase, Building2, Calendar, CheckSquare, Clock, ArrowRightCircle, FolderKanban } from 'lucide-react';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const { users, projects, tasks, updateTaskStatus } = useData();

  const myManager = users.find(u => u.id === user.managerId);
  const myProjects = projects.filter(p => p.members.includes(user.id));
  const myTasks = tasks.filter(t => t.assignee === user.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <Badge variant="success">Completed</Badge>;
      case 'In Progress': return <Badge variant="info">In Progress</Badge>;
      default: return <Badge variant="default">Pending</Badge>;
    }
  };

  const handleNextStatus = (taskId, currentStatus) => {
    let nextStatus = 'In Progress';
    if (currentStatus === 'In Progress') nextStatus = 'Completed';
    updateTaskStatus(taskId, nextStatus, user.managerId);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        
        {/* Profile Card */}
        <Card className="col-span-1 border-yellow-500/20 bg-gradient-to-b from-[#1E293B] to-[#0F172A] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <UserIcon className="w-32 h-32 text-yellow-500" />
          </div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex flex-col items-center">
              <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-[#0F172A] shadow-xl" />
              <h2 className="mt-4 text-xl font-bold text-white">{user.name}</h2>
              <Badge variant="primary" className="mt-2 font-semibold">
                {user.title || user.role}
              </Badge>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Briefcase className="w-4 h-4 text-slate-500" />
                <span><strong className="text-white">Experience:</strong> {user.experience}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Building2 className="w-4 h-4 text-slate-500" />
                <span><strong className="text-white">Division:</strong> {myManager ? myManager.division : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <UserIcon className="w-4 h-4 text-slate-500" />
                <span><strong className="text-white">Manager:</strong> {myManager ? myManager.name : 'Unassigned'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckSquare className="w-4 h-4 text-slate-500" />
                <span><strong className="text-white">Active Projects:</strong> {myProjects.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Management */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>My Assigned Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTasks.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  You have no pending tasks. Great job!
                </div>
              ) : (
                myTasks.map(task => {
                  const proj = projects.find(p => p.id === task.projectId);
                  return (
                    <div key={task.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-[#334155] bg-[#1E293B]/50 hover:bg-[#1E293B] transition-colors">
                      <div>
                        <h4 className="font-medium text-white text-base">{task.title}</h4>
                        <div className="flex items-center gap-3 mt-2 text-sm text-slate-400">
                          {proj && <span className="flex items-center gap-1"><FolderKanban className="w-3.5 h-3.5" />{proj.name}</span>}
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center gap-4 w-full sm:w-auto">
                        {getStatusBadge(task.status)}
                        {task.status !== 'Completed' && (
                          <Button size="sm" variant="secondary" onClick={() => handleNextStatus(task.id, task.status)} className="whitespace-nowrap flex items-center gap-2">
                            {task.status === 'Pending' ? 'Start Task' : 'Complete Task'}
                            <ArrowRightCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

// User Icon fallback
function UserIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
