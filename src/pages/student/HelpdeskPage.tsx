import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, HelpCircle, Clock, User, Building2, MessageSquare } from 'lucide-react';
import { helpdeskTickets } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';
import type { HelpdeskTicket } from '@/lib/types';

const categories = ['Academic', 'Fees', 'Hostel', 'Transport', 'Certificates', 'Examination', 'IT Support', 'Library', 'Other'];

export function HelpdeskPage() {
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState<HelpdeskTicket[]>(helpdeskTickets);
  const [form, setForm] = useState({ category: '', subject: '', description: '', priority: 'medium' });
  const { toast } = useToast();

  const handleSubmit = () => {
    const deptMap: Record<string, string> = { Academic: 'Academic Office', Fees: 'Finance', Hostel: 'Hostel', Transport: 'Transport', Certificates: 'Admin', Examination: 'Examination Cell', 'IT Support': 'IT', Library: 'Library', Other: 'Admin' };
    const newTicket: HelpdeskTicket = {
      id: `h${Date.now()}`,
      ticketId: `TKT-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
      category: form.category,
      subject: form.subject,
      description: form.description,
      priority: form.priority as 'low' | 'medium' | 'high',
      status: 'created',
      assignedTo: deptMap[form.category] || 'Admin',
      department: deptMap[form.category] || 'Admin',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setTickets([newTicket, ...tickets]);
    setOpen(false);
    setForm({ category: '', subject: '', description: '', priority: 'medium' });
    toast({ title: 'Ticket Created', description: `Ticket ${newTicket.ticketId} has been created and auto-routed to ${newTicket.assignedTo}.` });
  };

  const statusColor: Record<string, string> = { created: 'text-muted-foreground', assigned: 'text-primary', 'in-progress': 'text-warning', resolved: 'text-success' };
  const priorityColor: Record<string, string> = { low: 'secondary', medium: 'default', high: 'destructive' };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Student Helpdesk</h1>
          <p className="text-muted-foreground text-sm mt-1">Raise and track service requests with automated routing.</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> New Ticket</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4"><p className="text-xs text-muted-foreground">Total Tickets</p><p className="text-2xl font-bold mt-1">{tickets.length}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">In Progress</p><p className="text-2xl font-bold text-warning mt-1">{tickets.filter(t => t.status === 'in-progress' || t.status === 'assigned').length}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Resolved</p><p className="text-2xl font-bold text-success mt-1">{tickets.filter(t => t.status === 'resolved').length}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Avg Response</p><p className="text-2xl font-bold mt-1">2.3d</p></Card>
      </div>

      <div className="space-y-3">
        {tickets.map(ticket => (
          <Card key={ticket.id} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-muted-foreground">{ticket.ticketId}</span>
                    <Badge variant={priorityColor[ticket.priority] as any} className="capitalize text-xs">{ticket.priority}</Badge>
                    <Badge variant="outline" className="text-xs">{ticket.category}</Badge>
                  </div>
                  <p className="font-medium text-sm mt-1">{ticket.subject}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ticket.description}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ticket.createdAt}</span>
                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {ticket.department}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {ticket.assignedTo}</span>
                  </div>
                  {ticket.response && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg text-sm">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><MessageSquare className="h-3 w-3" /> Response</p>
                      {ticket.response}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <Badge variant="outline" className={`capitalize ${statusColor[ticket.status]}`}>{ticket.status.replace('-', ' ')}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Helpdesk Ticket</DialogTitle>
            <DialogDescription>Your ticket will be auto-routed to the relevant department.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Brief summary of your issue" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your issue in detail..." />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!form.category || !form.subject}>Submit Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
