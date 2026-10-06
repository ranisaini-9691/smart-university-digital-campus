import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, User, Building2, Beaker, BookOpen } from 'lucide-react';
import { timetable } from '@/lib/demo-data';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function TimetablePage() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const [selectedDay, setSelectedDay] = useState(days.includes(today) ? today : 'Monday');

  const typeIcon = { lecture: BookOpen, lab: Beaker, tutorial: BookOpen };
  const typeColor = { lecture: 'bg-primary/10 text-primary', lab: 'bg-accent/10 text-accent', tutorial: 'bg-warning/10 text-warning' };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Smart Timetable</h1>
        <p className="text-muted-foreground text-sm mt-1">View your daily and weekly class schedule.</p>
      </div>

      <Tabs value={selectedDay} onValueChange={setSelectedDay}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {days.map(d => (
            <TabsTrigger key={d} value={d} className={d === today ? 'relative' : ''}>
              {d}
              {d === today && <span className="absolute -top-1 -right-1 h-2 w-2 bg-success rounded-full" />}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map(day => {
          const dayClasses = timetable.filter(t => t.day === day);
          return (
            <TabsContent key={day} value={day} className="space-y-3">
              {dayClasses.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">No classes scheduled for {day}. Free day!</Card>
              ) : (
                dayClasses.map(cls => {
                  const Icon = typeIcon[cls.type];
                  return (
                    <Card key={cls.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${typeColor[cls.type]}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold">{cls.subject}</p>
                              <p className="text-xs text-muted-foreground">{cls.code}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                              <Clock className="h-3.5 w-3.5" />
                              {cls.time}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {cls.faculty}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {cls.room}, {cls.building}</span>
                            <span className="capitalize bg-muted px-2 py-0.5 rounded-full">{cls.type}</span>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate('/dashboard/map')}>
                            <MapPin className="h-3.5 w-3.5 mr-1" /> Navigate to Classroom
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
