import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, TableRow } from '@/types/database';
import {
  AdminDeleteButton,
  AdminError,
  AdminField,
  AdminInput,
  AdminSaveButton,
} from '@/components/admin/AdminFields';
import { confirmDelete } from '@/components/admin/adminUtils';

type CategoryRow = TableRow<'skill_categories'>;
type SkillRow = TableRow<'skills'>;

const emptyCategory = { name: '', icon: '', sort_order: 0 };
const emptySkill = { name: '', category_id: '', sort_order: 0 };

export function SkillManager({
  client,
}: {
  client: SupabaseClient<Database>;
}) {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [skills, setSkills] = useState<SkillRow[]>([]);
  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [isSavingSkill, setIsSavingSkill] = useState(false);
  const [error, setError] = useState('');

  const loadSkills = useCallback(async () => {
    setIsLoading(true);
    const [categoryResult, skillResult] = await Promise.all([
      client.from('skill_categories').select('*').order('sort_order').order('name'),
      client.from('skills').select('*').order('sort_order').order('name'),
    ]);
    setIsLoading(false);
    if (categoryResult.error || skillResult.error) {
      setError(categoryResult.error?.message ?? skillResult.error?.message ?? 'Unable to load skills.');
      return;
    }
    setCategories(categoryResult.data);
    setSkills(skillResult.data);
    setSkillForm((current) => ({
      ...current,
      category_id: current.category_id || categoryResult.data[0]?.id || '',
    }));
  }, [client]);

  useEffect(() => {
    void loadSkills();
  }, [loadSkills]);

  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSavingCategory(true);
    setError('');
    const result = editingCategoryId
      ? await client.from('skill_categories').update(categoryForm).eq('id', editingCategoryId).select('id').single()
      : await client.from('skill_categories').insert(categoryForm).select('id').single();
    setIsSavingCategory(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setEditingCategoryId(null);
    setCategoryForm(emptyCategory);
    await loadSkills();
  }

  async function saveSkill(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSavingSkill(true);
    setError('');
    const result = editingSkillId
      ? await client.from('skills').update(skillForm).eq('id', editingSkillId).select('id').single()
      : await client.from('skills').insert(skillForm).select('id').single();
    setIsSavingSkill(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setEditingSkillId(null);
    setSkillForm({ ...emptySkill, category_id: categories[0]?.id ?? '' });
    await loadSkills();
  }

  async function deleteSkill(skill: SkillRow) {
    if (!confirmDelete(skill.name)) return;
    setError('');
    const { error: deleteError } = await client.from('skills').delete().eq('id', skill.id).select('id').single();
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await loadSkills();
  }

  async function deleteCategory(category: CategoryRow) {
    if (!confirmDelete(`${category.name} and its skills`)) return;
    setError('');
    const { error: deleteError } = await client.from('skill_categories').delete().eq('id', category.id).select('id').single();
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    if (editingCategoryId === category.id) {
      setEditingCategoryId(null);
      setCategoryForm(emptyCategory);
    }
    await loadSkills();
  }

  function editCategory(category: CategoryRow) {
    setEditingCategoryId(category.id);
    setCategoryForm({
      name: category.name,
      icon: category.icon,
      sort_order: category.sort_order,
    });
  }

  function editSkill(skill: SkillRow) {
    setEditingSkillId(skill.id);
    setSkillForm({
      name: skill.name,
      category_id: skill.category_id,
      sort_order: skill.sort_order,
    });
  }

  const categoryName = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.name ?? 'Unknown category';

  return (
    <div className="space-y-8">
      <AdminError message={error} />
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">
            Skills
          </h2>
          {isLoading ? (
            <p role="status" className="text-sm text-ink-500">Loading skills…</p>
          ) : skills.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ink-300 p-5 text-sm text-ink-500 dark:border-ink-700">
              No database skills yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
                  <div>
                    <p className="text-sm font-medium text-ink-900 dark:text-ink-100">{skill.name}</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">{categoryName(skill.category_id)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => editSkill(skill)} className="rounded-lg border border-ink-200 px-3 py-2 text-sm dark:border-ink-700">Edit</button>
                    <AdminDeleteButton onClick={() => void deleteSkill(skill)} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <form onSubmit={saveSkill} className="h-fit space-y-4 rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
          <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{editingSkillId ? 'Edit skill' : 'New skill'}</h2>
          <AdminField label="Skill name">
            <AdminInput required value={skillForm.name} onChange={(event) => setSkillForm({ ...skillForm, name: event.target.value })} />
          </AdminField>
          <AdminField label="Category">
            <select required value={skillForm.category_id} onChange={(event) => setSkillForm({ ...skillForm, category_id: event.target.value })} className="mt-1.5 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-sm dark:border-ink-700 dark:bg-ink-950">
              <option value="" disabled>Select a category</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </AdminField>
          <AdminField label="Sort order">
            <AdminInput type="number" value={skillForm.sort_order} onChange={(event) => setSkillForm({ ...skillForm, sort_order: Number(event.target.value) })} />
          </AdminField>
          <div className="flex gap-2">
            <AdminSaveButton isSaving={isSavingSkill} editing={Boolean(editingSkillId)} />
            {editingSkillId && <button type="button" onClick={() => { setEditingSkillId(null); setSkillForm({ ...emptySkill, category_id: categories[0]?.id ?? '' }); }} className="rounded-lg border border-ink-200 px-4 py-2.5 text-sm dark:border-ink-700">Cancel</button>}
          </div>
        </form>
      </div>

      <section className="space-y-4 border-t border-ink-200 pt-8 dark:border-ink-800">
        <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">Skill categories</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
                <div><p className="text-sm font-medium text-ink-900 dark:text-ink-100">{category.name}</p><p className="text-xs text-ink-500">{category.icon}</p></div>
                <div className="flex gap-2"><button type="button" onClick={() => editCategory(category)} className="rounded-lg border border-ink-200 px-3 py-2 text-sm dark:border-ink-700">Edit</button><AdminDeleteButton onClick={() => void deleteCategory(category)} /></div>
              </li>
            ))}
          </ul>
          <form onSubmit={saveCategory} className="h-fit space-y-4 rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
            <h3 className="font-semibold text-ink-900 dark:text-ink-50">{editingCategoryId ? 'Edit category' : 'New category'}</h3>
            <AdminField label="Category name"><AdminInput required value={categoryForm.name} onChange={(event) => setCategoryForm({ ...categoryForm, name: event.target.value })} /></AdminField>
            <AdminField label="Icon name"><AdminInput required value={categoryForm.icon} onChange={(event) => setCategoryForm({ ...categoryForm, icon: event.target.value })} /></AdminField>
            <AdminField label="Sort order"><AdminInput type="number" value={categoryForm.sort_order} onChange={(event) => setCategoryForm({ ...categoryForm, sort_order: Number(event.target.value) })} /></AdminField>
            <div className="flex gap-2"><AdminSaveButton isSaving={isSavingCategory} editing={Boolean(editingCategoryId)} />{editingCategoryId && <button type="button" onClick={() => { setEditingCategoryId(null); setCategoryForm(emptyCategory); }} className="rounded-lg border border-ink-200 px-4 py-2.5 text-sm dark:border-ink-700">Cancel</button>}</div>
          </form>
        </div>
      </section>
    </div>
  );
}
