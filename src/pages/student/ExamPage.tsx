import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Clock, MapPin, Download, Award } from 'lucide-react';
import { exams, results } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';

export function ExamPage() {
  const [tab, setTab] = useState('schedule');
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Examination Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Exam schedules, hall tickets, and results.</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          <TabsTrigger value="hallticket">Hall Ticket</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-3">
          {exams.map(exam => (
            <Card key={exam.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{exam.name}</p>
                    <p className="text-sm text-muted-foreground">{exam.subject} ({exam.code})</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3.5 w-3.5" /> {exam.date}</span>
                      <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {exam.time}</span>
                      <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {exam.room}, {exam.building}</span>
                      <span className="text-muted-foreground">Duration: {exam.duration}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={exam.type === 'mid-term' ? 'default' : 'secondary'} className="capitalize shrink-0">{exam.type}</Badge>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="hallticket">
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className="h-16 w-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg">Hall Ticket — Mid-Semester 2026</h3>
              <p className="text-sm text-muted-foreground">Aarav Sharma • MP2024CS045</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Student Name</p><p className="font-medium">Aarav Sharma</p></div>
              <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Enrollment No</p><p className="font-medium">MP2024CS045</p></div>
              <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Department</p><p className="font-medium">CSE</p></div>
              <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Semester</p><p className="font-medium">5</p></div>
            </div>
            <div className="space-y-2 mb-6">
              {exams.filter(e => e.type === 'mid-term').map(exam => (
                <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg text-sm">
                  <span className="font-medium">{exam.subject}</span>
                  <span className="text-muted-foreground">{exam.date} • {exam.room}</span>
                </div>
              ))}
            </div>
            <Button className="w-full" onClick={() => toast({ title: 'Hall Ticket Downloaded', description: 'Your hall ticket has been downloaded as PDF.' })}>
              <Download className="h-4 w-4 mr-2" /> Download Hall Ticket
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">Current Semester (Sem 5) Results</h3>
            <div className="space-y-2">
              {results.filter(r => r.semester === 5).map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{r.subject}</p>
                    <p className="text-xs text-muted-foreground">{r.code}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground text-xs">Internal: {r.internalMarks}/30</p>
                      <p className="text-muted-foreground text-xs">External: {r.externalMarks}/70</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg">{r.totalMarks}</p>
                      <Badge variant={r.totalMarks >= 85 ? 'default' : r.totalMarks >= 70 ? 'secondary' : 'outline'}>{r.grade}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">Grade History</h3>
            <div className="space-y-2">
              {results.filter(r => r.semester < 5).map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{r.subject}</p>
                    <p className="text-xs text-muted-foreground">Sem {r.semester} • {r.code}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{r.totalMarks}/100</span>
                    <Badge variant="outline">{r.grade}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
