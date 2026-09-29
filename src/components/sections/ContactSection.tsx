import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { contactContent } from '@/data/content';

export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title={contactContent.heading}
        description={contactContent.intro}
        align="center"
      />

      <div className="max-w-2xl mx-auto">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Email card */}
          <a
            href={`mailto:${contactContent.email}`}
            className="card card-hover p-6 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                <Mail className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-ink-400 dark:text-ink-600 group-hover:text-brand-500 transition-colors ml-auto" />
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-1">
              Email
            </p>
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-50 break-all">
              {contactContent.email}
            </p>
          </a>

          {/* Location card */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-1">
              Location
            </p>
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">
              South Africa
            </p>
          </div>

          {/* GitHub card */}
          <a
            href={contactContent.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-hover p-6 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300">
                <Github className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-ink-400 dark:text-ink-600 group-hover:text-brand-500 transition-colors ml-auto" />
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-1">
              GitHub
            </p>
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">
              @thabo-raleting
            </p>
          </a>

          {/* LinkedIn card */}
          <a
            href={contactContent.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-hover p-6 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                <Linkedin className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-ink-400 dark:text-ink-600 group-hover:text-brand-500 transition-colors ml-auto" />
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-1">
              LinkedIn
            </p>
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">
              Thabo Raleting
            </p>
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
          {contactContent.note}
        </p>
      </div>
    </Section>
  );
}
