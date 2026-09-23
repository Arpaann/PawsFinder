-- ============================================================================
-- PawsFinder Supabase Database Schema & Realtime Setup
-- Paste this script into your Supabase project's SQL Editor and click "Run"
-- ============================================================================

-- 1. Create the `pets` table
CREATE TABLE IF NOT EXISTS public.pets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  age TEXT,
  gender TEXT,
  lost_date TIMESTAMP WITH TIME ZONE,
  last_seen_location TEXT NOT NULL,
  contact_name TEXT,
  contact_phone TEXT NOT NULL,
  contact_email TEXT,
  markings TEXT,
  behavior_notes TEXT,
  reward_active BOOLEAN DEFAULT false,
  reward_amount TEXT,
  currency TEXT DEFAULT 'NPR',
  currency_symbol TEXT DEFAULT 'Rs.',
  photo_url TEXT,
  approved BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'missing',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Access Policies
-- Allow anyone to read approved pets (or all pets if viewing details)
CREATE POLICY "Allow public read access to pets"
  ON public.pets
  FOR SELECT
  USING (true);

-- Allow anyone to insert new missing pet reports
CREATE POLICY "Allow public insert to pets"
  ON public.pets
  FOR INSERT
  WITH CHECK (true);

-- Allow updates (e.g. status changes / approvals)
CREATE POLICY "Allow update access to pets"
  ON public.pets
  FOR UPDATE
  USING (true);

-- Allow delete access (for admin management)
CREATE POLICY "Allow delete access to pets"
  ON public.pets
  FOR DELETE
  USING (true);

-- 4. Enable Supabase Realtime for the `pets` table
ALTER PUBLICATION supabase_realtime ADD TABLE public.pets;
