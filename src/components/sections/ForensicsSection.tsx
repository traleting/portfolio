import { Shield, Fingerprint, FileSearch, BrainCircuit } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { forensicsContent } from '@/data/content';

const focusIcons = [FileSearch, Shield, BrainCircuit, Fingerprint];

export function ForensicsSection() {
  return (
    <Section id="forensics">
      <SectionHeading
        eyebrow="Developing"
        title={forensicsContent.heading}
        description={forensicsContent.intro}
      />

      {/* Honesty disclaimer */}
      <div className="mb-10 rounded-lg border border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-900/50 p-5">
        <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
          {forensicsContent.description}
        </p>
      </div>

      {/* Focus areas */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {forensicsContent.focusAreas.map((area, i) => {
          const Icon = focusIcons[i] ?? Shield;
          return (
            <div key={area.title} className="card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50 mb-2">
                {area.title}
              </h3>
              <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                {area.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Future placeholder */}
      <div className="mt-10 rounded-xl border border-dashed border-ink-300 dark:border-ink-700 p-8 text-center">
        <div className="flex items-center justify-center gap-2 text-ink-500 dark:text-ink-400">
          <Fingerprint className="h-5 w-5" />
          <span className="text-sm font-medium">{forensicsContent.futureNote}</span>
        </div>
      </div>
    </Section>
  );
}
