CREATE EXTENSION IF NOT EXISTS "pgcrypto";

ALTER TABLE users
ALTER COLUMN id
SET DEFAULT gen_random_uuid ();

ALTER TABLE users ALTER COLUMN updatedAt SET DEFAULT now();
