import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';

const TestAuth: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Authentication Test Page</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Authentication State:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
          {JSON.stringify({ user, loading }, null, 2)}
        </pre>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={() => navigate('/dashboard')}
          variant="primary"
          className="mr-4"
        >
          Go to Dashboard
        </Button>
        
        <Button 
          onClick={() => navigate('/auth')}
          variant="outline"
          className="mr-4"
        >
          Go to Auth Page
        </Button>
        
        {user && (
          <Button 
            onClick={async () => {
              await signOut();
              navigate('/auth');
            }}
            variant="danger"
          >
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default TestAuth;
