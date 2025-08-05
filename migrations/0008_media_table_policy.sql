
-- This migration enables Row Level Security (RLS) for the media table
-- and creates policies to allow authenticated users to manage media records.

-- 1. Enable RLS on the 'media' table
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy to allow authenticated users to SELECT all media
CREATE POLICY "Allow authenticated read access"
ON public.media
FOR SELECT
TO authenticated
USING (true);

-- 3. Create a policy to allow authenticated users to INSERT new media
CREATE POLICY "Allow authenticated insert access"
ON public.media
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. Create a policy to allow authenticated users to UPDATE media
CREATE POLICY "Allow authenticated update access"
ON public.media
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Create a policy to allow authenticated users to DELETE media
CREATE POLICY "Allow authenticated delete access"
ON public.media
FOR DELETE
TO authenticated
USING (true);
