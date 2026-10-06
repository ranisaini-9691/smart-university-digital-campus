import type {
  Student, Faculty, Subject, AttendanceRecord, SubjectAttendance, TimetableEntry,
  FeeRecord, Exam, Result, Certificate, HelpdeskTicket, Complaint, HostelRoom,
  HostelAllocation, Bus, BusRoute, Notification, EventItem, Book, RiskPrediction,
  PerformancePrediction, LearningRecommendation, AIInsight, Admission,
  AutomationWorkflow, DocumentItem, Announcement, AppUser,
} from './types';

export const demoUsers: AppUser[] = [
  { id: 'u1', name: 'Aarav Sharma', email: 'student@campus.edu', role: 'student', avatar: 'AS' },
  { id: 'u2', name: 'Dr. Priya Verma', email: 'faculty@campus.edu', role: 'faculty', avatar: 'PV' },
  { id: 'u3', name: 'Rajesh Sharma', email: 'parent@campus.edu', role: 'parent', avatar: 'RS', linkedStudentId: 's1' },
  { id: 'u4', name: 'Dr. Anand Kumar', email: 'admin@campus.edu', role: 'admin', avatar: 'AK' },
  { id: 'u5', name: 'Suresh Mehta', email: 'finance@campus.edu', role: 'finance', avatar: 'SM' },
  { id: 'u6', name: 'Mahesh Yadav', email: 'campus@campus.edu', role: 'campus', avatar: 'MY' },
];

export const currentStudent: Student = {
  id: 's1',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@campus.edu',
  enrollmentNo: 'MP2024CS045',
  department: 'Computer Science & Engineering',
  course: 'B.Tech Computer Science',
  semester: 5,
  year: 3,
  cgpa: 8.42,
  avatar: 'AS',
  phone: '+91 98765 43210',
  address: '123 MP Nagar, Bhopal, Madhya Pradesh',
  dob: '2003-08-15',
  bloodGroup: 'B+',
  parentName: 'Rajesh Sharma',
  parentPhone: '+91 98765 43211',
  parentEmail: 'parent@campus.edu',
  admissionDate: '2022-08-01',
  status: 'active',
};

export const allStudents: Student[] = [
  currentStudent,
  { ...currentStudent, id: 's2', name: 'Priya Patel', enrollmentNo: 'MP2024CS046', cgpa: 9.1, avatar: 'PP', semester: 5 },
  { ...currentStudent, id: 's3', name: 'Rohan Gupta', enrollmentNo: 'MP2024CS047', cgpa: 7.2, avatar: 'RG', semester: 5 },
  { ...currentStudent, id: 's4', name: 'Sneha Reddy', enrollmentNo: 'MP2024CS048', cgpa: 8.8, avatar: 'SR', semester: 5 },
  { ...currentStudent, id: 's5', name: 'Karan Malhotra', enrollmentNo: 'MP2024CS049', cgpa: 6.1, avatar: 'KM', semester: 5 },
  { ...currentStudent, id: 's6', name: 'Ananya Iyer', enrollmentNo: 'MP2024CS050', cgpa: 8.9, avatar: 'AI', semester: 5 },
  { ...currentStudent, id: 's7', name: 'Vikram Singh', enrollmentNo: 'MP2024EE012', cgpa: 5.8, avatar: 'VS', semester: 5, department: 'Electrical Engineering', course: 'B.Tech Electrical' },
  { ...currentStudent, id: 's8', name: 'Divya Joshi', enrollmentNo: 'MP2024ME023', cgpa: 7.5, avatar: 'DJ', semester: 3, department: 'Mechanical Engineering', course: 'B.Tech Mechanical' },
  { ...currentStudent, id: 's9', name: 'Arjun Nair', enrollmentNo: 'MP2024CS051', cgpa: 8.0, avatar: 'AN', semester: 5 },
  { ...currentStudent, id: 's10', name: 'Ishita Agarwal', enrollmentNo: 'MP2024CS052', cgpa: 6.9, avatar: 'IA', semester: 5 },
];

export const facultyList: Faculty[] = [
  { id: 'f1', name: 'Dr. Priya Verma', email: 'priya.verma@campus.edu', department: 'Computer Science & Engineering', designation: 'Professor', subjects: ['Data Structures', 'Algorithms'], avatar: 'PV', phone: '+91 90000 11111', experience: 12 },
  { id: 'f2', name: 'Dr. Rajesh Khanna', email: 'rajesh.khanna@campus.edu', department: 'Computer Science & Engineering', designation: 'Associate Professor', subjects: ['Database Management', 'DBMS Lab'], avatar: 'RK', phone: '+91 90000 22222', experience: 8 },
  { id: 'f3', name: 'Prof. Neha Singh', email: 'neha.singh@campus.edu', department: 'Computer Science & Engineering', designation: 'Assistant Professor', subjects: ['Operating Systems', 'OS Lab'], avatar: 'NS', phone: '+91 90000 33333', experience: 5 },
];

export const subjects: Subject[] = [
  { id: 'sub1', name: 'Data Structures', code: 'CS301', department: 'CSE', semester: 5, faculty: 'Dr. Priya Verma', credits: 4 },
  { id: 'sub2', name: 'Database Management', code: 'CS302', department: 'CSE', semester: 5, faculty: 'Dr. Rajesh Khanna', credits: 4 },
  { id: 'sub3', name: 'Operating Systems', code: 'CS303', department: 'CSE', semester: 5, faculty: 'Prof. Neha Singh', credits: 3 },
  { id: 'sub4', name: 'Computer Networks', code: 'CS304', department: 'CSE', semester: 5, faculty: 'Dr. Priya Verma', credits: 3 },
  { id: 'sub5', name: 'Software Engineering', code: 'CS305', department: 'CSE', semester: 5, faculty: 'Dr. Rajesh Khanna', credits: 3 },
];

