import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  PenTool,
  BarChart2,
  Settings,
  ChevronRight,
  Search,
  Zap,
  BookOpen,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  console.log('Dashboard component loaded with user:', user);

  // Get first name from email
  const firstName = user?.email ? user.email.split('@')[0] : 'there';

  // Recent articles (mock data)
  const recentArticles = [
    {
      id: '1',
      title: 'The Future of AI in Content Creation',
      date: '2 days ago',
      wordCount: 1250,
      status: 'completed'
    },
    {
      id: '2',
      title: 'How to Optimize Your Website for SEO',
      date: '1 week ago',
      wordCount: 1800,
      status: 'completed'
    },
    {
      id: '3',
      title: 'Marketing Strategies for Small Businesses',
      date: '2 weeks ago',
      wordCount: 1500,
      status: 'draft'
    }
  ];

  // Templates
  const templates = [
    {
      id: 'blog',
      name: 'Blog Post',
      description: 'Create engaging blog content with proper structure',
      icon: <PenTool className="h-6 w-6 text-indigo-600" />
    },
    {
      id: 'article',
      name: 'Article',
      description: 'Write well-researched, factually accurate articles',
      icon: <FileText className="h-6 w-6 text-indigo-600" />
    },
    {
      id: 'social',
      name: 'Social Media',
      description: 'Create engaging posts for various social platforms',
      icon: <MessageSquare className="h-6 w-6 text-indigo-600" />
    }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Good {getTimeOfDay()}, {capitalizeFirstLetter(firstName)}!
        </h1>
        <p className="mt-2 text-gray-600">
          Welcome to your Wordsmith dashboard. What would you like to create today?
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Create New & Recent */}
        <div className="lg:col-span-2 space-y-8">
          {/* Create New Section */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What will you create today?</h2>
              <p className="text-gray-600 mb-6">
                Describe your own unique request, or try out one of our crafted templates.
              </p>

              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Draft a press release announcing..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  className="absolute right-2 top-2 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
                  onClick={() => navigate('/writer', { state: { prompt: searchQuery } })}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map(template => (
                  <div
                    key={template.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer"
                    onClick={() => navigate('/writer', { state: { template: template.id } })}
                  >
                    <div className="mb-2">{template.icon}</div>
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Articles */}
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Articles</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/my-articles')}
                >
                  View All
                </Button>
              </div>

              {recentArticles.length > 0 ? (
                <div className="space-y-4">
                  {recentArticles.map(article => (
                    <div
                      key={article.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer"
                      onClick={() => navigate(`/my-articles/${article.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{article.title}</h3>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <span>{article.date}</span>
                            <span className="mx-2">•</span>
                            <span>{article.wordCount} words</span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          article.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {capitalizeFirstLetter(article.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
                  <p className="text-gray-600 mb-4">
                    You haven't created any articles yet. Start writing your first article now!
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/writer')}
                  >
                    Create Article
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Stats & Quick Links */}
        <div className="space-y-8">
          {/* Usage Stats */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Stats</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Articles Created</span>
                    <span className="text-sm font-medium text-gray-900">3/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Words Generated</span>
                    <span className="text-sm font-medium text-gray-900">4,550/10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Current Plan</p>
                      <p className="font-medium text-gray-900">{user?.subscriptionStatus || 'Free'} Plan</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/payment')}
                    >
                      Upgrade
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Links */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>

              <div className="space-y-3">
                <a
                  href="/writer"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <div className="flex items-center">
                    <PenTool className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="font-medium text-gray-900">Article Writer</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                </a>

                <a
                  href="/my-articles"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="font-medium text-gray-900">My Articles</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                </a>

                <a
                  href="/profile"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="font-medium text-gray-900">Profile Settings</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                </a>

                <a
                  href="/support"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="font-medium text-gray-900">Support Center</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                </a>
              </div>
            </div>
          </Card>

          {/* Pro Features */}
          <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-yellow-300 mr-2" />
                <h2 className="text-xl font-semibold">Upgrade to Pro</h2>
              </div>

              <p className="mb-4 text-indigo-100">
                Unlock premium features and create unlimited articles with our Pro plan.
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Unlimited articles</span>
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Advanced customization</span>
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>

              <Button
                variant="primary"
                className="w-full bg-white text-indigo-600 hover:bg-indigo-50"
                onClick={() => navigate('/payment')}
              >
                Upgrade Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper functions
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Dashboard;
