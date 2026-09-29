import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useEffect } from 'react';
import { ThemeToggle } from '@/components/Layout/ThemeToggle';
import { ProjectPreview } from '@/components/ui/ProjectPreview';
import type { Project } from '@/data/projects';
import { appPath } from '@/lib/paths';

interface ProjectDetailPageProps {
  project: Project;
}

const caseStudySections = [
  ['problem', 'Problem'],
  ['requirements', 'Requirements'],
  ['solution', 'Solution'],
  ['role', 'Role'],
  ['developmentProcess', 'Development process'],
  ['challenges', 'Challenges'],
  ['testing', 'Testing'],
  ['deployment', 'Deployment'],
  ['outcome', 'Outcome'],
] as const;

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${project.name} | Projects - Thabo Raleting`;
    return () => {
      document.title = previousTitle;
    };
  }, [project.name]);

  const documentedSections = caseStudySections.filter(
    ([key]) => project.caseStudy?.[key],
  );

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      <header className="border-b border-ink-200 bg-white/80 backdrop-blur dark:border-ink-800 dark:bg-ink-950/80">
        <div className="container-content flex h-16 items-center justify-between">
          <a
            href={`${appPath('/')}#projects`}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-400"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All projects
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main className="container-content max-w-5xl py-12 md:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
            Project case study
          </p>
          <p className="mb-2 text-sm font-medium text-ink-500 dark:text-ink-400">
            {project.client}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-ink-950 dark:text-white md:text-5xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {project.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink-950"
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
                Visit live site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-ink-300 hover:bg-white dark:border-ink-700 dark:text-ink-200 dark:hover:border-ink-600 dark:hover:bg-ink-900"
              >
                <Github aria-hidden="true" className="h-4 w-4" />
                View source
              </a>
            )}
          </div>
        </div>

        <ProjectPreview
          screenshot={project.screenshots?.[0]}
          projectName={project.name}
          className="group aspect-[16/9] rounded-2xl border border-ink-200 shadow-lg shadow-ink-900/5 dark:border-ink-800"
        />
        {(project.screenshots?.length ?? 0) > 1 && (
          <ul
            aria-label={`${project.name} additional screenshots`}
            className="mt-4 grid gap-4 sm:grid-cols-2"
          >
            {project.screenshots?.slice(1).map((screenshot) => (
              <li
                key={screenshot.src}
                className="group aspect-[16/10] overflow-hidden rounded-xl border border-ink-200 dark:border-ink-800"
              >
                <ProjectPreview
                  screenshot={screenshot}
                  projectName={project.name}
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-10">
            <section aria-labelledby="project-overview-heading">
              <h2
                id="project-overview-heading"
                className="text-xl font-semibold text-ink-900 dark:text-ink-50"
              >
                Overview
              </h2>
              <p className="mt-3 leading-relaxed text-ink-600 dark:text-ink-300">
                {project.description}
              </p>
            </section>

            {documentedSections.length > 0 ? (
              documentedSections.map(([key, title]) => (
                <section key={key} aria-labelledby={`case-study-${key}`}>
                  <h2
                    id={`case-study-${key}`}
                    className="text-xl font-semibold text-ink-900 dark:text-ink-50"
                  >
                    {title}
                  </h2>
                  <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-600 dark:text-ink-300">
                    {project.caseStudy?.[key]}
                  </p>
                </section>
              ))
            ) : (
              <section
                aria-labelledby="case-study-heading"
                className="rounded-xl border border-dashed border-ink-300 bg-white/60 p-6 dark:border-ink-700 dark:bg-ink-900/40"
              >
                <h2
                  id="case-study-heading"
                  className="text-lg font-semibold text-ink-900 dark:text-ink-50"
                >
                  Case study details
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                  Additional project details have not been provided yet.
                </p>
              </section>
            )}
          </div>

          <aside className="h-fit rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
            <h2 className="text-sm font-semibold text-ink-900 dark:text-ink-50">
              Project details
            </h2>
            <dl className="mt-4 space-y-5">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  Client
                </dt>
                <dd className="mt-1 text-sm text-ink-800 dark:text-ink-200">
                  {project.client}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  Technologies
                </dt>
                {project.technologies.length > 0 ? (
                  <dd>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <li key={technology} className="badge-neutral">
                          {technology}
                        </li>
                      ))}
                    </ul>
                  </dd>
                ) : (
                  <dd className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                    Not provided
                  </dd>
                )}
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  Source code
                </dt>
                <dd className="mt-1 text-sm text-ink-800 dark:text-ink-200">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      GitHub repository
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </main>
    </div>
  );
}
