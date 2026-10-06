import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, CheckCheck, Calendar, CreditCard, Award, Bus, Building2, FileText, HelpCircle, Trophy, AlertCircle } from 'lucide-react';
import { notifications, parentAlerts } from '@/lib/demo-data';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const typeIcon: Record<string, any> = {
  academic: FileText, fees: CreditCard, attendance: Calendar, hostel: Building2,
  transport: Bus, certificate: Award, helpdesk: HelpCircle, events: Trophy, emergency: AlertCircle,
};
const typeColor: Record<string, string> = {
  academic: 'text-primary', fees: 'text-warning', attendance: 'text-primary', hostel: 'text-warning',
  transport: 'text-accent', certificate: 'text-success', helpdesk: 'text-primary', events: 'text-primary', emergency: 'text-destructive',
};

export function NotificationsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifList, setNotifList] = useState(user?.role === 'parent' ? parentAlerts : notifications);

  const markAllRead = () => {
    setNotifList(notifList.map(n => ({ ...n, read: true })));
    toast({ title: 'All notifications marked as read' });
  };

  const unread = notifList.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Notification Center</h1>
          <p className="text-muted-foreground text-sm mt-1">{unread} unread notification{unread !== 1 ? 's' : ''}</p>
        </div>
        <Button variant="outline" onClick={markAllRead}><CheckCheck className="h-4 w-4 mr-2" /> Mark all read</Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList><TabsTrigger value="all">All ({notifList.length})</TabsTrigger><TabsTrigger value="unread">Unread ({unread})</TabsTrigger></TabsList>

        <TabsContent value="all" className="space-y-2">
          {notifList.map(n => {
            const Icon = typeIcon[n.type] || Bell;
            return (
              <Card key={n.id} className={`p-4 ${!n.read ? 'bg-primary/5 border-primary/20' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 ${typeColor[n.type]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm">{n.title}</p>
                      {!n.read && <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{n.timestamp}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="unread" className="space-y-2">
          {notifList.filter(n => !n.read).map(n => {
            const Icon = typeIcon[n.type] || Bell;
            return (
              <Card key={n.id} className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 ${typeColor[n.type]}`}><Icon className="h-5 w-5" /></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{n.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{n.timestamp}</p>
                  </div>
                </div>
              </Card>
            );
          })}
          {notifList.filter(n => !n.read).length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">All caught up! No unread notifications.</Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
