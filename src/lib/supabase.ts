import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// In a real app, these would be set in environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}

export async function saveArticle(title: string, content: string, userId: string) {
  const { data, error } = await supabase
    .from('articles')
    .insert([{ title, content, user_id: userId }]);
  
  return { data, error };
}

export async function getUserArticles(userId: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  return { data, error };
}

export async function deleteArticle(articleId: string) {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', articleId);
    
  return { error };
}

export async function updateUserSubscription(userId: string, status: string) {
  const { error } = await supabase
    .from('profiles')
    .update({ subscription_status: status })
    .eq('id', userId);
    
  return { error };
}