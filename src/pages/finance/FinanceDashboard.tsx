import { StatCard } from '@/components/shared/StatCard';
import { ChartCard } from '@/components/shared/ChartCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, CreditCard, TrendingUp, AlertTriangle, CheckCircle2, XCircle, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { feeCollectionData, financeData } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';

const pieColors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--warning))', 'hsl(var(--success))', 'hsl(var(--destructive))'];

export function FinanceDashboard() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Fee collection, payments, and financial overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Collection" value={`₹${financeData.totalCollection}L`} icon={Wallet} color="success" trend={8} trendLabel="YoY" />
        <StatCard title="Pending Fees" value={`₹${financeData.pendingFees}L`} icon={CreditCard} color="warning" />
        <StatCard title="Today's Payments" value={`₹${financeData.todayPayments}L`} icon={TrendingUp} color="primary" />
        <StatCard title="Payment Failures" value={financeData.paymentFailures} icon={XCircle} color="destructive" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Monthly Collection" description="Collected vs Pending (in Lakhs)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={feeCollectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="collected" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Fee Category Breakdown" description="Collection by category (in Lakhs)">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={financeData.categoryBreakdown} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={90} label={(entry) => entry.category}>
                {financeData.categoryBreakdown.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Department-wise Collection" description="Fee collection by department (in Lakhs)">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={financeData.departmentCollection}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="dept" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            {[
              { id: 'TXN-001', student: 'Aarav Sharma', amount: '₹45,000', status: 'paid', date: '2026-08-10' },
              { id: 'TXN-002', student: 'Priya Patel', amount: '₹45,000', status: 'paid', date: '2026-08-09' },
              { id: 'TXN-003', student: 'Rohan Gupta', amount: '₹30,000', status: 'failed', date: '2026-08-08' },
              { id: 'TXN-004', student: 'Sneha Reddy', amount: '₹45,000', status: 'paid', date: '2026-08-07' },
              { id: 'TXN-005', student: 'Karan Malhotra', amount: '₹20,000', status: 'pending', date: '2026-08-06' },
            ].map(txn => (
              <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{txn.student}</p>
                  <p className="text-xs text-muted-foreground">{txn.id} • {txn.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{txn.amount}</p>
                  <Badge variant={txn.status === 'paid' ? 'default' : txn.status === 'failed' ? 'destructive' : 'secondary'} className="text-xs capitalize">{txn.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Outstanding Fees Summary</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-destructive/5 rounded-lg p-4"><p className="text-xs text-muted-foreground">Total Outstanding</p><p className="text-2xl font-bold text-destructive">₹{financeData.pendingFees}L</p></div>
              <div className="bg-warning/5 rounded-lg p-4"><p className="text-xs text-muted-foreground">Students with Pending</p><p className="text-2xl font-bold text-warning">{financeData.outstandingCount}</p></div>
            </div>
            <div className="space-y-2">
              {[
                { dept: 'CSE', count: 87, amount: '₹2.1L' },
                { dept: 'ECE', count: 54, amount: '₹1.5L' },
                { dept: 'ME', count: 68, amount: '₹1.8L' },
                { dept: 'EE', count: 45, amount: '₹1.2L' },
              ].map(d => (
                <div key={d.dept} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 text-sm">
                  <span className="font-medium">{d.dept}</span>
                  <span className="text-muted-foreground">{d.count} students</span>
                  <span className="font-bold text-destructive">{d.amount}</span>
                </div>
              ))}
            </div>
            <Button className="w-full" onClick={() => toast({ title: 'Reminders Sent', description: 'Automated reminders sent to 342 students with pending fees.' })}>
              <AlertTriangle className="h-4 w-4 mr-2" /> Send Reminders to All
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
