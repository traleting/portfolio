import type {
  ForensicCaseStudy,
  ForensicsContent,
} from '@/types/portfolio';

export const forensicCaseStudies: ForensicCaseStudy[] = [];

export const forensicsContent = {
  heading: 'Digital Forensics Laboratory',
  intro:
    'A structured learning portfolio for practising evidence handling, forensic methodology, system analysis and investigative thinking using synthetic or legally permissible material.',
  description:
    'This is a learning environment, not a representation of professional investigative authority or real-world casework. Any published exercises use synthetic evidence or evidence that is legally permitted for analysis and publication.',
  focusAreas: [
    {
      title: 'Forensic Methodology',
      description:
        'Understanding the structured process behind digital investigations — from identification and preservation to analysis and reporting.',
    },
    {
      title: 'Evidence Handling',
      description:
        'Learning the principles of evidence integrity, chain of custody, and the care required when handling digital evidence.',
    },
    {
      title: 'System Analysis',
      description:
        'Developing the ability to read and analyse systems — logs, file systems, memory, and network activity — to understand what happened and why.',
    },
    {
      title: 'Investigative Thinking',
      description:
        'Building the analytical mindset needed to investigate incidents methodically, ask the right questions, and follow evidence rather than assumptions.',
    },
  ],
  futureNote:
    'Future forensic laboratory projects and case studies will be added here as I complete them.',
} satisfies ForensicsContent;
