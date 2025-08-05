-- User Roles Table
-- This table links users from auth.users to their roles within the application.
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow admins to manage user roles
CREATE POLICY "Allow admins to manage user roles"
ON user_roles
FOR ALL
USING (
  (SELECT role FROM user_roles WHERE user_id = auth.uid()) = 'admin'
)
WITH CHECK (
  (SELECT role FROM user_roles WHERE user_id = auth.uid()) = 'admin'
);


-- Function to get users with their roles
-- This RPC makes it easy to query all users and their assigned roles together.
CREATE OR REPLACE FUNCTION get_users_with_roles()
RETURNS TABLE (
  id UUID,
  email TEXT,
  last_sign_in_at TIMESTAMPTZ,
  role TEXT
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    u.id,
    u.email,
    u.last_sign_in_at,
    ur.role
  FROM auth.users u
  LEFT JOIN public.user_roles ur ON u.id = ur.user_id;
$$;


-- Add a trigger to automatically create a user_roles entry when a new user signs up.
-- This ensures every user has a default role.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if a role is already provided in the user's metadata (e.g., from an admin invite)
  IF NEW.raw_user_meta_data ->> 'role' IS NULL THEN
    -- If no role is provided, default to 'editor'
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'editor');
  ELSE
    -- If a role is provided in the metadata, use that role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, NEW.raw_user_meta_data ->> 'role');
  END IF;
  RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Seed new site settings for footer logo and SEO.
-- This uses ON CONFLICT DO NOTHING to avoid errors if the keys already exist.
INSERT INTO site_settings (key, value) VALUES
('site_footer_logo_url', ''),
('robots_txt', 'User-agent: *' || CHR(10) || 'Allow: /'),
('google_analytics_id', ''),
('google_tag_manager_id', ''),
('facebook_pixel_id', '')
ON CONFLICT (key) DO NOTHING;
