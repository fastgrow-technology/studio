-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Allow authenticated uploads with size limit" ON storage.objects;

-- Recreate the policy with the correct size check
CREATE POLICY "Allow authenticated uploads with size limit"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'media' AND
  (metadata ->> 'size')::bigint < 1024 * 1024
);