export const subjectAttendance: SubjectAttendance[] = [
  { subject: 'Data Structures', code: 'CS301', total: 45, present: 38, late: 3, percentage: 91 },
  { subject: 'Database Management', code: 'CS302', total: 42, present: 35, late: 2, percentage: 88 },
  { subject: 'Operating Systems', code: 'CS303', total: 38, present: 26, late: 1, percentage: 71 },
  { subject: 'Computer Networks', code: 'CS304', total: 40, present: 24, late: 2, percentage: 65 },
  { subject: 'Software Engineering', code: 'CS305', total: 36, present: 31, late: 1, percentage: 89 },
];

export const monthlyAttendance = [
  { month: 'May', present: 28, absent: 4, late: 2 },
  { month: 'Jun', present: 26, absent: 6, late: 1 },
  { month: 'Jul', present: 24, absent: 8, late: 3 },
  { month: 'Aug', present: 30, absent: 2, late: 1 },
  { month: 'Sep', present: 27, absent: 5, late: 2 },
  { month: 'Oct', present: 22, absent: 7, late: 1 },
];

export const attendanceRecords: AttendanceRecord[] = [
  { date: '2026-10-06', status: 'present', subject: 'Data Structures' },
  { date: '2026-10-05', status: 'present', subject: 'Database Management' },
  { date: '2026-10-05', status: 'late', subject: 'Operating Systems' },
  { date: '2026-10-04', status: 'absent', subject: 'Computer Networks' },
  { date: '2026-10-04', status: 'present', subject: 'Software Engineering' },
  { date: '2026-10-03', status: 'present', subject: 'Data Structures' },
  { date: '2026-10-03', status: 'absent', subject: 'Operating Systems' },
  { date: '2026-10-02', status: 'present', subject: 'Database Management' },
  { date: '2026-10-02', status: 'present', subject: 'Computer Networks' },
  { date: '2026-10-01', status: 'late', subject: 'Software Engineering' },
];

export const timetable: TimetableEntry[] = [
  { id: 't1', day: 'Monday', time: '09:00 - 10:00', subject: 'Data Structures', code: 'CS301', faculty: 'Dr. Priya Verma', room: 'A-101', building: 'Academic Block A', type: 'lecture' },
  { id: 't2', day: 'Monday', time: '10:15 - 11:15', subject: 'Database Management', code: 'CS302', faculty: 'Dr. Rajesh Khanna', room: 'A-102', building: 'Academic Block A', type: 'lecture' },
  { id: 't3', day: 'Monday', time: '11:30 - 12:30', subject: 'Operating Systems', code: 'CS303', faculty: 'Prof. Neha Singh', room: 'B-201', building: 'Academic Block B', type: 'lecture' },
  { id: 't4', day: 'Monday', time: '14:00 - 16:00', subject: 'DBMS Lab', code: 'CS302L', faculty: 'Dr. Rajesh Khanna', room: 'Lab-3', building: 'Computer Lab', type: 'lab' },
  { id: 't5', day: 'Tuesday', time: '09:00 - 10:00', subject: 'Computer Networks', code: 'CS304', faculty: 'Dr. Priya Verma', room: 'A-103', building: 'Academic Block A', type: 'lecture' },
  { id: 't6', day: 'Tuesday', time: '10:15 - 11:15', subject: 'Software Engineering', code: 'CS305', faculty: 'Dr. Rajesh Khanna', room: 'A-104', building: 'Academic Block A', type: 'lecture' },
  { id: 't7', day: 'Tuesday', time: '11:30 - 12:30', subject: 'Data Structures', code: 'CS301', faculty: 'Dr. Priya Verma', room: 'A-101', building: 'Academic Block A', type: 'tutorial' },
  { id: 't8', day: 'Wednesday', time: '09:00 - 10:00', subject: 'Operating Systems', code: 'CS303', faculty: 'Prof. Neha Singh', room: 'B-201', building: 'Academic Block B', type: 'lecture' },
  { id: 't9', day: 'Wednesday', time: '10:15 - 11:15', subject: 'Database Management', code: 'CS302', faculty: 'Dr. Rajesh Khanna', room: 'A-102', building: 'Academic Block A', type: 'lecture' },
  { id: 't10', day: 'Wednesday', time: '14:00 - 16:00', subject: 'OS Lab', code: 'CS303L', faculty: 'Prof. Neha Singh', room: 'Lab-5', building: 'Computer Lab', type: 'lab' },
  { id: 't11', day: 'Thursday', time: '09:00 - 10:00', subject: 'Data Structures', code: 'CS301', faculty: 'Dr. Priya Verma', room: 'A-101', building: 'Academic Block A', type: 'lecture' },
  { id: 't12', day: 'Thursday', time: '10:15 - 11:15', subject: 'Computer Networks', code: 'CS304', faculty: 'Dr. Priya Verma', room: 'A-103', building: 'Academic Block A', type: 'lecture' },
  { id: 't13', day: 'Friday', time: '09:00 - 10:00', subject: 'Software Engineering', code: 'CS305', faculty: 'Dr. Rajesh Khanna', room: 'A-104', building: 'Academic Block A', type: 'lecture' },
  { id: 't14', day: 'Friday', time: '10:15 - 11:15', subject: 'Operating Systems', code: 'CS303', faculty: 'Prof. Neha Singh', room: 'B-201', building: 'Academic Block B', type: 'lecture' },
  { id: 't15', day: 'Friday', time: '14:00 - 16:00', subject: 'Networks Lab', code: 'CS304L', faculty: 'Dr. Priya Verma', room: 'Lab-2', building: 'Computer Lab', type: 'lab' },
];

export const fees: FeeRecord[] = [
  { id: 'fee1', category: 'Tuition Fee - Semester 5', amount: 45000, paid: 45000, status: 'paid', dueDate: '2026-08-15', paidDate: '2026-08-10', receiptId: 'RCP-2024-001' },
  { id: 'fee2', category: 'Examination Fee', amount: 5000, paid: 0, status: 'pending', dueDate: '2026-10-20' },
  { id: 'fee3', category: 'Hostel Fee - Oct 2026', amount: 12000, paid: 0, status: 'pending', dueDate: '2026-10-10' },
  { id: 'fee4', category: 'Library Fee', amount: 2000, paid: 2000, status: 'paid', dueDate: '2026-07-15', paidDate: '2026-07-12', receiptId: 'RCP-2024-002' },
  { id: 'fee5', category: 'Transport Fee - Oct 2026', amount: 3500, paid: 0, status: 'pending', dueDate: '2026-10-15' },
  { id: 'fee6', category: 'Lab Fee', amount: 3000, paid: 3000, status: 'paid', dueDate: '2026-08-30', paidDate: '2026-08-28', receiptId: 'RCP-2024-003' },
];

