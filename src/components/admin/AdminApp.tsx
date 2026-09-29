import { useEffect, useState } from 'react';
import { ArrowLeft, LockKeyhole, LogOut } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { ThemeToggle } from '@/components/Layout/ThemeToggle';
import { AdminContentManager } from '@/components/admin/AdminContentManager';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { appPath } from '@/lib/paths';

type AdminState =
  | { status: 'loading' }
  | { status: 'signedOut' }
  | { status: 'notAdmin' }
  | { status: 'admin'; session: Session };

export function AdminApp() {
  const [authState, setAuthState] = useState<AdminState>({ status: 'loading' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setAuthState({ status: 'signedOut' });
      return;
    }

    const applySession = (session: Session | null) => {
      if (!session) {
        setAuthState({ status: 'signedOut' });
      } else if (session.user.app_metadata.role === 'admin') {
        setAuthState({ status: 'admin', session });
      } else {
        setAuthState({ status: 'notAdmin' });
      }
    };

    void supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (sessionError) {
        setError(sessionError.message);
        setAuthState({ status: 'signedOut' });
        return;
      }
      applySession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setError('');
    setIsSubmitting(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    if (data.user.app_metadata.role !== 'admin') {
      await supabase.auth.signOut();
      setError('This account is not authorized to manage portfolio content.');
    }
  }

  async function signOut() {
    if (!supabase) return;
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError(signOutError.message);
  }

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-100">
      <header className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-950">
        <div className="container-content flex min-h-16 items-center justify-between gap-4 py-3">
          <a
            href={appPath('/')}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-400"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Portfolio
          </a>
          <div className="flex items-center gap-3">
            {authState.status === 'admin' && (
              <button
                type="button"
                onClick={() => void signOut()}
                className="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-900"
              >
                <LogOut aria-hidden="true" className="h-4 w-4" />
                Sign out
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container-content max-w-5xl py-10 md:py-14">
        {authState.status === 'loading' ? (
          <p role="status" className="text-sm text-ink-500 dark:text-ink-400">
            Checking administrator access…
          </p>
        ) : authState.status === 'admin' ? (
          <AdminContentManager session={authState.session} />
        ) : (
          <section className="mx-auto max-w-md rounded-2xl border border-ink-200 bg-white p-7 shadow-sm dark:border-ink-800 dark:bg-ink-900 sm:p-9">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
              <LockKeyhole aria-hidden="true" className="h-6 w-6" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Restricted area
            </p>
            <h1 className="mt-2 text-2xl font-bold text-ink-900 dark:text-ink-50">
              Portfolio admin
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
              Sign in with an administrator account to manage portfolio
              content.
            </p>

            {authState.status === 'notAdmin' && (
              <p
                role="alert"
                className="mt-5 rounded-lg border border-error-200 bg-error-50 p-3 text-sm text-error-700 dark:border-error-900 dark:bg-error-900/20 dark:text-error-300"
              >
                This account does not have administrator access. Contact the
                site administrator if you need access.
              </p>
            )}
            {!isSupabaseConfigured && (
              <p
                role="alert"
                className="mt-5 rounded-lg border border-warning-200 bg-warning-50 p-3 text-sm text-warning-800 dark:border-warning-900 dark:bg-warning-900/20 dark:text-warning-300"
              >
                Admin authentication is not configured. Set
                VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the deployment
                environment.
              </p>
            )}
            {error && (
              <p
                role="alert"
                className="mt-5 rounded-lg border border-error-200 bg-error-50 p-3 text-sm text-error-700 dark:border-error-900 dark:bg-error-900/20 dark:text-error-300"
              >
                {error}
              </p>
            )}

            <form onSubmit={signIn} className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-ink-700 dark:text-ink-200">
                Email
                <input
                  required
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={!isSupabaseConfigured || isSubmitting}
                  className="mt-1.5 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-100"
                />
              </label>
              <label className="block text-sm font-medium text-ink-700 dark:text-ink-200">
                Password
                <input
                  required
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={!isSupabaseConfigured || isSubmitting}
                  className="mt-1.5 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-100"
                />
              </label>
              <button
                type="submit"
                disabled={!isSupabaseConfigured || isSubmitting}
                className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
