import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Real-World Projects"
        description="Live websites and applications built for real clients. Each project card will be expanded with full technical documentation as the portfolio develops."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <p className="mt-8 text-sm text-ink-500 dark:text-ink-400 text-center">
        Detailed project documentation — including problem, requirements, solution, role, technologies, process, challenges, testing, deployment, and outcome — will be added as each project is documented.
      </p>
    </Section>
  );
}
