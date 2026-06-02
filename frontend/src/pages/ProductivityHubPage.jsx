import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '../components/ui';
import { Trophy, Zap, TrendingUp, Activity, Award, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const productivityData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 82 },
  { month: 'Jun', score: 90 },
];

const leaderboard = [
  { id: 1, name: 'Alex Mercer', role: 'Senior Developer', score: 98, trend: '+5', avatar: 'AM' },
  { id: 2, name: 'Sarah Chen', role: 'Product Manager', score: 94, trend: '+2', avatar: 'SC' },
  { id: 3, name: 'Marcus Johnson', role: 'UI/UX Lead', score: 91, trend: '-1', avatar: 'MJ' },
  { id: 4, name: 'Elena Rodriguez', role: 'Data Scientist', score: 88, trend: '+4', avatar: 'ER' },
  { id: 5, name: 'David Kim', role: 'DevOps Engineer', score: 85, trend: '+7', avatar: 'DK' },
];

const activityFeed = [
  { id: 1, user: 'Alex Mercer', action: 'completed milestone', target: 'Frontend Migration', time: '2 hours ago', icon: Zap, color: 'text-yellow-500' },
  { id: 2, user: 'Sarah Chen', action: 'achieved KPI benchmark', target: 'Product Launch Q2', time: '5 hours ago', icon: Target, color: 'text-emerald-400' },
  { id: 3, user: 'Marcus Johnson', action: 'earned badge', target: 'Design Excellence', time: '1 day ago', icon: Award, color: 'text-purple-400' },
];

export default function ProductivityHubPage() {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Productivity Hub
          </h1>
          <p className="text-slate-400">Track calculated productivity levels and team engagement.</p>
        </div>
      </motion.div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Core Algorithm Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="h-full bg-gradient-to-br from-[#0F172A] to-[#1E293B] border-[#334155] shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400" />
                System Productivity Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#94A3B8" axisLine={false} tickLine={false} />
                    <YAxis stroke="#94A3B8" axisLine={false} tickLine={false} domain={[50, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px' }}
                      itemStyle={{ color: '#EAB308' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#EAB308" 
                      strokeWidth={3}
                      dot={{ fill: '#0F172A', stroke: '#EAB308', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#EAB308' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="h-full bg-[#111A2C] border-[#334155]">
            <CardHeader className="border-b border-[#1E293B] pb-4">
              <CardTitle>Live Engagement</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {activityFeed.map((activity, index) => {
                  const Icon = activity.icon || Zap;
                  return (
                    <motion.div 
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                      className="flex gap-4 relative"
                    >
                      {index !== activityFeed.length - 1 && (
                        <div className="absolute top-8 left-[19px] bottom-[-24px] w-px bg-[#334155]" />
                      )}
                      <div className={`h-10 w-10 shrink-0 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center ${activity.color} z-10`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm text-slate-300">
                          <span className="font-semibold text-white">{activity.user}</span> {activity.action}{' '}
                          <span className="text-yellow-400 font-medium">{activity.target}</span>
                        </p>
                        <span className="text-xs text-slate-500 mt-1 block">{activity.time}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Gamified Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="col-span-1 lg:col-span-3"
        >
          <Card className="bg-[#111A2C] border-[#334155]">
            <CardHeader className="border-b border-[#1E293B]">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Top Performers</CardTitle>
                <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Monthly Cycle</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#1E293B]">
                {leaderboard.map((user, idx) => (
                  <motion.div 
                    key={user.id}
                    whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                    className="flex items-center justify-between p-4 px-6 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-xl font-bold w-6 text-center ${idx < 3 ? 'text-yellow-500' : 'text-slate-500'}`}>
                        {idx + 1}
                      </div>
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-400 flex items-center justify-center text-slate-900 font-bold shadow-lg">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xl font-bold text-white tabular-nums">{user.score}</div>
                        <div className={`text-xs flex items-center gap-1 ${user.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                          <TrendingUp className={`h-3 w-3 ${user.trend.startsWith('-') ? 'rotate-180' : ''}`} />
                          {user.trend} pts
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
