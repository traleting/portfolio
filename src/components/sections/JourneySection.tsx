import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { timeline } from '@/data/timeline';

export function JourneySection() {
  return (
    <Section id="journey" className="bg-ink-100/50 dark:bg-ink-900/30">
      <SectionHeading
        eyebrow="IT Journey"
        title="My IT Journey"
        description="The path from IT Management education through web development and client projects, toward cybersecurity and digital forensics."
      />
      <div className="max-w-3xl">
        {timeline.map((entry, i) => (
          <TimelineItem
            key={entry.id}
            entry={entry}
            isLast={i === timeline.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
