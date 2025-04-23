import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Pen, BookOpen, Home, CreditCard, LogIn, LogOut, User, HelpCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Article Writer', path: '/writer', icon: <Pen size={20} /> },
    { name: 'FAQ', path: '/faq', icon: <HelpCircle size={20} /> },
    { name: 'Support', path: '/support', icon: <MessageSquare size={20} /> },
  ];

  // Add authenticated routes
  const authLinks = user ? [
    { name: 'My Articles', path: '/my-articles', icon: <BookOpen size={20} /> },
    { name: 'Subscription', path: '/payment', icon: <CreditCard size={20} /> },
  ] : [];

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 font-semibold text-xl">
            <Pen className="h-6 w-6" />
            <span>Wordsmith</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                isActive(link.path)
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-600 hover:text-indigo-500'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          {user && authLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                isActive(link.path)
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-600 hover:text-indigo-500'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-600">
                <User size={18} />
                <span className="text-sm">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-600 font-semibold bg-indigo-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {user && authLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-600 font-semibold bg-indigo-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {user ? (
              <>
                <div className="flex items-center gap-1 text-gray-600 px-2 py-2">
                  <User size={18} />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-2 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={closeMenu}
                className="flex items-center gap-2 px-2 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;