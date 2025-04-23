import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const ResetPassword: React.FC = () => {
  const { resetPassword, updatePassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');
  
  const [step, setStep] = useState<'request' | 'update' | 'success'>(token && email ? 'update' : 'request');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: email || '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!formData.email) {
        throw new Error('Email is required');
      }
      
      await resetPassword(formData.email);
      setSuccess('Password reset instructions have been sent to your email.');
      
      // In a real app, you would redirect to a confirmation page or show a success message
      // For this demo, we'll just show a success message
    } catch (err: any) {
      setError(err.message || 'Failed to send reset password email');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!formData.password) {
        throw new Error('New password is required');
      }
      
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // In a real app, you would call your API to update the password using the token
      // For this demo, we'll just simulate a successful password update
      if (token && email) {
        await updatePassword(token, formData.password);
        setStep('success');
      } else {
        throw new Error('Invalid reset token');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <span className="sr-only">Wordsmith</span>
          <h1 className="text-3xl font-bold text-indigo-600">Wordsmith</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {step === 'request' && 'Reset your password'}
          {step === 'update' && 'Create new password'}
          {step === 'success' && 'Password updated'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === 'request' && 'Enter your email and we\'ll send you instructions to reset your password'}
          {step === 'update' && 'Enter your new password below'}
          {step === 'success' && 'Your password has been successfully updated'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="px-4 py-8 sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-green-700">{success}</p>
            </div>
          )}
          
          {step === 'request' && (
            <form onSubmit={handleRequestReset} className="space-y-6">
              <Input
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                autoComplete="email"
                leftIcon={<Mail size={18} className="text-gray-500" />}
              />
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={loading}
                >
                  Send Reset Instructions
                </Button>
              </div>
              
              <div className="text-center">
                <Link 
                  to="/auth" 
                  className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
          
          {step === 'update' && (
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <Input
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                autoComplete="new-password"
                leftIcon={<Lock size={18} className="text-gray-500" />}
                helpText="Password must be at least 6 characters"
              />
              
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
                autoComplete="new-password"
                leftIcon={<Lock size={18} className="text-gray-500" />}
              />
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={loading}
                >
                  Update Password
                </Button>
              </div>
            </form>
          )}
          
          {step === 'success' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Password updated successfully</h3>
              <p className="text-gray-600 mb-6">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
