import { useState, type ReactNode } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Bot, Bell, Menu, LogOut, Home, Settings, ChevronDown, GraduationCap, BookOpen, CalendarDays, Clock, CreditCard, Award, FileText, Bus, Building2, HelpCircle, MessageSquare, MapPin, BarChart3, Lightbulb, Zap, Shield, Users, Wallet, TrendingUp, AlertTriangle, BookMarked, Trophy, Vote, FolderOpen, type LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const roleLabels: Record<string, string> = {
  student: 'Student',
  faculty: 'Faculty',
  parent: 'Parent',
  admin: 'Administrator',
  finance: 'Finance Officer',
  campus: 'Campus Officer',
};

const navConfig: Record<string, NavItem[]> = {
  student: [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Attendance', path: '/dashboard/attendance', icon: CalendarDays },
    { label: 'Timetable', path: '/dashboard/timetable', icon: Clock },
    { label: 'Examination', path: '/dashboard/exams', icon: FileText },
    { label: 'Fee Management', path: '/dashboard/fees', icon: CreditCard },
    { label: 'Certificates', path: '/dashboard/certificates', icon: Award },
    { label: 'Documents', path: '/dashboard/documents', icon: FolderOpen },
    { label: 'Helpdesk', path: '/dashboard/helpdesk', icon: HelpCircle },
    { label: 'Grievance', path: '/dashboard/grievance', icon: MessageSquare },
    { label: 'Hostel', path: '/dashboard/hostel', icon: Building2 },
    { label: 'Transport', path: '/dashboard/transport', icon: Bus },
    { label: 'Campus Map', path: '/dashboard/map', icon: MapPin },
    { label: 'Library', path: '/dashboard/library', icon: BookMarked },
    { label: 'Events', path: '/dashboard/events', icon: Trophy },
    { label: 'AI Learning', path: '/dashboard/learning', icon: Lightbulb },
    { label: 'Performance', path: '/dashboard/performance', icon: TrendingUp },
    { label: 'Risk Status', path: '/dashboard/risk', icon: AlertTriangle },
  ],
  faculty: [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'My Classes', path: '/dashboard/timetable', icon: BookOpen },
    { label: 'Attendance', path: '/dashboard/attendance', icon: CalendarDays },
    { label: 'Exams & Marks', path: '/dashboard/exams', icon: FileText },
    { label: 'Student Performance', path: '/dashboard/performance', icon: TrendingUp },
    { label: 'At-Risk Students', path: '/dashboard/risk', icon: AlertTriangle },
    { label: 'Campus Map', path: '/dashboard/map', icon: MapPin },
    { label: 'Helpdesk', path: '/dashboard/helpdesk', icon: HelpCircle },
  ],
  parent: [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Attendance', path: '/dashboard/attendance', icon: CalendarDays },
    { label: 'Academic Performance', path: '/dashboard/performance', icon: TrendingUp },
    { label: 'Examination', path: '/dashboard/exams', icon: FileText },
    { label: 'Fees', path: '/dashboard/fees', icon: CreditCard },
    { label: 'Transport', path: '/dashboard/transport', icon: Bus },
    { label: 'Hostel', path: '/dashboard/hostel', icon: Building2 },
    { label: 'Alerts', path: '/dashboard/notifications', icon: Bell },
    { label: 'Helpdesk', path: '/dashboard/helpdesk', icon: HelpCircle },
  ],
  admin: [
    { label: 'Command Center', path: '/dashboard', icon: BarChart3 },
    { label: 'Governance', path: '/dashboard/governance', icon: Shield },
    { label: 'AI Insights', path: '/dashboard/insights', icon: Lightbulb },
    { label: 'Automation', path: '/dashboard/automation', icon: Zap },
    { label: 'Students', path: '/dashboard/students', icon: GraduationCap },
    { label: 'Admissions', path: '/dashboard/admissions', icon: Users },
    { label: 'Attendance', path: '/dashboard/attendance', icon: CalendarDays },
    { label: 'Examination', path: '/dashboard/exams', icon: FileText },
    { label: 'Fees', path: '/dashboard/fees', icon: CreditCard },
    { label: 'Certificates', path: '/dashboard/certificates', icon: Award },
    { label: 'Hostel', path: '/dashboard/hostel', icon: Building2 },
    { label: 'Transport', path: '/dashboard/transport', icon: Bus },
    { label: 'Helpdesk', path: '/dashboard/helpdesk', icon: HelpCircle },
    { label: 'Grievance', path: '/dashboard/grievance', icon: MessageSquare },
    { label: 'Events', path: '/dashboard/events', icon: Trophy },
    { label: 'Campus Map', path: '/dashboard/map', icon: MapPin },
    { label: 'Impact', path: '/dashboard/impact', icon: Vote },
  ],
  finance: [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Fee Collection', path: '/dashboard/fees', icon: Wallet },
    { label: 'Payments', path: '/dashboard/finance', icon: CreditCard },
    { label: 'Reports', path: '/dashboard/insights', icon: BarChart3 },
  ],
  campus: [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Hostel Management', path: '/dashboard/hostel', icon: Building2 },
    { label: 'Transport', path: '/dashboard/transport', icon: Bus },
    { label: 'Campus Map', path: '/dashboard/map', icon: MapPin },
    { label: 'Helpdesk', path: '/dashboard/helpdesk', icon: HelpCircle },
    { label: 'Grievance', path: '/dashboard/grievance', icon: MessageSquare },
  ],
};

