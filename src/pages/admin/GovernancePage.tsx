import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Users, GraduationCap, FileText, Award, Building2, Bus, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { universityHealthScore } from '@/lib/demo-data';

export function GovernancePage() {
  const modules = [
    { name: 'Admissions', status: 'active', metric: '6 under review', icon: GraduationCap, health: 92 },
    { name: 'Attendance', status: 'active', metric: '82% avg', icon: Users, health: 82 },
    { name: 'Examinations', status: 'active', metric: '12 scheduled', icon: FileText, health: 88 },
    { name: 'Fee Management', status: 'active', metric: '91% collected', icon: TrendingUp, health: 91 },
    { name: 'Certificates', status: 'active', metric: '1,456 issued', icon: Award, health: 95 },
    { name: 'Hostel Management', status: 'active', metric: '87% occupied', icon: Building2, health: 85 },
    { name: 'Transport', status: 'active', metric: '4 on route', icon: Bus, health: 88 },
    { name: 'Risk Detection', status: 'active', metric: '2 high risk', icon: AlertTriangle, health: 78 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="h-6 w-6 text-primary" /> Digital Governance</h1>
        <p className="text-muted-foreground text-sm mt-1">University governance modules and health metrics.</p>
      </div>

      <Card className="p-6 gradient-hero text-white border-0">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-white/70">University Digital Health Score</p>
            <p className="text-5xl font-bold">{universityHealthScore.total}<span className="text-xl text-white/50">/100</span></p>
          </div>
          <Badge className="bg-success/20 text-success border-0">Excellent Performance</Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {universityHealthScore.breakdown.map(item => (
            <div key={item.name}>
              <div className="flex justify-between text-xs mb-1"><span className="text-white/70">{item.name}</span><span className="font-medium">{item.score}/100</span></div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" style={{ width: `${item.score}%` }} /></div>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <h3 className="font-semibold text-sm mb-3">Governance Modules</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map(m => (
            <Card key={m.name} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"><m.icon className="h-5 w-5 text-primary" /></div>
                <Badge variant="default" className="text-xs"><CheckCircle2 className="h-3 w-3 mr-1" /> Active</Badge>
              </div>
              <p className="font-semibold text-sm">{m.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.metric}</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Health</span><span className="font-medium">{m.health}%</span></div>
                <Progress value={m.health} className="h-1.5" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-4">Governance Principles</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Transparency', desc: 'All processes visible and auditable' },
            { title: 'Automation', desc: 'Routine workflows handled automatically' },
            { title: 'Accessibility', desc: 'Services available 24/7 digitally' },
            { title: 'Accountability', desc: 'Every action tracked and reportable' },
          ].map(p => (
            <div key={p.title} className="p-4 rounded-xl bg-muted/50">
              <p className="font-medium text-sm">{p.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