export const exams: Exam[] = [
  { id: 'e1', name: 'Mid-Semester Examination', subject: 'Data Structures', code: 'CS301', date: '2026-10-15', time: '10:00 AM', room: 'Hall-1', building: 'Examination Block', duration: '3 hours', type: 'mid-term' },
  { id: 'e2', name: 'Mid-Semester Examination', subject: 'Database Management', code: 'CS302', date: '2026-10-17', time: '10:00 AM', room: 'Hall-1', building: 'Examination Block', duration: '3 hours', type: 'mid-term' },
  { id: 'e3', name: 'Mid-Semester Examination', subject: 'Operating Systems', code: 'CS303', date: '2026-10-19', time: '10:00 AM', room: 'Hall-2', building: 'Examination Block', duration: '3 hours', type: 'mid-term' },
  { id: 'e4', name: 'Internal Assessment', subject: 'Computer Networks', code: 'CS304', date: '2026-10-12', time: '02:00 PM', room: 'A-103', building: 'Academic Block A', duration: '1 hour', type: 'internal' },
  { id: 'e5', name: 'Internal Assessment', subject: 'Software Engineering', code: 'CS305', date: '2026-10-14', time: '02:00 PM', room: 'A-104', building: 'Academic Block A', duration: '1 hour', type: 'internal' },
];

export const results: Result[] = [
  { id: 'r1', subject: 'Data Structures', code: 'CS301', internalMarks: 28, externalMarks: 65, totalMarks: 93, grade: 'A', semester: 5 },
  { id: 'r2', subject: 'Database Management', code: 'CS302', internalMarks: 26, externalMarks: 58, totalMarks: 84, grade: 'A', semester: 5 },
  { id: 'r3', subject: 'Operating Systems', code: 'CS303', internalMarks: 22, externalMarks: 48, totalMarks: 70, grade: 'B+', semester: 5 },
  { id: 'r4', subject: 'Computer Networks', code: 'CS304', internalMarks: 20, externalMarks: 45, totalMarks: 65, grade: 'B', semester: 5 },
  { id: 'r5', subject: 'Software Engineering', code: 'CS305', internalMarks: 27, externalMarks: 60, totalMarks: 87, grade: 'A', semester: 5 },
  { id: 'r6', subject: 'Discrete Mathematics', code: 'CS201', internalMarks: 29, externalMarks: 62, totalMarks: 91, grade: 'A', semester: 4 },
  { id: 'r7', subject: 'OOP in Java', code: 'CS202', internalMarks: 28, externalMarks: 64, totalMarks: 92, grade: 'A', semester: 4 },
];

export const certificates: Certificate[] = [
  { id: 'c1', type: 'Bonafide Certificate', status: 'issued', requestDate: '2026-09-15', issuedDate: '2026-09-17', certificateId: 'CERT-MPU-2026-001234', reason: 'Bank account opening' },
  { id: 'c2', type: 'Character Certificate', status: 'issued', requestDate: '2026-08-20', issuedDate: '2026-08-22', certificateId: 'CERT-MPU-2026-001156', reason: 'Internship application' },
  { id: 'c3', type: 'Transfer Certificate', status: 'requested', requestDate: '2026-10-05', reason: 'Not required yet - testing' },
];

export const helpdeskTickets: HelpdeskTicket[] = [
  { id: 'h1', ticketId: 'TKT-2026-0451', category: 'IT Support', subject: 'Campus WiFi not working in Hostel Block C', description: 'The WiFi in Hostel Block C, Room 302 has been down for 3 days. Please fix urgently.', priority: 'high', status: 'in-progress', assignedTo: 'IT Support Team', department: 'IT', createdAt: '2026-10-03', updatedAt: '2026-10-05', response: 'Network team has been dispatched. Router replacement scheduled for Oct 7.' },
  { id: 'h2', ticketId: 'TKT-2026-0452', category: 'Fees', subject: 'Incorrect fee amount shown', description: 'My examination fee shows Rs. 5000 but the notice says Rs. 4000.', priority: 'medium', status: 'assigned', assignedTo: 'Finance Department', department: 'Finance', createdAt: '2026-10-04', updatedAt: '2026-10-04' },
  { id: 'h3', ticketId: 'TKT-2026-0450', category: 'Library', subject: 'Book return extension request', description: 'Requesting 7-day extension for "Introduction to Algorithms".', priority: 'low', status: 'resolved', assignedTo: 'Library Staff', department: 'Library', createdAt: '2026-09-28', updatedAt: '2026-10-01', response: 'Extension approved for 7 days. New due date: Oct 8.' },
];

export const complaints: Complaint[] = [
  { id: 'cmp1', complaintId: 'GRV-2026-0234', category: 'Hostel', title: 'Hot water not available in morning', description: 'For the past week, hot water is not available in Hostel Block B between 6-8 AM.', status: 'investigation', isAnonymous: false, assignedTo: 'Hostel Warden', createdAt: '2026-10-02', response: 'Plumber has been contacted. Inspection scheduled.' },
  { id: 'cmp2', complaintId: 'GRV-2026-0235', category: 'Infrastructure', title: 'Broken classroom chair', description: 'Three chairs in Room A-102 are broken and need replacement.', status: 'resolved', isAnonymous: true, assignedTo: 'Maintenance', createdAt: '2026-09-25', response: 'Chairs have been replaced.' },
  { id: 'cmp3', complaintId: 'GRV-2026-0236', category: 'Transport', title: 'Bus Route 3 always late', description: 'Bus number MP-04-AB-1234 on Route 3 is consistently 20 minutes late.', status: 'assigned', isAnonymous: false, assignedTo: 'Transport Officer', createdAt: '2026-10-04' },
];

