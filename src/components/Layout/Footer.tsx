import React from 'react';
import { Link } from 'react-router-dom';
import { Pen, Twitter, Facebook, Instagram, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-indigo-600 font-semibold text-xl">
              <Pen className="h-6 w-6" />
              <span>Wordsmith</span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Revolutionizing content creation with AI-powered article writing.
              Upload your sources, set your parameters, and get high-quality content in seconds.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-indigo-500 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">Product</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/writer" className="text-gray-600 hover:text-indigo-500 transition-colors">
                  Article Writer
                </Link>
              </li>
              <li>
                <Link to="/payment" className="text-gray-600 hover:text-indigo-500 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-600 hover:text-indigo-500 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-indigo-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <a href="mailto:support@wordsmith.com" className="hover:text-indigo-500 transition-colors">
                  support@wordsmith.com
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-indigo-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-600 hover:text-indigo-500 transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-indigo-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-indigo-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Wordsmith. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0 flex items-center">
            Created by <span className="font-medium text-indigo-600 mx-1">Azriel Tech Labs</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;