// User types
export interface User {
  id: string;
  email: string;
  subscriptionStatus: 'free' | 'basic' | 'premium';
}

// Article types
export interface Article {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
}

// Article generation options
export interface ArticleOptions {
  tone: string;
  style: string;
  length: number;
}

// Subscription plan
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  articleCredits: number;
}
