import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from '../components/ui';
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

import { useData } from '../context/DataContext';

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users } = useData();

  const filteredEmployees = users.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.division && emp.division.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Employee Management</h1>
          <p className="text-slate-400">View and manage your team members.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search employees..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="secondary" className="w-full sm:w-auto flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Division</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">KPI Score</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {emp.avatar ? (
                        <img src={emp.avatar} alt="Profile" className="h-8 w-8 rounded-full border border-[#334155]" />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#334155] text-xs font-medium text-white">
                          {emp.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-white">{emp.name}</div>
                        <div className="text-xs text-slate-500">{emp.email} || {emp.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{emp.id}</TableCell>
                  <TableCell>{emp.division || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={emp.status === 'On Leave' ? 'default' : 'success'}>
                      {emp.status || 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-white">{emp.score || Math.floor(Math.random() * 20 + 80)}</TableCell>
                  <TableCell>
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Employee">
        <form className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Full Name</label>
            <Input placeholder="e.g. John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <Input type="email" placeholder="john@company.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Role</label>
              <select className="w-full flex h-10 appearance-none rounded-md border border-[#334155] bg-[#0F172A] px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option>Employee</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Division</label>
              <select className="w-full flex h-10 appearance-none rounded-md border border-[#334155] bg-[#0F172A] px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option>Engineering</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>HR</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="button" onClick={() => setIsModalOpen(false)}>Save Employee</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
