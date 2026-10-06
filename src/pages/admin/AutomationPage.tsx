import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Zap, ArrowRight, Bell, Cog, Sparkles } from 'lucide-react';
import { automationWorkflows } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';
import type { AutomationWorkflow } from '@/lib/types';

export function AutomationPage() {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(automationWorkflows);
  const { toast } = useToast();

  const toggle = (id: string) => {
    setWorkflows(workflows.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
    const wf = workflows.find(w => w.id === id);
    toast({ title: wf?.enabled ? 'Workflow Disabled' : 'Workflow Enabled', description: `${wf?.name} has been ${wf?.enabled ? 'disabled' : 'enabled'}.` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Zap className="h-6 w-6 text-primary" /> Smart Automation Center</h1>
        <p className="text-muted-foreground text-sm mt-1">Automated workflows for routine administrative processes.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4"><p className="text-xs text-muted-foreground">Active Workflows</p><p className="text-2xl font-bold mt-1">{workflows.filter(w => w.enabled).length}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Total Workflows</p><p className="text-2xl font-bold mt-1">{workflows.length}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Auto-Actions Today</p><p className="text-2xl font-bold text-success mt-1">347</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Notifications Sent</p><p className="text-2xl font-bold text-primary mt-1">1,289</p></Card>
      </div>

      <div className="space-y-4">
        {workflows.map(wf => (
          <Card key={wf.id} className="p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${wf.enabled ? 'bg-success/10' : 'bg-muted'}`}>
                    <Zap className={`h-5 w-5 ${wf.enabled ? 'text-success' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{wf.name}</p>
                    <Badge variant="outline" className="text-xs">{wf.category}</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 text-xs">
                    <span className="font-semibold text-muted-foreground">Trigger:</span><span>{wf.trigger}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground self-center" />
                  <div className="flex items-center gap-2 bg-primary/5 rounded-lg px-3 py-2 text-xs">
                    <Cog className="h-3 w-3 text-primary" /><span>{wf.rule}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground self-center" />
                  <div className="flex items-center gap-2 bg-accent/5 rounded-lg px-3 py-2 text-xs">
                    <Sparkles className="h-3 w-3 text-accent" /><span>{wf.action}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground self-center" />
                  <div className="flex items-center gap-2 bg-warning/5 rounded-lg px-3 py-2 text-xs">
                    <Bell className="h-3 w-3 text-warning" /><span>{wf.notification}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-medium ${wf.enabled ? 'text-success' : 'text-muted-foreground'}`}>{wf.enabled ? 'Enabled' : 'Disabled'}</span>
                <Switch checked={wf.enabled} onCheckedChange={() => toggle(wf.id)} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-muted/30">
        <p className="text-xs text-muted-foreground">Automation workflows run automatically based on configured triggers. Each action is logged for audit purposes.</p>
      </Card>
    </div>
  );
}
