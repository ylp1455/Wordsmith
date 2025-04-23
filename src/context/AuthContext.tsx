import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '../lib/supabase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (token: string, newPassword: string) => Promise<{ error: any }>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: Setting up auth state');

    // Check for user on mount
    checkUser();

    // Set up listener for auth state changes
    try {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log(`AuthContext: Auth event: ${event}`, session);

          try {
            if (session?.user) {
              console.log('AuthContext: User session detected in listener');
              // Set basic user info immediately
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                subscriptionStatus: 'free' // Default value
              });

              // Get user profile data
              try {
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();

                console.log('AuthContext: Profile data:', profile);

                if (profile) {
                  setUser(prev => ({
                    ...prev!,
                    subscriptionStatus: profile.subscription_status || 'free'
                  }));
                }
              } catch (profileError) {
                console.error('Error fetching profile in auth listener:', profileError);
                // Continue with basic user info
              }
            } else {
              console.log('AuthContext: No user session in listener');
              setUser(null);
            }
          } catch (error) {
            console.error('Error in auth state change handler:', error);
            setUser(null);
          } finally {
            setLoading(false);
          }
        }
      );

      return () => {
        try {
          console.log('AuthContext: Unsubscribing from auth listener');
          authListener.subscription.unsubscribe();
        } catch (error) {
          console.error('Error unsubscribing from auth listener:', error);
        }
      };
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      setLoading(false);
    }
  }, []);

  async function checkUser() {
    console.log('AuthContext: Checking current user');
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      console.log('AuthContext: Current session:', sessionData);

      if (sessionData?.session?.user) {
        const userData = sessionData.session.user;
        console.log('AuthContext: User found in session:', userData);

        // Set basic user info immediately
        setUser({
          id: userData.id,
          email: userData.email || '',
          subscriptionStatus: 'free' // Default value
        });

        try {
          // Get user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userData.id)
            .single();

          console.log('AuthContext: Profile data:', profile);

          if (profile) {
            setUser(prev => ({
              ...prev!,
              subscriptionStatus: profile.subscription_status || 'free'
            }));
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Continue with basic user info
        }
      } else {
        console.log('AuthContext: No user in session');
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking current user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    setLoading(true);
    console.log('AuthContext: Attempting to sign in with:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      console.log('AuthContext: Sign in response:', { data, error });

      if (data?.user) {
        console.log('AuthContext: User signed in successfully:', data.user);
        // Set user immediately with basic info
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          subscriptionStatus: 'free' // Default value
        });

        // Then try to get profile info
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          console.log('AuthContext: User profile:', profile);

          // Update with profile info if available
          if (profile) {
            setUser(prev => ({
              ...prev!,
              subscriptionStatus: profile.subscription_status || 'free'
            }));
          }
        } catch (profileError) {
          console.error('Error fetching user profile:', profileError);
          // Continue with basic user info even if profile fetch fails
        }
      } else if (error) {
        console.error('AuthContext: Sign in error:', error);
      } else {
        console.error('AuthContext: No user data or error returned');
      }

      return { error };
    } catch (err) {
      console.error('AuthContext: Error during sign in:', err);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, password: string) {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    return { error };
  }

  async function signOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    return { error };
  }

  async function resetPassword(email: string) {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    return { error };
  }

  async function updatePassword(token: string, newPassword: string) {
    setLoading(true);
    // In a real implementation, you would use the token to update the password
    // For this demo, we'll just simulate a successful password update
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    setLoading(false);
    return { error };
  }

  function updateUser(data: Partial<User>) {
    setUser(prev => (prev ? { ...prev, ...data } : null));
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      resetPassword,
      updatePassword,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}