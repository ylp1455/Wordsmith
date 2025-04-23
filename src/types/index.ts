export interface Article {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  subscriptionStatus: 'free' | 'basic' | 'premium';
}

export interface ArticleOptions {
  tone: 'formal' | 'informal' | 'persuasive' | 'academic' | 'conversational';
  style: 'essay' | 'article' | 'report' | 'blog' | 'technical';
  length: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  articleCredits: number;
}