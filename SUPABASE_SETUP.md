# Supabase Setup for Wordsmith

This guide will help you set up Supabase for the Wordsmith application.

## 1. Create a Supabase Project

1. Go to [https://supabase.com/](https://supabase.com/) and sign up or log in
2. Create a new project
3. Choose a name for your project (e.g., "wordsmith")
4. Set a secure database password
5. Choose a region close to your users
6. Wait for your project to be created (this may take a few minutes)

## 2. Get Your API Keys

1. Once your project is created, go to the project dashboard
2. Click on the "Settings" icon in the left sidebar
3. Click on "API" in the settings menu
4. You'll find your:
   - **Project URL**: This is your `VITE_SUPABASE_URL`
   - **anon/public** key: This is your `VITE_SUPABASE_ANON_KEY`

## 3. Set Up Environment Variables

1. Create or edit the `.env` file in the root of your project
2. Add the following variables with your actual values:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Set Up Database Tables

1. In your Supabase dashboard, go to the "SQL Editor" section
2. Create a new query
3. Copy and paste the contents of the `supabase-setup.sql` file
4. Run the query to create all necessary tables and security policies

## 5. Configure Authentication

1. In your Supabase dashboard, go to "Authentication" → "Providers"
2. Make sure "Email" is enabled
3. Configure email templates if desired
4. Go to "URL Configuration" and set:
   - Site URL: Your production URL (e.g., `https://your-app.com`)
   - Redirect URLs: Add your local development URL (e.g., `http://localhost:5173`)

## 6. Test Your Setup

1. Run your application with `npm run dev`
2. Try to sign up with a test email
3. Check the Supabase dashboard to see if the user was created
4. Try to sign in with the test account

## Troubleshooting

- **Email confirmation not working**: Make sure your redirect URLs are configured correctly
- **Can't sign in**: Check browser console for errors and verify your API keys
- **Database errors**: Check the SQL setup and make sure all tables were created correctly
- **Missing user profile**: Verify that the trigger for creating profiles is working

## Database Schema

The setup creates two main tables:

1. **profiles**: Stores user profile information
   - `id`: UUID (references auth.users)
   - `email`: TEXT
   - `subscription_status`: TEXT ('free', 'basic', or 'premium')
   - `created_at`: TIMESTAMP
   - `updated_at`: TIMESTAMP

2. **articles**: Stores user-generated articles
   - `id`: UUID
   - `title`: TEXT
   - `content`: TEXT
   - `user_id`: UUID (references auth.users)
   - `created_at`: TIMESTAMP
   - `updated_at`: TIMESTAMP

Row-level security policies are set up to ensure users can only access their own data.
