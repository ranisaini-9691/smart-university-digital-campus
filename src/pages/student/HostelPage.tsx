import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartCard } from '@/components/shared/ChartCard';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Bed, Plus, ArrowRightLeft, Wrench, Home } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { hostelRooms, hostelAllocation, hostelOccupancyData } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';

export function HostelPage() {
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [changeOpen, setChangeOpen] = useState(false);
  const [complaint, setComplaint] = useState('');
  const { toast } = useToast();

  const totalRooms = hostelRooms.length;
  const totalCapacity = hostelRooms.reduce((a, r) => a + r.capacity, 0);
  const totalOccupied = hostelRooms.reduce((a, r) => a + r.occupied, 0);
  const occupancyRate = Math.round((totalOccupied / totalCapacity) * 100);
  const available = hostelRooms.filter(r => r.status === 'available').length;
  const maintenance = hostelRooms.filter(r => r.status === 'maintenance').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Hostel Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Your hostel allocation, room details, and service requests.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5"><p className="text-xs text-muted-foreground">Your Room</p><p className="text-xl font-bold mt-1">{hostelAllocation.roomNo}</p><p className="text-xs text-muted-foreground">{hostelAllocation.building} • {hostelAllocation.bedNo}</p></Card>
        <Card className="p-5"><p className="text-xs text-muted-foreground">Occupancy Rate</p><p className="text-2xl font-bold mt-1">{occupancyRate}%</p></Card>
        <Card className="p-5"><p className="text-xs text-muted-foreground">Available Rooms</p><p className="text-2xl font-bold text-success mt-1">{available}</p></Card>
        <Card className="p-5"><p className="text-xs text-muted-foreground">Under Maintenance</p><p className="text-2xl font-bold text-warning mt-1">{maintenance}</p></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center"><Home className="h-6 w-6 text-primary" /></div>
            <div><p className="font-semibold">My Allocation</p><p className="text-xs text-muted-foreground">Active since {hostelAllocation.joinDate}</p></div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Building</span><span className="font-medium">{hostelAllocation.building}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Room</span><span className="font-medium">{hostelAllocation.roomNo}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Bed</span><span className="font-medium">{hostelAllocation.bedNo}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Status</span><Badge variant="default">Active</Badge></div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => setComplaintOpen(true)}><Wrench className="h-3.5 w-3.5 mr-1" /> Complaint</Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => setChangeOpen(true)}><ArrowRightLeft className="h-3.5 w-3.5 mr-1" /> Room Change</Button>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <ChartCard title="Hostel Occupancy" description="Building-wise occupancy">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hostelOccupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="block" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="occupied" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Room Availability</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {hostelRooms.map(room => (
            <Card key={room.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{room.roomNo}</span>
                </div>
                <Badge variant={room.status === 'available' ? 'default' : room.status === 'maintenance' ? 'secondary' : 'outline'} className="capitalize">{room.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{room.building} • Floor {room.floor} • {room.type}</p>
              <div className="flex items-center gap-2 mt-2">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <Progress value={(room.occupied / room.capacity) * 100} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground">{room.occupied}/{room.capacity}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={complaintOpen} onOpenChange={setComplaintOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Hostel Complaint</DialogTitle><DialogDescription>Submit a maintenance or service complaint.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Complaint Type</Label>
              <Select defaultValue="maintenance">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Maintenance</SelectItem><SelectItem value="cleanliness">Cleanliness</SelectItem><SelectItem value="electrical">Electrical</SelectItem><SelectItem value="plumbing">Plumbing</SelectItem><SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={complaint} onChange={(e) => setComplaint(e.target.value)} placeholder="Describe the issue..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComplaintOpen(false)}>Cancel</Button>
            <Button onClick={() => { setComplaintOpen(false); setComplaint(''); toast({ title: 'Complaint Submitted', description: 'Your hostel complaint has been filed.' }); }}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={changeOpen} onOpenChange={setChangeOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Room Change Request</DialogTitle><DialogDescription>Request a transfer to a different room.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Preferred Building</Label>
              <Select defaultValue="Block A">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Block A">Block A</SelectItem><SelectItem value="Block B">Block B</SelectItem><SelectItem value="Block C">Block C</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Reason</Label><Textarea placeholder="Why do you want to change rooms?" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChangeOpen(false)}>Cancel</Button>
            <Button onClick={() => { setChangeOpen(false); toast({ title: 'Request Submitted', description: 'Your room change request has been submitted.' }); }}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
