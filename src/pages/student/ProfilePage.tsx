import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, UserCog, Wallet, Building2, CreditCard, Award, FileText, Bus, Building, Phone, Mail, MapPin, Calendar, Droplet, LogOut, Bot, Clock, CalendarDays, HelpCircle } from 'lucide-react';
import { currentStudent } from '@/lib/demo-data';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  const roleIcons: Record<string, any> = { student: GraduationCap, faculty: BookOpen, parent: Users, admin: UserCog, finance: Wallet, campus: Building2 };
  const Icon = roleIcons[user.role] || GraduationCap;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 gradient-hero text-white border-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-20 w-20 border-4 border-white/20">
            <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">{user.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-white/70 text-sm mt-1">{user.email}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                <Icon className="h-3 w-3" /> {user.role}
              </span>
            </div>
          </div>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => { logout(); navigate('/'); }}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </Card>

      {user.role === 'student' && (
        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">Personal Information</h3>
            <div className="space-y-3">
              {[
                { label: 'Full Name', value: currentStudent.name, icon: Users },
                { label: 'Enrollment No', value: currentStudent.enrollmentNo, icon: FileText },
                { label: 'Phone', value: currentStudent.phone, icon: Phone },
                { label: 'Email', value: currentStudent.email, icon: Mail },
                { label: 'Date of Birth', value: currentStudent.dob, icon: Calendar },
                { label: 'Blood Group', value: currentStudent.bloodGroup, icon: Droplet },
                { label: 'Address', value: currentStudent.address, icon: MapPin },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground w-32">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">Academic Information</h3>
            <div className="space-y-3">
              {[
                { label: 'Department', value: currentStudent.department, icon: Building },
                { label: 'Course', value: currentStudent.course, icon: GraduationCap },
                { label: 'Semester', value: `Semester ${currentStudent.semester}`, icon: BookOpen },
                { label: 'Year', value: `Year ${currentStudent.year}`, icon: Calendar },
                { label: 'CGPA', value: currentStudent.cgpa.toString(), icon: Award },
                { label: 'Status', value: currentStudent.status, icon: Users },
                { label: 'Admission Date', value: currentStudent.admissionDate, icon: Calendar },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground w-32">{item.label}</span>
                  <span className="font-medium capitalize">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">Parent/Guardian</h3>
            <div className="space-y-3">
              {[
                { label: 'Name', value: currentStudent.parentName, icon: Users },
                { label: 'Phone', value: currentStudent.parentPhone, icon: Phone },
                { label: 'Email', value: currentStudent.parentEmail, icon: Mail },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground w-32">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Attendance', icon: CalendarDays, path: '/dashboard/attendance' },
                { label: 'Timetable', icon: Clock, path: '/dashboard/timetable' },
                { label: 'Fees', icon: CreditCard, path: '/dashboard/fees' },
                { label: 'Certificates', icon: Award, path: '/dashboard/certificates' },
                { label: 'CampusAI', icon: Bot, path: '/dashboard/ai' },
                { label: 'Helpdesk', icon: HelpCircle, path: '/dashboard/helpdesk' },
              ].map(item => (
                <Button key={item.label} variant="outline" size="sm" onClick={() => navigate(item.path)} className="justify-start">
                  <item.icon className="h-4 w-4 mr-2" /> {item.label}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {user.role !== 'student' && (
        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-4">Account Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground w-32">Email</span><span className="font-medium">{user.email}</span></div>
            <div className="flex items-center gap-3 text-sm"><UserCog className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground w-32">Role</span><span className="font-medium capitalize">{user.role}</span></div>
          </div>
        </Card>
      )}
    </div>
  );
}
