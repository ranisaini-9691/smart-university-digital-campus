import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/shared/StatCard';
import { ChartCard } from '@/components/shared/ChartCard';
import { BookOpen, CalendarDays, Users, FileText, TrendingUp, AlertTriangle, Bell, Plus, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { timetable, subjectAttendance, riskPredictions, announcements, performanceData } from '@/lib/demo-data';
import { useAuth } from '@/context/AuthContext';

export function FacultyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayClasses = timetable.filter(t => t.day === today);
  const atRisk = riskPredictions.filter(r => r.riskLevel === 'high' || r.riskLevel === 'medium');

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 gradient-hero text-white border-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-white/70 text-sm mt-1">Computer Science & Engineering • Professor</p>
            <div className="flex gap-4 mt-4">
              <div><p className="text-xs text-white/60">Today's Classes</p><p className="text-lg font-bold">{todayClasses.length}</p></div>
              <div className="w-px bg-white/20" />
              <div><p className="text-xs text-white/60">Total Students</p><p className="text-lg font-bold">142</p></div>
              <div className="w-px bg-white/20" />
              <div><p className="text-xs text-white/60">At-Risk</p><p className="text-lg font-bold">{atRisk.length}</p></div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Classes" value={todayClasses.length} icon={BookOpen} color="primary" />
        <StatCard title="Total Students" value="142" icon={Users} color="accent" />
        <StatCard title="Avg Attendance" value="82%" icon={CalendarDays} color="success" />
        <StatCard title="At-Risk Students" value={atRisk.length} icon={AlertTriangle} color="destructive" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {todayClasses.length > 0 ? todayClasses.map(cls => (
              <div key={cls.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><BookOpen className="h-5 w-5 text-primary" /></div>
                <div className="flex-1"><p className="font-medium text-sm">{cls.subject} ({cls.code})</p><p className="text-xs text-muted-foreground">{cls.time} • {cls.room}</p></div>
                <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/attendance')}>Mark Attendance</Button>
              </div>
            )) : <p className="text-sm text-muted-foreground">No classes scheduled today.</p>}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Mark Attendance', icon: CalendarDays, path: '/dashboard/attendance' },
              { label: 'Create Assignment', icon: Plus, path: '/dashboard/timetable' },
              { label: 'Enter Marks', icon: FileText, path: '/dashboard/exams' },
              { label: 'Contact Parent', icon: Users, path: '/dashboard/risk' },
              { label: 'At-Risk Students', icon: AlertTriangle, path: '/dashboard/risk' },
              { label: 'Announcements', icon: Bell, path: '/dashboard/notifications' },
            ].map(item => (
              <Button key={item.label} variant="outline" onClick={() => navigate(item.path)} className="justify-start">
                <item.icon className="h-4 w-4 mr-2" /> {item.label}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Subject Performance" description="Class average scores">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="subject" tick={{ fontSize: 12 }} /><YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">At-Risk Students</h3>
          <div className="space-y-2">
            {atRisk.map(risk => (
              <div key={risk.studentId} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{risk.studentName}</p>
                  <p className="text-xs text-muted-foreground">{risk.enrollmentNo}</p>
                </div>
                <Badge variant={risk.riskLevel === 'high' ? 'destructive' : 'secondary'} className="capitalize">{risk.riskLevel}</Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => navigate('/dashboard/risk')}>View All</Button>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-4">Announcements</h3>
        <div className="space-y-2">
          {announcements.map(a => (
            <div key={a.id} className={`p-3 rounded-lg ${a.important ? 'bg-primary/5 border border-primary/20' : 'bg-muted/50'}`}>
              <div className="flex items-start justify-between gap-2"><p className="font-medium text-sm">{a.title}</p>{a.important && <Badge className="text-xs">Important</Badge>}</div>
              <p className="text-xs text-muted-foreground mt-1">{a.message}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
