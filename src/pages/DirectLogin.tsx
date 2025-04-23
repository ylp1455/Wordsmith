import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const DirectLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    console.log('Attempting direct login with:', email);
    
    try {
      // Direct Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log('Login response:', { data, error });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.user) {
        setUserData(data.user);
        setSuccess('Login successful! Redirecting...');
        
        // Redirect with a hard navigation
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        throw new Error('No user data returned');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    console.log('Current session:', data);
    setUserData(data.session?.user || null);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Direct Supabase Login</h1>
      
      <Card className="p-6 mb-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          
          {error && (
            <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 p-3 rounded text-green-700 text-sm">
              {success}
            </div>
          )}
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={loading}
          >
            Login Directly
          </Button>
        </form>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-3">Current User Data</h2>
        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-60 text-xs">
          {JSON.stringify(userData, null, 2) || "No user data"}
        </pre>
        <Button 
          onClick={checkSession} 
          variant="outline"
          className="mt-3"
        >
          Check Current Session
        </Button>
      </Card>
    </div>
  );
};

export default DirectLogin;
