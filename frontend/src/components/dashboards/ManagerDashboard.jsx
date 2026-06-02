import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from '../ui';
import { Progress } from '../ui/Progress';
import { Modal } from '../ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FolderKanban, Users, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ManagerDashboard() {
  const { user } = useAuth();
  const { projects, users, tasks, addTask, addProject, monthlyData, weeklyData } = useData();
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  
  // State for new task creation
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedAssigneeId, setSelectedAssigneeId] = useState('');

  // State for new project creation
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDueDate, setNewProjectDueDate] = useState('');

  const myProjects = projects.filter(p => p.managerId === user.id);
  const myTeam = users.filter(u => u.managerId === user.id);

  const handleCreateTask = (e) => {
    e.preventDefault();
    addTask({
      title: newTaskTitle,
      projectId: selectedProjectId,
      assignee: selectedAssigneeId,
      status: 'Pending',
      priority: 'Medium',
      dueDate: new Date().toISOString().split('T')[0]
    });
    setTaskModalOpen(false);
    setNewTaskTitle('');
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    addProject({
      name: newProjectName,
      managerId: user.id,
      dueDate: newProjectDueDate || new Date().toISOString().split('T')[0]
    });
    setProjectModalOpen(false);
    setNewProjectName('');
  };

  return (
    <div className="space-y-8">
      {/* Manager Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#1E293B]/80 hover:border-yellow-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Handled Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{myProjects.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B]/80 hover:border-yellow-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Team Size</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{myTeam.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Productivity Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#1E293B]/80 border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white">Your Team's Monthly Productivity</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="colorMgr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff' }} />
                <Area type="monotone" dataKey={user.id} name="My Team" stroke="#3B82F6" fillOpacity={1} fill="url(#colorMgr)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B]/80 border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white">Your Weekly Throughput</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey={user.id} name="Tasks Completed" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* My Projects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">My Projects</h2>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => setProjectModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Create Project
            </Button>
            <Button variant="primary" size="sm" onClick={() => setTaskModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Assign Task
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {myProjects.map(project => (
            <Card key={project.id} className="flex flex-col hover:border-[#475569] transition-colors group">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg group-hover:text-yellow-500 transition-colors">{project.name}</CardTitle>
                  <Badge 
                    variant={project.progress === 100 ? 'success' : project.progress < 20 ? 'default' : 'primary'}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="text-sm text-slate-500 mt-1">{project.members.length} team members assigned</div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end pt-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Progress</span>
                    <span className="font-medium text-white">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className={project.progress === 100 ? '[&>div]:bg-green-500' : ''} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-[#334155]">
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map(memId => {
                      const m = users.find(u => u.id === memId);
                      return m ? <img key={memId} src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full border border-[#1E293B]" title={m.name} /> : null;
                    })}
                    {project.members.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-[#334155] border border-[#1E293B] flex items-center justify-center text-[10px] text-white">
                        +{project.members.length - 3}
                      </div>
                    )}
                  </div>
                  <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {myProjects.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-500 border border-dashed border-[#334155] rounded-xl">
              No active projects under your management.
            </div>
          )}
        </div>
      </div>

      {/* Project Creation Modal */}
      <Modal isOpen={isProjectModalOpen} onClose={() => setProjectModalOpen(false)} title="Create New Project">
        <form className="space-y-4 pt-2" onSubmit={handleCreateProject}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Project Name</label>
            <Input required placeholder="Enter project name" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Due Date</label>
            <Input type="date" required value={newProjectDueDate} onChange={e => setNewProjectDueDate(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" type="button" onClick={() => setProjectModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </Modal>

      {/* Task Creation Modal */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setTaskModalOpen(false)} title="Assign New Task">
        <form className="space-y-4 pt-2" onSubmit={handleCreateTask}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Task Title</label>
            <Input required placeholder="Enter task title" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Link to Project</label>
            <select required value={selectedProjectId} onChange={e => setSelectedProjectId(e.target.value)} className="w-full flex h-10 appearance-none rounded-md border border-[#334155] bg-[#0F172A] px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option value="" disabled>Select Project</option>
              {myProjects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Assign To</label>
            <select required value={selectedAssigneeId} onChange={e => setSelectedAssigneeId(e.target.value)} className="w-full flex h-10 appearance-none rounded-md border border-[#334155] bg-[#0F172A] px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option value="" disabled>Select Team Member</option>
              {myTeam.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.title})</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" type="button" onClick={() => setTaskModalOpen(false)}>Cancel</Button>
            <Button type="submit">Assign Task</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
