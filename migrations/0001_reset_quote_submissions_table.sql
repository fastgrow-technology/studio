
-- Drop the table if it exists to ensure a clean slate, removing any old sequences or constraints.
DROP TABLE IF EXISTS quote_submissions;

-- Recreate the quote_submissions table with the full, correct schema.
CREATE TABLE quote_submissions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    service TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    email TEXT,
    phone TEXT,
    "birthDate" TEXT,
    consent BOOLEAN,
    "coverageAmount" TEXT,
    smoker TEXT,
    destination TEXT,
    "tripStartDate" TEXT,
    "tripEndDate" TEXT,
    "hasPreExistingConditions" TEXT,
    "coverageType" TEXT,
    "financialService" TEXT
);
