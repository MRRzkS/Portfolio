-- Portfolio schema: run this once in the Supabase SQL Editor.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text not null default '',
  description text not null default '',
  tech text[] not null default '{}',
  category text not null default 'Software',
  repo_url text,
  demo_url text,
  image_url text,
  sort_order int not null default 100,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "read published or authenticated"
  on public.projects for select
  using (published or auth.role() = 'authenticated');

create policy "authenticated insert" on public.projects
  for insert with check (auth.role() = 'authenticated');
create policy "authenticated update" on public.projects
  for update using (auth.role() = 'authenticated');
create policy "authenticated delete" on public.projects
  for delete using (auth.role() = 'authenticated');

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger projects_touch before update on public.projects
for each row execute function public.touch_updated_at();
