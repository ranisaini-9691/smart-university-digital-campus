export type UserRole = 'student' | 'faculty' | 'parent' | 'admin' | 'finance' | 'campus';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  linkedStudentId?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentNo: string;
  department: string;
  course: string;
  semester: number;
  year: number;
  cgpa: number;
  avatar: string;
  phone: string;
  address: string;
  dob: string;
  bloodGroup: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  admissionDate: string;
  status: 'active' | 'graduated' | 'suspended';
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  subjects: string[];
  avatar: string;
  phone: string;
  experience: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
  semester: number;
  faculty: string;
  credits: number;
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
}

export interface SubjectAttendance {
  subject: string;
  code: string;
  total: number;
  present: number;
  late: number;
  percentage: number;
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  code: string;
  faculty: string;
  room: string;
  building: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

export interface FeeRecord {
  id: string;
  category: string;
  amount: number;
  paid: number;
  status: 'paid' | 'pending' | 'processing' | 'failed';
  dueDate: string;
  paidDate?: string;
  receiptId?: string;
}

export interface Exam {
  id: string;
  name: string;
  subject: string;
  code: string;
  date: string;
  time: string;
  room: string;
  building: string;
  duration: string;
  type: 'internal' | 'semester' | 'mid-term';
}

export interface Result {
  id: string;
  subject: string;
  code: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grade: string;
  semester: number;
}

export interface Certificate {
  id: string;
  type: string;
  status: 'requested' | 'under-verification' | 'approved' | 'issued' | 'rejected';
  requestDate: string;
  issuedDate?: string;
  certificateId?: string;
  reason: string;
}

export interface HelpdeskTicket {
  id: string;
  ticketId: string;
  category: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'created' | 'assigned' | 'in-progress' | 'resolved';
  assignedTo: string;
  department: string;
  createdAt: string;
  updatedAt: string;
  response?: string;
}

export interface Complaint {
  id: string;
  complaintId: string;
  category: string;
  title: string;
  description: string;
  status: 'submitted' | 'assigned' | 'investigation' | 'action-taken' | 'resolved';
  isAnonymous: boolean;
  assignedTo: string;
  createdAt: string;
  response?: string;
}

export interface HostelRoom {
  id: string;
  building: string;
  floor: number;
  roomNo: string;
  capacity: number;
  occupied: number;
  type: 'single' | 'double' | 'triple';
  status: 'available' | 'full' | 'maintenance';
}

export interface HostelAllocation {
  id: string;
  studentId: string;
  studentName: string;
  building: string;
  roomNo: string;
  bedNo: string;
  joinDate: string;
  status: 'active' | 'vacated';
}

export interface Bus {
  id: string;
  busNo: string;
  route: string;
  driver: string;
  driverPhone: string;
  capacity: number;
  occupied: number;
  status: 'on-route' | 'idle' | 'maintenance';
  currentLocation: { lat: number; lng: number; label: string };
  nextStop: string;
  eta: string;
}

export interface BusRoute {
  id: string;
  routeNo: string;
  name: string;
  stops: string[];
  timings: string;
  busNo: string;
}

export interface Notification {
  id: string;
  type: 'academic' | 'fees' | 'attendance' | 'hostel' | 'transport' | 'certificate' | 'helpdesk' | 'events' | 'emergency';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  registered: boolean;
  capacity: number;
  registeredCount: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  available: boolean;
  dueDate?: string;
  rating: number;
  coverColor: string;
}

export interface RiskPrediction {
  studentId: string;
  studentName: string;
  enrollmentNo: string;
  department: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  factors: { label: string; value: number; type: 'positive' | 'negative' }[];
  reasons: string[];
  recommendations: string[];
}

export interface PerformancePrediction {
  studentId: string;
  currentCGPA: number;
  attendance: number;
  assignmentCompletion: number;
  internalMarks: number;
  learningActivity: number;
  predictedScore: number;
  category: 'excellent' | 'good' | 'needs-attention' | 'at-risk';
  positiveFactors: string[];
  riskFactors: string[];
}

export interface LearningRecommendation {
  id: string;
  subject: string;
  type: string;
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AIInsight {
  id: string;
  category: string;
  insight: string;
  severity: 'info' | 'warning' | 'critical';
  recommendation: string;
  metric: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Admission {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  course: string;
  department: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'enrolled' | 'rejected';
  appliedDate: string;
  documents: string[];
  enrollmentNo?: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  trigger: string;
  rule: string;
  action: string;
  notification: string;
  enabled: boolean;
  category: string;
}

export interface DocumentItem {
  id: string;
  type: string;
  issueDate: string;
  status: 'available' | 'pending' | 'requested';
  icon: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  category: string;
  important: boolean;
}
