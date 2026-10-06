import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, Plus, Download, QrCode, Shield, CheckCircle2, Clock, FileSearch } from 'lucide-react';
import { certificates, currentStudent } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';
import type { Certificate } from '@/lib/types';

const certTypes = ['Bonafide Certificate', 'Character Certificate', 'Transfer Certificate', 'Migration Certificate', 'Course Completion Certificate'];

export function CertificatePage() {
  const [open, setOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [certList, setCertList] = useState<Certificate[]>(certificates);
  const [certType, setCertType] = useState('');
  const [reason, setReason] = useState('');
  const [verifyId, setVerifyId] = useState('');
  const [verifyResult, setVerifyResult] = useState<'none' | 'valid' | 'invalid' | 'searching'>('none');
  const { toast } = useToast();

  const handleRequest = () => {
    const newCert: Certificate = {
      id: `c${Date.now()}`,
      type: certType,
      status: 'requested',
      requestDate: new Date().toISOString().split('T')[0],
      reason,
    };
    setCertList([...certList, newCert]);
    setOpen(false);
    setCertType('');
    setReason('');
    toast({ title: 'Certificate Requested', description: 'Your request has been submitted for verification.' });
  };

  const handleVerify = () => {
    setVerifyResult('searching');
    setTimeout(() => {
      const found = certList.find(c => c.certificateId === verifyId);
      setVerifyResult(found ? 'valid' : 'invalid');
    }, 1500);
  };

  const statusInfo = {
    requested: { label: 'Requested', icon: Clock, color: 'text-warning' },
    'under-verification': { label: 'Under Verification', icon: FileSearch, color: 'text-primary' },
    approved: { label: 'Approved', icon: CheckCircle2, color: 'text-success' },
    issued: { label: 'Digitally Issued', icon: Shield, color: 'text-success' },
    rejected: { label: 'Rejected', icon: Clock, color: 'text-destructive' },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Digital Certificates</h1>
          <p className="text-muted-foreground text-sm mt-1">Request, track, and verify digital certificates.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setVerifyOpen(true)}><QrCode className="h-4 w-4 mr-2" /> Verify Certificate</Button>
          <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> Request Certificate</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certList.map(cert => {
          const info = statusInfo[cert.status];
          const Icon = info.icon;
          return (
            <Card key={cert.id} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon className={`h-4 w-4 ${info.color}`} />
                  <span className={`text-xs font-medium ${info.color}`}>{info.label}</span>
                </div>
              </div>
              <p className="font-semibold text-sm">{cert.type}</p>
              <p className="text-xs text-muted-foreground mt-1">Requested: {cert.requestDate}</p>
              {cert.certificateId && <p className="text-xs text-muted-foreground mt-1">ID: {cert.certificateId}</p>}
              {cert.issuedDate && <p className="text-xs text-muted-foreground mt-1">Issued: {cert.issuedDate}</p>}
              {cert.status === 'issued' && (
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => toast({ title: 'Downloading Certificate', description: `${cert.type} downloaded as PDF.` })}>
                    <Download className="h-3.5 w-3.5 mr-1" /> Download
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { setVerifyId(cert.certificateId || ''); setVerifyOpen(true); }}>
                    <QrCode className="h-3.5 w-3.5 mr-1" /> Verify
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-4">Certificate Workflow</h3>
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2">
          {['Requested', 'Under Verification', 'Approved', 'Digitally Issued'].map((step, i) => (
            <div key={step} className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{i + 1}</div>
                <span className="text-xs font-medium whitespace-nowrap">{step}</span>
              </div>
              {i < 3 && <div className="h-px w-6 sm:w-12 bg-border" />}
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Certificate</DialogTitle>
            <DialogDescription>Fill in the details to request a digital certificate.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Certificate Type</Label>
              <Select value={certType} onValueChange={setCertType}>
                <SelectTrigger><SelectValue placeholder="Select certificate type" /></SelectTrigger>
                <SelectContent>{certTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Reason / Purpose</Label>
              <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g., Bank account opening, internship application..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleRequest} disabled={!certType}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={verifyOpen} onOpenChange={setVerifyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Certificate</DialogTitle>
            <DialogDescription>Enter a certificate ID to verify its authenticity.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Certificate ID</Label>
              <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" value={verifyId} onChange={(e) => setVerifyId(e.target.value)} placeholder="e.g., CERT-MPU-2026-001234" />
            </div>
            {verifyResult === 'searching' && <p className="text-sm text-muted-foreground text-center">Verifying...</p>}
            {verifyResult === 'valid' && (
              <div className="bg-success/10 border border-success/30 rounded-lg p-4 text-center">
                <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="font-semibold text-success">Certificate Verified!</p>
                <p className="text-sm text-muted-foreground mt-1">This is a valid digitally issued certificate.</p>
              </div>
            )}
            {verifyResult === 'invalid' && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
                <p className="font-semibold text-destructive">Certificate Not Found</p>
                <p className="text-sm text-muted-foreground mt-1">No certificate found with this ID.</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setVerifyOpen(false); setVerifyResult('none'); setVerifyId(''); }}>Close</Button>
            <Button onClick={handleVerify} disabled={!verifyId || verifyResult === 'searching'}>Verify Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
