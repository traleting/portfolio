import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, TableRow } from '@/types/database';
import {
  AdminDeleteButton,
  AdminError,
  AdminField,
  AdminInput,
  AdminSaveButton,
  AdminTextarea,
} from '@/components/admin/AdminFields';
import { confirmDelete } from '@/components/admin/adminUtils';

type CaseStudyRow = TableRow<'forensic_case_studies'>;

const emptyCaseStudy = {
  case_id: '',
  title: '',
  summary: '',
  objective: '',
  evidence: '',
  evidence_basis: '' as NonNullable<CaseStudyRow['evidence_basis']> | '',
  methodology: '',
  tools: '',
  timeline: '',
  analysis: '',
  findings: '',
  conclusion: '',
  limitations: '',
  status: 'draft' as CaseStudyRow['status'],
};

export function ForensicCaseStudyManager({
  client,
}: {
  client: SupabaseClient<Database>;
}) {
  const [caseStudies, setCaseStudies] = useState<CaseStudyRow[]>([]);
  const [form, setForm] = useState(emptyCaseStudy);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadCaseStudies = useCallback(async () => {
    setIsLoading(true);
    const { data, error: queryError } = await client
      .from('forensic_case_studies')
      .select('*')
      .order('created_at', { ascending: false });
    setIsLoading(false);
    if (queryError) {
      setError(queryError.message);
      return;
    }
    setCaseStudies(data);
  }, [client]);

  useEffect(() => {
    void loadCaseStudies();
  }, [loadCaseStudies]);

  function editCaseStudy(caseStudy: CaseStudyRow) {
    setEditingId(caseStudy.id);
    setForm({
      title: caseStudy.title,
      case_id: caseStudy.case_id,
      summary: caseStudy.summary ?? '',
      objective: caseStudy.objective,
      evidence: caseStudy.evidence,
      evidence_basis: caseStudy.evidence_basis ?? '',
      methodology: caseStudy.methodology ?? '',
      tools: caseStudy.tools.join('\n'),
      timeline: Array.isArray(caseStudy.timeline)
        ? caseStudy.timeline
            .map((event) => {
              if (
                typeof event === 'object' &&
                event !== null &&
                'occurredAt' in event &&
                'description' in event &&
                typeof event.occurredAt === 'string' &&
                typeof event.description === 'string'
              ) {
                return `${event.occurredAt} | ${event.description}`;
              }
              return '';
            })
            .filter(Boolean)
            .join('\n')
        : '',
      analysis: caseStudy.analysis ?? '',
      findings: caseStudy.findings ?? '',
      conclusion: caseStudy.conclusion ?? '',
      limitations: caseStudy.limitations ?? '',
      status: caseStudy.status,
    });
  }

  async function saveCaseStudy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const timelineLines = form.timeline
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    if (
      timelineLines.some((line) => {
        const separator = line.indexOf('|');
        return separator < 1 || !line.slice(0, separator).trim() || !line.slice(separator + 1).trim();
      })
    ) {
      setError('Enter each timeline item as date/time | event.');
      return;
    }
    if (form.status === 'published' && !form.evidence_basis) {
      setError('Select the evidence basis before publishing this case study.');
      return;
    }
    setIsSaving(true);
    setError('');
    const values = {
      ...form,
      case_id: form.case_id.trim(),
      summary: form.summary.trim() || null,
      objective: form.objective.trim(),
      evidence: form.evidence.trim(),
      evidence_basis: form.evidence_basis || null,
      methodology: form.methodology.trim() || null,
      tools: form.tools.split('\n').map((tool) => tool.trim()).filter(Boolean),
      timeline: timelineLines.map((line) => {
        const separator = line.indexOf('|');
        return {
            occurredAt: line.slice(0, separator).trim(),
            description: line.slice(separator + 1).trim(),
        };
      }),
      analysis: form.analysis.trim() || null,
      findings: form.findings.trim() || null,
      conclusion: form.conclusion.trim() || null,
      limitations: form.limitations.trim() || null,
      published_at:
        form.status === 'published'
          ? new Date().toISOString()
          : null,
    };
    const result = editingId
      ? await client.from('forensic_case_studies').update(values).eq('id', editingId).select('id').single()
      : await client.from('forensic_case_studies').insert(values).select('id').single();
    setIsSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setEditingId(null);
    setForm(emptyCaseStudy);
    await loadCaseStudies();
  }

  async function deleteCaseStudy(caseStudy: CaseStudyRow) {
    if (!confirmDelete(caseStudy.title)) return;
    setError('');
    const { error: deleteError } = await client
      .from('forensic_case_studies')
      .delete()
      .eq('id', caseStudy.id)
      .select('id')
      .single();
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    if (editingId === caseStudy.id) {
      setEditingId(null);
      setForm(emptyCaseStudy);
    }
    await loadCaseStudies();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">Forensic learning case studies</h2>
        {isLoading ? (
          <p role="status" className="text-sm text-ink-500">Loading case studies…</p>
        ) : caseStudies.length === 0 ? (
          <p className="rounded-xl border border-dashed border-ink-300 p-6 text-sm text-ink-500 dark:border-ink-700">No forensic case studies yet.</p>
        ) : (
          <ul className="space-y-3">
            {caseStudies.map((caseStudy) => (
              <li key={caseStudy.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900">
                <div><p className="font-medium text-ink-900 dark:text-ink-100">{caseStudy.title}</p><p className="mt-1 text-xs text-ink-500">{caseStudy.status}</p></div>
                <div className="flex gap-2"><button type="button" onClick={() => editCaseStudy(caseStudy)} className="rounded-lg border border-ink-200 px-3 py-2 text-sm dark:border-ink-700">Edit</button><AdminDeleteButton onClick={() => void deleteCaseStudy(caseStudy)} /></div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <form onSubmit={saveCaseStudy} className="h-fit space-y-4 rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
        <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{editingId ? 'Edit case study' : 'New case study'}</h2>
        <AdminError message={error} />
        <p className="rounded-lg border border-warning-200 bg-warning-50 p-3 text-xs leading-relaxed text-warning-800 dark:border-warning-900 dark:bg-warning-900/20 dark:text-warning-300">
          Use synthetic evidence or material you are legally permitted to
          publish. Do not enter private, confidential, or identifying evidence.
        </p>
        <AdminField label="Case ID"><AdminInput required value={form.case_id} onChange={(event) => setForm({ ...form, case_id: event.target.value })} /></AdminField>
        <AdminField label="Title"><AdminInput required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></AdminField>
        <AdminField label="Summary"><AdminTextarea value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} /></AdminField>
        <AdminField label="Objective"><AdminTextarea required value={form.objective} onChange={(event) => setForm({ ...form, objective: event.target.value })} /></AdminField>
        <AdminField label="Evidence description"><AdminTextarea required value={form.evidence} onChange={(event) => setForm({ ...form, evidence: event.target.value })} /></AdminField>
        <AdminField label="Evidence basis">
          <select required value={form.evidence_basis} onChange={(event) => setForm({ ...form, evidence_basis: event.target.value as NonNullable<CaseStudyRow['evidence_basis']> | '' })} className="mt-1.5 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-sm dark:border-ink-700 dark:bg-ink-950">
            <option value="" disabled>Select the evidence basis</option><option value="synthetic">Synthetic evidence</option><option value="legally_permissible">Legally permissible evidence</option>
          </select>
        </AdminField>
        <AdminField label="Methodology"><AdminTextarea value={form.methodology} onChange={(event) => setForm({ ...form, methodology: event.target.value })} /></AdminField>
        <AdminField label="Tools (one per line)"><AdminTextarea value={form.tools} onChange={(event) => setForm({ ...form, tools: event.target.value })} /></AdminField>
        <AdminField label="Timeline (one event per line: date/time | event)"><AdminTextarea value={form.timeline} onChange={(event) => setForm({ ...form, timeline: event.target.value })} /></AdminField>
        <AdminField label="Analysis"><AdminTextarea value={form.analysis} onChange={(event) => setForm({ ...form, analysis: event.target.value })} /></AdminField>
        <AdminField label="Findings"><AdminTextarea value={form.findings} onChange={(event) => setForm({ ...form, findings: event.target.value })} /></AdminField>
        <AdminField label="Conclusion"><AdminTextarea value={form.conclusion} onChange={(event) => setForm({ ...form, conclusion: event.target.value })} /></AdminField>
        <AdminField label="Limitations"><AdminTextarea value={form.limitations} onChange={(event) => setForm({ ...form, limitations: event.target.value })} /></AdminField>
        <AdminField label="Publication status">
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as CaseStudyRow['status'] })} className="mt-1.5 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-sm dark:border-ink-700 dark:bg-ink-950">
            <option value="draft">Draft</option><option value="published">Published</option>
          </select>
        </AdminField>
        <div className="flex gap-2"><AdminSaveButton isSaving={isSaving} editing={Boolean(editingId)} />{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyCaseStudy); }} className="rounded-lg border border-ink-200 px-4 py-2.5 text-sm dark:border-ink-700">Cancel</button>}</div>
      </form>
    </div>
  );
}
