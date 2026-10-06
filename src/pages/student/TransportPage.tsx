import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bus, MapPin, Clock, User, Phone, Navigation, Activity } from 'lucide-react';
import { buses, busRoutes } from '@/lib/demo-data';

export function TransportPage() {
  const [tab, setTab] = useState('buses');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Smart Transport</h1>
        <p className="text-muted-foreground text-sm mt-1">Live bus tracking, routes, and schedules.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5"><p className="text-xs text-muted-foreground">Total Buses</p><p className="text-2xl font-bold mt-1">{buses.length}</p></Card>
        <Card className="p-5"><p className="text-xs text-muted-foreground">On Route</p><p className="text-2xl font-bold text-success mt-1">{buses.filter(b => b.status === 'on-route').length}</p></Card>
        <Card className="p-5"><p className="text-xs text-muted-foreground">Total Routes</p><p className="text-2xl font-bold mt-1">{busRoutes.length}</p></Card>
        <Card className="p-5"><p className="text-xs text-muted-foreground">Your Bus</p><p className="text-lg font-bold mt-1">MP-04-AB-1234</p></Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList><TabsTrigger value="buses">Live Buses</TabsTrigger><TabsTrigger value="routes">Routes</TabsTrigger></TabsList>

        <TabsContent value="buses" className="space-y-3">
          {buses.map(bus => (
            <Card key={bus.id} className="p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${bus.status === 'on-route' ? 'bg-success/10' : bus.status === 'idle' ? 'bg-muted' : 'bg-warning/10'}`}>
                    <Bus className={`h-6 w-6 ${bus.status === 'on-route' ? 'text-success' : bus.status === 'idle' ? 'text-muted-foreground' : 'text-warning'}`} />
                  </div>
                  <div>
                    <p className="font-semibold">{bus.busNo}</p>
                    <p className="text-sm text-muted-foreground">{bus.route}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {bus.driver}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {bus.driverPhone}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {bus.currentLocation.label}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={bus.status === 'on-route' ? 'default' : 'secondary'} className="capitalize mb-2">{bus.status.replace('-', ' ')}</Badge>
                  {bus.status === 'on-route' && (
                    <div className="text-sm">
                      <p className="text-muted-foreground text-xs">Next Stop</p>
                      <p className="font-medium">{bus.nextStop}</p>
                      <p className="text-xs text-primary flex items-center gap-1 justify-end"><Clock className="h-3 w-3" /> ETA: {bus.eta}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${bus.occupied / bus.capacity > 0.9 ? 'bg-destructive' : 'bg-success'}`} style={{ width: `${(bus.occupied / bus.capacity) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{bus.occupied}/{bus.capacity} passengers</span>
                </div>
              </div>
              {bus.status === 'on-route' && (
                <Button variant="outline" size="sm" className="mt-3" onClick={() => {}}>
                  <Navigation className="h-3.5 w-3.5 mr-1" /> Track Live
                </Button>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="routes" className="space-y-3">
          {busRoutes.map(route => (
            <Card key={route.id} className="p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-sm text-primary">{route.routeNo}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{route.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Bus: {route.busNo} • Timings: {route.timings}</p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      {route.stops.map((stop, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs">
                          {i > 0 && <span className="text-muted-foreground">→</span>}
                          <span className="bg-muted px-2 py-0.5 rounded-full">{stop}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm"><MapPin className="h-3.5 w-3.5 mr-1" /> View Map</Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5 text-primary animate-pulse" />
          <p className="text-sm">Live tracking updates every 3 seconds. Locations are simulated for demo purposes.</p>
        </div>
      </Card>
    </div>
  );
}
