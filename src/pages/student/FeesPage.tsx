import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartCard } from '@/components/shared/ChartCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { CreditCard, CheckCircle2, Clock, AlertCircle, Download, Receipt } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fees, feeCollectionData } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';

export function FeesPage() {
  const [payOpen, setPayOpen] = useState(false);
  const [payingFee, setPayingFee] = useState<string | null>(null);
  const [payStep, setPayStep] = useState<'select' | 'processing' | 'success'>('select');
  const { toast } = useToast();

  const totalAmount = fees.reduce((a, f) => a + f.amount, 0);
  const totalPaid = fees.reduce((a, f) => a + f.paid, 0);
  const totalPending = totalAmount - totalPaid;

  const handlePay = () => {
    setPayStep('processing');
    setTimeout(() => {
      setPayStep('success');
      toast({ title: 'Payment Successful', description: 'Your fee payment has been processed successfully.' });
    }, 2000);
  };

  const closeDialog = () => {
    setPayOpen(false);
    setTimeout(() => setPayStep('select'), 300);
  };

  const statusIcon = { paid: CheckCircle2, pending: Clock, processing: Clock, failed: AlertCircle };
  const statusColor = { paid: 'text-success', pending: 'text-warning', processing: 'text-primary', failed: 'text-destructive' };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Smart Fee Management</h1>
        <p className="text-muted-foreground text-sm mt-1">View and pay your fees, download receipts.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5"><p className="text-xs text-muted-foreground">Total Fees</p><p className="text-2xl font-bold mt-1">₹{totalAmount.toLocaleString()}</p></Card>
        <Card className="p-5"><p className="text-xs text-muted-foreground">Paid</p><p className="text-2xl font-bold text-success mt-1">₹{totalPaid.toLocaleString()}</p></Card>
        <Card className="p-5"><p className="text-xs text-muted-foreground">Pending</p><p className="text-2xl font-bold text-destructive mt-1">₹{totalPending.toLocaleString()}</p></Card>
        <Card className="p-5"><p className="text-xs text-muted-foreground">Due Date</p><p className="text-lg font-bold mt-1">Oct 10</p></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-semibold text-sm">Fee Breakdown</h3>
          {fees.map(fee => {
            const Icon = statusIcon[fee.status];
            return (
              <Card key={fee.id} className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{fee.category}</p>
                      <p className="text-xs text-muted-foreground">Due: {fee.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold">₹{(fee.amount - fee.paid).toLocaleString()}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Icon className={`h-3.5 w-3.5 ${statusColor[fee.status]}`} />
                      <span className={`text-xs font-medium capitalize ${statusColor[fee.status]}`}>{fee.status}</span>
                    </div>
                  </div>
                  {fee.status === 'pending' && (
                    <Button size="sm" onClick={() => { setPayingFee(fee.id); setPayOpen(true); }}>Pay Now</Button>
                  )}
                  {fee.status === 'paid' && fee.receiptId && (
                    <Button variant="outline" size="sm" onClick={() => toast({ title: 'Receipt Downloaded', description: `Receipt ${fee.receiptId} downloaded.` })}>
                      <Download className="h-3.5 w-3.5 mr-1" /> Receipt
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-3">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total</span><span className="font-medium">₹{totalAmount.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Paid</span><span className="font-medium text-success">₹{totalPaid.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Pending</span><span className="font-medium text-destructive">₹{totalPending.toLocaleString()}</span></div>
              <Progress value={(totalPaid / totalAmount) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">{Math.round((totalPaid / totalAmount) * 100)}% collected</p>
            </div>
          </Card>
          <ChartCard title="Collection Trend" description="Monthly (in Lakhs)">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={feeCollectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="collected" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          {payStep === 'select' && (
            <>
              <DialogHeader><DialogTitle>Simulated Payment</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">You are paying</p>
                  <p className="text-2xl font-bold">₹{fees.find(f => f.id === payingFee)?.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">{fees.find(f => f.id === payingFee)?.category}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Select payment method (demo):</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['UPI', 'Card', 'Net Banking', 'Wallet'].map(method => (
                      <button key={method} className="p-3 border rounded-lg text-sm hover:border-primary transition-colors">{method}</button>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeDialog}>Cancel</Button>
                <Button onClick={handlePay}>Pay Now</Button>
              </DialogFooter>
            </>
          )}
          {payStep === 'processing' && (
            <div className="py-12 text-center">
              <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4" />
              <p className="font-medium">Processing Payment...</p>
              <p className="text-sm text-muted-foreground mt-1">Please wait</p>
            </div>
          )}
          {payStep === 'success' && (
            <div className="py-8 text-center">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <DialogHeader><DialogTitle>Payment Successful!</DialogTitle></DialogHeader>
              <p className="text-sm text-muted-foreground mt-2">Your payment of ₹{fees.find(f => f.id === payingFee)?.amount.toLocaleString()} has been processed.</p>
              <Button className="mt-4" onClick={closeDialog}>
                <Receipt className="h-4 w-4 mr-2" /> Download Receipt
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
