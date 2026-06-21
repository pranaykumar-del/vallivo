-- ─────────────────────────────────────────────────────────────
-- Vallivo — Supabase Schema
-- Run this in your Supabase SQL editor to set up the orders table
-- ─────────────────────────────────────────────────────────────

-- 1. Create the orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  phone       text NOT NULL,
  address     text NOT NULL,
  quantity    integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  product     text NOT NULL DEFAULT 'Cacao No.01',
  created_at  timestamptz DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous inserts (so anyone can place an order without login)
CREATE POLICY "Allow anon inserts"
  ON public.orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Only allow authenticated users (you) to read orders
CREATE POLICY "Allow auth reads"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (true);

-- 5. Optional: index on created_at for sorting dashboard view
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders (created_at DESC);

-- ─────────────────────────────────────────────────────────────
-- Done! Your orders table is ready.
-- Head to Table Editor in Supabase to view incoming orders.
-- ─────────────────────────────────────────────────────────────
