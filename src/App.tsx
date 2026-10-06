import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { StudentDashboard } from '@/pages/student/StudentDashboard';
import { AttendancePage } from '@/pages/student/AttendancePage';
import { TimetablePage } from '@/pages/student/TimetablePage';
import { ExamPage } from '@/pages/student/ExamPage';
import { FeesPage } from '@/pages/student/FeesPage';
import { CertificatePage } from '@/pages/student/CertificatePage';
import { DocumentsPage } from '@/pages/student/DocumentsPage';
import { HelpdeskPage } from '@/pages/student/HelpdeskPage';
import { GrievancePage } from '@/pages/student/GrievancePage';
import { HostelPage } from '@/pages/student/HostelPage';
import { TransportPage } from '@/pages/student/TransportPage';
import { CampusMapPage } from '@/pages/student/CampusMapPage';
import { LibraryPage } from '@/pages/student/LibraryPage';
import { EventsPage } from '@/pages/student/EventsPage';
import { LearningPage } from '@/pages/student/LearningPage';
import { PerformancePage } from '@/pages/student/PerformancePage';
import { RiskPage } from '@/pages/student/RiskPage';
import { AIChatPage } from '@/pages/student/AIChatPage';
import { NotificationsPage } from '@/pages/student/NotificationsPage';
import { ProfilePage } from '@/pages/student/ProfilePage';
import { ServicesPage } from '@/pages/student/ServicesPage';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { GovernancePage } from '@/pages/admin/GovernancePage';
import { AIInsightsPage } from '@/pages/admin/AIInsightsPage';
import { AutomationPage } from '@/pages/admin/AutomationPage';
import { StudentsPage } from '@/pages/admin/StudentsPage';
import { AdmissionsPage } from '@/pages/admin/AdmissionsPage';
import { ImpactPage } from '@/pages/admin/ImpactPage';
import { FinanceDashboard } from '@/pages/finance/FinanceDashboard';
import { ParentDashboard } from '@/pages/parent/ParentDashboard';
import { FacultyDashboard } from '@/pages/faculty/FacultyDashboard';
import { CampusDashboard } from '@/pages/campus/CampusDashboard';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<RoleDashboard />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="exams" element={<ExamPage />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="certificates" element={<CertificatePage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="helpdesk" element={<HelpdeskPage />} />
        <Route path="grievance" element={<GrievancePage />} />
        <Route path="hostel" element={<HostelPage />} />
        <Route path="transport" element={<TransportPage />} />
        <Route path="map" element={<CampusMapPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="learning" element={<LearningPage />} />
        <Route path="performance" element={<PerformancePage />} />
        <Route path="risk" element={<RiskPage />} />
        <Route path="ai" element={<AIChatPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="governance" element={<GovernancePage />} />
        <Route path="insights" element={<AIInsightsPage />} />
        <Route path="automation" element={<AutomationPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="admissions" element={<AdmissionsPage />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="finance" element={<FinanceDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function RoleDashboard() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  switch (user.role) {
    case 'student': return <StudentDashboard />;
    case 'admin': return <AdminDashboard />;
    case 'finance': return <FinanceDashboard />;
    case 'parent': return <ParentDashboard />;
    case 'faculty': return <FacultyDashboard />;
    case 'campus': return <CampusDashboard />;
    default: return <StudentDashboard />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
