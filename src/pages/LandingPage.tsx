import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GraduationCap, ArrowRight, BarChart3, Bot, Shield, Zap, Award, Users, Building2, Bus, Lightbulb, TrendingUp, Vote, MapPin, CheckCircle2, Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const stats = [
  { label: 'Students', value: '25,000+', icon: Users },
  { label: 'Faculty Members', value: '1,200+', icon: GraduationCap },
  { label: 'Departments', value: '50+', icon: Building2 },
  { label: 'Digital Services', value: '100+', icon: Zap },
  { label: 'Digital Transactions', value: '95%', icon: TrendingUp },
];

const features = [
  { title: 'Unified Digital Governance', desc: 'All major university services in one secure platform — admissions, attendance, exams, fees, certificates, and more.', icon: Shield, color: 'text-primary' },
  { title: 'AI Campus Assistant', desc: '24/7 intelligent helpdesk for students. Get instant answers about attendance, exams, fees, and campus navigation.', icon: Bot, color: 'text-accent' },
  { title: 'Predictive Analytics', desc: 'Early identification of students needing support through AI-powered risk detection and performance prediction.', icon: TrendingUp, color: 'text-success' },
  { title: 'Digital Certificates', desc: 'Fast, verifiable, paperless documents with QR verification. Request, verify, and download instantly.', icon: Award, color: 'text-warning' },
  { title: 'Smart Automation', desc: 'Automated workflows for attendance alerts, fee reminders, certificate processing, and complaint routing.', icon: Zap, color: 'text-primary' },
  { title: 'Parent Engagement', desc: 'Transparent communication with parents through real-time alerts on attendance, performance, and fees.', icon: Users, color: 'text-accent' },
  { title: 'Smart Mobility', desc: 'Live campus transport tracking, route management, and interactive campus navigation map.', icon: Bus, color: 'text-success' },
  { title: 'Personalized Learning', desc: 'AI-assisted learning recommendations tailored to each student\'s performance and needs.', icon: Lightbulb, color: 'text-warning' },
];

const impactMetrics = [
  { label: 'Reduction in Manual Service Requests', value: '60%' },
  { label: 'Faster Grievance Resolution', value: '40%' },
  { label: 'Faster Certificate Processing', value: '30%' },
  { label: 'Paperless Digital Services', value: '100+' },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-hero flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base leading-tight">Smart University</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Digital Campus Platform</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button variant="ghost" onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</Button>
            <Button variant="ghost" onClick={() => { document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' }); }}>Impact</Button>
            <Button onClick={() => navigate('/login')} className="gap-2">
              Explore Digital Campus <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-3 mt-8">
                <Button variant="ghost" onClick={() => { navigate('/login'); setMenuOpen(false); }}>Login</Button>
                <Button variant="ghost" onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}>Features</Button>
                <Button variant="ghost" onClick={() => { document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}>Impact</Button>
                <Button onClick={() => { navigate('/login'); setMenuOpen(false); }} className="gap-2">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
                <Sparkles className="h-4 w-4 text-cyan-200" />
                Innovate for Madhya Pradesh. Build for Viksit Bharat.
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Smart University<br />
                <span className="text-cyan-200">Digital Campus</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl">
                A Unified Digital Ecosystem for Smarter Universities and Better Student Experiences.
              </p>
              <p className="text-base text-white/60 mb-8">
                One Campus. One Platform. Smarter Governance. Better Education.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={() => navigate('/login')} className="bg-white text-primary hover:bg-white/90 gap-2">
                  Explore Digital Campus <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="border-white/30 text-white hover:bg-white/10 gap-2">
                  <Bot className="h-4 w-4" /> View Demo
                </Button>
              </div>
            </div>
            <div className="hidden lg:block animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl" />
                <Card className="relative bg-white/10 border-white/20 backdrop-blur-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-white/70">University Digital Health Score</p>
                      <p className="text-4xl font-bold">87<span className="text-xl text-white/50">/100</span></p>
                    </div>
                    <div className="h-16 w-16 rounded-2xl bg-cyan-400/30 flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Academic Health', score: 89 },
                      { label: 'Attendance Health', score: 82 },
                      { label: 'Student Services', score: 91 },
                      { label: 'Governance', score: 88 },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/70">{item.label}</span>
                          <span className="font-medium">{item.score}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" style={{ width: `${item.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Bot className="h-5 w-5 mx-auto mb-1 text-cyan-200" />
                      <p className="text-xs text-white/70">AI Assistant</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Zap className="h-5 w-5 mx-auto mb-1 text-cyan-200" />
                      <p className="text-xs text-white/70">Automation</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Shield className="h-5 w-5 mx-auto mb-1 text-cyan-200" />
                      <p className="text-xs text-white/70">Secure</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-16">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-cyan-200" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Smart University Digital Campus?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive digital governance platform bringing every university service into one unified ecosystem.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(feature => (
              <Card key={feature.title} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 animate-slide-up">
                <div className={`h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Flow */}
      <section className="py-20 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for Hackathon Demo</h2>
            <p className="text-lg text-muted-foreground">Optimized for a 7-minute judge presentation with instant demo access.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Login instantly as Student, Faculty, Parent, or Admin with pre-seeded demo data',
              'Ask CampusAI about attendance, exams, fees, and campus navigation',
              'View AI-powered student risk detection and performance prediction',
              'Request digital certificates with QR verification workflow',
              'Explore the Digital Governance Command Center with real-time metrics',
              'See automation workflows for attendance, fees, certificates, and complaints',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-4 border">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" onClick={() => navigate('/login')} className="gap-2">
              Try Demo Now <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-4">
              <Vote className="h-4 w-4" /> Impact for Viksit Bharat
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Projected Impact</h2>
            <p className="text-sm text-muted-foreground">Projected/demo impact estimates — not measured real-world results.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {impactMetrics.map(metric => (
              <Card key={metric.label} className="p-6 text-center gradient-card">
                <p className="text-3xl font-bold text-gradient mb-2">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 gradient-hero text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Explore the Digital Campus?</h2>
          <p className="text-lg text-white/80 mb-8">Experience the future of university governance and student services.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" onClick={() => navigate('/login')} className="bg-white text-primary hover:bg-white/90 gap-2">
              Login Now <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="border-white/30 text-white hover:bg-white/10">
              Try Demo Mode
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl gradient-hero flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Smart University</h3>
                  <p className="text-xs text-muted-foreground">Digital Campus</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">One Campus. One Platform. Smarter Governance. Better Education.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Digital Governance</li>
                <li>AI Assistant</li>
                <li>Smart Automation</li>
                <li>Predictive Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Admissions</li>
                <li>Examinations</li>
                <li>Certificates</li>
                <li>Transport & Hostel</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Initiative</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Digital India</li>
                <li>Smart Universities</li>
                <li>Viksit Bharat</li>
                <li>Innovate for MP</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>Idea & Innovation Hackathon 2026 — Innovate for Madhya Pradesh. Build for Viksit Bharat.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
