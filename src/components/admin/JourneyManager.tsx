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

type JourneyRow = TableRow<'journey_entries'>;

const emptyEntry = {
  phase: '',
  title: '',
  description: '',
  status: 'future' as JourneyRow['status'],
  sort_order: 0,
  is_published: false,
};

export function JourneyManager({
  client,
}: {
  client: SupabaseClient<Database>;
}) {
  const [entries, setEntries] = useState<JourneyRow[]>([]);
  const [form, setForm] = useState(emptyEntry);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadEntries = useCallback(async () => {
    setIsLoading(true);
    const { data, error: queryError } = await client
      .from('journey_entries')
      .select('*')
      .order('sort_order');
    setIsLoading(false);
    if (queryError) {
      setError(queryError.message);
      return;
    }
    setEntries(data);
  }, [client]);

  useEffect(() => {
    void loadEntries();
  }, [loadEntries]);

  function editEntry(entry: JourneyRow) {
    setEditingId(entry.id);
    setForm({
      phase: entry.phase,
      title: entry.title,
      description: entry.description,
      status: entry.status,
      sort_order: entry.sort_order,
      is_published: entry.is_published,
    });
  }

  async function saveEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    const result = editingId
      ? await client.from('journey_entries').update(form).eq('id', editingId).select('id').single()
      : await client.from('journey_entries').insert(form).select('id').single();
    setIsSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setEditingId(null);
    setForm(emptyEntry);
    await loadEntries();
  }

  async function deleteEntry(entry: JourneyRow) {
    if (!confirmDelete(entry.title)) return;
    setError('');
    const { error: deleteError } = await client
      .from('journey_entries')
      .delete()
      .eq('id', entry.id)
      .select('id')
      .single();
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    if (editingId === entry.id) {
      setEditingId(null);
      setForm(emptyEntry);
    }
    await loadEntries();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">Journey entries</h2>
        {isLoading ? (
          <p role="status" className="text-sm text-ink-500">Loading journey…</p>
        ) : entries.length === 0 ? (
          <p className="rounded-xl border border-dashed border-ink-300 p-6 text-sm text-ink-500 dark:border-ink-700">No database journey entries yet.</p>
        ) : (
          <ul className="space-y-3">
            {entries.map((entry) => (
              <li key={entry.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900">
                <div><p className="font-medium text-ink-900 dark:text-ink-100">{entry.title}</p><p className="mt-1 text-xs text-ink-500">{entry.phase} · {entry.status} · {entry.is_published ? 'Published' : 'Draft'}</p></div>
                <div className="flex gap-2"><button type="button" onClick={() => editEntry(entry)} className="rounded-lg border border-ink-200 px-3 py-2 text-sm dark:border-ink-700">Edit</button><AdminDeleteButton onClick={() => void deleteEntry(entry)} /></div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <form onSubmit={saveEntry} className="h-fit space-y-4 rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
        <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{editingId ? 'Edit journey entry' : 'New journey entry'}</h2>
        <AdminError message={error} />
        <AdminField label="Phase"><AdminInput required value={form.phase} onChange={(event) => setForm({ ...form, phase: event.target.value })} /></AdminField>
        <AdminField label="Title"><AdminInput required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></AdminField>
        <AdminField label="Description"><AdminTextarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></AdminField>
        <AdminField label="Status">
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as JourneyRow['status'] })} className="mt-1.5 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-sm dark:border-ink-700 dark:bg-ink-950">
            <option value="completed">Completed</option><option value="current">Current</option><option value="future">Future</option>
          </select>
        </AdminField>
        <AdminField label="Sort order"><AdminInput type="number" value={form.sort_order} onChange={(event) => setForm({ ...form, sort_order: Number(event.target.value) })} /></AdminField>
        <label className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-200"><input type="checkbox" checked={form.is_published} onChange={(event) => setForm({ ...form, is_published: event.target.checked })} />Published</label>
        <div className="flex gap-2"><AdminSaveButton isSaving={isSaving} editing={Boolean(editingId)} />{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyEntry); }} className="rounded-lg border border-ink-200 px-4 py-2.5 text-sm dark:border-ink-700">Cancel</button>}</div>
      </form>
    </div>
  );
}
