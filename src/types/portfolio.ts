export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface ProjectCaseStudy {
  problem?: string;
  requirements?: string;
  solution?: string;
  role?: string;
  developmentProcess?: string;
  challenges?: string;
  testing?: string;
  deployment?: string;
  outcome?: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  liveUrl: string | null;
  githubUrl: string | null;
  description: string;
  technologies: string[];
  screenshots?: ProjectScreenshot[];
  caseStudy?: ProjectCaseStudy;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export type JourneyStatus = 'completed' | 'current' | 'future';

export interface JourneyEntry {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: JourneyStatus;
}

export interface EducationEntry {
  id: string;
  qualification: string;
  institution: string | null;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  sortOrder: number;
}

export type ForensicCaseStudyStatus = 'draft' | 'published';
export type ForensicEvidenceBasis = 'synthetic' | 'legally_permissible';

export interface ForensicTimelineEvent {
  occurredAt: string;
  description: string;
}

export interface ForensicCaseStudy {
  id: string;
  caseId: string;
  title: string;
  summary: string | null;
  objective: string;
  evidence: string;
  evidenceBasis: ForensicEvidenceBasis;
  methodology: string | null;
  tools: string[];
  timeline: ForensicTimelineEvent[];
  analysis: string | null;
  findings: string | null;
  conclusion: string | null;
  limitations: string | null;
  status: ForensicCaseStudyStatus;
  publishedAt: string | null;
}

export interface ForensicsFocusArea {
  title: string;
  description: string;
}

export interface ForensicsContent {
  heading: string;
  intro: string;
  description: string;
  focusAreas: ForensicsFocusArea[];
  futureNote: string;
}
