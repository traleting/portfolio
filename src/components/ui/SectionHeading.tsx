interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'}`}>
      {eyebrow && (
        <div
          className={`mb-3 flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <span className="h-px w-8 bg-brand-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-ink-900 dark:text-ink-50">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-ink-600 dark:text-ink-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
