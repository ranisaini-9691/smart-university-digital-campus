import { useState } from 'react';
import { AIChat } from '@/components/shared/AIChat';
import { Bot, Sparkles, Mic, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';

const suggestions = [
  'What is my attendance?', 'When is my next exam?', 'How much fee is pending?',
  'What is today\'s timetable?', 'Where is my classroom?', 'How do I apply for a certificate?',
  'What buses are available?', 'I want to submit a complaint.',
];

export function AIChatPage() {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="h-7 w-7 text-primary" /> CampusAI
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Your intelligent digital campus assistant — 24/7 support.</p>
      </div>

      <Card className="p-5 gradient-card border-primary/20">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl gradient-hero flex items-center justify-center shrink-0">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">AI-Powered Campus Assistant</h3>
            <p className="text-sm text-muted-foreground mt-1">
              I can help you with attendance queries, exam schedules, fee information, campus navigation,
              certificate requests, transport details, and more. Try asking me a question or use voice input.
            </p>
          </div>
        </div>
      </Card>

      <div>
        <p className="text-sm font-semibold mb-3 flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button key={s} onClick={() => setChatOpen(true)} className="text-sm bg-muted hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-full transition-colors">
              {s}
            </button>
          ))}
        </div>
      </div>

      <Card className="p-12 text-center bg-muted/30">
        <div className="h-20 w-20 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
          <Bot className="h-10 w-10 text-white" />
        </div>
        <h3 className="font-semibold text-lg">Chat with CampusAI</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">Click the button below to start a conversation. Supports text and voice input.</p>
        <button onClick={() => setChatOpen(true)} className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
          <Mic className="h-5 w-5" /> Talk to CampusAI
        </button>
      </Card>

      <AIChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
