-- Run once in the Supabase SQL Editor if the table predates these columns.
alter table public.projects add column if not exists image_url text;
alter table public.projects add column if not exists category text not null default 'Software';
