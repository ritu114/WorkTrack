import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Users, Target, LayoutDashboard, FolderKanban, LogOut, Flag, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  
  if (!user) return null;

  // Filter links based on role
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Employee'] },
    { name: 'Goals & Objectives', path: '/goals', icon: Flag, roles: ['Admin', 'Manager', 'Employee'] },
    { name: 'Productivity Hub', path: '/productivity', icon: Zap, roles: ['Admin', 'Manager', 'Employee'] },
    { name: 'My Performance', path: '/performance', icon: Activity, roles: ['Employee'] },
    { name: 'Team Performance', path: '/team', icon: Activity, roles: ['Manager'] },
    { name: 'Employees', path: '/employees', icon: Users, roles: ['Admin'] },
    { name: 'KPI Management', path: '/kpis', icon: Target, roles: ['Admin'] },
    { name: 'Projects', path: '/projects', icon: FolderKanban, roles: ['Admin', 'Manager'] },
    { name: 'Reports', path: '/reports', icon: Activity, roles: ['Admin'] }
  ];

  const visibleLinks = links.filter(link => link.roles.includes(user.role));

  return (
    <div className="flex h-screen w-64 flex-col bg-[#0F172A] border-r border-[#334155] text-slate-300 transition-all duration-300">
      <div className="flex h-16 items-center px-6 border-b border-[#334155]">
        <div className="flex items-center gap-2 font-bold text-lg text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-yellow-500 text-slate-900">
            W
          </div>
          <span>WorkTrack</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1E293B] text-yellow-500'
                      : 'text-slate-400 hover:bg-[#1E293B] hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#334155] bg-[#0B1120]">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt="Profile" className="h-9 w-9 rounded-full border border-[#334155]" />
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">{user.name}</p>
            <p className="truncate text-xs text-slate-400">{user.role}</p>
          </div>
          <button onClick={logout} className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1E293B] rounded-md transition-colors" title="Logout">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
