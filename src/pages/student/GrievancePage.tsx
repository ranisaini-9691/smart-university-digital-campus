import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartCard } from '@/components/shared/ChartCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, MessageSquare, Clock, User, EyeOff } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { complaints, complaintsTrendData } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';
import type { Complaint } from '@/lib/types';

const categories = ['Hostel', 'Classroom', 'Transport', 'Fees', 'Faculty', 'Infrastructure', 'Internet', 'Library', 'Other'];

export function GrievancePage() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<Complaint[]>(complaints);
  const [form, setForm] = useState({ category: '', title: '', description: '', anonymous: false });
  const { toast } = useToast();

  const handleSubmit = () => {
    const deptMap: Record<string, string> = { Hostel: 'Hostel Warden', Classroom: 'Maintenance', Transport: 'Transport Officer', Fees: 'Finance', Faculty: 'HOD', Infrastructure: 'Maintenance', Internet: 'IT', Library: 'Library', Other: 'Admin' };
    const newComplaint: Complaint = {
      id: `cmp${Date.now()}`,
      complaintId: `GRV-2026-${String(Math.floor(Math.random() * 900) + 200)}`,
      category: form.category,
      title: form.title,
      description: form.description,
      status: 'submitted',
      isAnonymous: form.anonymous,
      assignedTo: deptMap[form.category] || 'Admin',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setList([newComplaint, ...list]);
    setOpen(false);
    setForm({ category: '', title: '', description: '', anonymous: false });
    toast({ title: 'Grievance Submitted', description: `Complaint ${newComplaint.complaintId} auto-routed to ${newComplaint.assignedTo}.` });
  };

  const statusColor: Record<string, string> = { submitted: 'text-muted-foreground', assigned: 'text-primary', investigation: 'text-warning', 'action-taken': 'text-primary', resolved: 'text-success' };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Grievance Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Report issues with anonymous reporting option and auto-routing.</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> File Grievance</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4"><p className="text-xs text-muted-foreground">Total</p><p className="text-2xl font-bold mt-1">{list.length}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Under Investigation</p><p className="text-2xl font-bold text-warning mt-1">{list.filter(c => c.status === 'investigation' || c.status === 'assigned').length}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Resolved</p><p className="text-2xl font-bold text-success mt-1">{list.filter(c => c.status === 'resolved').length}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Avg Resolution</p><p className="text-2xl font-bold mt-1">2.3d</p></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          {list.map(c => (
            <Card key={c.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-muted-foreground">{c.complaintId}</span>
                    <Badge variant="outline" className="text-xs">{c.category}</Badge>
                    {c.isAnonymous && <span className="flex items-center gap-1 text-xs text-muted-foreground"><EyeOff className="h-3 w-3" /> Anonymous</span>}
                  </div>
                  <p className="font-medium text-sm mt-1">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.createdAt}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {c.assignedTo}</span>
                  </div>
                  {c.response && <div className="mt-2 p-2 bg-muted/50 rounded text-xs"><span className="text-muted-foreground">Response: </span>{c.response}</div>}
                </div>
                <Badge variant="outline" className={`capitalize shrink-0 ${statusColor[c.status]}`}>{c.status.replace('-', ' ')}</Badge>
              </div>
            </Card>
          ))}
        </div>
        <ChartCard title="Grievance Trend" description="Submitted vs Resolved">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complaintsTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="submitted" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File a Grievance</DialogTitle>
            <DialogDescription>Your complaint will be auto-routed to the relevant department.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Brief title" /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the issue..." /></div>
            <div className="flex items-center gap-2">
              <Checkbox id="anon" checked={form.anonymous} onCheckedChange={(v) => setForm({ ...form, anonymous: !!v })} />
              <Label htmlFor="anon" className="text-sm cursor-pointer">Submit anonymously</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!form.category || !form.title}>Submit Grievance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
