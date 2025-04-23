import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Edit, Sparkles, Shield, Brain, Award, ChevronRight, AlertCircle } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and check for any issues
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: 'Source-Based Generation',
      description: 'Upload PDF documents and our AI will use them as reference material to generate accurate content.',
      icon: <FileText className="h-12 w-12 text-indigo-500" />,
    },
    {
      title: 'Customizable Output',
      description: 'Control tone, style, and length to get articles that match your specific needs.',
      icon: <Edit className="h-12 w-12 text-indigo-500" />,
    },
    {
      title: 'Advanced AI',
      description: 'Powered by state-of-the-art AI that understands context and produces coherent, relevant content.',
      icon: <Brain className="h-12 w-12 text-indigo-500" />,
    },
    {
      title: 'Safe & Secure',
      description: 'Your documents and generated content remain private and secure with end-to-end encryption.',
      icon: <Shield className="h-12 w-12 text-indigo-500" />,
    },
  ];

  const testimonials = [
    {
      quote: "Wordsmith has transformed my content workflow. I can now produce high-quality articles in minutes instead of hours.",
      author: "Sarah Johnson",
      role: "Content Manager",
    },
    {
      quote: "The ability to upload reference PDFs and have the AI understand and incorporate that information is game-changing for research-based writing.",
      author: "Michael Chen",
      role: "Academic Researcher",
    },
    {
      quote: "I've tried many AI writing tools, but Wordsmith stands out for its customization options and quality of output.",
      author: "Jessica Williams",
      role: "Marketing Director",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 m-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Transform your ideas into polished articles with AI
              </h1>
              <p className="mt-4 text-xl text-indigo-100">
                Upload your reference materials, set your preferences, and let our AI create high-quality, customized content in seconds.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  onClick={() => navigate('/writer')}
                  variant="secondary"
                  size="lg"
                  rightIcon={<ChevronRight size={20} />}
                >
                  Try Article Writer
                </Button>
                <Button
                  onClick={() => navigate('/payment')}
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600"
                >
                  View Pricing
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="AI Article Writer"
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI article writer comes packed with features designed to make content creation effortless and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full transition-transform duration-300 hover:-translate-y-2">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Generate high-quality articles in three simple steps
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
            <div className="md:w-1/2">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Upload Your References</h3>
                    <p className="text-gray-600">
                      Upload PDF documents or enter text that will serve as the reference material for your article.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Set Your Preferences</h3>
                    <p className="text-gray-600">
                      Customize tone, style, and length to match your content needs and target audience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Generate & Save</h3>
                    <p className="text-gray-600">
                      Get your AI-generated article instantly, review it, and save it to your collection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/7439153/pexels-photo-7439153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="How Wordsmith Works"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
              Our AI article writer has helped thousands of content creators, researchers, and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20"
              >
                <div className="flex justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-yellow-300" />
                </div>
                <p className="text-white italic mb-6">"{testimonial.quote}"</p>
                <div className="flex flex-col items-center">
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-indigo-200 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Award className="h-16 w-16 mx-auto text-indigo-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to transform your content creation?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of content creators who are saving time and producing better content with Wordsmith.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate('/writer')}
              variant="primary"
              size="lg"
              rightIcon={<ChevronRight size={20} />}
            >
              Start Writing Now
            </Button>
            <Button
              onClick={() => navigate('/auth')}
              variant="outline"
              size="lg"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;