import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log environment variables for debugging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize auth state listener for debugging
try {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Auth event: ${event}`, session ? 'User session exists' : 'No user session');
  });

  // We don't actually want to unsubscribe, as we need to listen for auth changes
  // This was just for debugging purposes in the previous code
} catch (error) {
  console.error('Error setting up auth listener:', error);
}

export async function signUp(email: string, password: string) {
  try {
    // Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Send email confirmation
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    });

    if (error) {
      throw error;
    }

    // The profile should be created automatically via database trigger
    // defined in the SQL setup script

    return { data, error: null };
  } catch (error: any) {
    console.error('Error during sign up:', error);
    return { data: null, error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Error during sign in:', error);
    return { data: null, error };
  }
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