import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Eye, Search, AlertCircle, Clock, FileText } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { useAuth } from '../context/AuthContext';
import { getUserArticles, deleteArticle } from '../lib/supabase';
import { Article } from '../types';

const MyArticles: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    // If not logged in, redirect to auth page
    if (!user) {
      navigate('/auth', { state: { returnTo: '/my-articles' } });
      return;
    }
    
    fetchArticles();
  }, [user, navigate]);
  
  const fetchArticles = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await getUserArticles(user.id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setArticles(
        data?.map((article: any) => ({
          id: article.id,
          title: article.title,
          content: article.content,
          userId: article.user_id,
          createdAt: article.created_at,
        })) || []
      );
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load your articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteArticle = async (articleId: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setIsDeleting(true);
      
      try {
        const { error } = await deleteArticle(articleId);
        
        if (error) {
          throw new Error(error.message);
        }
        
        // Update state after successful deletion
        setArticles(articles.filter(article => article.id !== articleId));
        
        // Close the view modal if the deleted article was selected
        if (selectedArticle && selectedArticle.id === articleId) {
          setSelectedArticle(null);
        }
      } catch (err) {
        console.error('Error deleting article:', err);
        setError('Failed to delete the article. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Articles</h1>
            <p className="mt-2 text-gray-600">
              View and manage your saved articles
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            leftIcon={<Search size={18} />}
          />
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <Card className="py-12">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No articles found</h3>
                {searchTerm ? (
                  <p className="text-gray-500">
                    No articles match your search. Try different keywords.
                  </p>
                ) : (
                  <p className="text-gray-500">
                    You haven't saved any articles yet.
                  </p>
                )}
                <div className="mt-6">
                  <Button
                    onClick={() => navigate('/writer')}
                    variant="primary"
                  >
                    Create New Article
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="h-full">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Clock size={14} className="mr-1" />
                          {formatDate(article.createdAt)}
                        </div>
                        <p className="text-gray-600 line-clamp-3 mb-4">
                          {article.content.substring(0, 150)}...
                        </p>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Eye size={16} />}
                          onClick={() => setSelectedArticle(article)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Trash2 size={16} />}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleDeleteArticle(article.id)}
                          disabled={isDeleting}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Article Viewer Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">{selectedArticle.title}</h3>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {formatDate(selectedArticle.createdAt)}
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="prose prose-indigo max-w-none">
                {selectedArticle.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line.startsWith('# ') ? (
                      <h1 className="text-2xl font-bold mb-4">{line.replace('# ', '')}</h1>
                    ) : line.startsWith('## ') ? (
                      <h2 className="text-xl font-semibold mb-3 mt-6">{line.replace('## ', '')}</h2>
                    ) : line.trim() === '' ? (
                      <br />
                    ) : (
                      <p className="mb-4">{line}</p>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="p-6 border-t flex justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedArticle(null)}
              >
                Close
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  leftIcon={<Trash2 size={16} />}
                  onClick={() => {
                    handleDeleteArticle(selectedArticle.id);
                    setSelectedArticle(null);
                  }}
                  disabled={isDeleting}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  leftIcon={<Edit size={16} />}
                  onClick={() => {
                    // Copy content to editor
                    navigate('/writer');
                  }}
                >
                  Edit Copy
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;