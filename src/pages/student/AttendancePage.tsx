import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartCard } from '@/components/shared/ChartCard';
import { CalendarDays, Check, X, Clock, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { subjectAttendance, monthlyAttendance, attendanceRecords } from '@/lib/demo-data';

export function AttendancePage() {
  const avg = Math.round(subjectAttendance.reduce((a, s) => a + s.percentage, 0) / subjectAttendance.length);
  const totalClasses = subjectAttendance.reduce((a, s) => a + s.total, 0);
  const totalPresent = subjectAttendance.reduce((a, s) => a + s.present, 0);
  const totalAbsent = totalClasses - totalPresent - subjectAttendance.reduce((a, s) => a + s.late, 0);
  const totalLate = subjectAttendance.reduce((a, s) => a + s.late, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Smart Attendance</h1>
        <p className="text-muted-foreground text-sm mt-1">Track and manage your attendance across all subjects.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avg}%</p>
              <p className="text-xs text-muted-foreground">Overall</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Check className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalPresent}</p>
              <p className="text-xs text-muted-foreground">Present</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <X className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalAbsent}</p>
              <p className="text-xs text-muted-foreground">Absent</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalLate}</p>
              <p className="text-xs text-muted-foreground">Late</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Low Attendance Warning */}
      {subjectAttendance.some(s => s.percentage < 75) && (
        <Card className="p-4 border-warning/30 bg-warning/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Low Attendance Warning</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your attendance is below 75% in: {subjectAttendance.filter(s => s.percentage < 75).map(s => `${s.subject} (${s.percentage}%)`).join(', ')}.
                Please attend upcoming classes to maintain eligibility for examinations.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Subject-wise */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Subject-wise Attendance" description="Current semester">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={subjectAttendance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="subject" tick={{ fontSize: 10 }} width={90} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                {subjectAttendance.map((entry, i) => (
                  <Cell key={i} fill={entry.percentage >= 75 ? 'hsl(var(--success))' : 'hsl(var(--warning))'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Detailed Breakdown</h3>
          <div className="space-y-4">
            {subjectAttendance.map(s => (
              <div key={s.code}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div>
                    <span className="font-medium">{s.subject}</span>
                    <span className="text-muted-foreground text-xs ml-2">{s.code}</span>
                  </div>
                  <span className={`font-medium ${s.percentage >= 75 ? 'text-success' : 'text-warning'}`}>{s.percentage}%</span>
                </div>
                <Progress value={s.percentage} className="h-2" />
                <div className="flex gap-4 text-xs text-muted-foreground mt-1.5">
                  <span>Present: {s.present}</span>
                  <span>Absent: {s.total - s.present - s.late}</span>
                  <span>Late: {s.late}</span>
                  <span>Total: {s.total}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Chart */}
      <ChartCard title="Monthly Attendance Trend" description="Last 6 months">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyAttendance}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="present" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="absent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="late" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Recent Records */}
      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-4">Recent Attendance Records</h3>
        <div className="space-y-2">
          {attendanceRecords.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  r.status === 'present' ? 'bg-success/10 text-success' :
                  r.status === 'absent' ? 'bg-destructive/10 text-destructive' :
                  'bg-warning/10 text-warning'
                }`}>
                  {r.status === 'present' ? <Check className="h-4 w-4" /> : r.status === 'absent' ? <X className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{r.subject}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              </div>
              <span className={`text-sm font-medium capitalize ${
                r.status === 'present' ? 'text-success' :
                r.status === 'absent' ? 'text-destructive' : 'text-warning'
              }`}>{r.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
