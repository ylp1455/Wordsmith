import React from 'react';
import { Sparkles, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Wordsmith has transformed my content workflow. I can now produce high-quality articles in minutes instead of hours.",
      author: "Sarah Johnson",
      role: "Content Manager",
      company: "Digital Marketing Solutions",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The ability to upload reference PDFs and have the AI understand and incorporate that information is game-changing for research-based writing.",
      author: "Michael Chen",
      role: "Academic Researcher",
      company: "University of Technology",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "I've tried many AI writing tools, but Wordsmith stands out for its customization options and quality of output.",
      author: "Jessica Williams",
      role: "Marketing Director",
      company: "Innovative Brands Inc.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      quote: "As a small business owner, I don't have time to write all my website content. Wordsmith helps me create professional copy that converts visitors into customers.",
      author: "David Rodriguez",
      role: "Founder & CEO",
      company: "EcoTech Solutions",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      quote: "The tone and style customization is incredible. I can create content that perfectly matches our brand voice every single time.",
      author: "Emma Thompson",
      role: "Brand Strategist",
      company: "Creative Collective",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      quote: "Wordsmith has become an essential tool for our content team. We've increased our output by 300% while maintaining consistent quality.",
      author: "Robert Kim",
      role: "Content Operations Manager",
      company: "Global Media Group",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/64.jpg"
    },
    {
      quote: "As a non-native English speaker, Wordsmith helps me create polished, professional content that reads naturally. It's been a game-changer for my business.",
      author: "Sofia Gonzalez",
      role: "E-commerce Entrepreneur",
      company: "Artisan Marketplace",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/54.jpg"
    },
    {
      quote: "The source-based generation feature is perfect for our technical documentation. It ensures accuracy while saving us countless hours of writing.",
      author: "James Wilson",
      role: "Technical Documentation Lead",
      company: "Enterprise Solutions Ltd",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how Wordsmith is helping content creators, researchers, marketers, and businesses 
          create better content in less time.
        </p>
      </div>

      {/* Featured Testimonial */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mb-16 text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
            <div className="flex mb-4">
              <Sparkles className="h-8 w-8 text-yellow-300 mr-2" />
              <h2 className="text-2xl font-bold">Featured Testimonial</h2>
            </div>
            <p className="text-xl italic mb-6">
              "Wordsmith has completely revolutionized our content creation process. What used to take our team days now takes hours, and the quality is consistently excellent. The AI understands context and produces content that sounds like it was written by our best writers. It's not just a time-saver; it's a game-changer for our entire content strategy."
            </p>
            <div className="flex items-center">
              <div className="flex mr-4">
                {renderStars(5)}
              </div>
              <div>
                <p className="font-semibold">Alexandra Martinez</p>
                <p className="text-indigo-200">Chief Content Officer, Global Media Network</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <img 
              src="https://randomuser.me/api/portraits/women/23.jpg" 
              alt="Alexandra Martinez" 
              className="rounded-full h-48 w-48 object-cover border-4 border-white shadow-lg" 
            />
          </div>
        </div>
      </div>

      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
            <div className="flex mb-4">
              {renderStars(testimonial.rating)}
            </div>
            <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <img 
                src={testimonial.image} 
                alt={testimonial.author} 
                className="h-12 w-12 rounded-full mr-4 object-cover" 
              />
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-600">{testimonial.role}</p>
                <p className="text-indigo-600 text-sm">{testimonial.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to experience Wordsmith for yourself?</h2>
        <p className="text-gray-600 mb-8">
          Join thousands of satisfied users who are creating better content in less time.
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="/auth" 
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create Free Account
          </a>
          <a 
            href="/writer" 
            className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md border border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Try Article Writer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
