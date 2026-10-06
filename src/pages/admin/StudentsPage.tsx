import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, GraduationCap, Eye, TrendingUp } from 'lucide-react';
import { allStudents, subjectAttendance, riskPredictions } from '@/lib/demo-data';

export function StudentsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = allStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.enrollmentNo.toLowerCase().includes(search.toLowerCase()));
  const selectedStudent = allStudents.find(s => s.id === selected);
  const selectedRisk = riskPredictions.find(r => r.studentId === selected);

  const lifecycle = ['Admission', 'Enrollment', 'Academic Journey', 'Attendance', 'Examination', 'Fees', 'Certificates', 'Graduation'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Student Lifecycle Management</h1>
        <p className="text-muted-foreground text-sm mt-1">View and manage complete student profiles.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or enrollment no..." className="pl-9" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(student => {
          const risk = riskPredictions.find(r => r.studentId === student.id);
          return (
            <Card key={student.id} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary text-primary-foreground font-semibold">{student.avatar}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.enrollmentNo}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{student.department}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">CGPA: {student.cgpa}</Badge>
                    {risk && <Badge variant={risk.riskLevel === 'high' ? 'destructive' : risk.riskLevel === 'medium' ? 'secondary' : 'default'} className="text-xs capitalize">{risk.riskLevel} risk</Badge>}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => setSelected(student.id)}>
                    <Eye className="h-3.5 w-3.5 mr-1" /> View Profile
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary text-primary-foreground">{selectedStudent.avatar}</AvatarFallback></Avatar>
                  {selectedStudent.name}
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="info">
                <TabsList><TabsTrigger value="info">Info</TabsTrigger><TabsTrigger value="academic">Academic</TabsTrigger><TabsTrigger value="lifecycle">Lifecycle</TabsTrigger></TabsList>

                <TabsContent value="info" className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Enrollment No</p><p className="font-medium">{selectedStudent.enrollmentNo}</p></div>
                    <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Department</p><p className="font-medium">{selectedStudent.department}</p></div>
                    <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Course</p><p className="font-medium">{selectedStudent.course}</p></div>
                    <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Semester</p><p className="font-medium">{selectedStudent.semester}</p></div>
                    <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{selectedStudent.phone}</p></div>
                    <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{selectedStudent.email}</p></div>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-primary/5 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">CGPA</p><p className="text-xl font-bold">{selectedStudent.cgpa}</p></div>
                    <div className="bg-success/5 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">Attendance</p><p className="text-xl font-bold">{Math.round(subjectAttendance.reduce((a, s) => a + s.percentage, 0) / subjectAttendance.length)}%</p></div>
                    <div className="bg-warning/5 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">Risk Score</p><p className="text-xl font-bold">{selectedRisk?.riskScore || 'N/A'}</p></div>
                  </div>
                  <div className="space-y-2">
                    {subjectAttendance.map(s => (
                      <div key={s.code} className="flex items-center gap-3">
                        <span className="text-xs w-24 truncate">{s.subject}</span>
                        <Progress value={s.percentage} className="h-1.5 flex-1" />
                        <span className="text-xs font-medium w-8 text-right">{s.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="lifecycle" className="space-y-2">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {lifecycle.map((step, i) => (
                      <div key={step} className="flex items-center gap-2 shrink-0">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 6 ? 'bg-success text-white' : 'bg-muted text-muted-foreground'}`}>{i < 6 ? <GraduationCap className="h-4 w-4" /> : i + 1}</div>
                        <span className="text-xs font-medium whitespace-nowrap">{step}</span>
                        {i < lifecycle.length - 1 && <div className={`h-px w-4 ${i < 5 ? 'bg-success' : 'bg-border'}`} />}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
