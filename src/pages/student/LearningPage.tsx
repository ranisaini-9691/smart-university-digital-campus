import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Play, FileText, Download, Calendar, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { learningRecommendations, performancePrediction } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';

const actionIcon: Record<string, any> = { 'Start Module': Play, 'Take Quiz': FileText, 'Watch Now': Play, 'Download': Download, 'Book Slot': Calendar, 'Reserve Book': BookOpen };
const priorityColor: Record<string, string> = { high: 'destructive', medium: 'secondary', low: 'outline' };

export function LearningPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">My Learning Plan</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-powered personalized learning recommendations.</p>
      </div>

      <Card className="p-6 gradient-card border-primary/20">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">AI Analysis Summary</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Based on your academic performance, attendance patterns, and learning activity, we've identified areas for improvement.
              Your Computer Networks performance needs attention — we recommend focusing on foundational concepts and practice.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">CGPA</p><p className="text-lg font-bold">{performancePrediction.currentCGPA}</p></div>
              <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Attendance</p><p className="text-lg font-bold">{performancePrediction.attendance}%</p></div>
              <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Assignments</p><p className="text-lg font-bold">{performancePrediction.assignmentCompletion}%</p></div>
              <div className="bg-card rounded-lg p-3"><p className="text-xs text-muted-foreground">Predicted Score</p><p className="text-lg font-bold text-primary">{performancePrediction.predictedScore}%</p></div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-sm mb-3">Positive Factors</h3>
          <Card className="p-4 space-y-2">
            {performancePrediction.positiveFactors.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-success font-bold">+</span><span>{f}</span>
              </div>
            ))}
          </Card>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-3">Risk Factors</h3>
          <Card className="p-4 space-y-2">
            {performancePrediction.riskFactors.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-destructive font-bold">!</span><span>{f}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Personalized Recommendations</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {learningRecommendations.map(rec => {
            const Icon = actionIcon[rec.action] || ArrowRight;
            return (
              <Card key={rec.id} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{rec.subject}</Badge>
                    <Badge variant={priorityColor[rec.priority] as any} className="text-xs capitalize">{rec.priority}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{rec.type}</span>
                </div>
                <p className="font-semibold text-sm">{rec.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => toast({ title: rec.action, description: `${rec.title} — action initiated.` })}>
                  <Icon className="h-3.5 w-3.5 mr-1" /> {rec.action}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="p-4 bg-muted/30">
        <p className="text-xs text-muted-foreground">
          <Clock className="h-3 w-3 inline mr-1" />
          Recommendations are generated by AI analysis of your academic data. They are learning suggestions, not mandatory requirements.
        </p>
      </Card>
    </div>
  );
}
