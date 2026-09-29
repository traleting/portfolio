import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/data/projects';
import { ProjectPreview } from '@/components/ui/ProjectPreview';
import { appPath } from '@/lib/paths';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <a
        href={appPath(`/projects/${project.id}`)}
        aria-label={`View ${project.name} case study`}
        className="relative block h-52 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
      >
        <ProjectPreview
          screenshot={project.screenshots?.[0]}
          projectName={project.name}
          className="h-full"
        />
        {project.liveUrl && (
          <span className="absolute right-4 top-4 rounded-full border border-white/60 bg-white/85 px-3 py-1 text-xs font-medium text-ink-700 shadow-sm backdrop-blur dark:border-ink-700 dark:bg-ink-900/85 dark:text-ink-200">
            Live project
          </span>
        )}
      </a>
      <div className="flex flex-col flex-1 p-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
          <span>{project.client}</span>
        </p>
        <h3 className="text-xl font-semibold text-ink-900 transition-colors duration-200 group-hover:text-brand-600 dark:text-ink-50 dark:group-hover:text-brand-400">
          <a
            href={appPath(`/projects/${project.id}`)}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {project.name}
          </a>
        </h3>
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-400 leading-relaxed flex-1">
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="badge-neutral">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink-100 pt-4 dark:border-ink-800">
          <a
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-800 transition-colors hover:text-brand-600 dark:text-ink-100 dark:hover:text-brand-400"
          >
            Case study
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-200"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
