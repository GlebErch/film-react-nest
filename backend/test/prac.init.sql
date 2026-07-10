CREATE TABLE IF NOT EXISTS film (
  id uuid PRIMARY KEY,
  rating double precision NOT NULL,
  director text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  image text NOT NULL,
  cover text NOT NULL,
  title text NOT NULL,
  about text NOT NULL,
  description text NOT NULL
);

CREATE TABLE IF NOT EXISTS schedule (
  id uuid PRIMARY KEY,
  film_id uuid NOT NULL REFERENCES film(id) ON DELETE CASCADE,
  daytime timestamptz NOT NULL,
  hall text NOT NULL,
  rows integer NOT NULL,
  seats integer NOT NULL,
  price integer NOT NULL,
  taken text[] NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_schedule_film_id ON schedule(film_id);
