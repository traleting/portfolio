# Portfolio database foundation

The migration in `migrations/` defines a normalized PostgreSQL schema for
projects and their case studies, technologies and screenshots; skill
categories and skills; education and journey entries; and forensic case
studies.

`src/types/database.ts` contains the TypeScript database shape.
`src/types/portfolio.ts` contains the frontend/domain models. Existing static
content remains in `src/data/` and is still what the public portfolio renders.

The migration enables row-level security and grants public read access only
to public portfolio data. Projects, education and journey entries must be
explicitly published. Forensic case studies must be explicitly published.

## Admin dashboard

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the local environment
or deployment provider (see `.env.example`). These are the public project URL
and anon/publishable key; never put a Supabase service-role key in a `VITE_*`
variable or browser bundle.

Apply migrations in timestamp order. The admin dashboard is available at
`/admin`; it uses Supabase email/password authentication and includes project,
skill/category, journey and forensic case study management. Public portfolio
pages continue using their existing static data until a separate data-source
migration is intentionally made.

The forensic case-study extension adds the learning-lab fields (case ID,
objective, evidence description and basis, methodology, tools, timeline,
analysis, findings, conclusion and limitations). Older case-study rows are
set back to drafts for evidence-basis review rather than being assumed
synthetic or legally publishable. Publishing requires an explicit evidence
basis.

Create users through Supabase Auth with sign-up disabled for the public app.
Grant administrator status only from a trusted Supabase SQL editor or
server-side admin process by setting the protected `app_metadata` claim:

```sql
update auth.users
set raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
where email = 'your-admin-email@example.com';
```

The second migration allows writes only when the verified JWT has
`app_metadata.role = 'admin'`. User-editable `user_metadata` is deliberately
not used for authorization. Authenticated non-admins do not receive
management permissions, and unauthenticated clients receive no write grant.
