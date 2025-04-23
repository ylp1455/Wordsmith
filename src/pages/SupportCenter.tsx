import React, { useState } from 'react';
import { Search, BookOpen, FileText, HelpCircle, MessageSquare, Video, ArrowRight } from 'lucide-react';
import Card from '../components/UI/Card';

interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: SupportArticle[];
}

interface SupportArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
}

const SupportCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const supportCategories: SupportCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of Wordsmith and how to set up your account',
      icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
      articles: [
        {
          id: 'gs-1',
          title: 'Creating Your Wordsmith Account',
          excerpt: 'Learn how to sign up and set up your Wordsmith account in minutes.',
          category: 'getting-started'
        },
        {
          id: 'gs-2',
          title: 'Navigating the Wordsmith Dashboard',
          excerpt: 'Get familiar with the Wordsmith interface and main features.',
          category: 'getting-started'
        },
        {
          id: 'gs-3',
          title: 'Your First Article with Wordsmith',
          excerpt: 'A step-by-step guide to generating your first AI-powered article.',
          category: 'getting-started'
        },
        {
          id: 'gs-4',
          title: 'Understanding Subscription Plans',
          excerpt: 'Compare our subscription plans and choose the right one for your needs.',
          category: 'getting-started'
        }
      ]
    },
    {
      id: 'features',
      title: 'Features & Functionality',
      description: "Detailed guides on using Wordsmith's features",
      icon: <FileText className="h-8 w-8 text-indigo-600" />,
      articles: [
        {
          id: 'ft-1',
          title: 'Uploading Reference Materials',
          excerpt: 'Learn how to upload and use PDF documents as reference materials for your articles.',
          category: 'features'
        },
        {
          id: 'ft-2',
          title: 'Customizing Tone and Style',
          excerpt: 'Adjust the tone, style, and length settings to match your content needs.',
          category: 'features'
        },
        {
          id: 'ft-3',
          title: 'Saving and Organizing Articles',
          excerpt: 'How to save, categorize, and manage your generated articles.',
          category: 'features'
        },
        {
          id: 'ft-4',
          title: 'Exporting and Sharing Content',
          excerpt: 'Options for downloading, copying, and sharing your Wordsmith content.',
          category: 'features'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Solutions to common issues and problems',
      icon: <HelpCircle className="h-8 w-8 text-indigo-600" />,
      articles: [
        {
          id: 'ts-1',
          title: 'Login and Authentication Issues',
          excerpt: 'Solutions for problems with signing in or accessing your account.',
          category: 'troubleshooting'
        },
        {
          id: 'ts-2',
          title: 'PDF Upload Problems',
          excerpt: 'Troubleshoot issues with uploading or processing reference documents.',
          category: 'troubleshooting'
        },
        {
          id: 'ts-3',
          title: 'Content Generation Errors',
          excerpt: 'What to do when article generation fails or produces unexpected results.',
          category: 'troubleshooting'
        },
        {
          id: 'ts-4',
          title: 'Billing and Subscription Issues',
          excerpt: 'Resolve problems with payments, subscriptions, or account limits.',
          category: 'troubleshooting'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Billing',
      description: 'Manage your account, subscription, and billing details',
      icon: <MessageSquare className="h-8 w-8 text-indigo-600" />,
      articles: [
        {
          id: 'ac-1',
          title: 'Updating Your Account Information',
          excerpt: 'How to change your email, password, and profile details.',
          category: 'account'
        },
        {
          id: 'ac-2',
          title: 'Managing Your Subscription',
          excerpt: 'Upgrade, downgrade, or cancel your Wordsmith subscription.',
          category: 'account'
        },
        {
          id: 'ac-3',
          title: 'Payment Methods and Billing History',
          excerpt: 'View and update payment methods and access billing history.',
          category: 'account'
        },
        {
          id: 'ac-4',
          title: 'Usage Limits and Quotas',
          excerpt: "Understanding your plan's limits and how to monitor your usage.",
          category: 'account'
        }
      ]
    }
  ];

  // Get all articles from all categories
  const allArticles = supportCategories.flatMap(category => category.articles);

  // Filter articles based on search term and active category
  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get popular articles (just a sample for this demo)
  const popularArticles = [
    allArticles.find(a => a.id === 'gs-1'),
    allArticles.find(a => a.id === 'ft-2'),
    allArticles.find(a => a.id === 'ts-3'),
    allArticles.find(a => a.id === 'ac-2')
  ].filter(Boolean) as SupportArticle[];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers, guides, and resources to help you get the most out of Wordsmith.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-4 pl-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-4 top-5 h-6 w-6 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      {!searchTerm && activeCategory === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {supportCategories.map((category) => (
            <Card
              key={category.id}
              className="transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="p-6">
                <div className="mb-4">{category.icon}</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <p className="text-indigo-600 font-medium flex items-center">
                  View articles <ArrowRight className="h-4 w-4 ml-1" />
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Category Tabs (visible when searching or category is selected) */}
      {(searchTerm || activeCategory !== 'all') && (
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {supportCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results or Category Articles */}
      {(searchTerm || activeCategory !== 'all') && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchTerm
              ? `Search Results for "${searchTerm}"`
              : `${supportCategories.find(c => c.id === activeCategory)?.title} Articles`
            }
          </h2>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <a
                  key={article.id}
                  href={`#article-${article.id}`}
                  className="block"
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600">{article.excerpt}</p>
                      <div className="mt-4 flex items-center text-indigo-600">
                        Read more <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any articles matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="text-indigo-600 font-medium hover:text-indigo-800"
              >
                Clear search and filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Popular Articles */}
      {!searchTerm && activeCategory === 'all' && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article) => (
              <a
                key={article.id}
                href={`#article-${article.id}`}
                className="block"
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600">{article.excerpt}</p>
                    <div className="mt-4 flex items-center text-indigo-600">
                      Read more <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Video Tutorials */}
      {!searchTerm && activeCategory === 'all' && (
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Video Tutorials</h2>
            <a href="#" className="text-indigo-600 font-medium flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md">
                <div className="relative pb-[56.25%] bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {index === 1 && "Getting Started with Wordsmith"}
                    {index === 2 && "Advanced Article Customization"}
                    {index === 3 && "Using Reference Materials Effectively"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {index === 1 && "A complete walkthrough of the Wordsmith platform"}
                    {index === 2 && "Learn how to fine-tune your article settings"}
                    {index === 3 && "Maximize the quality of your content with references"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Support */}
      <div className="bg-indigo-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Our support team is here to help. Contact us directly and we'll get back to you as soon as possible.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors inline-block"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default SupportCenter;
