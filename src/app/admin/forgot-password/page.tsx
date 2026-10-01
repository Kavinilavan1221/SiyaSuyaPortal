import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Fish, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to send email
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
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
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center text-md">
              Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-6">
            {success ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">Check your email</h3>
                  <p className="text-sm text-muted-foreground">
                    If an account exists for <span className="font-medium text-foreground">{email}</span>, you will receive a password reset link shortly.
                  </p>
                </div>
                <Button variant="outline" onClick={() => setSuccess(false)} className="mt-4 w-full h-12 rounded-xl font-bold">
                  Try another email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Email Address</label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@siyasuya.com" className="h-12 bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-4" />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 text-md font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 mt-4">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="p-8 py-6 justify-center text-sm text-muted-foreground border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 mt-4">
            <Link to="/admin/login" className="text-primary hover:underline font-bold flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
