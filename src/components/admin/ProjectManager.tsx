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

type ProjectRow = TableRow<'projects'>;

const emptyProject = {
  name: '',
  slug: '',
  client: '',
  description: '',
  live_url: '',
  github_url: '',
  sort_order: 0,
  is_published: false,
};

export function ProjectManager({
  client,
}: {
  client: SupabaseClient<Database>;
}) {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    const { data, error: queryError } = await client
      .from('projects')
      .select('*')
      .order('sort_order')
      .order('name');
    setIsLoading(false);
    if (queryError) {
      setError(queryError.message);
      return;
    }
    setProjects(data);
  }, [client]);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  function resetForm() {
    setEditingId(null);
    setForm(emptyProject);
  }

  function editProject(project: ProjectRow) {
    setEditingId(project.id);
    setForm({
      name: project.name,
      slug: project.slug,
      client: project.client,
      description: project.description,
      live_url: project.live_url ?? '',
      github_url: project.github_url ?? '',
      sort_order: project.sort_order,
      is_published: project.is_published,
    });
    setError('');
  }

  async function saveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    const values = {
      ...form,
      slug: form.slug.trim().toLowerCase(),
      live_url: form.live_url.trim() || null,
      github_url: form.github_url.trim() || null,
    };
    const result = editingId
      ? await client.from('projects').update(values).eq('id', editingId).select('id').single()
      : await client.from('projects').insert(values).select('id').single();
    setIsSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    resetForm();
    await loadProjects();
  }

  async function deleteProject(project: ProjectRow) {
    if (!confirmDelete(project.name)) return;
    setError('');
    const { error: deleteError } = await client
      .from('projects')
      .delete()
      .eq('id', project.id)
      .select('id')
      .single();
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    if (editingId === project.id) resetForm();
    await loadProjects();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">
          Projects
        </h2>
        {isLoading ? (
          <p role="status" className="text-sm text-ink-500">Loading projects…</p>
        ) : projects.length === 0 ? (
          <p className="rounded-xl border border-dashed border-ink-300 p-6 text-sm text-ink-500 dark:border-ink-700">
            No database projects yet. Existing portfolio projects remain
            unchanged until they are added here.
          </p>
        ) : (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink-900 dark:text-ink-100">
                    {project.name}
                  </p>
                  <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
                    {project.is_published ? 'Published' : 'Draft'} · /{project.slug}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => editProject(project)}
                    className="rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800"
                  >
                    Edit
                  </button>
                  <AdminDeleteButton onClick={() => void deleteProject(project)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <form
        onSubmit={saveProject}
        className="h-fit space-y-4 rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900"
      >
        <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">
          {editingId ? 'Edit project' : 'New project'}
        </h2>
        <AdminError message={error} />
        <AdminField label="Project name">
          <AdminInput required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </AdminField>
        <AdminField label="URL slug">
          <AdminInput required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} />
        </AdminField>
        <AdminField label="Client">
          <AdminInput required value={form.client} onChange={(event) => setForm({ ...form, client: event.target.value })} />
        </AdminField>
        <AdminField label="Description">
          <AdminTextarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        </AdminField>
        <AdminField label="Live site URL">
          <AdminInput type="url" value={form.live_url} onChange={(event) => setForm({ ...form, live_url: event.target.value })} />
        </AdminField>
        <AdminField label="GitHub URL">
          <AdminInput type="url" value={form.github_url} onChange={(event) => setForm({ ...form, github_url: event.target.value })} />
        </AdminField>
        <AdminField label="Sort order">
          <AdminInput type="number" value={form.sort_order} onChange={(event) => setForm({ ...form, sort_order: Number(event.target.value) })} />
        </AdminField>
        <label className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-200">
          <input type="checkbox" checked={form.is_published} onChange={(event) => setForm({ ...form, is_published: event.target.checked })} />
          Published
        </label>
        <div className="flex gap-2">
          <AdminSaveButton isSaving={isSaving} editing={Boolean(editingId)} />
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-medium dark:border-ink-700">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
