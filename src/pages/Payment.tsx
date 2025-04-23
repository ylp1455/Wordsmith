import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Shield, AlertCircle, CreditCard } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { useAuth } from '../context/AuthContext';
import { subscriptionPlans, createCheckoutSession } from '../lib/stripe';
import { updateUserSubscription } from '../lib/supabase';
import { SubscriptionPlan } from '../types';

const Payment: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setError(null);
  };
  
  const handleSubscribe = async () => {
    if (!selectedPlan) {
      setError('Please select a subscription plan.');
      return;
    }
    
    if (!user) {
      // Redirect to auth if not signed in
      navigate('/auth', { state: { returnTo: '/payment' } });
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // This would normally create a checkout session on your server
      const session = await createCheckoutSession(selectedPlan, user.id);
      
      // For demo purposes, we'll simulate a successful checkout
      // In a real app, you would redirect to session.url
      console.log('Redirecting to Stripe:', session.url);
      
      // Simulate a successful subscription
      await updateUserSubscription(user.id, selectedPlan === 'price_basic' ? 'basic' : 'premium');
      
      // Update local user state
      updateUser({
        ...user,
        subscriptionStatus: selectedPlan === 'price_basic' ? 'basic' : 'premium'
      });
      
      // Redirect to the article writer
      navigate('/writer', { 
        state: { 
          message: 'Your subscription has been activated! You can now use all features.' 
        } 
      });
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError('An error occurred while processing your subscription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const renderPlanFeatures = (plan: SubscriptionPlan) => {
    return plan.features.map((feature, index) => (
      <li key={index} className="flex items-start mt-4">
        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
        <span>{feature}</span>
      </li>
    ));
  };
  
  const currentPlanId = user?.subscriptionStatus === 'basic' 
    ? 'price_basic' 
    : user?.subscriptionStatus === 'premium'
      ? 'price_premium'
      : null;
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600">
          Select the plan that best fits your needs and start creating amazing content today
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Free Plan */}
          <Card className={`h-full border-2 transition-transform duration-300 ${
            selectedPlan === 'free' || (!selectedPlan && !currentPlanId) 
              ? 'border-indigo-600 transform scale-[1.02]' 
              : currentPlanId === null 
                ? 'border-indigo-300'
                : 'border-transparent'
          }`}>
            <div className="p-6 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Free</h3>
                <p className="text-gray-500">Basic features to get started</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>
              
              <ul className="space-y-2 flex-grow">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>3 AI-generated articles per month</span>
                </li>
                <li className="flex items-start mt-4">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic tone and style options</span>
                </li>
                <li className="flex items-start mt-4">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>PDF source support up to 3 pages</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <Button
                  onClick={() => handleSelectPlan('free')}
                  variant={selectedPlan === 'free' || (!selectedPlan && !currentPlanId) ? 'primary' : 'outline'}
                  fullWidth
                  disabled={currentPlanId === null}
                >
                  {currentPlanId === null ? 'Current Plan' : 'Select Free Plan'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Paid Plans */}
          {subscriptionPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`h-full border-2 transition-transform duration-300 ${
                selectedPlan === plan.id || (!selectedPlan && currentPlanId === plan.id) 
                  ? 'border-indigo-600 transform scale-[1.02]' 
                  : currentPlanId === plan.id 
                    ? 'border-indigo-300'
                    : 'border-transparent'
              } ${plan.name === 'Premium' ? 'bg-indigo-50' : ''}`}
            >
              <div className="p-6 flex flex-col h-full">
                {plan.name === 'Premium' && (
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-gray-500">
                    {plan.name === 'Basic' ? 'Perfect for occasional use' : 'Best for professional content creators'}
                  </p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-2 flex-grow">
                  {renderPlanFeatures(plan)}
                </ul>
                
                <div className="mt-8">
                  {currentPlanId === plan.id ? (
                    <Button
                      variant="outline"
                      fullWidth
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSelectPlan(plan.id)}
                      variant={selectedPlan === plan.id ? 'primary' : plan.name === 'Premium' ? 'secondary' : 'outline'}
                      fullWidth
                    >
                      {selectedPlan === plan.id ? 'Selected' : `Select ${plan.name}`}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Subscribe Button */}
        <div className="max-w-md mx-auto">
          {selectedPlan && selectedPlan !== 'free' && selectedPlan !== currentPlanId && (
            <Button
              onClick={handleSubscribe}
              isLoading={isProcessing}
              disabled={isProcessing}
              variant="primary"
              size="lg"
              leftIcon={<CreditCard size={20} />}
              fullWidth
              className="mb-6"
            >
              {isProcessing ? 'Processing...' : 'Subscribe Now'}
            </Button>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start mb-6">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {/* Current Plan Message */}
          {currentPlanId && (
            <div className="text-center text-gray-600 mb-8">
              <p>
                You are currently on the{' '}
                <span className="font-semibold">
                  {currentPlanId === 'price_basic' ? 'Basic' : 'Premium'}
                </span>{' '}
                plan.
              </p>
            </div>
          )}
          
          {/* Security Notice */}
          <div className="flex items-center justify-center text-gray-500 text-sm">
            <Shield size={16} className="mr-2" />
            <span>All payments are secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;