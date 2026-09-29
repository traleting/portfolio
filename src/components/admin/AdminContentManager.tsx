import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { ForensicCaseStudyManager } from '@/components/admin/ForensicCaseStudyManager';
import { JourneyManager } from '@/components/admin/JourneyManager';
import { ProjectManager } from '@/components/admin/ProjectManager';
import { SkillManager } from '@/components/admin/SkillManager';
import { supabase } from '@/lib/supabase';
import { appPath, routePath } from '@/lib/paths';

const sections = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'forensics', label: 'Forensics' },
] as const;

type SectionId = (typeof sections)[number]['id'];

function getActiveSection(): SectionId {
  const segment = routePath(window.location.pathname).split('/')[2];
  return sections.find((section) => section.id === segment)?.id ?? 'projects';
}

export function AdminContentManager({ session }: { session: Session }) {
  const [activeSection, setActiveSection] = useState(getActiveSection);
  const client = supabase;

  useEffect(() => {
    const syncSection = () => setActiveSection(getActiveSection());
    window.addEventListener('popstate', syncSection);
    return () => window.removeEventListener('popstate', syncSection);
  }, []);

  function navigate(section: SectionId) {
    window.history.pushState(null, '', appPath(`/admin/${section}`));
    setActiveSection(section);
  }

  if (!client) {
    return (
      <p role="alert" className="text-sm text-error-700 dark:text-error-300">
        The database client is unavailable. Configure Supabase to manage
        content.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Portfolio management
          </p>
          <h1 className="mt-2 text-3xl font-bold text-ink-900 dark:text-ink-50">
            Admin dashboard
          </h1>
        </div>
        <p className="text-sm text-ink-500 dark:text-ink-400">
          Signed in as {session.user.email}
        </p>
      </div>

      <nav
        aria-label="Admin content"
        className="mb-8 flex flex-wrap gap-2 border-b border-ink-200 pb-4 dark:border-ink-800"
      >
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            aria-current={activeSection === section.id ? 'page' : undefined}
            onClick={() => navigate(section.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-brand-600 text-white'
                : 'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-900'
            }`}
          >
            {section.label}
          </button>
        ))}
      </nav>

      {activeSection === 'projects' && <ProjectManager client={client} />}
      {activeSection === 'skills' && <SkillManager client={client} />}
      {activeSection === 'journey' && <JourneyManager client={client} />}
      {activeSection === 'forensics' && (
        <ForensicCaseStudyManager client={client} />
      )}
    </div>
  );
}
