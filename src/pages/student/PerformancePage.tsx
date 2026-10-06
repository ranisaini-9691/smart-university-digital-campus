import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartCard } from '@/components/shared/ChartCard';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, CheckCircle2, AlertTriangle, Brain } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { performancePrediction, performanceData } from '@/lib/demo-data';

export function PerformancePage() {
  const categoryConfig = {
    excellent: { label: 'Excellent', color: 'text-success', bg: 'bg-success/10' },
    good: { label: 'Good', color: 'text-primary', bg: 'bg-primary/10' },
    'needs-attention': { label: 'Needs Attention', color: 'text-warning', bg: 'bg-warning/10' },
    'at-risk': { label: 'At Risk', color: 'text-destructive', bg: 'bg-destructive/10' },
  };
  const cat = categoryConfig[performancePrediction.category];

  const radarData = [
    { subject: 'CGPA', value: (performancePrediction.currentCGPA / 10) * 100 },
    { subject: 'Attendance', value: performancePrediction.attendance },
    { subject: 'Assignments', value: performancePrediction.assignmentCompletion },
    { subject: 'Internal', value: performancePrediction.internalMarks },
    { subject: 'Activity', value: performancePrediction.learningActivity },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Student Performance Prediction</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-powered analysis of your academic performance.</p>
      </div>

      <Card className={`p-6 ${cat.bg} border-0`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-card flex items-center justify-center shadow-sm">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Predicted Performance Score</p>
              <p className="text-4xl font-bold">{performancePrediction.predictedScore}%</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className={`${cat.bg} ${cat.color} border-0 capitalize`}>{cat.label}</Badge>
            <p className="text-sm text-muted-foreground mt-2">Based on 5 key indicators</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'CGPA', value: performancePrediction.currentCGPA, max: 10 },
          { label: 'Attendance', value: `${performancePrediction.attendance}%`, max: 100 },
          { label: 'Assignments', value: `${performancePrediction.assignmentCompletion}%`, max: 100 },
          { label: 'Internal Marks', value: `${performancePrediction.internalMarks}%`, max: 100 },
          { label: 'Learning Activity', value: `${performancePrediction.learningActivity}%`, max: 100 },
        ].map(item => (
          <Card key={item.label} className="p-4 text-center">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-xl font-bold mt-1">{item.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Performance Radar" description="Multi-dimensional analysis">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Subject Performance" description="Current semester scores">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4"><CheckCircle2 className="h-5 w-5 text-success" /><h3 className="font-semibold text-sm">Positive Factors</h3></div>
          <div className="space-y-3">
            {performancePrediction.positiveFactors.map((f, i) => (
              <div key={i} className="flex items-start gap-2"><span className="text-success font-bold mt-0.5">+</span><span className="text-sm">{f}</span></div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4"><AlertTriangle className="h-5 w-5 text-warning" /><h3 className="font-semibold text-sm">Risk Factors</h3></div>
          <div className="space-y-3">
            {performancePrediction.riskFactors.map((f, i) => (
              <div key={i} className="flex items-start gap-2"><span className="text-warning font-bold mt-0.5">!</span><span className="text-sm">{f}</span></div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-muted/30">
        <p className="text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3 inline mr-1" />
          This is a transparent demo scoring based on academic indicators. It is not an official prediction or assessment.
        </p>
      </Card>
    </div>
  );
}
