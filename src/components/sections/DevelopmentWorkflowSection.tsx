import { ArrowDown } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const workflowSteps = [
  'Client Requirements',
  'Business/User Analysis',
  'Initial Development/Prototyping',
  'VS Code Development',
  'Client-Specific Customisation',
  'Testing & Refinement',
  'GitHub Version Control',
  'Vercel Deployment',
  'Client Review',
];

export function DevelopmentWorkflowSection() {
  return (
    <Section id="workflow" className="bg-ink-100/50 dark:bg-ink-900/30">
      <SectionHeading
        eyebrow="How I work"
        title="My Development Workflow"
        description="A practical process for understanding a client's needs, building and refining a tailored solution, and delivering it for review."
      />

      <ol className="mx-auto max-w-3xl">
        {workflowSteps.map((step, index) => (
          <li key={step} className="flex flex-col items-stretch">
            <div className="card flex items-center gap-4 p-4 sm:gap-5 sm:p-5">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 font-mono text-sm font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-base font-semibold leading-snug text-ink-900 dark:text-ink-50 sm:text-lg">
                {step}
              </h3>
            </div>
            {index < workflowSteps.length - 1 && (
              <div
                aria-hidden="true"
                className="flex h-9 items-center pl-4 sm:pl-5"
              >
                <span className="h-full w-px bg-ink-300 dark:bg-ink-700" />
                <ArrowDown className="-ml-[9px] h-4 w-4 self-end text-brand-500" />
              </div>
            )}
          </li>
        ))}
      </ol>

      <aside className="mx-auto mt-10 max-w-3xl rounded-xl border border-brand-200 bg-brand-50/70 p-5 dark:border-brand-900 dark:bg-brand-900/20 sm:p-6">
        <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">
          AI-assisted tools and my role
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          AI-assisted tools may be used during initial development or
          prototyping. My role includes analysing requirements, modifying the
          code, tailoring the solution to the client, debugging, testing,
          managing version control with GitHub, and handling deployment.
        </p>
      </aside>
    </Section>
  );
}
