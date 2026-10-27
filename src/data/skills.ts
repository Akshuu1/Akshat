export interface SkillCluster {
  id: string;
  category: string;
  headline: string;
  skills: string[];
}

export const skillClusters: SkillCluster[] = [
  {
    id: 'ai-agents',
    category: 'AI & Agents',
    headline: 'Agent workflows, structured reasoning & frontier LLMs',
    skills: [
      'Generative AI',
      'LangChain',
      'LangGraph',
      'RAG',
      'NLP',
      'Model Training',
      'OpenAI API',
      'Gemini API',
      'Claude Code',
    ],
  },
  {
    id: 'backend-data',
    category: 'Backend & Data',
    headline: 'Reliable services, relational stores & data pipelines',
    skills: [
      'Python',
      'FastAPI',
      'Node.js',
      'Express',
      'PostgreSQL',
      'MySQL',
      'NoSQL',
      'Firebase',
      'Prisma ORM',
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Seaborn',
    ],
  },
  {
    id: 'frontend-design',
    category: 'Frontend & Design',
    headline: 'Tactile editorial interfaces, micro-motion & layout',
    skills: [
      'React',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'HTML / CSS',
      'Figma',
      'Canva',
      'Graphic Design',
    ],
  },
  {
    id: 'cloud-tools',
    category: 'Cloud & Tools',
    headline: 'Containerization, dev environments & business analytics',
    skills: [
      'AWS',
      'Docker',
      'Docker Compose',
      'Git / GitHub',
      'Power BI',
      'Excel',
      'Tableau',
    ],
  },
];

export const toolsMarqueeList = [
  'Python',
  'FastAPI',
  'OpenAI API',
  'Claude Code',
  'PostgreSQL',
  'Docker',
  'LangGraph',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Git Worktrees',
  'RAG',
  'Prisma',
  'AWS',
  'Figma',
];
