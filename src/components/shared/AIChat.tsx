import { useState, useRef, useEffect, type ReactNode } from 'react';
import { Bot, Send, Mic, Sparkles, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import { currentStudent, subjectAttendance, exams, fees, timetable } from '@/lib/demo-data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  'What is my attendance?',
  'When is my next exam?',
  'How much fee is pending?',
  'What is today\'s timetable?',
  'Where is my classroom?',
  'How do I apply for a certificate?',
];

function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  const userRole = localStorage.getItem('smart-campus-user');
  const parsed = userRole ? JSON.parse(userRole) : null;
  const role = parsed?.role || 'student';

  if (q.includes('attendance')) {
    if (role === 'student' || role === 'parent') {
      const low = subjectAttendance.filter(s => s.percentage < 75);
      const avg = Math.round(subjectAttendance.reduce((a, s) => a + s.percentage, 0) / subjectAttendance.length);
      let resp = `Your overall attendance is ${avg}%. Here's the breakdown:\n`;
      subjectAttendance.forEach(s => {
        resp += `• ${s.subject}: ${s.percentage}% (${s.present}/${s.total} classes)\n`;
      });
      if (low.length > 0) {
        resp += `\n⚠️ Warning: Your attendance is below 75% in ${low.map(s => s.subject).join(', ')}. Please attend upcoming classes.`;
      }
      return resp;
    }
    return 'You can view attendance data in the Attendance module. Would you like me to guide you there?';
  }

  if (q.includes('exam') || q.includes('test') || q.includes('next')) {
    if (role === 'student' || role === 'parent') {
      const next = exams[0];
      return `Your next exam is:\n📝 ${next.name} - ${next.subject} (${next.code})\n📅 Date: ${next.date}\n🕐 Time: ${next.time}\n📍 Venue: ${next.room}, ${next.building}\n⏱️ Duration: ${next.duration}\n\nGood luck with your preparation!`;
    }
    return 'Exam schedules are available in the Examination module for faculty and admin roles.';
  }

  if (q.includes('fee') || q.includes('pending') || q.includes('payment') || q.includes('pay')) {
    if (role === 'student' || role === 'parent') {
      const pending = fees.filter(f => f.status === 'pending');
      const totalPending = pending.reduce((a, f) => a + (f.amount - f.paid), 0);
      let resp = `Your fee summary:\n`;
      fees.forEach(f => {
        const icon = f.status === 'paid' ? '✅' : '⏳';
        resp += `${icon} ${f.category}: ₹${(f.amount - f.paid).toLocaleString()} ${f.status.toUpperCase()}\n`;
      });
      resp += `\n💰 Total Pending: ₹${totalPending.toLocaleString()}\n\nYou can pay through the Fee Management module.`;
      return resp;
    }
    return 'Fee management is available in the Finance module for finance officers.';
  }

  if (q.includes('timetable') || q.includes('schedule') || q.includes('class') || q.includes('today')) {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayClasses = timetable.filter(t => t.day === today);
    if (todayClasses.length > 0) {
      let resp = `Today's timetable (${today}):\n`;
      todayClasses.forEach(t => {
        resp += `📖 ${t.time} - ${t.subject} (${t.code})\n   📍 ${t.room}, ${t.building}\n   👨‍🏫 ${t.faculty}\n`;
      });
      return resp;
    }
    return `No classes scheduled for today (${today}). Your next class is tomorrow at 9:00 AM - Data Structures in A-101.`;
  }

  if (q.includes('classroom') || q.includes('where') || q.includes('room') || q.includes('library')) {
    if (q.includes('library')) {
      return 'The Central Library is located in the main campus building, near Academic Block A. It\'s open from 8 AM to 10 PM during exam weeks. You can also search and reserve books through the Digital Library module.';
    }
    if (q.includes('classroom') || q.includes('room')) {
      const firstClass = timetable.find(t => t.day === 'Monday');
      if (firstClass) {
        return `Your next class is in ${firstClass.room}, ${firstClass.building}. You can use the Campus Map to navigate there. The building is located near the main entrance of the campus.`;
      }
    }
    return 'You can find all campus locations through the Campus Map module. It includes academic blocks, library, hostels, cafeteria, sports complex, and bus depot.';
  }

  if (q.includes('certificate') || q.includes('bonafide') || q.includes('document')) {
    return 'You can request certificates through the Digital Certificates module. Available types:\n• Bonafide Certificate\n• Character Certificate\n• Transfer Certificate\n• Migration Certificate\n• Course Completion Certificate\n\nThe workflow is: Request → Verification → Approval → Digital Issue with QR code. Most certificates are processed within 1-2 days.';
  }

  if (q.includes('bus') || q.includes('transport') || q.includes('route')) {
    return 'University transport operates 5 routes:\n• Route 1: Bhopal City Circuit\n• Route 2: Old City Route\n• Route 3: Airport Road\n• Route 4: Kolar Road\n• Route 5: Indore Highway\n\nYou can track live bus locations through the Smart Transport module. Your assigned bus is MP-04-AB-1234 (Route 1).';
  }

  if (q.includes('hostel')) {
    return 'You can apply for hostel through the Hostel Management module. Your current allocation is Block A, Room A-101, Bed 2. You can submit maintenance complaints or request room changes through the same module.';
  }

  if (q.includes('complaint') || q.includes('grievance')) {
    return 'You can submit a complaint through the Grievance Management module. Complaints can be filed for: Hostel, Classroom, Transport, Fees, Faculty, Infrastructure, Internet, Library, and more. You can also choose to submit anonymously. Most complaints are resolved within 2-3 days.';
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hello! I'm CampusAI, your university digital assistant. I can help you with:\n• Attendance queries\n• Exam schedules\n• Fee information\n• Timetable\n• Campus navigation\n• Certificate requests\n• Transport information\n• Submitting complaints\n\nHow can I assist you today?`;
  }

  return `I'm CampusAI, your university assistant. I can help with attendance, exams, fees, timetable, campus navigation, certificates, transport, and more. Try asking:\n• "What is my attendance?"\n• "When is my next exam?"\n• "How much fee is pending?"\n• "What is today's timetable?"`;
}

interface AIChatProps {
  open: boolean;
  onClose: () => void;
}

export function AIChat({ open, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'assistant', content: "Hello! I'm CampusAI, your university digital assistant. I can help with attendance, exams, fees, timetable, campus navigation, and more. How can I assist you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Voice input is not supported in your browser. You can type your question instead. Try Chrome or Edge for voice support.',
      }]);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };
    recognition.onerror = () => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I couldn\'t hear you clearly. Please try again or type your question.',
      }]);
    };
    recognition.start();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full sm:max-w-md h-[80vh] sm:h-[600px] bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b gradient-hero rounded-t-2xl sm:rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white flex items-center gap-1.5">
                CampusAI
                <Sparkles className="h-3.5 w-3.5 text-white/70" />
              </h3>
              <p className="text-xs text-white/70">Your digital campus assistant</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollRef as any}>
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {messages.length <= 2 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-xs bg-muted hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t flex gap-2">
          <Button variant="outline" size="icon" onClick={handleVoice} title="Talk to CampusAI">
            <Mic className="h-4 w-4" />
          </Button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(input); }}
            placeholder="Ask me anything..."
            className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <Button size="icon" onClick={() => handleSend(input)} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
