import React, { useState } from 'react';
import { Bell, Moon, Globe, Shield, Save, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const Settings: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      marketing: false,
      updates: true,
    },
    appearance: {
      darkMode: false,
      fontSize: 'medium',
    },
    language: 'english',
    privacy: {
      shareData: false,
      allowCookies: true,
    }
  });

  const handleToggle = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !(prev[category as keyof typeof prev] as any)[setting]
      }
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const [category, setting] = name.split('.');
    
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would save the settings to your backend
      // await saveSettings(settings);
      
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving your settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-green-700">Your settings have been saved successfully.</p>
        </div>
      )}
      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div className="space-y-8">
        {/* Notification Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Bell className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications about your account via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications.email}
                    onChange={() => handleToggle('notifications', 'email')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                  <p className="text-sm text-gray-600">Receive emails about new features and promotions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications.marketing}
                    onChange={() => handleToggle('notifications', 'marketing')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Product Updates</h3>
                  <p className="text-sm text-gray-600">Receive notifications about product updates and new features</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications.updates}
                    onChange={() => handleToggle('notifications', 'updates')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Appearance Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Moon className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Appearance</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Dark Mode</h3>
                    <p className="text-sm text-gray-600">Enable dark mode for the application</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.appearance.darkMode}
                      onChange={() => handleToggle('appearance', 'darkMode')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Font Size</h3>
                <select 
                  name="appearance.fontSize" 
                  value={settings.appearance.fontSize}
                  onChange={handleSelectChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Language Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Globe className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Language</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="english"
                  name="language"
                  type="radio"
                  checked={settings.language === 'english'}
                  onChange={() => handleRadioChange('language', 'english')}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="english" className="ml-3 block text-sm font-medium text-gray-700">
                  English
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="spanish"
                  name="language"
                  type="radio"
                  checked={settings.language === 'spanish'}
                  onChange={() => handleRadioChange('language', 'spanish')}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="spanish" className="ml-3 block text-sm font-medium text-gray-700">
                  Spanish
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="french"
                  name="language"
                  type="radio"
                  checked={settings.language === 'french'}
                  onChange={() => handleRadioChange('language', 'french')}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="french" className="ml-3 block text-sm font-medium text-gray-700">
                  French
                </label>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Privacy Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Share Usage Data</h3>
                  <p className="text-sm text-gray-600">Allow us to collect anonymous usage data to improve our service</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.privacy.shareData}
                    onChange={() => handleToggle('privacy', 'shareData')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Allow Cookies</h3>
                  <p className="text-sm text-gray-600">Allow us to use cookies to enhance your experience</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.privacy.allowCookies}
                    onChange={() => handleToggle('privacy', 'allowCookies')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleSave}
            isLoading={loading}
            leftIcon={<Save size={18} />}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
