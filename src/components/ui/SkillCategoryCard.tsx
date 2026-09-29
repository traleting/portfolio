import {
  Globe,
  Code2,
  Database,
  Briefcase,
  GitBranch,
  Rocket,
  Shield,
  Fingerprint,
  type LucideIcon,
} from 'lucide-react';
import type { SkillCategory as SkillCategoryType } from '@/data/skills';

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Code2,
  Database,
  Briefcase,
  GitBranch,
  Rocket,
  Shield,
  Fingerprint,
};

interface SkillCategoryProps {
  category: SkillCategoryType;
}

export function SkillCategoryCard({ category }: SkillCategoryProps) {
  const Icon = iconMap[category.icon] ?? Globe;
  return (
    <div className="card card-hover p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">
          {category.name}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span key={skill} className="badge-neutral">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
