create function public.is_portfolio_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(
    (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;

grant insert, update, delete on
  public.projects,
  public.project_technologies,
  public.project_screenshots,
  public.project_case_studies,
  public.skill_categories,
  public.skills,
  public.education_entries,
  public.journey_entries,
  public.forensic_case_studies
to authenticated;

create policy "Admins can read all projects"
  on public.projects for select to authenticated
  using (public.is_portfolio_admin());
create policy "Admins can manage projects"
  on public.projects for all to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

create policy "Admins can read all project technologies"
  on public.project_technologies for select to authenticated
  using (public.is_portfolio_admin());
create policy "Admins can manage project technologies"
  on public.project_technologies for all to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

create policy "Admins can read all project screenshots"
  on public.project_screenshots for select to authenticated
  using (public.is_portfolio_admin());
create policy "Admins can manage project screenshots"
  on public.project_screenshots for all to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

create policy "Admins can read all project case studies"
  on public.project_case_studies for select to authenticated
  using (public.is_portfolio_admin());
create policy "Admins can manage project case studies"
  on public.project_case_studies for all to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

create policy "Admins can manage skill categories"
  on public.skill_categories for all to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

create policy "Admins can manage skills"
  on public.skills for all to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

create policy "Admins can read all education entries"
  on public.education_entries for select to authenticated
  using (public.is_portfolio_admin());
create policy "Admins can manage education entries"
  on public.education_entries for all to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

create policy "Admins can read all journey entries"
  on public.journey_entries for select to authenticated
  using (public.is_portfolio_admin());
create policy "Admins can manage journey entries"
  on public.journey_entries for all to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

create policy "Admins can read all forensic case studies"
  on public.forensic_case_studies for select to authenticated
  using (public.is_portfolio_admin());
create policy "Admins can manage forensic case studies"
  on public.forensic_case_studies for all to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());
