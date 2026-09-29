import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { profile } from '@/data/profile';

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title={profile.about.heading}
      />
      <div className="grid gap-10 lg:grid-cols-3">
        {/* Bio paragraphs */}
        <div className="lg:col-span-2 space-y-4">
          {profile.about.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-base text-ink-600 dark:text-ink-400 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Focus areas */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400 mb-4">
              Focus Areas
            </h3>
            <ul className="space-y-3">
              {profile.about.focusAreas.map((area) => (
                <li key={area} className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
