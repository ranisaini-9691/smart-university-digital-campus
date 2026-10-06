import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StatCard } from '@/components/shared/StatCard';
import { ChartCard } from '@/components/shared/ChartCard';
import { CalendarDays, CreditCard, TrendingUp, Bell, GraduationCap, AlertTriangle, FileText, Bus, Building2, MessageSquare } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { subjectAttendance, monthlyAttendance, fees, exams, parentAlerts, performancePrediction, currentStudent } from '@/lib/demo-data';

export function ParentDashboard() {
  const navigate = useNavigate();
  const avgAttendance = Math.round(subjectAttendance.reduce((a, s) => a + s.percentage, 0) / subjectAttendance.length);
  const pendingFees = fees.filter(f => f.status === 'pending').reduce((a, f) => a + (f.amount - f.paid), 0);
  const nextExam = exams[0];
  const unreadAlerts = parentAlerts.filter(a => !a.read).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 gradient-hero text-white border-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Parent Portal</h1>
            <p className="text-white/70 text-sm mt-1">Ward: {currentStudent.name} • {currentStudent.enrollmentNo}</p>
            <div className="flex gap-4 mt-4">
              <div><p className="text-xs text-white/60">CGPA</p><p className="text-lg font-bold">{currentStudent.cgpa}</p></div>
              <div className="w-px bg-white/20" />
              <div><p className="text-xs text-white/60">Attendance</p><p className="text-lg font-bold">{avgAttendance}%</p></div>
              <div className="w-px bg-white/20" />
              <div><p className="text-xs text-white/60">Pending Fees</p><p className="text-lg font-bold">₹{(pendingFees / 1000).toFixed(1)}K</p></div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Bell className="h-6 w-6 mx-auto mb-1 text-cyan-200" />
            <p className="text-2xl font-bold">{unreadAlerts}</p>
            <p className="text-xs text-white/60">New Alerts</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Attendance" value={`${avgAttendance}%`} icon={CalendarDays} color={avgAttendance >= 75 ? 'success' : 'warning'} />
        <StatCard title="CGPA" value={currentStudent.cgpa} icon={GraduationCap} color="primary" />
        <StatCard title="Predicted Score" value={`${performancePrediction.predictedScore}%`} icon={TrendingUp} color="accent" />
        <StatCard title="Pending Fees" value={`₹${(pendingFees / 1000).toFixed(1)}K`} icon={CreditCard} color="destructive" />
      </div>

      {/* Alert System */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Parent Alert System</h3>
          <Badge variant="destructive">{unreadAlerts} unread</Badge>
        </div>
        <div className="space-y-2">
          {parentAlerts.map(alert => (
            <div key={alert.id} className={`p-3 rounded-lg ${!alert.read ? 'bg-primary/5 border border-primary/20' : 'bg-muted/50'}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className={`h-4 w-4 shrink-0 mt-0.5 ${alert.type === 'fees' ? 'text-warning' : alert.type === 'attendance' ? 'text-destructive' : 'text-primary'}`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Attendance Trend" description="Monthly present/absent">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyAttendance}>
              <defs><linearGradient id="pPresent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="present" stroke="hsl(var(--success))" fill="url(#pPresent)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Upcoming Examination</h3>
          <div className="bg-muted/50 rounded-xl p-4">
            <Badge className="mb-2">{nextExam.type}</Badge>
            <p className="font-semibold">{nextExam.name}</p>
            <p className="text-sm text-muted-foreground mt-1">{nextExam.subject} ({nextExam.code})</p>
            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <div><p className="text-xs text-muted-foreground">Date</p><p className="font-medium">{nextExam.date}</p></div>
              <div><p className="text-xs text-muted-foreground">Time</p><p className="font-medium">{nextExam.time}</p></div>
              <div><p className="text-xs text-muted-foreground">Venue</p><p className="font-medium">{nextExam.room}</p></div>
              <div><p className="text-xs text-muted-foreground">Duration</p><p className="font-medium">{nextExam.duration}</p></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Performance Prediction</p>
            <Progress value={performancePrediction.predictedScore} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{performancePrediction.predictedScore}% — {performancePrediction.category}</p>
          </div>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Button variant="outline" onClick={() => navigate('/dashboard/attendance')} className="justify-start"><CalendarDays className="h-4 w-4 mr-2" /> View Attendance</Button>
        <Button variant="outline" onClick={() => navigate('/dashboard/fees')} className="justify-start"><CreditCard className="h-4 w-4 mr-2" /> Fee Details</Button>
        <Button variant="outline" onClick={() => navigate('/dashboard/transport')} className="justify-start"><Bus className="h-4 w-4 mr-2" /> Transport</Button>
        <Button variant="outline" onClick={() => navigate('/dashboard/hostel')} className="justify-start"><Building2 className="h-4 w-4 mr-2" /> Hostel</Button>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" /> Contact Faculty</h3>
        <div className="space-y-2">
          {[
            { name: 'Dr. Priya Verma', subject: 'Data Structures', phone: '+91 90000 11111' },
            { name: 'Dr. Rajesh Khanna', subject: 'Database Management', phone: '+91 90000 22222' },
            { name: 'Prof. Neha Singh', subject: 'Operating Systems', phone: '+91 90000 33333' },
          ].map(f => (
            <div key={f.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div><p className="font-medium text-sm">{f.name}</p><p className="text-xs text-muted-foreground">{f.subject} • {f.phone}</p></div>
              <Button variant="outline" size="sm">Contact</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
