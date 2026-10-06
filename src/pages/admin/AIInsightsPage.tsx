import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, TrendingDown, Minus, AlertTriangle, Info, CheckCircle2, Zap } from 'lucide-react';
import { aiInsights } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';

export function AIInsightsPage() {
  const { toast } = useToast();

  const severityConfig = {
    critical: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' },
    warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
    info: { icon: Info, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  };
  const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
  const trendColor = { up: 'text-warning', down: 'text-success', stable: 'text-muted-foreground' };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Lightbulb className="h-6 w-6 text-primary" /> AI Governance Insights</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-assisted decision support for university administration.</p>
      </div>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm">These insights are AI-assisted recommendations for decision support. They are not automatic administrative decisions and require human review before action.</p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {aiInsights.map(insight => {
          const config = severityConfig[insight.severity];
          const TrendI = trendIcon[insight.trend];
          return (
            <Card key={insight.id} className={`p-5 ${config.border} border`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                    <config.icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs">{insight.category}</Badge>
                    <span className={`ml-2 text-xs font-medium ${trendColor[insight.trend]} flex items-center gap-0.5 inline-flex`}>
                      <TrendI className="h-3 w-3" /> {insight.metric}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium">{insight.insight}</p>
              <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Recommended Action</p>
                <p className="text-sm">{insight.recommendation}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => toast({ title: 'Action Initiated', description: `Recommendation for ${insight.category} has been noted for review.` })}>
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Mark for Review
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
