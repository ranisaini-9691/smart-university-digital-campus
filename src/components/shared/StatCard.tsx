import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'destructive';
  className?: string;
}

const colorMap = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
};

export function StatCard({ title, value, icon: Icon, trend, trendLabel, color = 'primary', className }: StatCardProps) {
  return (
    <Card className={cn('p-5 hover:shadow-lg transition-shadow animate-slide-up', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 text-xs">
              {trend >= 0 ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={trend >= 0 ? 'text-success' : 'text-destructive'}>
                {trend >= 0 ? '+' : ''}{trend}%
              </span>
              {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
            </div>
          )}
        </div>
        <div className={cn('rounded-xl p-3', colorMap[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
