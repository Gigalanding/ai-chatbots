-- EduWorkflow Labs Landing Page Database Schema
-- Apply this in your Supabase SQL editor

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- Contacts table for form submissions
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT,
  pain_point TEXT NOT NULL,
  source TEXT DEFAULT 'landing',
  consent BOOLEAN DEFAULT TRUE,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip TEXT
);

-- Bookings table for booking requests and webhook data
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT,
  organization TEXT,
  timezone TEXT,
  slot_start TIMESTAMPTZ,
  slot_end TIMESTAMPTZ,
  external_event_id TEXT,  -- cal.com / calendly event id
  status TEXT DEFAULT 'requested',
  notes TEXT,
  source TEXT DEFAULT 'landing',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies (restrictive by default - only service role can insert/read)
-- No public read access to protect user privacy

-- Contacts policies
CREATE POLICY "Service role can insert contacts" ON public.contacts
  FOR INSERT TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read contacts" ON public.contacts
  FOR SELECT TO service_role
  USING (true);

-- Bookings policies  
CREATE POLICY "Service role can insert bookings" ON public.bookings
  FOR INSERT TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read bookings" ON public.bookings
  FOR SELECT TO service_role
  USING (true);

CREATE POLICY "Service role can update bookings" ON public.bookings
  FOR UPDATE TO service_role
  USING (true);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_source ON public.contacts(source);

CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_external_event_id ON public.bookings(external_event_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
