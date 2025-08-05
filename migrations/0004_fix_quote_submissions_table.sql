
ALTER TABLE "public"."quote_submissions"
ADD COLUMN IF NOT EXISTS "coverageAmount" text,
ADD COLUMN IF NOT EXISTS "smoker" text,
ADD COLUMN IF NOT EXISTS "destination" text,
ADD COLUMN IF NOT EXISTS "tripStartDate" text,
ADD COLUMN IF NOT EXISTS "tripEndDate" text,
ADD COLUMN IF NOT EXISTS "hasPreExistingConditions" text,
ADD COLUMN IF NOT EXISTS "coverageType" text,
ADD COLUMN IF NOT EXISTS "financialService" text;

ALTER TABLE "public"."quote_submissions"
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "birthDate" DROP NOT NULL,
ALTER COLUMN "consent" DROP NOT NULL;
