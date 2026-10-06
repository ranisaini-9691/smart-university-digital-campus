import { useNavigate } from 'react-router-dom';
import { StatCard } from '@/components/shared/StatCard';
import { ChartCard } from '@/components/shared/ChartCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, CalendarDays, CreditCard, MessageSquare, Award, Building2, Bus, AlertTriangle, FileText, Lightbulb, Zap, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { enrollmentData, feeCollectionData, complaintsTrendData, hostelOccupancyData, transportUsageData, universityHealthScore, riskPredictions, departmentData } from '@/lib/demo-data';

export function AdminDashboard() {
  const navigate = useNavigate();
  const highRisk = riskPredictions.filter(r => r.riskLevel === 'high').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Digital Governance Command Center</h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time university administration overview.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/insights')}><Lightbulb className="h-4 w-4 mr-2" /> AI Insights</Button>
          <Button onClick={() => navigate('/dashboard/governance')}><Shield className="h-4 w-4 mr-2" /> Governance</Button>
        </div>
      </div>

      {/* Health Score */}
      <Card className="p-6 gradient-hero text-white border-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative grid lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-1 text-center">
            <p className="text-sm text-white/70 mb-2">University Digital Health Score</p>
            <p className="text-6xl font-bold">{universityHealthScore.total}<span className="text-2xl text-white/50">/100</span></p>
            <Badge className="bg-success/20 text-success border-0 mt-3">Excellent</Badge>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {universityHealthScore.breakdown.map(item => (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1"><span className="text-white/70">{item.name}</span><span className="font-medium">{item.score}</span></div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" style={{ width: `${item.score}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Students" value="25,000+" icon={GraduationCap} color="primary" trend={5} trendLabel="YoY" />
        <StatCard title="Faculty" value="1,200+" icon={Users} color="accent" />
        <StatCard title="Avg Attendance" value="82%" icon={CalendarDays} color="success" trend={-3} trendLabel="vs last month" />
        <StatCard title="Fee Collection" value="91%" icon={CreditCard} color="warning" trend={2} trendLabel="this semester" />
        <StatCard title="At-Risk Students" value={highRisk} icon={AlertTriangle} color="destructive" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Pending Complaints" value="18" icon={MessageSquare} color="warning" />
        <StatCard title="Certificates Issued" value="1,456" icon={Award} color="primary" />
        <StatCard title="Hostel Occupancy" value="87%" icon={Building2} color="accent" />
        <StatCard title="Bus Utilization" value="76%" icon={Bus} color="success" />
        <StatCard title="Exams Scheduled" value="12" icon={FileText} color="primary" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Student Enrollment Trend" description="Year-wise enrollment">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={enrollmentData}>
              <defs><linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="students" stroke="hsl(var(--primary))" fill="url(#enrollGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Fee Collection" description="Collected vs Pending (in Lakhs)">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={feeCollectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="collected" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-4">
        <ChartCard title="Complaints Trend" description="Submitted vs Resolved">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={complaintsTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="submitted" stroke="hsl(var(--warning))" strokeWidth={2} />
              <Line type="monotone" dataKey="resolved" stroke="hsl(var(--success))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Hostel Occupancy" description="Building-wise %">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hostelOccupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="block" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="occupied" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Transport Usage" description="Route-wise utilization %">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={transportUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="route" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="utilization" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Department + Quick Access */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Department Overview" description="Students and Faculty per department">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="faculty" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Admin Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'AI Insights', icon: Lightbulb, path: '/dashboard/insights' },
              { label: 'Automation', icon: Zap, path: '/dashboard/automation' },
              { label: 'Students', icon: Users, path: '/dashboard/students' },
              { label: 'Admissions', icon: GraduationCap, path: '/dashboard/admissions' },
              { label: 'Impact', icon: TrendingUp, path: '/dashboard/impact' },
              { label: 'Governance', icon: Shield, path: '/dashboard/governance' },
            ].map(item => (
              <Button key={item.label} variant="outline" onClick={() => navigate(item.path)} className="justify-start">
                <item.icon className="h-4 w-4 mr-2" /> {item.label}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
