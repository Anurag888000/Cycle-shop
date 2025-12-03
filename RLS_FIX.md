# Fixing Row Level Security Error

## The Problem
You're getting the error: "new row violates row-level security policy for table 'bicycles'"

This happens because Supabase has Row Level Security (RLS) enabled on your `bicycles` table, but there are no policies allowing anonymous users to insert/update/delete data.

## The Solution
I've updated your application to use a **service role key** for API routes, which bypasses RLS policies. This is the recommended approach for server-side operations.

## Steps to Fix:

### 1. Get Your Service Role Key
1. Go to your Supabase project: https://app.supabase.com/project/eejlphblkswrjiwnkuif/settings/api
2. Scroll down to the **"Project API keys"** section
3. Copy the **"service_role"** key (NOT the anon key)
   - ⚠️ WARNING: This key has full admin access - never expose it in client-side code!

### 2. Add the Key to Your .env.local File
Open your `.env.local` file and replace `your-service-role-key-here` with the actual service role key:

```env
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
```

### 3. Restart Your Development Server
After updating `.env.local`, restart your Next.js development server:
- Stop the current server (Ctrl+C)
- Run `npm run dev` again

### 4. Test Adding a Bicycle
Try adding a new bicycle again - it should work now!

## What Changed?
- Created `app/lib/supabaseServer.ts` - Server-side Supabase client with service role key
- Updated all API routes to use `supabaseServer` instead of `supabase`
- This bypasses RLS for server-side operations while keeping client-side operations secure

## Alternative Solution (If You Don't Want to Use Service Role Key)
If you prefer to keep using the anon key, you need to add RLS policies in Supabase:

1. Go to: https://app.supabase.com/project/eejlphblkswrjiwnkuif/editor
2. Select your `bicycles` table
3. Click on "RLS" or go to Authentication → Policies
4. Add these policies:

**Allow All Operations (for development):**
```sql
-- Allow SELECT for everyone
CREATE POLICY "Allow public read access" ON bicycles
FOR SELECT TO anon
USING (true);

-- Allow INSERT for everyone
CREATE POLICY "Allow public insert access" ON bicycles
FOR INSERT TO anon
WITH CHECK (true);

-- Allow UPDATE for everyone
CREATE POLICY "Allow public update access" ON bicycles
FOR UPDATE TO anon
USING (true);

-- Allow DELETE for everyone
CREATE POLICY "Allow public delete access" ON bicycles
FOR DELETE TO anon
USING (true);
```

⚠️ Note: These policies allow anyone to modify your data. For production, you should implement proper authentication and restrict access accordingly.
