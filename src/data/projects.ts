import type { Project } from '@/types/portfolio';

export type { Project, ProjectCaseStudy, ProjectScreenshot } from '@/types/portfolio';

export const projects = [
  {
    id: 'anchor-and-vine',
    name: 'Anchor & Vine',
    client: 'Anchor & Vine',
    liveUrl: 'https://anchorandvine.co.za/',
    githubUrl: null,
    description: 'A live business website built for a real client.',
    technologies: [],
  },
  {
    id: 'free-state-football-institute',
    name: 'Free State Football Institute',
    client: 'Free State Football Institute (FSFI Group)',
    liveUrl: 'https://fsfigroup.vercel.app/',
    githubUrl: null,
    description: 'A live web presence for the Free State Football Institute.',
    technologies: [],
  },
  {
    id: 'zenfi-connect',
    name: 'ZenFi Connect',
    client: 'ZenFi Connect',
    liveUrl: 'https://zen-fi.vercel.app/',
    githubUrl: null,
    description: 'A live web application.',
    technologies: [],
  },
  {
    id: 'mbanjwa-associates',
    name: 'Mbanjwa & Associates',
    client: 'Mbanjwa & Associates',
    liveUrl: 'https://attorneys-seven.vercel.app/',
    githubUrl: null,
    description: 'A live website for a legal practice.',
    technologies: [],
  },
] satisfies Project[];

export function getProjectById(id: string | undefined) {
  return projects.find((project) => project.id === id);
}
