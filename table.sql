CREATE EXTENSION IF NOT EXISTS "pgcrypto";

ALTER TABLE users
ALTER COLUMN id
SET DEFAULT gen_random_uuid ();

ALTER TABLE posts
ALTER COLUMN id
SET DEFAULT gen_random_uuid ();

ALTER TABLE posts ALTER COLUMN "updatedAt" SET DEFAULT now();

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

CREATE OR REPLACE FUNCTION increment_view_count(post_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE posts
  SET "viewCount" = "viewCount" + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

INSERT INTO categories (name)
VALUES 
  ('Technology'),
  ('Science'),
  ('Health'),
  ('Business'),
  ('Finances'),
  ('Sports'),
  ('Entertainment'),
  ('Politics'),
  ('Education'),
  ('Environment'),
  ('Travel'),
  ('Food'),
  ('Fashion'),
  ('Art'),
  ('Music'),
  ('Literature'),
  ('History'),
  ('Philosophy'),
  ('Psychology'),
  ('Sociology'),
  ('Economics'),
  ('Law'),
  ('Medicine'),
  ('Engineering'),
  ('Architecture'),
  ('Design'),
  ('Marketing'),
  ('Advertising'),
  ('Public Relations'),
  ('Human Resources'),
  ('Management'),
  ('Entrepreneurship'),
  ('Investing'),
  ('Real Estate'),
  ('Cryptocurrency'),
  ('Artificial Intelligence'),
  ('Machine Learning'),
  ('Data Science'),
  ('Cybersecurity'),
  ('Cloud Computing'),
  ('Internet of Things'),
  ('Robotics'),
  ('Biotechnology'),
  ('Nanotechnology'),
  ('Space Exploration'),
  ('Renewable Energy'),
  ('Sustainability'),
  ('Climate Change'),
  ('Agriculture'),
  ('Nutrition');
