import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const historicalData = [
  { quarter: 'Q1', engineering: 85, sales: 78, marketing: 82 },
  { quarter: 'Q2', engineering: 88, sales: 82, marketing: 84 },
  { quarter: 'Q3', engineering: 92, sales: 88, marketing: 85 },
  { quarter: 'Q4', engineering: 94, sales: 91, marketing: 89 },
];

export default function PerformanceAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Performance Analytics</h1>
          <p className="text-slate-400">Deep-dive into historical trends and predictive scoring.</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Historical Quarterly Performance (by Division)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EAB308" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="quarter" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" domain={[60, 100]} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }} />
                  <Area type="monotone" dataKey="engineering" stroke="#EAB308" fillOpacity={1} fill="url(#colorEng)" />
                  <Area type="monotone" dataKey="sales" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { range: '90-100', count: 145 },
                  { range: '80-89', count: 420 },
                  { range: '70-79', count: 510 },
                  { range: '60-69', count: 120 },
                  { range: '<60', count: 53 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis dataKey="range" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }} />
                  <Bar dataKey="count" fill="#EAB308" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
