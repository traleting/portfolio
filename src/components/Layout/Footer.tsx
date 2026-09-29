import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile } from '@/data/profile';
import { navLinks } from '@/data/navigation';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-950">
      <div className="container-content py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-semibold text-ink-900 dark:text-ink-50 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm font-bold">
                TR
              </span>
              <span className="text-sm">Thabo Raleting</span>
            </div>
            <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed max-w-xs">
              IT Management Graduate building practical solutions across web development, business systems, and technology.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-3">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-ink-600 dark:text-ink-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-3">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
              <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-ink-200 dark:border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-ink-500 dark:text-ink-400">
            &copy; {year} Thabo Raleting. All rights reserved.
          </p>
          <p className="text-xs text-ink-400 dark:text-ink-500 font-mono">
            Built with React, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
