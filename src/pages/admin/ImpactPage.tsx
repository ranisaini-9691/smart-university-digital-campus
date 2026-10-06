import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Vote, TrendingDown, Clock, FileText, Users, Zap, Shield } from 'lucide-react';

export function ImpactPage() {
  const impacts = [
    { metric: '60%', label: 'Reduction in Manual Service Requests', desc: 'Automated workflows handle routine tasks like certificate processing and complaint routing.', icon: Zap },
    { metric: '40%', label: 'Faster Grievance Resolution', desc: 'Auto-routing and AI-assisted prioritization reduced average resolution time from 4 days to 2.3 days.', icon: Clock },
    { metric: '30%', label: 'Faster Certificate Processing', desc: 'Digital certificate automation reduced processing from 3 days to 1.5 days on average.', icon: FileText },
    { metric: '95%', label: 'Digital Transaction Rate', desc: '95% of university services are now handled digitally without physical office visits.', icon: TrendingDown },
    { metric: '100+', label: 'Paperless Digital Services', desc: 'Over 100 services available fully online, eliminating paper-based processes.', icon: Shield },
    { metric: '3x', label: 'Improved Parent Engagement', desc: 'Real-time alerts and parent portal increased parent participation by 3x.', icon: Users },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Vote className="h-6 w-6 text-primary" /> Impact for Viksit Bharat</h1>
        <p className="text-muted-foreground text-sm mt-1">Projected impact of the Smart University Digital Campus platform.</p>
      </div>

      <Card className="p-4 bg-warning/5 border-warning/20">
        <p className="text-sm text-muted-foreground">These are projected/demo impact estimates based on platform capabilities, not measured real-world results.</p>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {impacts.map(impact => (
          <Card key={impact.label} className="p-6 hover:shadow-lg transition-shadow gradient-card">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <impact.icon className="h-6 w-6 text-primary" />
            </div>
            <p className="text-4xl font-bold text-gradient mb-2">{impact.metric}</p>
            <p className="font-semibold text-sm">{impact.label}</p>
            <p className="text-xs text-muted-foreground mt-2">{impact.desc}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6 gradient-hero text-white border-0">
        <h3 className="font-bold text-lg mb-4">Alignment with National Goals</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Digital Campus', desc: 'Transforming university operations through digital technology' },
            { title: 'Ease of Governance', desc: 'Simplifying administrative processes for students and staff' },
            { title: 'Smart Universities', desc: 'AI-powered insights and automation for better decision-making' },
            { title: 'Viksit Bharat', desc: 'Building a developed India through digital governance innovation' },
          ].map(item => (
            <div key={item.title} className="bg-white/10 rounded-xl p-4">
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-white/70 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-4">Innovation for Madhya Pradesh</h3>
        <p className="text-sm text-muted-foreground">
          This platform demonstrates how universities in Madhya Pradesh can leverage digital technology
          to improve governance, enhance student experience, and contribute to the vision of Viksit Bharat.
          By bringing all campus services into one unified ecosystem, we reduce administrative overhead,
          improve transparency, and ensure that every student has access to the services they need —
          anytime, anywhere, from any device.
        </p>
      </Card>
    </div>
  );
}
