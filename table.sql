CREATE EXTENSION IF NOT EXISTS "pgcrypto";

ALTER TABLE users
ALTER COLUMN id
SET DEFAULT gen_random_uuid ();

ALTER TABLE posts
ALTER COLUMN id
SET DEFAULT gen_random_uuid ();

ALTER TABLE comments
ALTER COLUMN id
SET DEFAULT gen_random_uuid ();

ALTER TABLE categories
ALTER COLUMN id
SET DEFAULT gen_random_uuid ();

ALTER TABLE tags
ALTER COLUMN id
SET DEFAULT gen_random_uuid ();

ALTER TABLE users ALTER COLUMN updatedAt SET DEFAULT now();

ALTER TABLE posts ADD COLUMN "viewCount" INT DEFAULT 0 NOT NULL;