const mobileNav: NavItem[] = [
  { label: 'Home', path: '/dashboard', icon: Home },
  { label: 'CampusAI', path: '/dashboard/ai', icon: Bot },
  { label: 'Timetable', path: '/dashboard/timetable', icon: Clock },
  { label: 'Attendance', path: '/dashboard/attendance', icon: CalendarDays },
  { label: 'Services', path: '/dashboard/services', icon: GridIcon },
];

import { Grid as GridIcon } from 'lucide-react';

function Grid({ className }: { className?: string }) {
  return <GridIcon className={className} />;
}

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  if (!user) return null;

  const navItems = navConfig[user.role] || [];
  const currentPath = location.pathname;

  const handleNavigate = (path: string) => {
    navigate(path);
    setSheetOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-hero flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">Smart Campus</h1>
            <p className="text-xs text-muted-foreground">Digital University</p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-3 space-y-0.5">
          {navItems.map(item => {
            const isActive = currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="p-3 border-t">
        <Button
          variant="ghost"
          onClick={() => { logout(); navigate('/'); }}
          className="w-full justify-start text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="left" className="w-72 p-0 lg:hidden">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 border-b bg-card/80 glass flex items-center px-4 gap-3">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSheetOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <div className="hidden sm:block">
            <h2 className="font-semibold text-sm">{roleLabels[user.role]} Portal</h2>
            <p className="text-xs text-muted-foreground">{user.name}</p>
          </div>

          <div className="flex-1" />

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard/ai')}
            className="hidden sm:flex gap-2"
          >
            <Bot className="h-4 w-4 text-primary" />
            CampusAI
          </Button>

          <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Notifications</span>
                  <button className="text-xs text-primary hover:underline">Mark all read</button>
                </div>
              </div>
              <ScrollArea className="h-72">
                <div className="space-y-1 p-1">
                  {notificationsPreview.map(n => (
                    <div key={n.id} className={cn('p-3 rounded-lg text-sm hover:bg-muted cursor-pointer', !n.read && 'bg-primary/5')}>
                      <div className="flex items-start gap-2">
                        {!n.read && <span className="h-2 w-2 bg-primary rounded-full mt-1.5 shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-xs">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">{n.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm text-primary" onClick={() => { navigate('/dashboard/notifications'); setNotifOpen(false); }}>
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-muted rounded-lg p-1.5 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <p className="text-xs text-primary mt-1 font-medium">{roleLabels[user.role]}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                <Settings className="h-4 w-4 mr-2" /> Profile & Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => { logout(); navigate('/'); }}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t glass">
          <div className="flex items-center justify-around h-16">
            {mobileNav.map(item => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={cn(
                    'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

const notificationsPreview = [
  { id: 'n1', title: 'Attendance Alert', message: 'Your attendance in Computer Networks is below 75%.', timestamp: '2 hours ago', read: false },
  { id: 'n2', title: 'Fee Due Reminder', message: 'Hostel Fee of Rs. 12,000 is due on Oct 10.', timestamp: '4 hours ago', read: false },
  { id: 'n3', title: 'Exam Schedule Published', message: 'Mid-Semester Examination schedule is now available.', timestamp: '1 day ago', read: false },
  { id: 'n4', title: 'Certificate Issued', message: 'Your Bonafide Certificate has been digitally issued.', timestamp: '3 days ago', read: true },
];
