CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.films
(
  id uuid DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT "PK_films" PRIMARY KEY,
  rating double precision NOT NULL,
  director varchar NOT NULL,
  tags text NOT NULL,
  image varchar NOT NULL,
  cover varchar NOT NULL,
  title varchar NOT NULL,
  about varchar NOT NULL,
  description varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS public.schedules
(
  id uuid DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT "PK_schedules" PRIMARY KEY,
  daytime varchar NOT NULL,
  hall integer NOT NULL,
  rows integer NOT NULL,
  seats integer NOT NULL,
  price double precision NOT NULL,
  taken text NOT NULL DEFAULT '',
  "filmId" uuid
    CONSTRAINT "FK_schedules_films"
    REFERENCES public.films
);

CREATE INDEX IF NOT EXISTS idx_schedules_film_id ON public.schedules ("filmId");
