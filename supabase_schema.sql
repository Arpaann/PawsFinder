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

-- 3. Drop existing policies if they already exist (to avoid duplicate policy error)
DROP POLICY IF EXISTS "Allow public read access to pets" ON public.pets;
DROP POLICY IF EXISTS "Allow public insert to pets" ON public.pets;
DROP POLICY IF EXISTS "Allow update access to pets" ON public.pets;
DROP POLICY IF EXISTS "Allow delete access to pets" ON public.pets;

-- 4. Create Public Access Policies
CREATE POLICY "Allow public read access to pets"
  ON public.pets
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to pets"
  ON public.pets
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update access to pets"
  ON public.pets
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete access to pets"
  ON public.pets
  FOR DELETE
  USING (true);

-- 5. Enable Supabase Realtime for the `pets` table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'pets'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.pets;
  END IF;
END $$;
