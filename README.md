# Rienchy Razak - Portfolio

Personal portfolio with a public showcase and a private owner dashboard.
Built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase
(Postgres + Auth). Deployed on Vercel.

## Architecture

- Public pages read published projects from Postgres. Before Supabase is
  configured, the site renders bundled seed data so it runs out of the box.
- /dashboard is a CRUD admin for portfolio content. It is protected twice:
  middleware verifies the session on the server, and row-level security in
  Postgres restricts every write to authenticated users. The dashboard link
  is not in the navigation on purpose, but hiding a link is cosmetic; the
  locks are middleware and RLS.

## Setup

1. Create a project at supabase.com.
2. In the SQL Editor, run supabase/schema.sql.
3. In Authentication, add one user (your owner account) and disable new
   sign-ups.
4. Copy .env.example to .env.local and fill in the project URL and anon key
   from Project Settings, API.
5. npm install, then npm run dev.
6. If the database was created before v3, run supabase/migration-v3.sql once.
7. Open /login, sign in, and use "Import seed projects" to load the initial
   content, then edit each entry.

## Deploy

Push to GitHub, import the repo in Vercel, and set the two environment
variables. Every push to main deploys.
