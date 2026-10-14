import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function readResponse(response: Response): Promise<Record<string, unknown>> {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('The server returned an unexpected response. Please check that the backend is running and try again.');
  }

  const data: unknown = await response.json();
  if (typeof data !== 'object' || data === null) {
    throw new Error('The server returned an invalid response. Please try again.');
  }
  return data as Record<string, unknown>;
}

function getErrorMessage(data: Record<string, unknown>, fallback: string): string {
  return typeof data.error === 'string' ? data.error : fallback;
}

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'request' | 'verify' | 'complete'>('request');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const requestOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setNotice('');

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await readResponse(response);
      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'Unable to send the reset code.'));
      }
      setNotice(typeof data.message === 'string' ? data.message : 'If an account exists for this email, a reset code will be sent shortly.');
      setStep('verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send the reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await readResponse(response);
      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'Unable to reset the password.'));
      }
      setNotice(typeof data.message === 'string' ? data.message : 'Your password has been reset. You can now sign in.');
      setStep('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reset your password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-primary bg-white dark:bg-slate-900 px-6 py-3 rounded-full shadow-sm border border-slate-200 dark:border-slate-800">
            <img src="/logo.jpeg" alt="Siya Suya International logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-headline text-xl font-bold tracking-wide">Siya Suya</span>
          </div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
          <CardHeader className="space-y-2 p-8 pb-4">
            <CardTitle className="text-2xl font-bold text-center">
              {step === 'complete' ? 'Password Updated' : 'Reset Password'}
            </CardTitle>
            <CardDescription className="text-center text-md">
              {step === 'request' && 'Enter your account email and we’ll send you a one-time verification code.'}
              {step === 'verify' && 'Enter the six-digit code sent to your email and choose a new password. The code expires in 10 minutes.'}
              {step === 'complete' && 'Your password has been changed successfully.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-4 space-y-5">
            {error && <div role="alert" className="text-destructive text-sm font-semibold bg-destructive/10 p-3 rounded-lg">{error}</div>}
            {notice && step !== 'complete' && <p role="status" className="text-sm text-muted-foreground">{notice}</p>}

            {step === 'request' && (
              <form onSubmit={requestOtp} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="reset-email" className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Email Address</label>
                  <Input id="reset-email" type="email" value={email} onChange={event => setEmail(event.target.value)} required autoComplete="email" placeholder="Your email" className="h-12 bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-4" />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 text-md font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 mt-4">
                  {loading ? 'Sending code...' : 'Send verification code'}
                </Button>
              </form>
            )}

            {step === 'verify' && (
              <form onSubmit={resetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="reset-otp" className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Verification Code</label>
                  <Input id="reset-otp" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} required autoComplete="one-time-code" placeholder="Enter your 6-digit code" className="h-12 bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-4" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reset-new-password" className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">New Password</label>
                  <Input id="reset-new-password" type="password" value={newPassword} onChange={event => setNewPassword(event.target.value)} required minLength={8} maxLength={128} autoComplete="new-password" placeholder="Choose a new password (at least 8 characters)" className="h-12 bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-4" />
                </div>
                <Button type="submit" disabled={loading || otp.length !== 6 || newPassword.length < 8} className="w-full h-12 text-md font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 mt-4">
                  {loading ? 'Updating password...' : 'Verify code and reset password'}
                </Button>
                <Button type="button" variant="ghost" disabled={loading} onClick={() => { setStep('request'); setOtp(''); setNewPassword(''); setError(''); setNotice(''); }} className="w-full">
                  Use a different email
                </Button>
              </form>
            )}

            {step === 'complete' && (
              <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <p className="text-sm text-muted-foreground">{notice}</p>
                <Button asChild className="mt-4 w-full h-12 rounded-xl font-bold">
                  <Link to="/login">Continue to sign in</Link>
                </Button>
              </div>
            )}
          </CardContent>

          {step !== 'complete' && (
            <CardFooter className="p-8 py-6 justify-center text-sm text-muted-foreground border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 mt-4">
              <Link to="/login" className="text-primary hover:underline font-bold flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Sign In
              </Link>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