export const hostelRooms: HostelRoom[] = [
  { id: 'hr1', building: 'Block A', floor: 1, roomNo: 'A-101', capacity: 3, occupied: 3, type: 'triple', status: 'full' },
  { id: 'hr2', building: 'Block A', floor: 1, roomNo: 'A-102', capacity: 3, occupied: 2, type: 'triple', status: 'available' },
  { id: 'hr3', building: 'Block A', floor: 2, roomNo: 'A-201', capacity: 2, occupied: 2, type: 'double', status: 'full' },
  { id: 'hr4', building: 'Block A', floor: 2, roomNo: 'A-202', capacity: 2, occupied: 1, type: 'double', status: 'available' },
  { id: 'hr5', building: 'Block B', floor: 1, roomNo: 'B-101', capacity: 3, occupied: 3, type: 'triple', status: 'full' },
  { id: 'hr6', building: 'Block B', floor: 1, roomNo: 'B-102', capacity: 3, occupied: 1, type: 'triple', status: 'available' },
  { id: 'hr7', building: 'Block B', floor: 2, roomNo: 'B-201', capacity: 2, occupied: 0, type: 'double', status: 'maintenance' },
  { id: 'hr8', building: 'Block C', floor: 1, roomNo: 'C-101', capacity: 1, occupied: 1, type: 'single', status: 'full' },
  { id: 'hr9', building: 'Block C', floor: 1, roomNo: 'C-102', capacity: 1, occupied: 0, type: 'single', status: 'available' },
  { id: 'hr10', building: 'Block C', floor: 2, roomNo: 'C-201', capacity: 1, occupied: 1, type: 'single', status: 'full' },
];

export const hostelAllocation: HostelAllocation = {
  id: 'ha1', studentId: 's1', studentName: 'Aarav Sharma', building: 'Block A', roomNo: 'A-101', bedNo: 'Bed 2', joinDate: '2022-08-05', status: 'active',
};

export const buses: Bus[] = [
  { id: 'b1', busNo: 'MP-04-AB-1234', route: 'Route 1 - Bhopal City', driver: 'Ramesh Kumar', driverPhone: '+91 98111 11111', capacity: 50, occupied: 42, status: 'on-route', currentLocation: { lat: 23.2599, lng: 77.4126, label: 'MP Nagar' }, nextStop: 'Habibganj Station', eta: '8 min' },
  { id: 'b2', busNo: 'MP-04-CD-5678', route: 'Route 2 - Old City', driver: 'Suresh Yadav', driverPhone: '+91 98222 22222', capacity: 45, occupied: 38, status: 'on-route', currentLocation: { lat: 23.2520, lng: 77.4040, label: 'Lal Bagh' }, nextStop: 'New Market', eta: '12 min' },
  { id: 'b3', busNo: 'MP-04-EF-9012', route: 'Route 3 - Airport Road', driver: 'Dinesh Sharma', driverPhone: '+91 98333 33333', capacity: 40, occupied: 28, status: 'on-route', currentLocation: { lat: 23.2700, lng: 77.4200, label: 'Airport Road' }, nextStop: 'Bairagarh', eta: '15 min' },
  { id: 'b4', busNo: 'MP-04-GH-3456', route: 'Route 4 - Kolar Road', driver: 'Mohan Verma', driverPhone: '+91 98444 44444', capacity: 50, occupied: 48, status: 'on-route', currentLocation: { lat: 23.2650, lng: 77.4300, label: 'Kolar' }, nextStop: 'Bawadia Kalan', eta: '5 min' },
  { id: 'b5', busNo: 'MP-04-IJ-7890', route: 'Route 5 - Indore Highway', driver: 'Vikas Jain', driverPhone: '+91 98555 55555', capacity: 45, occupied: 0, status: 'idle', currentLocation: { lat: 23.2600, lng: 77.4100, label: 'Campus Depot' }, nextStop: '—', eta: '—' },
];

export const busRoutes: BusRoute[] = [
  { id: 'br1', routeNo: '1', name: 'Bhopal City Circuit', stops: ['Campus', 'MP Nagar', 'Habibganj', 'Shahpura', 'Arera Colony'], timings: '7:30 AM, 5:30 PM', busNo: 'MP-04-AB-1234' },
  { id: 'br2', routeNo: '2', name: 'Old City Route', stops: ['Campus', 'Lal Bagh', 'New Market', 'Bittan Market', '10 No. Market'], timings: '7:45 AM, 5:45 PM', busNo: 'MP-04-CD-5678' },
  { id: 'br3', routeNo: '3', name: 'Airport Road Route', stops: ['Campus', 'Airport Road', 'Bairagarh', 'Sukhlia', 'Vijay Nagar'], timings: '8:00 AM, 6:00 PM', busNo: 'MP-04-EF-9012' },
  { id: 'br4', routeNo: '4', name: 'Kolar Road Route', stops: ['Campus', 'Kolar', 'Bawadia Kalan', 'Saket Nagar', 'Nehru Nagar'], timings: '7:15 AM, 5:15 PM', busNo: 'MP-04-GH-3456' },
  { id: 'br5', routeNo: '5', name: 'Indore Highway Route', stops: ['Campus', 'Indore Highway', 'Sehore', 'Shujalpur'], timings: '7:00 AM, 5:00 PM', busNo: 'MP-04-IJ-7890' },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'attendance', title: 'Attendance Alert', message: 'Your attendance in Computer Networks is below 75%. Please attend upcoming classes.', timestamp: '2026-10-06 09:30', read: false },
  { id: 'n2', type: 'fees', title: 'Fee Due Reminder', message: 'Hostel Fee of Rs. 12,000 is due on Oct 10. Please pay before the due date.', timestamp: '2026-10-06 08:00', read: false },
  { id: 'n3', type: 'academic', title: 'Exam Schedule Published', message: 'Mid-Semester Examination schedule has been published. Check Examination module.', timestamp: '2026-10-05 14:00', read: false },
  { id: 'n4', type: 'certificate', title: 'Certificate Issued', message: 'Your Bonafide Certificate (CERT-MPU-2026-001234) has been digitally issued.', timestamp: '2026-09-17 11:00', read: true },
  { id: 'n5', type: 'transport', title: 'Bus Route Change', message: 'Bus Route 3 will follow a detour via Bairagarh Bridge from Oct 8.', timestamp: '2026-10-04 16:00', read: true },
  { id: 'n6', type: 'events', title: 'Hackathon 2026 Registration Open', message: 'Idea & Innovation Hackathon 2026 registrations are now open. Register soon!', timestamp: '2026-10-03 10:00', read: true },
  { id: 'n7', type: 'helpdesk', title: 'Ticket Update', message: 'Your ticket TKT-2026-0451 has been updated: Network team dispatched.', timestamp: '2026-10-05 15:00', read: false },
];

