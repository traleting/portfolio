create extension if not exists pgcrypto;

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  client text not null,
  description text not null,
  live_url text,
  github_url text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_technologies (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (project_id, name)
);

create table public.project_screenshots (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  src text not null,
  alt text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.project_case_studies (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects (id) on delete cascade,
  problem text,
  requirements text,
  solution text,
  role text,
  development_process text,
  challenges text,
  testing text,
  deployment text,
  outcome text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  icon text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.skill_categories (id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (category_id, name)
);

create table public.education_entries (
  id uuid primary key default gen_random_uuid(),
  qualification text not null,
  institution text,
  location text,
  start_date date,
  end_date date,
  description text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table public.journey_entries (
  id uuid primary key default gen_random_uuid(),
  phase text not null,
  title text not null,
  description text not null,
  status text not null default 'future'
    check (status in ('completed', 'current', 'future')),
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.forensic_case_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  scenario text,
  methodology text,
  findings text,
  conclusion text,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'published' or published_at is not null)
);

create index project_technologies_project_order_idx
  on public.project_technologies (project_id, sort_order);
create index project_screenshots_project_order_idx
  on public.project_screenshots (project_id, sort_order);
create index skills_category_order_idx
  on public.skills (category_id, sort_order);
create index education_entries_published_order_idx
  on public.education_entries (is_published, sort_order);
create index journey_entries_published_order_idx
  on public.journey_entries (is_published, sort_order);
create index forensic_case_studies_published_at_idx
  on public.forensic_case_studies (status, published_at desc);

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();
create trigger project_case_studies_set_updated_at
  before update on public.project_case_studies
  for each row execute function public.set_updated_at();
create trigger skill_categories_set_updated_at
  before update on public.skill_categories
  for each row execute function public.set_updated_at();
create trigger education_entries_set_updated_at
  before update on public.education_entries
  for each row execute function public.set_updated_at();
create trigger journey_entries_set_updated_at
  before update on public.journey_entries
  for each row execute function public.set_updated_at();
create trigger forensic_case_studies_set_updated_at
  before update on public.forensic_case_studies
  for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.project_technologies enable row level security;
alter table public.project_screenshots enable row level security;
alter table public.project_case_studies enable row level security;
alter table public.skill_categories enable row level security;
alter table public.skills enable row level security;
alter table public.education_entries enable row level security;
alter table public.journey_entries enable row level security;
alter table public.forensic_case_studies enable row level security;

grant usage on schema public to public;
revoke all on
  public.projects,
  public.project_technologies,
  public.project_screenshots,
  public.project_case_studies,
  public.skill_categories,
  public.skills,
  public.education_entries,
  public.journey_entries,
  public.forensic_case_studies
from public;
grant select on
  public.projects,
  public.project_technologies,
  public.project_screenshots,
  public.project_case_studies,
  public.skill_categories,
  public.skills,
  public.education_entries,
  public.journey_entries,
  public.forensic_case_studies
to public;

create policy "Published projects are readable"
  on public.projects for select to public
  using (is_published);
create policy "Published project technologies are readable"
  on public.project_technologies for select to public
  using (exists (
    select 1 from public.projects
    where projects.id = project_technologies.project_id
      and projects.is_published
  ));
create policy "Published project screenshots are readable"
  on public.project_screenshots for select to public
  using (exists (
    select 1 from public.projects
    where projects.id = project_screenshots.project_id
      and projects.is_published
  ));
create policy "Published project case studies are readable"
  on public.project_case_studies for select to public
  using (exists (
    select 1 from public.projects
    where projects.id = project_case_studies.project_id
      and projects.is_published
  ));
create policy "Skill categories are publicly readable"
  on public.skill_categories for select to public
  using (true);
create policy "Skills are publicly readable"
  on public.skills for select to public
  using (true);
create policy "Published education entries are readable"
  on public.education_entries for select to public
  using (is_published);
create policy "Published journey entries are readable"
  on public.journey_entries for select to public
  using (is_published);
create policy "Published forensic case studies are readable"
  on public.forensic_case_studies for select to public
  using (status = 'published');
