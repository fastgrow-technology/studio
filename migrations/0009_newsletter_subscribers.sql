
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON newsletter_subscribers
FOR SELECT
USING (true);

CREATE POLICY "Enable insert for all users"
ON newsletter_subscribers
FOR INSERT
WITH CHECK (true);
