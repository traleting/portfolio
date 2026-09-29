import { ArrowRight, FileText, Github, Linkedin } from 'lucide-react';
import { profile } from '@/data/profile';

export function HomeSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-50 dark:to-ink-950" />

      <div className="container-content relative z-10 w-full py-20">
        <div className="max-w-3xl">
          {/* Status badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/30 animate-fade-in-down">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            <span className="text-xs font-medium text-brand-700 dark:text-brand-300">
              Available for opportunities
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-900 dark:text-ink-50 leading-[1.1] animate-fade-in-up">
            Thabo Raleting
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-lg sm:text-xl text-ink-600 dark:text-ink-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            {profile.home.intro}
          </p>

          {/* Technical focus */}
          <p className="mt-4 text-base text-ink-500 dark:text-ink-400 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            {profile.home.technicalFocus}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm"
            >
              {profile.home.ctas.viewProjects}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#cv"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-ink-300 dark:border-ink-700 text-ink-700 dark:text-ink-200 text-sm font-medium hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <FileText className="h-4 w-4" />
              {profile.home.ctas.viewCV}
            </a>
          </div>

          {/* Social links */}
          <div className="mt-6 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="flex flex-col items-center gap-2 text-ink-400 dark:text-ink-600">
          <span className="text-xs font-mono">Scroll</span>
          <div className="h-8 w-px bg-ink-300 dark:bg-ink-700 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
