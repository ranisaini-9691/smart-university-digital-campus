import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AppUser, UserRole } from '@/lib/types';
import { demoUsers } from '@/lib/demo-data';

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, _password: string) => boolean;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'smart-campus-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, _password: string): boolean => {
    const found = demoUsers.find((u) => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      return true;
    }
    return false;
  };

  const loginAsRole = (role: UserRole) => {
    const found = demoUsers.find((u) => u.role === role);
    if (found) {
      setUser(found);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsRole, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
