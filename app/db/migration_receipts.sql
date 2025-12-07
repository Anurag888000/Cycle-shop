-- Receipt Storage Tables for Sales Analytics
-- Run this in Supabase SQL Editor

-- Receipts table
CREATE TABLE IF NOT EXISTS public.receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_no text UNIQUE NOT NULL,
  customer_name text,
  customer_phone text,
  subtotal numeric NOT NULL DEFAULT 0,
  discount_percent numeric DEFAULT 0,
  discount_amount numeric DEFAULT 0,
  gst_enabled boolean DEFAULT true,
  gst_rate numeric DEFAULT 18,
  gst_amount numeric DEFAULT 0,
  grand_total numeric NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Receipt line items
CREATE TABLE IF NOT EXISTS public.receipt_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id uuid REFERENCES public.receipts(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  price numeric NOT NULL,
  quantity integer NOT NULL,
  amount numeric NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_receipts_created_at ON public.receipts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_receipts_receipt_no ON public.receipts(receipt_no);
CREATE INDEX IF NOT EXISTS idx_receipt_items_receipt_id ON public.receipt_items(receipt_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receipt_items ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to perform all operations
CREATE POLICY "Allow all for authenticated users" ON public.receipts
  FOR ALL USING (true);

CREATE POLICY "Allow all for authenticated users" ON public.receipt_items
  FOR ALL USING (true);
