import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { CalendarDays, CreditCard, Award, FileText, Bus, Building2, BookOpen, Trophy, Bot, Clock, HelpCircle, MapPin, MessageSquare, FolderOpen, TrendingUp, Lightbulb, Bell } from 'lucide-react';

export function ServicesPage() {
  const navigate = useNavigate();
  const services = [
    { label: 'Attendance', icon: CalendarDays, path: '/dashboard/attendance', color: 'bg-primary/10 text-primary' },
    { label: 'Timetable', icon: Clock, path: '/dashboard/timetable', color: 'bg-accent/10 text-accent' },
    { label: 'Examination', icon: FileText, path: '/dashboard/exams', color: 'bg-primary/10 text-primary' },
    { label: 'Fee Management', icon: CreditCard, path: '/dashboard/fees', color: 'bg-warning/10 text-warning' },
    { label: 'Certificates', icon: Award, path: '/dashboard/certificates', color: 'bg-success/10 text-success' },
    { label: 'Documents', icon: FolderOpen, path: '/dashboard/documents', color: 'bg-primary/10 text-primary' },
    { label: 'Hostel', icon: Building2, path: '/dashboard/hostel', color: 'bg-warning/10 text-warning' },
    { label: 'Transport', icon: Bus, path: '/dashboard/transport', color: 'bg-accent/10 text-accent' },
    { label: 'Campus Map', icon: MapPin, path: '/dashboard/map', color: 'bg-primary/10 text-primary' },
    { label: 'Library', icon: BookOpen, path: '/dashboard/library', color: 'bg-success/10 text-success' },
    { label: 'Events', icon: Trophy, path: '/dashboard/events', color: 'bg-primary/10 text-primary' },
    { label: 'CampusAI', icon: Bot, path: '/dashboard/ai', color: 'gradient-hero text-white' },
    { label: 'Learning Plan', icon: Lightbulb, path: '/dashboard/learning', color: 'bg-warning/10 text-warning' },
    { label: 'Performance', icon: TrendingUp, path: '/dashboard/performance', color: 'bg-primary/10 text-primary' },
    { label: 'Helpdesk', icon: HelpCircle, path: '/dashboard/helpdesk', color: 'bg-accent/10 text-accent' },
    { label: 'Grievance', icon: MessageSquare, path: '/dashboard/grievance', color: 'bg-destructive/10 text-destructive' },
    { label: 'Notifications', icon: Bell, path: '/dashboard/notifications', color: 'bg-primary/10 text-primary' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">All Services</h1>
        <p className="text-muted-foreground text-sm mt-1">Access all campus services in one place.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {services.map(s => (
          <button key={s.label} onClick={() => navigate(s.path)} className="flex flex-col items-center gap-3 p-6 rounded-xl border bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${s.color}`}><s.icon className="h-7 w-7" /></div>
            <span className="text-sm font-medium">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
