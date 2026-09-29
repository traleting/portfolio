import { useEffect, useState } from 'react';
import {
  BrainCircuit,
  FileSearch,
  Fingerprint,
  Shield,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { forensicCaseStudies, forensicsContent } from '@/data/forensics';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type {
  ForensicCaseStudy,
  ForensicTimelineEvent,
} from '@/types/portfolio';
import type { Json, TableRow } from '@/types/database';

const focusIcons = [FileSearch, Shield, BrainCircuit, Fingerprint];

function parseTimeline(value: Json): ForensicTimelineEvent[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((event) => {
    if (
      typeof event === 'object' &&
      event !== null &&
      'occurredAt' in event &&
      'description' in event &&
      typeof event.occurredAt === 'string' &&
      typeof event.description === 'string'
    ) {
      return [{ occurredAt: event.occurredAt, description: event.description }];
    }
    return [];
  });
}

function toCaseStudy(
  row: TableRow<'forensic_case_studies'>,
): ForensicCaseStudy | null {
  if (!row.evidence_basis) return null;
  return {
    id: row.id,
    caseId: row.case_id,
    title: row.title,
    summary: row.summary,
    objective: row.objective,
    evidence: row.evidence,
    evidenceBasis: row.evidence_basis,
    methodology: row.methodology,
    tools: row.tools,
    timeline: parseTimeline(row.timeline),
    analysis: row.analysis,
    findings: row.findings,
    conclusion: row.conclusion,
    limitations: row.limitations,
    status: row.status,
    publishedAt: row.published_at,
  };
}

const caseStudyFields = [
  ['Objective', 'objective'],
  ['Evidence', 'evidence'],
  ['Methodology', 'methodology'],
  ['Analysis', 'analysis'],
  ['Findings', 'findings'],
  ['Conclusion', 'conclusion'],
  ['Limitations', 'limitations'],
] as const;

export function ForensicsSection() {
  const [caseStudies, setCaseStudies] = useState(forensicCaseStudies);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!supabase) return;
    let isCurrent = true;

    void supabase
      .from('forensic_case_studies')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .then(({ data, error }) => {
        if (!isCurrent) return;
        setIsLoading(false);
        if (error) {
          setLoadError('Published case studies could not be loaded.');
          return;
        }
        setCaseStudies(
          data.flatMap((row) => {
            const caseStudy = toCaseStudy(row);
            return caseStudy ? [caseStudy] : [];
          }),
        );
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <Section id="forensics" className="bg-ink-100/50 dark:bg-ink-900/30">
      <SectionHeading
        eyebrow="Learning laboratory"
        title="Digital Forensics Laboratory"
        description="A structured space for documenting learning exercises in digital forensics, with clear methods, evidence context, and limitations."
      />

      <div className="mb-10 rounded-xl border border-brand-200 bg-brand-50/70 p-5 dark:border-brand-900 dark:bg-brand-900/20 sm:p-6">
        <div className="flex items-start gap-3">
          <Fingerprint
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400"
          />
          <div>
            <h3 className="font-semibold text-ink-900 dark:text-ink-50">
              A learning and portfolio environment
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              This section documents learning and practice only. It does not
              represent law-enforcement work, professional investigative
              authority, or real-world casework. Any future examples will use
              synthetic evidence or material legally permitted for analysis
              and publication.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {forensicsContent.focusAreas.map((area, index) => {
          const Icon = focusIcons[index] ?? Shield;
          return (
            <article key={area.title} className="card p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                {area.description}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Case notes
          </p>
          <h3 className="mt-2 text-2xl font-bold text-ink-900 dark:text-ink-50">
            Laboratory case studies
          </h3>
        </div>
        <p className="text-sm text-ink-500 dark:text-ink-400">
          Learning exercises, not real-world investigations
        </p>
      </div>

      {loadError && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-error-200 bg-error-50 p-4 text-sm text-error-700 dark:border-error-900 dark:bg-error-900/20 dark:text-error-300"
        >
          {loadError}
        </p>
      )}

      {isLoading ? (
        <p role="status" className="text-sm text-ink-500 dark:text-ink-400">
          Loading published learning case studies…
        </p>
      ) : caseStudies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-300 bg-white/60 p-6 dark:border-ink-700 dark:bg-ink-900/40 sm:p-8">
          <h4 className="font-semibold text-ink-900 dark:text-ink-50">
            No case studies published yet
          </h4>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 dark:text-ink-400">
            Case notes will be added after a learning exercise has been
            completed and documented. No investigations or findings are
            implied by this empty template.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {caseStudies.map((caseStudy) => (
            <article
              key={caseStudy.id}
              className="overflow-hidden rounded-xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
            >
              <div className="border-b border-ink-200 p-5 dark:border-ink-800 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge-neutral font-mono">
                    Case ID: {caseStudy.caseId}
                  </span>
                  <span className="badge-brand">
                    {caseStudy.evidenceBasis === 'synthetic'
                      ? 'Synthetic evidence'
                      : 'Legally permissible evidence'}
                  </span>
                </div>
                <h4 className="mt-4 text-xl font-semibold text-ink-900 dark:text-ink-50">
                  {caseStudy.title}
                </h4>
                {caseStudy.summary && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                    {caseStudy.summary}
                  </p>
                )}
              </div>
              <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
                {caseStudyFields.map(([label, key]) => {
                  const value = caseStudy[key];
                  if (!value) return null;
                  return (
                    <section key={key}>
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                        {label}
                      </h5>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                        {value}
                      </p>
                    </section>
                  );
                })}
                {caseStudy.tools.length > 0 && (
                  <section>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                      Tools
                    </h5>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {caseStudy.tools.map((tool) => (
                        <li key={tool} className="badge-neutral">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {caseStudy.timeline.length > 0 && (
                  <section>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                      Timeline
                    </h5>
                    <ol className="mt-3 space-y-3 border-l border-ink-200 pl-4 dark:border-ink-700">
                      {caseStudy.timeline.map((event, index) => (
                        <li key={`${event.occurredAt}-${index}`}>
                          {event.occurredAt && (
                            <p className="font-mono text-xs text-brand-600 dark:text-brand-400">
                              {event.occurredAt}
                            </p>
                          )}
                          <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                            {event.description}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
