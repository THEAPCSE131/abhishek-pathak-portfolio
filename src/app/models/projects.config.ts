export interface ProjectTechnology {
  name: string;
  icon: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string | null;
  imageAlt: string;
  technologies: ProjectTechnology[];
  featured: boolean;
  liveDemoUrl: string | null;
  githubUrl: string | null;
}

// Add the actual local screenshot path and verified project URLs when supplied.
export const projects: PortfolioProject[] = [
  {
    id: 'resume-analyzer',
    title: 'Resume Analyzer',
    description: 'Full-stack AI-powered resume analyzer providing ATS scores, missing skills, and AI-driven improvement suggestions.',
    icon: 'document-search',
    image: 'assets/projects/resume-iq-preview.png',
    imageAlt: 'ResumeIQ - AI Resume Analyzer Preview',
    technologies: [
      { name: 'Angular 18', icon: 'angular' },
      { name: 'Node.js', icon: 'node' },
      { name: 'Express', icon: 'express' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Groq AI', icon: 'sparkles' },
    ],
    featured: true,
    liveDemoUrl: 'https://resume-iq-six-tawny.vercel.app/auth/login',
    githubUrl: 'https://github.com/THEAPCSE131/ResumeIQ',
  },
];

// Configure only when a separate projects destination is available.
export const allProjectsUrl: string | null = null;
