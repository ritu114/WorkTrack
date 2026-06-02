import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '../components/ui';
import { Progress } from '../components/ui/Progress';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const projects = [
  { id: 1, name: 'Q3 Product Release', status: 'On Track', progress: 75, due: 'Oct 15, 2026', team: 'Engineering' },
  { id: 2, name: 'Security Audit', status: 'At Risk', progress: 45, due: 'Sep 30, 2026', team: 'DevSecOps' },
  { id: 3, name: 'Marketing Campaign: Fall', status: 'Completed', progress: 100, due: 'Aug 20, 2026', team: 'Marketing' },
  { id: 4, name: 'Infrastructure Migration', status: 'On Track', progress: 60, due: 'Nov 01, 2026', team: 'IT Ops' },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Project Monitoring</h1>
          <p className="text-slate-400">Track initiatives and their impact on performance KPIs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map(project => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge 
                  variant={project.status === 'Completed' ? 'success' : project.status === 'At Risk' ? 'default' : 'primary'}
                  className={project.status === 'At Risk' ? 'bg-red-500/20 text-red-500' : ''}
                >
                  {project.status}
                </Badge>
              </div>
              <div className="text-sm text-slate-500 mt-1">{project.team} Division</div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className={project.status === 'Completed' ? '[&>div]:bg-green-500' : (project.status === 'At Risk' ? '[&>div]:bg-red-500' : '')} />
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-4 border-t border-[#334155]">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Due {project.due}
                </div>
                {project.status === 'Completed' && (
                  <div className="flex items-center gap-1 text-green-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Delivered
                  </div>
                )}
                {project.status === 'At Risk' && (
                  <div className="flex items-center gap-1 text-red-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Needs attention
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
