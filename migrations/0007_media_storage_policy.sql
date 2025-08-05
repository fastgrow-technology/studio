
-- Enable RLS on the 'media' bucket
-- Note: This assumes the 'media' bucket has already been created.
-- Policies are not created by default, so we must define them.

-- 1. Allow SELECT access for all authenticated users
CREATE POLICY "Allow authenticated SELECT on media"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'media');

-- 2. Allow INSERT access for all authenticated users
CREATE POLICY "Allow authenticated INSERT on media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- 3. Allow UPDATE access for all authenticated users
CREATE POLICY "Allow authenticated UPDATE on media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media');

-- 4. Allow DELETE access for all authenticated users
CREATE POLICY "Allow authenticated DELETE on media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');
