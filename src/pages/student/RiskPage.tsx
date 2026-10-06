import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, TrendingUp, Bell, UserCog, MessageSquare, Lightbulb } from 'lucide-react';
import { riskPredictions } from '@/lib/demo-data';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function RiskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin' || user?.role === 'faculty';

  const levelConfig = {
    low: { color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', label: 'Low Risk' },
    medium: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', label: 'Medium Risk' },
    high: { color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30', label: 'High Risk' },
  };

  // For student/parent, show their own risk. For admin/faculty, show all.
  const data = isAdmin ? riskPredictions : riskPredictions.filter(r => r.studentId === 's1');
  const myRisk = riskPredictions.find(r => r.studentId === 's1');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Early Student Risk Detection</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-powered analysis of dropout risk indicators.</p>
      </div>

      {!isAdmin && myRisk && (
        <Card className={`p-6 ${levelConfig[myRisk.riskLevel].bg} ${levelConfig[myRisk.riskLevel].border} border`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-card flex items-center justify-center shadow-sm">
                <Shield className={`h-8 w-8 ${levelConfig[myRisk.riskLevel].color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Risk Level</p>
                <p className={`text-3xl font-bold ${levelConfig[myRisk.riskLevel].color}`}>{levelConfig[myRisk.riskLevel].label}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Risk Score</p>
              <p className={`text-4xl font-bold ${levelConfig[myRisk.riskLevel].color}`}>{myRisk.riskScore}<span className="text-lg text-muted-foreground">/100</span></p>
            </div>
          </div>
        </Card>
      )}

      {isAdmin && (
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-success/5"><p className="text-xs text-muted-foreground">Low Risk</p><p className="text-2xl font-bold text-success mt-1">{riskPredictions.filter(r => r.riskLevel === 'low').length}</p></Card>
          <Card className="p-4 bg-warning/5"><p className="text-xs text-muted-foreground">Medium Risk</p><p className="text-2xl font-bold text-warning mt-1">{riskPredictions.filter(r => r.riskLevel === 'medium').length}</p></Card>
          <Card className="p-4 bg-destructive/5"><p className="text-xs text-muted-foreground">High Risk</p><p className="text-2xl font-bold text-destructive mt-1">{riskPredictions.filter(r => r.riskLevel === 'high').length}</p></Card>
        </div>
      )}

      <div className="space-y-4">
        {data.map(risk => {
          const config = levelConfig[risk.riskLevel];
          return (
            <Card key={risk.studentId} className={`p-5 ${config.border} border`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                    <AlertTriangle className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{risk.studentName}</p>
                    <p className="text-xs text-muted-foreground">{risk.enrollmentNo} • {risk.department}</p>
                  </div>
                </div>
                <Badge className={`${config.bg} ${config.color} border-0`}>{config.label}</Badge>
              </div>

              <div className="grid sm:grid-cols-4 gap-3 mt-4">
                {risk.factors.map(f => (
                  <div key={f.label} className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                    <p className={`text-lg font-bold ${f.type === 'negative' ? 'text-destructive' : f.type === 'positive' ? 'text-success' : 'text-muted-foreground'}`}>{f.value}{typeof f.value === 'number' && f.value < 10 ? '' : '%'}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Risk Reasons</p>
                  <ul className="space-y-1">
                    {risk.reasons.map((reason, i) => <li key={i} className="text-xs flex items-start gap-1.5"><span className="text-destructive mt-0.5">•</span>{reason}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Recommended Interventions</p>
                  <ul className="space-y-1">
                    {risk.recommendations.map((rec, i) => <li key={i} className="text-xs flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>{rec}</li>)}
                  </ul>
                </div>
              </div>

              {isAdmin && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  <Button variant="outline" size="sm" onClick={() => toast({ title: 'Faculty Notified', description: `Faculty assigned for ${risk.studentName}.` })}>
                    <UserCog className="h-3.5 w-3.5 mr-1" /> Assign Faculty
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: 'Parent Notified', description: `Parent of ${risk.studentName} notified.` })}>
                    <Bell className="h-3.5 w-3.5 mr-1" /> Notify Parent
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: 'Counseling Scheduled', description: `Counseling session arranged for ${risk.studentName}.` })}>
                    <MessageSquare className="h-3.5 w-3.5 mr-1" /> Schedule Counseling
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="p-4 bg-muted/30">
        <p className="text-xs text-muted-foreground">
          <Lightbulb className="h-3 w-3 inline mr-1" />
          Risk predictions are based on demo indicators (attendance, academics, engagement). They are not guaranteed facts and should be used as early warning support, not definitive judgments.
        </p>
      </Card>
    </div>
  );
}
