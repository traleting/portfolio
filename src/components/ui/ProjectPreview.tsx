import { Image } from 'lucide-react';
import type { ProjectScreenshot } from '@/data/projects';

interface ProjectPreviewProps {
  screenshot?: ProjectScreenshot;
  projectName: string;
  className?: string;
}

export function ProjectPreview({
  screenshot,
  projectName,
  className = '',
}: ProjectPreviewProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-ink-100 via-ink-50 to-brand-100 dark:from-ink-800 dark:via-ink-900 dark:to-brand-900 ${className}`}
    >
      {screenshot ? (
        <img
          src={screenshot.src}
          alt={screenshot.alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-400 dark:text-ink-500">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/50 shadow-sm dark:border-ink-700 dark:bg-ink-800/70">
            <Image aria-hidden="true" className="h-6 w-6" />
          </div>
          <span className="text-xs font-medium tracking-wide">
            Screenshot not available
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/10 to-transparent" />
      <span className="sr-only">{projectName} project preview</span>
    </div>
  );
}
