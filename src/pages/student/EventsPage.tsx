import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, MapPin, Clock, Users, QrCode, Trophy, Code, Music, Dumbbell, Users2 } from 'lucide-react';
import { events } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';

const categoryIcon: Record<string, any> = { Hackathon: Code, Workshop: Code, Sports: Dumbbell, Cultural: Music, Clubs: Users2 };

export function EventsPage() {
  const [eventsList, setEventsList] = useState(events);
  const { toast } = useToast();

  const handleRegister = (id: string) => {
    setEventsList(eventsList.map(e => e.id === id ? { ...e, registered: true, registeredCount: e.registeredCount + 1 } : e));
    toast({ title: 'Registered Successfully', description: 'Your QR event pass has been generated.' });
  };

  const myEvents = eventsList.filter(e => e.registered);
  const upcoming = eventsList;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Events & Student Life</h1>
        <p className="text-muted-foreground text-sm mt-1">Discover and register for campus events, workshops, and activities.</p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList><TabsTrigger value="upcoming">All Events</TabsTrigger><TabsTrigger value="mine">My Events</TabsTrigger></TabsList>

        <TabsContent value="upcoming" className="grid sm:grid-cols-2 gap-4">
          {eventsList.map(event => {
            const Icon = categoryIcon[event.category] || Trophy;
            const fillRate = (event.registeredCount / event.capacity) * 100;
            return (
              <Card key={event.id} className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Icon className="h-6 w-6 text-primary" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm">{event.title}</p>
                      <Badge variant="outline" className="shrink-0 text-xs">{event.category}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.venue}</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <Progress value={fillRate} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground">{event.registeredCount}/{event.capacity}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      {event.registered ? (
                        <Button variant="outline" size="sm" className="w-full" onClick={() => toast({ title: 'QR Pass', description: 'Your event QR pass is ready.' })}>
                          <QrCode className="h-3.5 w-3.5 mr-1" /> View QR Pass
                        </Button>
                      ) : (
                        <Button size="sm" className="w-full" onClick={() => handleRegister(event.id)} disabled={fillRate >= 100}>
                          Register Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="mine" className="space-y-3">
          {myEvents.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">You haven't registered for any events yet.</Card>
          ) : (
            myEvents.map(event => (
              <Card key={event.id} className="p-5 border-primary/20">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0"><Trophy className="h-6 w-6 text-success" /></div>
                    <div>
                      <p className="font-semibold text-sm">{event.title}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.venue}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: 'QR Pass', description: `QR pass for ${event.title} is ready.` })}>
                    <QrCode className="h-3.5 w-3.5 mr-1" /> QR Pass
                  </Button>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
