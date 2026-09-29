import { type ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  const { ref, isVisible } = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`section-padding ${className}`}
    >
      <div className={`container-content reveal ${isVisible ? 'is-visible' : ''}`}>
        {children}
      </div>
    </section>
  );
}
