
ALTER TABLE public.quote_submissions
ADD COLUMN IF NOT EXISTS "coverageAmount" text,
ADD COLUMN IF NOT EXISTS "smoker" text,
ADD COLUMN IF NOT EXISTS "destination" text,
ADD COLUMN IF NOT EXISTS "tripStartDate" text,
ADD COLUMN IF NOT EXISTS "tripEndDate" text,
ADD COLUMN IF NOT EXISTS "hasPreExistingConditions" text,
ADD COLUMN IF NOT EXISTS "birthDate" text,
ADD COLUMN IF NOT EXISTS "consent" boolean;
