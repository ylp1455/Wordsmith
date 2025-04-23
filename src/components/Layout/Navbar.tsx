import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Pen, BookOpen, Home, CreditCard, LogIn, LogOut, User, HelpCircle, MessageSquare, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
    setIsProfileOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-indigo-200">
                    {user.email ? (
                      <span className="text-indigo-700 font-medium text-lg">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <User size={20} className="text-indigo-600" />
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border border-white"></div>
                </div>
                <ChevronDown size={16} className={`text-gray-600 transition-transform duration-200 ${isProfileOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      Subscription: {user.subscriptionStatus || 'Free'}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User size={16} className="mr-3 text-gray-500" />
                      <span>Your Profile</span>
                    </Link>
                    <Link
                      to="/my-articles"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <BookOpen size={16} className="mr-3 text-gray-500" />
                      <span>My Articles</span>
                    </Link>
                    <Link
                      to="/payment"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <CreditCard size={16} className="mr-3 text-gray-500" />
                      <span>Subscription</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings size={16} className="mr-3 text-gray-500" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  <div className="py-1 border-t border-gray-100">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut size={16} className="mr-3 text-gray-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
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
                <div className="flex items-center gap-2 px-2 py-2 border-t border-gray-200 mt-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    {user.email ? (
                      <span className="text-indigo-700 font-medium">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <User size={16} className="text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.subscriptionStatus || 'Free'} Plan
                    </p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <User size={18} />
                  <span>Your Profile</span>
                </Link>
                <Link
                  to="/payment"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <CreditCard size={18} />
                  <span>Subscription</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-2 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors w-full mt-2"
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