export const events: EventItem[] = [
  { id: 'ev1', title: 'Idea & Innovation Hackathon 2026', category: 'Hackathon', date: '2026-10-20', time: '09:00 AM', venue: 'Auditorium', description: '48-hour hackathon. Innovate for Madhya Pradesh, Build for Viksit Bharat.', registered: true, capacity: 200, registeredCount: 156 },
  { id: 'ev2', title: 'AI/ML Workshop', category: 'Workshop', date: '2026-10-12', time: '02:00 PM', venue: 'Seminar Hall 1', description: 'Hands-on workshop on Machine Learning fundamentals with real-world projects.', registered: false, capacity: 100, registeredCount: 78 },
  { id: 'ev3', title: 'Inter-Department Cricket Tournament', category: 'Sports', date: '2026-10-25', time: '08:00 AM', venue: 'Sports Ground', description: 'Annual cricket tournament between departments. Register your team!', registered: false, capacity: 120, registeredCount: 90 },
  { id: 'ev4', title: 'Cultural Night - Rangmanch 2026', category: 'Cultural', date: '2026-11-05', time: '06:00 PM', venue: 'Open Air Theatre', description: 'Annual cultural fest featuring music, dance, and drama performances.', registered: true, capacity: 500, registeredCount: 320 },
  { id: 'ev5', title: 'Coding Club Meetup', category: 'Clubs', date: '2026-10-15', time: '05:00 PM', venue: 'Lab 3', description: 'Monthly coding club meetup. Topic: Competitive Programming Techniques.', registered: false, capacity: 60, registeredCount: 45 },
];

