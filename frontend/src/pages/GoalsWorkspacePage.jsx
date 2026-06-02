import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from '../components/ui';
import { Plus, Target, Users, User, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function GoalsWorkspacePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('organizational');

  const tabs = [
    { id: 'organizational', label: 'Organizational', icon: Target },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'individual', label: 'Individual', icon: User }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'organizational':
        return <OrganizationalGoals />;
      case 'team':
        return <TeamGoals />;
      case 'individual':
        return <IndividualGoals />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Goals Workspace</h1>
          <p className="text-slate-400">Set objectives, benchmark success, and monitor productivity across all levels.</p>
        </div>
        {(user?.role === 'Admin' || user?.role === 'Manager') && (
          <Button className="flex items-center gap-2 shadow-lg shadow-yellow-500/20">
            <Plus className="h-4 w-4" /> New Objective
          </Button>
        )}
      </div>

      <div className="flex border-b border-[#334155] space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 flex items-center gap-2 font-medium transition-colors ${
                isActive ? 'text-yellow-500' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-yellow-500"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function OrganizationalGoals() {
  const goals = [
    { id: 1, title: 'Reduce Data Processing Latency by 30%', progress: 65, benchmark: 'KPI-1 (Speed)', status: 'On Track' },
    { id: 2, title: 'Achieve 99.9% System Uptime in Q3', progress: 98, benchmark: 'KPI-2 (Reliability)', status: 'Completed' },
    { id: 3, title: 'Implement AI-Driven Analytics Workflows', progress: 20, benchmark: 'KPI-4 (Innovation)', status: 'At Risk' },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {goals.map((goal, idx) => (
        <GoalCard key={goal.id} goal={goal} index={idx} />
      ))}
    </div>
  );
}

function TeamGoals() {
  const goals = [
    { id: 1, title: 'Migrate Frontend to Vite', progress: 100, benchmark: 'KPI-3 (Technical Debt)', status: 'Completed' },
    { id: 2, title: 'Ship Gamification Hub Feature', progress: 45, benchmark: 'KPI-1 (Productivity)', status: 'On Track' },
    { id: 3, title: 'Conduct Q2 Peer Reviews', progress: 10, benchmark: 'KPI-5 (Collaboration)', status: 'Delayed' },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {goals.map((goal, idx) => (
        <GoalCard key={goal.id} goal={goal} index={idx} />
      ))}
    </div>
  );
}

function IndividualGoals() {
  const goals = [
    { id: 1, title: 'Complete React Advanced Certification', progress: 80, benchmark: 'KPI-6 (Growth)', status: 'On Track' },
    { id: 2, title: 'Resolve 15 High-Priority Bugs', progress: 30, benchmark: 'KPI-1 (Productivity)', status: 'On Track' },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {goals.map((goal, idx) => (
        <GoalCard key={goal.id} goal={goal} index={idx} />
      ))}
    </div>
  );
}

function GoalCard({ goal, index }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'On Track': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'At Risk': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      case 'Delayed': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="hover:border-slate-600 transition-colors bg-[#111A2C] overflow-hidden group">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#334155] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">{goal.title}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Target className="h-3 w-3" />
                <span>Benchmark: {goal.benchmark}</span>
              </div>
            </div>
            <span className={`px-2.5 py-1 text-xs font-medium border rounded-full ${getStatusColor(goal.status)}`}>
              {goal.status}
            </span>
          </div>

          <div className="space-y-2 mt-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">Progress</span>
              <span className="text-white font-bold">{goal.progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-[#1E293B] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                className={`h-full rounded-full ${goal.progress === 100 ? 'bg-emerald-500' : 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]'}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
