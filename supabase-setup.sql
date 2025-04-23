-- This script sets up the necessary tables for the Wordsmith application

-- Create a profiles table that will store user profile information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'basic', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an articles table to store user-generated articles
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS) for the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own profile
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Set up Row Level Security (RLS) for the articles table
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own articles
CREATE POLICY "Users can view their own articles" 
  ON public.articles 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own articles
CREATE POLICY "Users can insert their own articles" 
  ON public.articles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own articles
CREATE POLICY "Users can update their own articles" 
  ON public.articles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own articles
CREATE POLICY "Users can delete their own articles" 
  ON public.articles 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
