import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import ArticleWriter from './pages/ArticleWriter';
import MyArticles from './pages/MyArticles';
import Payment from './pages/Payment';
import Auth from './pages/Auth';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import SupportCenter from './pages/SupportCenter';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/writer" element={<ArticleWriter />} />
      <Route path="/my-articles" element={
        <ProtectedRoute>
          <MyArticles />
        </ProtectedRoute>
      } />
      <Route path="/payment" element={<Payment />} />
      <Route path="/auth" element={<Auth />} />

      {/* New Pages */}
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/support" element={<SupportCenter />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;