import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
// In a real app, this would be set in environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'your-stripe-public-key');

export { stripePromise };

export const subscriptionPlans = [
  {
    id: 'price_basic',
    name: 'Basic',
    price: 9.99,
    features: [
      '10 AI-generated articles per month',
      'Basic tone and style options',
      'PDF source support up to 5 pages',
      'Email support'
    ],
    articleCredits: 10
  },
  {
    id: 'price_premium',
    name: 'Premium',
    price: 19.99,
    features: [
      'Unlimited AI-generated articles',
      'Advanced tone and style customization',
      'PDF source support up to 50 pages',
      'Priority support',
      'Advanced editing features'
    ],
    articleCredits: Infinity
  }
];

// This would normally be a server endpoint, but for demo purposes
// we'll simulate it client-side
export async function createCheckoutSession(priceId: string, userId: string) {
  // In a real app, this would call a server endpoint that creates a Stripe Checkout session
  console.log(`Creating checkout session for price ${priceId} and user ${userId}`);
  
  // Simulate successful creation of a checkout session
  return {
    id: 'cs_test_' + Math.random().toString(36).substring(2, 15),
    url: 'https://checkout.stripe.com/...'
  };
}