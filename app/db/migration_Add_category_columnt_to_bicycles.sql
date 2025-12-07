ALTER TABLE public.bicycles 
ADD COLUMN category text 
CHECK (category IN ('mountain', 'road', 'kids', 'electric', 'city'));