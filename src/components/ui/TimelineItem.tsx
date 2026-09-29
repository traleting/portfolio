import type { TimelineEntry } from '@/data/timeline';

interface TimelineItemProps {
  entry: TimelineEntry;
  isLast: boolean;
}

const statusConfig = {
  completed: {
    dot: 'bg-accent-500 dark:bg-accent-400',
    ring: 'ring-accent-200 dark:ring-accent-800',
    label: 'Completed',
    labelClass:
      'text-accent-700 dark:text-accent-300 bg-accent-50 dark:bg-accent-900/30 border-accent-200 dark:border-accent-800',
    line: 'bg-accent-300 dark:bg-accent-700',
    phase: 'text-accent-600 dark:text-accent-400',
  },
  current: {
    dot: 'bg-brand-500 dark:bg-brand-400',
    ring: 'ring-brand-200 dark:ring-brand-800',
    label: 'Current',
    labelClass:
      'text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 border-brand-200 dark:border-brand-800',
    line: 'bg-brand-300 dark:bg-brand-700',
    phase: 'text-brand-600 dark:text-brand-400',
  },
  future: {
    dot: 'bg-ink-400 dark:bg-ink-600',
    ring: 'ring-ink-200 dark:ring-ink-700',
    label: 'Future',
    labelClass:
      'text-ink-600 dark:text-ink-400 bg-ink-100 dark:bg-ink-800 border-ink-200 dark:border-ink-700',
    line: 'bg-ink-200 dark:bg-ink-700',
    phase: 'text-ink-500 dark:text-ink-400',
  },
};

export function TimelineItem({ entry, isLast }: TimelineItemProps) {
  const config = statusConfig[entry.status];

  return (
    <div className="relative flex gap-6 pb-12 last:pb-0">
      {!isLast && (
        <div className={`absolute left-[19px] top-10 bottom-0 w-0.5 ${config.line}`} />
      )}

      <div className="relative z-10 flex-shrink-0">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ring-4 ${config.ring} bg-white dark:bg-ink-900`}
        >
          <div className={`h-3 w-3 rounded-full ${config.dot}`} />
        </div>
      </div>

      <div className="flex-1 pt-1">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <span className={`text-xs font-semibold uppercase tracking-widest ${config.phase}`}>
            {entry.phase}
          </span>
          <span className={`badge ${config.labelClass}`}>{config.label}</span>
        </div>
        <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">
          {entry.title}
        </h3>
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-400 leading-relaxed max-w-xl">
          {entry.description}
        </p>
      </div>
    </div>
  );
}
