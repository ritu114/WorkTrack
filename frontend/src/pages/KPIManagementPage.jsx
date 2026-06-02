import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from '../components/ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

const initialKPIs = [
  { id: 'KPI-1', name: 'Project Completion Rate', category: 'Productivity', weight: 30, target: '90%', status: 'Active' },
  { id: 'KPI-2', name: 'Code Quality Score', category: 'Quality', weight: 25, target: '95%', status: 'Active' },
  { id: 'KPI-3', name: 'Peer Review Turnaround', category: 'Collaboration', weight: 15, target: '< 24h', status: 'Active' },
  { id: 'KPI-4', name: 'Customer Satisfaction', category: 'Impact', weight: 20, target: '> 4.5/5', status: 'Draft' },
  { id: 'KPI-5', name: 'Training Hours', category: 'Growth', weight: 10, target: '40h/yr', status: 'Active' },
];

export default function KPIManagementPage() {
  const [kpis] = useState(initialKPIs);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">KPI Management</h1>
          <p className="text-slate-400">Define and weight performance metrics across the organization.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create KPI
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total KPIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">100%</div>
            <p className="text-xs text-green-400 mt-1">Properly balanced</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B] border-yellow-500/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-500">Optimization Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-300">
              1 draft KPI waiting for approval before it can be assigned to teams.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle>Active Indicators</CardTitle>
          <Button variant="secondary" size="sm" className="flex items-center gap-2 text-xs">
            <SlidersHorizontal className="h-3 w-3" /> Rebalance Weights
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>KPI Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpis.map((kpi) => (
                <TableRow key={kpi.id}>
                  <TableCell>
                    <div className="font-medium text-white">{kpi.name}</div>
                    <div className="text-xs text-slate-500">{kpi.id}</div>
                  </TableCell>
                  <TableCell>{kpi.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 max-w-[120px]">
                      <div className="text-sm">{kpi.weight}%</div>
                      <div className="h-1.5 w-full bg-[#334155] rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: `${kpi.weight}%` }}></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{kpi.target}</TableCell>
                  <TableCell>
                    <Badge variant={kpi.status === 'Active' ? 'success' : 'default'}>
                      {kpi.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New KPI">
        <form className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Indicator Name</label>
            <Input placeholder="e.g. Code Review Speed" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Category</label>
              <select className="w-full flex h-10 appearance-none rounded-md border border-[#334155] bg-[#0F172A] px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option>Productivity</option>
                <option>Quality</option>
                <option>Impact</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Weight (%)</label>
              <Input type="number" placeholder="15" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Target Value</label>
            <Input placeholder="e.g. > 90%" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="button" onClick={() => setIsModalOpen(false)}>Create Indicator</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
