export interface Project {
  id: string;
  name: string;
  client: string;
  liveUrl: string;
  githubUrl: string | null;
  description: string;
  technologies: string[];
  // Fields to be populated later — intentionally left empty for now
  problem?: string;
  requirements?: string;
  solution?: string;
  role?: string;
  developmentProcess?: string;
  challenges?: string;
  testing?: string;
  deployment?: string;
  outcome?: string;
  screenshots?: string[];
}

export const projects: Project[] = [
  {
    id: 'anchor-and-vine',
    name: 'Anchor & Vine',
    client: 'Anchor & Vine',
    liveUrl: 'https://anchorandvine.co.za/',
    githubUrl: null,
    description:
      'A live business website built for a real client. Details to be added as the project documentation is completed.',
    technologies: [],
  },
  {
    id: 'free-state-football-institute',
    name: 'Free State Football Institute',
    client: 'Free State Football Institute (FSFI Group)',
    liveUrl: 'https://fsfigroup.vercel.app/',
    githubUrl: null,
    description:
      'A live web presence for the Free State Football Institute. Details to be added as the project documentation is completed.',
    technologies: [],
  },
  {
    id: 'zenfi-connect',
    name: 'ZenFi Connect',
    client: 'ZenFi Connect',
    liveUrl: 'https://zen-fi.vercel.app/',
    githubUrl: null,
    description:
      'A live web application. Details to be added as the project documentation is completed.',
    technologies: [],
  },
  {
    id: 'mbanjwa-associates',
    name: 'Mbanjwa & Associates',
    client: 'Mbanjwa & Associates',
    liveUrl: 'https://attorneys-seven.vercel.app/',
    githubUrl: null,
    description:
      'A live website for a legal practice. Details to be added as the project documentation is completed.',
    technologies: [],
  },
];
