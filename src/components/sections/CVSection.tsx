import { Download } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cvContent } from '@/data/content';
import { educationEntries } from '@/data/education';

const sections = [
  {
    title: 'Education',
    items: educationEntries.map((entry) => ({
      title: entry.qualification,
      org: entry.institution ?? entry.location ?? '',
      period: [entry.startDate, entry.endDate].filter(Boolean).join(' – '),
      description: entry.description ?? '',
    })),
  },
  ...cvContent.sections,
];

export function CVSection() {
  return (
    <Section id="cv" className="bg-ink-100/50 dark:bg-ink-900/30">
      <SectionHeading
        eyebrow="CV"
        title={cvContent.heading}
        description={cvContent.intro}
      />

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50 mb-4 pb-2 border-b border-ink-200 dark:border-ink-800">
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.items.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <div className="sm:w-1/3 flex-shrink-0">
                    <p className="text-sm font-semibold text-ink-800 dark:text-ink-200">
                      {item.title}
                    </p>
                    {item.org && (
                      <p className="text-xs text-ink-500 dark:text-ink-400">{item.org}</p>
                    )}
                    {item.period && (
                      <p className="text-xs text-ink-400 dark:text-ink-500 font-mono">{item.period}</p>
                    )}
                  </div>
                  <div className="sm:w-2/3">
                    <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Download note */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 p-6">
        <p className="text-sm text-ink-600 dark:text-ink-400">
          {cvContent.downloadNote}
        </p>
        <button
          disabled
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-ink-200 dark:border-ink-700 text-ink-400 dark:text-ink-500 text-sm font-medium cursor-not-allowed"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </button>
      </div>
    </Section>
  );
}