export const books: Book[] = [
  { id: 'bk1', title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest, Stein', category: 'Computer Science', isbn: '978-0262033848', available: false, dueDate: '2026-10-08', rating: 4.8, coverColor: 'bg-blue-600' },
  { id: 'bk2', title: 'Database System Concepts', author: 'Silberschatz, Korth, Sudarshan', category: 'Computer Science', isbn: '978-0073523323', available: true, rating: 4.6, coverColor: 'bg-emerald-600' },
  { id: 'bk3', title: 'Operating System Concepts', author: 'Silberschatz, Galvin, Gagne', category: 'Computer Science', isbn: '978-1118063330', available: true, rating: 4.5, coverColor: 'bg-orange-600' },
  { id: 'bk4', title: 'Computer Networks', author: 'Andrew Tanenbaum', category: 'Computer Science', isbn: '978-0132126953', available: true, rating: 4.4, coverColor: 'bg-cyan-600' },
  { id: 'bk5', title: 'Software Engineering', author: 'Ian Sommerville', category: 'Computer Science', isbn: '978-0133943038', available: false, dueDate: '2026-10-12', rating: 4.3, coverColor: 'bg-violet-600' },
  { id: 'bk6', title: 'Data Structures and Algorithms', author: 'Michael Goodrich', category: 'Computer Science', isbn: '978-1118771334', available: true, rating: 4.5, coverColor: 'bg-rose-600' },
  { id: 'bk7', title: 'Artificial Intelligence: A Modern Approach', author: 'Russell, Norvig', category: 'AI/ML', isbn: '978-0136042594', available: true, rating: 4.7, coverColor: 'bg-teal-600' },
  { id: 'bk8', title: 'Digital India: Transforming Governance', author: 'Nandan Nilekani', category: 'Governance', isbn: '978-9386476000', available: true, rating: 4.2, coverColor: 'bg-indigo-600' },
];

export const riskPredictions: RiskPrediction[] = [
  {
    studentId: 's5', studentName: 'Karan Malhotra', enrollmentNo: 'MP2024CS049', department: 'CSE', riskLevel: 'high', riskScore: 78,
    factors: [
      { label: 'Attendance', value: 52, type: 'negative' },
      { label: 'CGPA', value: 6.1, type: 'negative' },
      { label: 'Assignment Completion', value: 45, type: 'negative' },
      { label: 'Engagement', value: 30, type: 'negative' },
    ],
    reasons: ['Attendance below 60% (currently 52%)', '3 missed assignments in the last month', 'CGPA has declined from 7.2 to 6.1', 'Low LMS engagement - last login 12 days ago'],
    recommendations: ['Schedule academic counseling within 7 days', 'Arrange faculty meeting with mentor', 'Send parent notification', 'Connect with peer mentoring program'],
  },
  {
    studentId: 's7', studentName: 'Vikram Singh', enrollmentNo: 'MP2024EE012', department: 'EE', riskLevel: 'high', riskScore: 72,
    factors: [
      { label: 'Attendance', value: 58, type: 'negative' },
      { label: 'CGPA', value: 5.8, type: 'negative' },
      { label: 'Fee Status', value: 40, type: 'negative' },
      { label: 'Engagement', value: 35, type: 'negative' },
    ],
    reasons: ['Attendance at 58%, below 60% threshold', 'Pending fees for 2 semesters', 'CGPA at 5.8, below passing margin', 'Declining performance trend'],
    recommendations: ['Financial assistance counseling', 'Academic remediation plan', 'Parent meeting within 5 days', 'Scholarship information session'],
  },
  {
    studentId: 's10', studentName: 'Ishita Agarwal', enrollmentNo: 'MP2024CS052', department: 'CSE', riskLevel: 'medium', riskScore: 45,
    factors: [
      { label: 'Attendance', value: 68, type: 'negative' },
      { label: 'CGPA', value: 6.9, type: 'positive' },
      { label: 'Assignment Completion', value: 72, type: 'positive' },
      { label: 'Engagement', value: 65, type: 'neutral' as 'positive' },
    ],
    reasons: ['Attendance at 68%, approaching threshold', 'Recent test score decline in 2 subjects', '2 missed assignments this month'],
    recommendations: ['Faculty office hours visit', 'Study group participation', 'Monitor attendance closely'],
  },
  {
    studentId: 's3', studentName: 'Rohan Gupta', enrollmentNo: 'MP2024CS047', department: 'CSE', riskLevel: 'medium', riskScore: 38,
    factors: [
      { label: 'Attendance', value: 71, type: 'negative' },
      { label: 'CGPA', value: 7.2, type: 'positive' },
      { label: 'Assignment Completion', value: 78, type: 'positive' },
      { label: 'Engagement', value: 60, type: 'neutral' as 'positive' },
    ],
    reasons: ['Attendance at 71%, close to 75% threshold', 'Slight dip in internal marks'],
    recommendations: ['Attend upcoming classes regularly', 'Review missed lecture notes'],
  },
  {
    studentId: 's1', studentName: 'Aarav Sharma', enrollmentNo: 'MP2024CS045', department: 'CSE', riskLevel: 'low', riskScore: 15,
    factors: [
      { label: 'Attendance', value: 78, type: 'positive' },
      { label: 'CGPA', value: 8.42, type: 'positive' },
      { label: 'Assignment Completion', value: 88, type: 'positive' },
      { label: 'Engagement', value: 85, type: 'positive' },
    ],
    reasons: ['Good overall academic standing', 'Attendance in one subject (CN) needs attention'],
    recommendations: ['Continue current performance', 'Focus on Computer Networks attendance'],
  },
];

export const performancePrediction: PerformancePrediction = {
  studentId: 's1',
  currentCGPA: 8.42,
  attendance: 78,
  assignmentCompletion: 88,
  internalMarks: 76,
  learningActivity: 85,
  predictedScore: 82,
  category: 'good',
  positiveFactors: ['High assignment completion (88%)', 'Strong CGPA of 8.42', 'Active LMS engagement (85%)', 'Good performance in Data Structures and DBMS'],
  riskFactors: ['Low attendance in Computer Networks (65%)', 'OS internal marks below class average', 'Recent dip in monthly attendance'],
};

export const learningRecommendations: LearningRecommendation[] = [
  { id: 'lr1', subject: 'Computer Networks', type: 'Revision Module', title: 'Network Layer & Routing Protocols', description: 'Your attendance and performance in CS304 indicate a need for foundational review.', action: 'Start Module', priority: 'high' },
  { id: 'lr2', subject: 'Computer Networks', type: 'Practice Quiz', title: 'Subnetting and IP Addressing Practice', description: 'Sharpen your networking fundamentals with 20 practice questions.', action: 'Take Quiz', priority: 'high' },
  { id: 'lr3', subject: 'Operating Systems', type: 'Video Resource', title: 'Process Scheduling Algorithms', description: 'Watch this 30-minute video covering FCFS, SJF, and Round Robin scheduling.', action: 'Watch Now', priority: 'medium' },
  { id: 'lr4', subject: 'Data Structures', type: 'Previous Year Paper', title: 'Semester 4 DS Question Paper', description: 'Solve the previous year paper to strengthen exam readiness.', action: 'Download', priority: 'medium' },
  { id: 'lr5', subject: 'General', type: 'Faculty Office Hours', title: 'Dr. Priya Verma - Office Hours', description: 'Available Wed 3-4 PM for doubt resolution on Data Structures.', action: 'Book Slot', priority: 'low' },
  { id: 'lr6', subject: 'General', type: 'Library Book', title: 'Computer Networks by Tanenbaum', description: 'Recommended reading aligned with your CS304 syllabus.', action: 'Reserve Book', priority: 'low' },
];

export const aiInsights: AIInsight[] = [
  { id: 'ai1', category: 'Attendance', insight: 'Attendance has decreased by 8% in Department of Computer Science over the last 3 weeks.', severity: 'warning', recommendation: 'Schedule academic counseling for 12 students with attendance below 60%.', metric: '74% avg', trend: 'down' },
  { id: 'ai2', category: 'Hostel', insight: 'Hostel occupancy is at 87%, nearing full capacity for Block A and Block B.', severity: 'warning', recommendation: 'Prepare Block C for new allocations and review maintenance rooms.', metric: '87%', trend: 'up' },
  { id: 'ai3', category: 'Academic Risk', insight: '23 students across 3 departments require academic intervention based on risk analysis.', severity: 'critical', recommendation: 'Initiate intervention protocols: counseling, parent notification, and mentoring.', metric: '23 students', trend: 'up' },
  { id: 'ai4', category: 'Finance', insight: 'Fee collection is 91% complete for the current semester. Rs. 14.2L still outstanding.', severity: 'info', recommendation: 'Send automated reminders to 87 students with pending fees before due dates.', metric: '91%', trend: 'stable' },
  { id: 'ai5', category: 'Transport', insight: 'Transport Route 4 (Kolar Road) has 96% utilization, highest among all routes.', severity: 'info', recommendation: 'Consider adding a second bus on Route 4 during peak hours.', metric: '96%', trend: 'up' },
  { id: 'ai6', category: 'Complaints', insight: 'Grievance resolution time has improved by 40% compared to last semester.', severity: 'info', recommendation: 'Continue the automated routing system. Average resolution time: 2.3 days.', metric: '2.3 days', trend: 'down' },
  { id: 'ai7', category: 'Certificates', insight: 'Digital certificate issuance has increased 3x since automation. Average processing: 1.5 days.', severity: 'info', recommendation: 'Promote digital certificate usage to further reduce paper-based requests.', metric: '1.5 days', trend: 'down' },
];

export const admissions: Admission[] = [
  { id: 'ad1', applicantName: 'Riya Sharma', email: 'riya@email.com', phone: '+91 99887 76655', course: 'B.Tech Computer Science', department: 'CSE', status: 'under-review', appliedDate: '2026-10-01', documents: ['10th Marksheet', '12th Marksheet', 'Aadhaar Card', 'Passport Photo'] },
  { id: 'ad2', applicantName: 'Aditya Verma', email: 'aditya@email.com', phone: '+91 99887 76656', course: 'B.Tech Electrical Engineering', department: 'EE', status: 'submitted', appliedDate: '2026-10-02', documents: ['10th Marksheet', '12th Marksheet', 'Aadhaar Card'] },
  { id: 'ad3', applicantName: 'Kavya Reddy', email: 'kavya@email.com', phone: '+91 99887 76657', course: 'B.Tech Mechanical Engineering', department: 'ME', status: 'approved', appliedDate: '2026-09-25', documents: ['10th Marksheet', '12th Marksheet', 'Aadhaar Card', 'Transfer Certificate'], enrollmentNo: 'MP2026CS099' },
  { id: 'ad4', applicantName: 'Nikhil Joshi', email: 'nikhil@email.com', phone: '+91 99887 76658', course: 'B.Tech Computer Science', department: 'CSE', status: 'enrolled', appliedDate: '2026-09-20', documents: ['10th Marksheet', '12th Marksheet', 'Aadhaar Card', 'Transfer Certificate', 'Passport Photo'], enrollmentNo: 'MP2026CS100' },
  { id: 'ad5', applicantName: 'Pooja Nair', email: 'pooja@email.com', phone: '+91 99887 76659', course: 'B.Tech Civil Engineering', department: 'CE', status: 'under-review', appliedDate: '2026-10-03', documents: ['10th Marksheet', '12th Marksheet', 'Aadhaar Card'] },
  { id: 'ad6', applicantName: 'Rahul Mehta', email: 'rahul@email.com', phone: '+91 99887 76660', course: 'B.Tech Computer Science', department: 'CSE', status: 'draft', appliedDate: '2026-10-05', documents: ['10th Marksheet'] },
];

export const automationWorkflows: AutomationWorkflow[] = [
  { id: 'aw1', name: 'Attendance Alert Automation', trigger: 'Attendance drops below 75%', rule: 'Check student attendance per subject', action: 'Create intervention alert', notification: 'Notify Student + Parent + Faculty', enabled: true, category: 'Attendance' },
  { id: 'aw2', name: 'Fee Due Reminder', trigger: 'Fee due date within 5 days', rule: 'Check pending fees against due dates', action: 'Send payment reminder', notification: 'Notify Student + Parent', enabled: true, category: 'Fees' },
  { id: 'aw3', name: 'Certificate Auto-Processing', trigger: 'Certificate request submitted', rule: 'Verify student data automatically', action: 'Generate certificate + QR code', notification: 'Notify student when issued', enabled: true, category: 'Certificates' },
  { id: 'aw4', name: 'Complaint Auto-Routing', trigger: 'Complaint submitted', rule: 'Detect category and assign department', action: 'Assign to relevant officer', notification: 'Notify assigned officer', enabled: true, category: 'Complaints' },
  { id: 'aw5', name: 'Academic Risk Detection', trigger: 'Risk score above threshold', rule: 'Analyze attendance + academics + engagement', action: 'Create risk alert + intervention plan', notification: 'Notify Faculty + Parent (if configured)', enabled: true, category: 'Academic' },
  { id: 'aw6', name: 'Exam Notification', trigger: 'Exam schedule published', rule: 'Match students to enrolled subjects', action: 'Send exam schedule', notification: 'Notify all enrolled students', enabled: false, category: 'Academic' },
];

export const documents: DocumentItem[] = [
  { id: 'd1', type: 'Student ID Card', issueDate: '2026-08-01', status: 'available', icon: 'IdCard' },
  { id: 'd2', type: 'Admission Letter', issueDate: '2022-08-01', status: 'available', icon: 'FileText' },
  { id: 'd3', type: 'Fee Receipt - Semester 5', issueDate: '2026-08-10', status: 'available', icon: 'Receipt' },
  { id: 'd4', type: 'Bonafide Certificate', issueDate: '2026-09-17', status: 'available', icon: 'Award' },
  { id: 'd5', type: 'Character Certificate', issueDate: '2026-08-22', status: 'available', icon: 'ScrollText' },
  { id: 'd6', type: 'Mark Sheet - Semester 4', issueDate: '2026-07-15', status: 'available', icon: 'ClipboardCheck' },
  { id: 'd7', type: 'Transfer Certificate', issueDate: '', status: 'requested', icon: 'FileText' },
  { id: 'd8', type: 'Bonafide Certificate (New)', issueDate: '', status: 'pending', icon: 'Award' },
];

export const announcements: Announcement[] = [
  { id: 'an1', title: 'Mid-Semester Examination Schedule', message: 'The mid-semester examination schedule for Semester 5 has been published. Please check the Examination module for dates and venues.', date: '2026-10-05', category: 'Academic', important: true },
  { id: 'an2', title: 'Hackathon 2026 Registration', message: 'Idea & Innovation Hackathon 2026 is now open for registration. Theme: Innovate for Madhya Pradesh, Build for Viksit Bharat.', date: '2026-10-03', category: 'Events', important: true },
  { id: 'an3', title: 'Library Timing Extended', message: 'Library will remain open until 10 PM during examination weeks starting Oct 15.', date: '2026-10-04', category: 'Library', important: false },
  { id: 'an4', title: 'Hostel Maintenance Notice', message: 'Block B, Room 201 will be under maintenance on Oct 8. Residents please coordinate with warden.', date: '2026-10-06', category: 'Hostel', important: false },
];

export const enrollmentData = [
  { year: '2021', students: 21000 },
  { year: '2022', students: 22500 },
  { year: '2023', students: 23800 },
  { year: '2024', students: 25000 },
  { year: '2025', students: 25600 },
  { year: '2026', students: 26200 },
];

export const feeCollectionData = [
  { month: 'May', collected: 4.2, pending: 0.8 },
  { month: 'Jun', collected: 5.1, pending: 0.6 },
  { month: 'Jul', collected: 6.8, pending: 0.9 },
  { month: 'Aug', collected: 8.5, pending: 1.2 },
  { month: 'Sep', collected: 7.2, pending: 1.5 },
  { month: 'Oct', collected: 5.6, pending: 1.4 },
];

export const complaintsTrendData = [
  { month: 'May', submitted: 45, resolved: 38 },
  { month: 'Jun', submitted: 52, resolved: 48 },
  { month: 'Jul', submitted: 38, resolved: 35 },
  { month: 'Aug', submitted: 61, resolved: 55 },
  { month: 'Sep', submitted: 43, resolved: 40 },
  { month: 'Oct', submitted: 28, resolved: 25 },
];

export const performanceData = [
  { subject: 'DS', score: 93 },
  { subject: 'DBMS', score: 84 },
  { subject: 'OS', score: 70 },
  { subject: 'CN', score: 65 },
  { subject: 'SE', score: 87 },
];

export const hostelOccupancyData = [
  { block: 'Block A', occupied: 87, capacity: 100 },
  { block: 'Block B', occupied: 82, capacity: 100 },
  { block: 'Block C', occupied: 65, capacity: 100 },
];

export const transportUsageData = [
  { route: 'Route 1', utilization: 84 },
  { route: 'Route 2', utilization: 84 },
  { route: 'Route 3', utilization: 70 },
  { route: 'Route 4', utilization: 96 },
  { route: 'Route 5', utilization: 0 },
];

export const departmentData = [
  { name: 'CSE', students: 5200, faculty: 180 },
  { name: 'ECE', students: 3800, faculty: 120 },
  { name: 'ME', students: 4100, faculty: 140 },
  { name: 'EE', students: 3500, faculty: 110 },
  { name: 'CE', students: 2900, faculty: 95 },
  { name: 'IT', students: 3100, faculty: 100 },
];

export const campusLocations = [
  { id: 'loc1', name: 'Academic Block A', lat: 23.2599, lng: 77.4126, type: 'academic' },
  { id: 'loc2', name: 'Academic Block B', lat: 23.2610, lng: 77.4135, type: 'academic' },
  { id: 'loc3', name: 'Central Library', lat: 23.2605, lng: 77.4120, type: 'library' },
  { id: 'loc4', name: 'Hostel Block A', lat: 23.2585, lng: 77.4110, type: 'hostel' },
  { id: 'loc5', name: 'Hostel Block B', lat: 23.2580, lng: 77.4115, type: 'hostel' },
  { id: 'loc6', name: 'Hostel Block C', lat: 23.2575, lng: 77.4120, type: 'hostel' },
  { id: 'loc7', name: 'Sports Complex', lat: 23.2620, lng: 77.4145, type: 'sports' },
  { id: 'loc8', name: 'Auditorium', lat: 23.2600, lng: 77.4140, type: 'events' },
  { id: 'loc9', name: 'Cafeteria', lat: 23.2615, lng: 77.4128, type: 'food' },
  { id: 'loc10', name: 'Bus Depot', lat: 23.2590, lng: 77.4105, type: 'transport' },
  { id: 'loc11', name: 'Examination Block', lat: 23.2625, lng: 77.4130, type: 'academic' },
  { id: 'loc12', name: 'Administration Office', lat: 23.2595, lng: 77.4138, type: 'admin' },
];

export const parentAlerts: Notification[] = [
  { id: 'pa1', type: 'attendance', title: 'Attendance Alert', message: "Your ward Aarav's attendance in Computer Networks has dropped to 65%, below the 75% requirement.", timestamp: '2026-10-06 09:30', read: false },
  { id: 'pa2', type: 'fees', title: 'Fee Due in 4 Days', message: 'Hostel Fee of Rs. 12,000 is due on October 10. Current pending amount: Rs. 20,500.', timestamp: '2026-10-06 08:00', read: false },
  { id: 'pa3', type: 'academic', title: 'Upcoming Examination', message: "Aarav has Mid-Semester Examination for Data Structures on October 15 at 10:00 AM, Hall-1.", timestamp: '2026-10-05 14:00', read: false },
  { id: 'pa4', type: 'academic', title: 'Performance Update', message: "Aarav's predicted performance score is 82% (Good). CGPA: 8.42. Positive trend maintained.", timestamp: '2026-10-04 10:00', read: true },
  { id: 'pa5', type: 'events', title: 'Event Registration', message: 'Aarav has registered for Idea & Innovation Hackathon 2026 on October 20.', timestamp: '2026-10-03 16:00', read: true },
];

export const financeData = {
  totalCollection: 38.4,
  pendingFees: 6.8,
  todayPayments: 1.2,
  paymentFailures: 12,
  outstandingCount: 342,
  categoryBreakdown: [
    { category: 'Tuition', amount: 22.5 },
    { category: 'Hostel', amount: 8.2 },
    { category: 'Examination', amount: 3.1 },
    { category: 'Library', amount: 1.8 },
    { category: 'Transport', amount: 2.8 },
  ],
  departmentCollection: [
    { dept: 'CSE', amount: 9.8 },
    { dept: 'ECE', amount: 6.5 },
    { dept: 'ME', amount: 7.2 },
    { dept: 'EE', amount: 6.1 },
    { dept: 'CE', amount: 4.9 },
    { dept: 'IT', amount: 3.9 },
  ],
};

export const universityHealthScore = {
  total: 87,
  breakdown: [
    { name: 'Academic Health', score: 89 },
    { name: 'Attendance Health', score: 82 },
    { name: 'Student Services', score: 91 },
    { name: 'Infrastructure', score: 85 },
    { name: 'Governance', score: 88 },
    { name: 'Student Satisfaction', score: 86 },
  ],
};
