import React, { useState } from 'react';
import { User, Mail, Key, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    displayName: user?.email?.split('@')[0] || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Password validation
      if (formData.newPassword) {
        if (formData.newPassword.length < 6) {
          throw new Error('New password must be at least 6 characters');
        }
        
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }
        
        if (!formData.currentPassword) {
          throw new Error('Current password is required to set a new password');
        }
        
        // Here you would call your API to update the password
        // await updatePassword(formData.currentPassword, formData.newPassword);
      }
      
      // Here you would update the user profile
      // await updateProfile({ displayName: formData.displayName });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setIsEditing(false);
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating your profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <div className="p-6 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4 border-4 border-indigo-200">
                {user?.email ? (
                  <span className="text-indigo-700 font-bold text-3xl">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User size={36} className="text-indigo-600" />
                )}
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {formData.displayName || 'User'}
              </h2>
              
              <p className="text-gray-600 mb-4 text-center">{user?.email}</p>
              
              <div className="bg-indigo-50 rounded-md p-3 w-full mb-4">
                <p className="text-sm font-medium text-indigo-800">
                  Subscription: <span className="font-semibold">{user?.subscriptionStatus || 'Free'}</span>
                </p>
              </div>
              
              <Button 
                variant={isEditing ? "outline" : "primary"}
                onClick={() => setIsEditing(!isEditing)}
                className="w-full"
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </Button>
            </div>
          </Card>
          
          <div className="mt-6">
            <Card>
              <div className="p-6">
                <h3 className="font-medium text-gray-900 mb-3">Account Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-600">Email: {user?.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Key size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-600">Member since: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Profile Form */}
        <div className="md:col-span-2">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {isEditing ? 'Edit Profile' : 'Profile Details'}
              </h2>
              
              {success && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-green-700">Your profile has been updated successfully.</p>
                </div>
              )}
              
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <Input
                    label="Display Name"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Your display name"
                  />
                  
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={true}
                    placeholder="Your email address"
                    helpText="Email address cannot be changed"
                  />
                  
                  {isEditing && (
                    <>
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Leave these fields blank if you don't want to change your password.
                        </p>
                        
                        <div className="space-y-4">
                          <Input
                            label="Current Password"
                            name="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter your current password"
                          />
                          
                          <Input
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            helpText="Password must be at least 6 characters"
                          />
                          
                          <Input
                            label="Confirm New Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          variant="primary"
                          isLoading={loading}
                          leftIcon={<Save size={18} />}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
