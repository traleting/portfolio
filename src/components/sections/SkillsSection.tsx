import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillCategoryCard } from '@/components/ui/SkillCategoryCard';
import { skillCategories } from '@/data/skills';

export function SkillsSection() {
  return (
    <Section id="skills" className="bg-ink-100/50 dark:bg-ink-900/30">
      <SectionHeading
        eyebrow="Technical Skills"
        title="Technical Skills"
        description="A practical overview of the technologies and areas I work with. No proficiency percentages — these reflect what I use and what I am actively developing."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category) => (
          <SkillCategoryCard key={category.name} category={category} />
        ))}
      </div>
    </Section>
  );
}
