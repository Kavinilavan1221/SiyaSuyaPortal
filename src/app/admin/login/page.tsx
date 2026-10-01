import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Fish } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userRole', data.user.role);
      
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      {/* Premium Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-primary bg-white dark:bg-slate-900 px-6 py-3 rounded-full shadow-sm border border-slate-200 dark:border-slate-800">
             <Fish className="h-6 w-6" />
             <span className="font-headline text-xl font-bold tracking-wide">Siya Suya Admin</span>
          </div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
          <CardHeader className="space-y-2 p-8 pb-4">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center text-md">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="text-destructive text-sm font-semibold bg-destructive/10 p-3 rounded-lg">{error}</div>}
              <div className="space-y-2">
                <label className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Email Address</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@siyasuya.com" className="h-12 bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Password</label>
                  <Link to="/admin/forgot-password" className="text-sm text-primary hover:underline font-medium">Forgot password?</Link>
                </div>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="h-12 bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-4" />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 text-md font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 mt-2">
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="p-8 py-6 justify-center text-sm text-muted-foreground border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 mt-4">
            Don't have an account? 
            <Link to="/admin/signup" className="text-primary hover:underline font-bold ml-1">Sign up</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
