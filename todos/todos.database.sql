CREATE DATABASE todoapp;

CREATE TABLE public.todos(
  todo_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(30),
  progress INT,
  date VARCHAR(300)
);

CREATE TABLE public.users(
  user_email VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  refresh_token TEXT
);

ALTER TABLE public.users ADD COLUMN refresh_token TEXT;

ALTER TABLE public.users ADD UNIQUE(user_email);

ALTER TABLE public.todos ADD CONSTRAINT user_email_fkey FOREIGN KEY(user_email) REFERENCES users(user_email);

CREATE TABLE public.session(
  sid VARCHAR NOT NULL COLLATE "default",
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE public.session ADD CONSTRAINT session_pkey PRIMARY KEY(sid) NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX IDX_session_expires ON public.session(expire);

TRUNCATE TABLE public.users RESTART IDENTITY CASCADE;