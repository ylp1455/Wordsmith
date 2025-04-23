import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, KeyRound, AlertCircle } from 'lucide-react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { useAuth } from '../context/AuthContext';

type AuthMode = 'signin' | 'signup';

interface LocationState {
  returnTo?: string;
}

const Auth: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { returnTo } = (location.state as LocationState) || {};

  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError(null);
    setSuccessMessage(null);
  };

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!password.trim()) {
      setError('Password is required');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);

        if (error) {
          throw new Error(error.message);
        }

        // Redirect after successful sign in
        navigate(returnTo || '/');
      } else {
        const { error } = await signUp(email, password);

        if (error) {
          throw new Error(error.message);
        }

        // Show success message for sign up
        setSuccessMessage(
          'Registration successful! Please check your email to confirm your account.'
        );

        // Clear the form
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      console.error('Authentication error:', err);

      if (err.message.includes('email') || err.message.includes('Email')) {
        setError('Invalid email address');
      } else if (err.message.includes('password') || err.message.includes('Password')) {
        setError('Invalid password');
      } else {
        setError(err.message || 'An error occurred during authentication');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {mode === 'signin'
                ? 'Sign in to access your articles and subscription'
                : 'Create an account to start generating articles'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              leftIcon={<Mail size={18} />}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              leftIcon={<KeyRound size={18} />}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start">
                <div className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            )}

            <Button
              type="submit"
              isLoading={loading}
              disabled={loading}
              variant="primary"
              fullWidth
              size="lg"
              leftIcon={mode === 'signin' ? <LogIn size={20} /> : <UserPlus size={20} />}
            >
              {mode === 'signin' ? 'Sign in' : 'Sign up'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-indigo-600 hover:text-indigo-500 focus:outline-none text-sm"
            >
              {mode === 'signin'
                ? 'Don\'t have an account? Sign up'
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;