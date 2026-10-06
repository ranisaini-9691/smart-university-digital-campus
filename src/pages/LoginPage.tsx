import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Mail, Lock, Eye, EyeOff, Sparkles, Users, BookOpen, UserCog, Wallet, Building2, Bot, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import type { UserRole } from '@/lib/types';

const roleOptions: { role: UserRole; label: string; icon: any; email: string }[] = [
  { role: 'student', label: 'Student', icon: Users, email: 'student@campus.edu' },
  { role: 'faculty', label: 'Faculty', icon: BookOpen, email: 'faculty@campus.edu' },
  { role: 'parent', label: 'Parent', icon: Users, email: 'parent@campus.edu' },
  { role: 'admin', label: 'Admin', icon: UserCog, email: 'admin@campus.edu' },
  { role: 'finance', label: 'Finance Officer', icon: Wallet, email: 'finance@campus.edu' },
  { role: 'campus', label: 'Campus Officer', icon: Building2, email: 'campus@campus.edu' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginAsRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('student@campus.edu');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: UserRole, emailVal: string) => {
    setSelectedRole(role);
    setEmail(emailVal);
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Use the Demo Login buttons below for instant access.');
      }
      setLoading(false);
    }, 600);
  };

  const handleDemoLogin = (role: UserRole) => {
    loginAsRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Smart University</h1>
              <p className="text-sm text-white/70">Digital Campus Platform</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-cyan-200" />
              Innovate for Madhya Pradesh. Build for Viksit Bharat.
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              One Campus.<br />
              One Platform.<br />
              <span className="text-cyan-200">Smarter Governance.</span>
            </h2>
            <p className="text-lg text-white/70 max-w-md">
              A Unified Digital Ecosystem for Smarter Universities and Better Student Experiences.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {[
                { icon: Bot, label: 'AI Assistant' },
                { icon: CheckCircle2, label: 'Digital Certificates' },
                { icon: Sparkles, label: 'Predictive Analytics' },
                { icon: Users, label: 'Parent Portal' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-white/80">
                  <item.icon className="h-5 w-5 text-cyan-200" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md">
            <div className="text-center">
              <p className="text-2xl font-bold">25K+</p>
              <p className="text-xs text-white/60">Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">1.2K+</p>
              <p className="text-xs text-white/60">Faculty</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">100+</p>
              <p className="text-xs text-white/60">Services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="lg:hidden gradient-hero text-white p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm">Smart University</h1>
              <p className="text-xs text-white/70">Digital Campus</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-muted-foreground text-sm">Sign in to access your digital campus dashboard.</p>
            </div>

            {/* Role Selector */}
            <div className="mb-6">
              <Label className="mb-3 block">Select your role</Label>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map(opt => (
                  <button
                    key={opt.role}
                    onClick={() => handleRoleSelect(opt.role, opt.email)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                      selectedRole === opt.role
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/30'
                    }`}
                  >
                    <opt.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email / ID</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@campus.edu"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-9 pr-9"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
                <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">Remember me</Label>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? 'Signing in...' : <>Login <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </form>

            {/* Demo Section */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Try Demo</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Instantly login as any role with pre-seeded demo data. No setup required.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.slice(0, 4).map(opt => (
                  <Button
                    key={opt.role}
                    variant="outline"
                    onClick={() => handleDemoLogin(opt.role)}
                    className="gap-2 text-sm"
                  >
                    <opt.icon className="h-4 w-4" />
                    Login as {opt.label}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {roleOptions.slice(4).map(opt => (
                  <Button
                    key={opt.role}
                    variant="outline"
                    onClick={() => handleDemoLogin(opt.role)}
                    className="gap-2 text-sm"
                  >
                    <opt.icon className="h-4 w-4" />
                    Login as {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <button onClick={() => navigate('/')} className="text-sm text-muted-foreground hover:text-primary">
                ← Back to landing page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
