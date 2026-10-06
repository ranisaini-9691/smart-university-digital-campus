import { StatCard } from '@/components/shared/StatCard';
import { ChartCard } from '@/components/shared/ChartCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, Bus, Bed, Wrench, Users, MapPin } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { hostelRooms, buses, busRoutes, hostelOccupancyData, transportUsageData } from '@/lib/demo-data';
import { useNavigate } from 'react-router-dom';

export function CampusDashboard() {
  const navigate = useNavigate();
  const totalRooms = hostelRooms.length;
  const totalCapacity = hostelRooms.reduce((a, r) => a + r.capacity, 0);
  const totalOccupied = hostelRooms.reduce((a, r) => a + r.occupied, 0);
  const available = hostelRooms.filter(r => r.status === 'available').length;
  const maintenance = hostelRooms.filter(r => r.status === 'maintenance').length;
  const activeBuses = buses.filter(b => b.status === 'on-route').length;
  const totalPassengers = buses.reduce((a, b) => a + b.occupied, 0);
  const avgUtilization = Math.round((totalPassengers / buses.reduce((a, b) => a + b.capacity, 0)) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Campus Officer Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Hostel and transport management overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Rooms" value={totalRooms} icon={Bed} color="primary" />
        <StatCard title="Available" value={available} icon={Building2} color="success" />
        <StatCard title="Under Maintenance" value={maintenance} icon={Wrench} color="warning" />
        <StatCard title="Occupancy Rate" value={`${Math.round((totalOccupied / totalCapacity) * 100)}%`} icon={Users} color="accent" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Hostel Occupancy" description="Building-wise">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hostelOccupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="block" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="occupied" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Transport Usage" description="Route-wise utilization %">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={transportUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="route" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="utilization" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Hostel Rooms</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/hostel')}>Manage</Button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {hostelRooms.map(room => (
              <div key={room.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div><p className="font-medium text-sm">{room.roomNo}</p><p className="text-xs text-muted-foreground">{room.building} • Floor {room.floor} • {room.type}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20"><Progress value={(room.occupied / room.capacity) * 100} className="h-1.5" /></div>
                  <span className="text-xs text-muted-foreground">{room.occupied}/{room.capacity}</span>
                  <Badge variant={room.status === 'available' ? 'default' : room.status === 'maintenance' ? 'secondary' : 'outline'} className="text-xs">{room.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Transport Fleet</h3>
            <div className="flex gap-2">
              <StatCard title="Active" value={`${activeBuses}/${buses.length}`} icon={Bus} color="success" />
            </div>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {buses.map(bus => (
              <div key={bus.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Bus className="h-4 w-4 text-muted-foreground" />
                  <div><p className="font-medium text-sm">{bus.busNo}</p><p className="text-xs text-muted-foreground">{bus.route}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{bus.occupied}/{bus.capacity}</span>
                  <Badge variant={bus.status === 'on-route' ? 'default' : 'secondary'} className="text-xs capitalize">{bus.status.replace('-', ' ')}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Button variant="outline" onClick={() => navigate('/dashboard/hostel')} className="justify-start"><Building2 className="h-4 w-4 mr-2" /> Hostel Management</Button>
        <Button variant="outline" onClick={() => navigate('/dashboard/transport')} className="justify-start"><Bus className="h-4 w-4 mr-2" /> Transport</Button>
        <Button variant="outline" onClick={() => navigate('/dashboard/map')} className="justify-start"><MapPin className="h-4 w-4 mr-2" /> Campus Map</Button>
        <Button variant="outline" onClick={() => navigate('/dashboard/grievance')} className="justify-start"><Wrench className="h-4 w-4 mr-2" /> Grievances</Button>
      </div>
    </div>
  );
}
