import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileText, CheckCircle2, XCircle, Clock, Eye, GraduationCap } from 'lucide-react';
import { admissions } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';
import type { Admission } from '@/lib/types';
import { useState } from 'react';

const statusConfig = {
  draft: { label: 'Draft', icon: FileText, color: 'text-muted-foreground' },
  submitted: { label: 'Submitted', icon: Clock, color: 'text-primary' },
  'under-review': { label: 'Under Review', icon: Eye, color: 'text-warning' },
  approved: { label: 'Approved', icon: CheckCircle2, color: 'text-success' },
  enrolled: { label: 'Enrolled', icon: GraduationCap, color: 'text-success' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'text-destructive' },
};

export function AdmissionsPage() {
  const [list, setList] = useState<Admission[]>(admissions);
  const [selected, setSelected] = useState<string | null>(null);
  const [enrollNo, setEnrollNo] = useState('');
  const { toast } = useToast();

  const selectedApp = list.find(a => a.id === selected);

  const handleApprove = () => {
    setList(list.map(a => a.id === selected ? { ...a, status: 'enrolled', enrollmentNo: enrollNo } : a));
    toast({ title: 'Student Enrolled', description: `Enrollment number ${enrollNo} assigned.` });
    setSelected(null);
    setEnrollNo('');
  };

  const handleReject = () => {
    setList(list.map(a => a.id === selected ? { ...a, status: 'rejected' } : a));
    toast({ title: 'Application Rejected', description: 'The application has been rejected.' });
    setSelected(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Digital Admissions</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and manage admission applications.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(statusConfig).filter(([k]) => k !== 'rejected').map(([key, config]) => (
          <Card key={key} className="p-4"><p className="text-xs text-muted-foreground">{config.label}</p><p className="text-2xl font-bold mt-1">{list.filter(a => a.status === key).length}</p></Card>
        ))}
      </div>

      <div className="space-y-3">
        {list.map(app => {
          const config = statusConfig[app.status];
          const Icon = config.icon;
          return (
            <Card key={app.id} className="p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary">{app.applicantName.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{app.applicantName}</p>
                    <p className="text-xs text-muted-foreground">{app.course} • Applied: {app.appliedDate}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{app.email}</span><span>{app.phone}</span>
                      <span>{app.documents.length} documents uploaded</span>
                      {app.enrollmentNo && <Badge variant="default" className="text-xs">{app.enrollmentNo}</Badge>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5"><Icon className={`h-4 w-4 ${config.color}`} /><span className={`text-xs font-medium ${config.color}`}>{config.label}</span></div>
                  {(app.status === 'under-review' || app.status === 'submitted') && <Button size="sm" onClick={() => setSelected(app.id)}>Review</Button>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-4">Admission Workflow</h3>
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2">
          {['Draft', 'Submitted', 'Under Review', 'Approved', 'Enrolled'].map((step, i) => (
            <div key={step} className="flex items-center gap-2 shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{i + 1}</div>
              <span className="text-xs font-medium whitespace-nowrap">{step}</span>
              {i < 4 && <div className="h-px w-6 sm:w-12 bg-border" />}
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          {selectedApp && (
            <>
              <DialogHeader><DialogTitle>Review Application</DialogTitle><DialogDescription>{selectedApp.applicantName} • {selectedApp.course}</DialogDescription></DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{selectedApp.email}</p></div>
                  <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{selectedApp.phone}</p></div>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Uploaded Documents</p>
                  <div className="space-y-1">
                    {selectedApp.documents.map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-muted-foreground" /> {doc} <CheckCircle2 className="h-3.5 w-3.5 text-success ml-auto" /></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Assign Enrollment Number</Label>
                  <Input value={enrollNo} onChange={(e) => setEnrollNo(e.target.value)} placeholder="e.g., MP2026CS101" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="text-destructive" onClick={handleReject}><XCircle className="h-4 w-4 mr-2" /> Reject</Button>
                <Button onClick={handleApprove} disabled={!enrollNo}><CheckCircle2 className="h-4 w-4 mr-2" /> Approve & Enroll</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
