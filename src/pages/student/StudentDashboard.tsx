import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { StatCard } from '@/components/shared/StatCard';
import { ChartCard } from '@/components/shared/ChartCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, CreditCard, Award, TrendingUp, Bot, Clock, BookOpen, AlertTriangle, Bus, Building2, FileText, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import { currentStudent, subjectAttendance, monthlyAttendance, fees, exams, announcements, performancePrediction } from '@/lib/demo-data';

export function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const avgAttendance = Math.round(subjectAttendance.reduce((a, s) => a + s.percentage, 0) / subjectAttendance.length);
  const pendingFees = fees.filter(f => f.status === 'pending').reduce((a, f) => a + (f.amount - f.paid), 0);
  const nextExam = exams[0];
  const lowAttendance = subjectAttendance.filter(s => s.percentage < 75);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <Card className="p-6 gradient-hero text-white border-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name}!</h1>
            <p className="text-white/70 text-sm">{currentStudent.department} • Semester {currentStudent.semester} • {currentStudent.enrollmentNo}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div>
                <p className="text-xs text-white/60">CGPA</p>
                <p className="text-lg font-bold">{currentStudent.cgpa}</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-xs text-white/60">Attendance</p>
                <p className="text-lg font-bold">{avgAttendance}%</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-xs text-white/60">Pending Fees</p>
                <p className="text-lg font-bold">₹{pendingFees.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <Button onClick={() => navigate('/dashboard/ai')} className="bg-white text-primary hover:bg-white/90 gap-2 shrink-0">
            <Bot className="h-4 w-4" /> Ask CampusAI
          </Button>
        </div>
      </Card>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Overall Attendance" value={`${avgAttendance}%`} icon={CalendarDays} color={avgAttendance >= 75 ? 'success' : 'warning'} trend={-3} trendLabel="vs last month" />
        <StatCard title="Pending Fees" value={`₹${(pendingFees / 1000).toFixed(1)}K`} icon={CreditCard} color="destructive" />
        <StatCard title="Certificates" value="2 Issued" icon={Award} color="primary" />
        <StatCard title="Predicted Score" value={`${performancePrediction.predictedScore}%`} icon={TrendingUp} color="accent" trend={2} trendLabel="Good" />
      </div>

      {/* Alerts */}
      {lowAttendance.length > 0 && (
        <Card className="p-4 border-warning/30 bg-warning/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm">Attendance Alert</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your attendance is below 75% in {lowAttendance.map(s => s.subject).join(', ')}. Please attend upcoming classes regularly.
              </p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate('/dashboard/attendance')}>
                View Details
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Monthly Attendance Trend" description="Present vs Absent days">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyAttendance}>
              <defs>
                <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="present" stroke="hsl(var(--success))" fill="url(#colorPresent)" strokeWidth={2} />
              <Area type="monotone" dataKey="absent" stroke="hsl(var(--destructive))" fill="url(#colorAbsent)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Subject-wise Attendance" description="Current semester">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectAttendance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="subject" tick={{ fontSize: 10 }} width={80} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                {subjectAttendance.map((entry, i) => (
                  <Cell key={i} fill={entry.percentage >= 75 ? 'hsl(var(--success))' : 'hsl(var(--warning))'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Quick Access */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Quick Access</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: 'Timetable', icon: Clock, path: '/dashboard/timetable' },
            { label: 'Exams', icon: FileText, path: '/dashboard/exams' },
            { label: 'Fees', icon: CreditCard, path: '/dashboard/fees' },
            { label: 'Certificates', icon: Award, path: '/dashboard/certificates' },
            { label: 'Hostel', icon: Building2, path: '/dashboard/hostel' },
            { label: 'Transport', icon: Bus, path: '/dashboard/transport' },
            { label: 'Library', icon: BookOpen, path: '/dashboard/library' },
            { label: 'Events', icon: CalendarDays, path: '/dashboard/events' },
            { label: 'Documents', icon: FileText, path: '/dashboard/documents' },
            { label: 'Helpdesk', icon: Bell, path: '/dashboard/helpdesk' },
            { label: 'Map', icon: Bus, path: '/dashboard/map' },
            { label: 'AI Chat', icon: Bot, path: '/dashboard/ai' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/30 transition-all"
            >
              <item.icon className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Announcements + Next Exam */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Announcements</h3>
          <div className="space-y-3">
            {announcements.slice(0, 4).map(a => (
              <div key={a.id} className={`p-3 rounded-lg ${a.important ? 'bg-primary/5 border border-primary/20' : 'bg-muted/50'}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm">{a.title}</p>
                  {a.important && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full shrink-0">Important</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.message}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{a.date}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Upcoming Exam</h3>
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">{nextExam.type}</span>
              <span className="text-xs text-muted-foreground">{nextExam.date}</span>
            </div>
            <p className="font-semibold">{nextExam.name}</p>
            <p className="text-sm text-muted-foreground mt-1">{nextExam.subject} ({nextExam.code})</p>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="font-medium">{nextExam.time}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Venue</p>
                <p className="font-medium">{nextExam.room}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-medium">{nextExam.duration}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Building</p>
                <p className="font-medium">{nextExam.building}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate('/dashboard/exams')}>
              View All Exams
            </Button>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Performance Prediction</span>
              <span className="font-medium">{performancePrediction.predictedScore}% — {performancePrediction.category}</span>
            </div>
            <Progress value={performancePrediction.predictedScore} className="h-2" />
          </div>
        </Card>
      </div>
    </div>
  );
}

import { Cell } from 'recharts';
