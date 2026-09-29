import type { ReactNode } from 'react';

interface AdminFieldProps {
  label: string;
  children: ReactNode;
}

const controlClassName =
  'mt-1.5 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-100';

export function AdminField({ label, children }: AdminFieldProps) {
  return (
    <label className="block text-sm font-medium text-ink-700 dark:text-ink-200">
      {label}
      {children}
    </label>
  );
}

export function AdminInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} className={`${controlClassName} ${props.className ?? ''}`} />;
}

export function AdminTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={`${controlClassName} min-h-24 resize-y ${props.className ?? ''}`}
    />
  );
}

export function AdminError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-lg border border-error-200 bg-error-50 p-3 text-sm text-error-700 dark:border-error-900 dark:bg-error-900/20 dark:text-error-300"
    >
      {message}
    </p>
  );
}

export function AdminSaveButton({
  isSaving,
  editing,
}: {
  isSaving: boolean;
  editing: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isSaving}
      className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-wait disabled:opacity-60"
    >
      {isSaving ? 'Saving…' : editing ? 'Save changes' : 'Create'}
    </button>
  );
}

export function AdminDeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-error-200 px-3 py-2 text-sm font-medium text-error-700 transition-colors hover:bg-error-50 dark:border-error-900 dark:text-error-300 dark:hover:bg-error-900/20"
    >
      Delete
    </button>
  );
}
