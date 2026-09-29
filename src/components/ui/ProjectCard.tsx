import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      {/* Screenshot placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-ink-100 to-ink-200 dark:from-ink-800 dark:to-ink-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-mono text-ink-400 dark:text-ink-600">
            Screenshot placeholder
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge-neutral bg-white/80 dark:bg-ink-900/80 backdrop-blur-sm">
            Live
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-1 flex items-center gap-2 text-xs font-medium text-ink-500 dark:text-ink-400">
          <span>{project.client}</span>
        </div>
        <h3 className="text-xl font-semibold text-ink-900 dark:text-ink-50 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-400 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="badge-neutral">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mt-5 flex items-center gap-4 border-t border-ink-100 dark:border-ink-800 pt-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Live Site
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-200 transition-colors"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
