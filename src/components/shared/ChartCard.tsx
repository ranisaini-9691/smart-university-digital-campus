import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { type ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function ChartCard({ title, description, children, className, action }: ChartCardProps) {
  return (
    <Card className={cn('p-5 animate-slide-up', className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}
