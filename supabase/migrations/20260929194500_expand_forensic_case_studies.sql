alter table public.forensic_case_studies
  add column case_id text,
  add column objective text,
  add column evidence text,
  add column evidence_basis text,
  add column tools text[] not null default '{}',
  add column timeline jsonb not null default '[]'::jsonb,
  add column analysis text,
  add column limitations text;

update public.forensic_case_studies
set case_id = 'LEGACY-' || upper(left(replace(id::text, '-', ''), 12)),
    objective = coalesce(summary, title),
    evidence = coalesce(scenario, 'Evidence details not recorded.');

update public.forensic_case_studies
set status = 'draft', published_at = null;

alter table public.forensic_case_studies
  alter column case_id set not null,
  alter column objective set not null,
  alter column evidence set not null,
  add constraint forensic_case_studies_case_id_key unique (case_id),
  add constraint forensic_case_studies_evidence_basis_check
    check (
      evidence_basis is null
      or evidence_basis in ('synthetic', 'legally_permissible')
    ),
  add constraint forensic_case_studies_timeline_array_check
    check (jsonb_typeof(timeline) = 'array'),
  add constraint forensic_case_studies_published_evidence_check
    check (status <> 'published' or evidence_basis is not null),
  add constraint forensic_case_studies_required_text_check
    check (
      length(trim(case_id)) > 0
      and length(trim(objective)) > 0
      and length(trim(evidence)) > 0
    );

drop policy "Published forensic case studies are readable"
  on public.forensic_case_studies;
create policy "Published forensic case studies are readable"
  on public.forensic_case_studies for select to public
  using (status = 'published' and evidence_basis is not null);
