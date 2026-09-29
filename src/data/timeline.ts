import type { JourneyEntry } from '@/types/portfolio';

export type { JourneyEntry as TimelineEntry } from '@/types/portfolio';

export const timeline = [
  {
    id: 'education',
    phase: 'Foundation',
    title: 'IT Management Education',
    description:
      'Formal study in IT Management — covering systems analysis, business processes, databases, and technology fundamentals.',
    status: 'completed',
  },
  {
    id: 'web-development',
    phase: 'Build',
    title: 'Web Development',
    description:
      'Developing practical front-end and full-stack web development skills through real client projects.',
    status: 'completed',
  },
  {
    id: 'client-projects',
    phase: 'Apply',
    title: 'Client Projects',
    description:
      'Building and deploying live websites for real businesses — translating requirements into working solutions.',
    status: 'completed',
  },
  {
    id: 'business-systems',
    phase: 'Structure',
    title: 'Business Systems & Databases',
    description:
      'Working with database design, business systems, and the structured thinking behind maintainable software.',
    status: 'completed',
  },
  {
    id: 'software-development',
    phase: 'Deepen',
    title: 'Software Development',
    description:
      'Continuing to deepen software development practice — architecture, version control, deployment, and problem-solving.',
    status: 'current',
  },
  {
    id: 'cybersecurity',
    phase: 'Secure',
    title: 'Cybersecurity',
    description:
      'Developing practical knowledge in cybersecurity — security fundamentals, threat awareness, and secure development.',
    status: 'current',
  },
  {
    id: 'digital-forensics',
    phase: 'Investigate',
    title: 'Digital Forensics / DFIR',
    description:
      'Building toward digital forensics and DFIR — evidence handling, forensic methodology, system analysis, and investigative thinking.',
    status: 'future',
  },
] satisfies JourneyEntry[];
