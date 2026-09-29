export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Web Development',
    icon: 'Globe',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Design'],
  },
  {
    name: 'Programming',
    icon: 'Code2',
    skills: ['JavaScript', 'TypeScript', 'Python (learning)'],
  },
  {
    name: 'Databases',
    icon: 'Database',
    skills: ['SQL', 'PostgreSQL', 'Database Design', 'Supabase'],
  },
  {
    name: 'Business Systems',
    icon: 'Briefcase',
    skills: ['Systems Analysis', 'Business Process', 'IT Management'],
  },
  {
    name: 'Version Control',
    icon: 'GitBranch',
    skills: ['Git', 'GitHub'],
  },
  {
    name: 'Deployment',
    icon: 'Rocket',
    skills: ['Vercel', 'Netlify', 'CI/CD (learning)'],
  },
  {
    name: 'Cybersecurity',
    icon: 'Shield',
    skills: ['Security Fundamentals', 'Threat Awareness (developing)'],
  },
  {
    name: 'Digital Forensics',
    icon: 'Fingerprint',
    skills: ['Forensic Methodology (developing)', 'Evidence Handling (learning)'],
  },
];
