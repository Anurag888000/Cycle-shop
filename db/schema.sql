-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.bicycles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  description text,
  features text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  image_url text,
  category text CHECK (category IN ('mountain', 'road', 'kids', 'electric', 'city')),
  CONSTRAINT bicycles_pkey PRIMARY KEY (id)
);

-- To add category column to existing table, run:
-- ALTER TABLE public.bicycles ADD COLUMN category text CHECK (category IN ('mountain', 'road', 'kids', 'electric', 'city'));