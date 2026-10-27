export interface AboutExperience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export interface AboutEducation {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  grade: string;
}

export interface SkillCategory {
  title: string;
  tools: { name: string; tag: string }[];
}

export interface AboutActivity {
  id: string;
  title: string;
  role: string;
  caption: string;
  description: string;
  year: string;
  gradient: string;
}

export const aboutData = {
  header: {
    cornerLeft: 'FULL-STACK / AI ENGINEER / DESIGNER',
    cornerRight: '2026',
    wordmark: 'ABOUT',
    handwrittenNote: 'akshat agrawal',
  },
  bio: {
    hello: "Hi, I'm Akshat. I build at the intersection of AI, software engineering and product development, turning complex problems into practical, scalable things. I like agents that check their own work, backends that don't fall over, and interfaces that feel alive.",
  },
  projects: [
    { name: 'ANVIL', description: 'autonomous coding-agent harness', href: '/work/anvil' },
    { name: 'HealthWe', description: 'AI clinical documentation platform', href: '/work/healthwe' },
  ],
  skills: [
    {
      title: 'AI & Agents',
      tools: [
        { name: 'Generative AI', tag: 'AI' },
        { name: 'LangChain', tag: 'LC' },
        { name: 'LangGraph', tag: 'LG' },
        { name: 'RAG', tag: 'RG' },
        { name: 'NLP', tag: 'NL' },
        { name: 'Model Training', tag: 'MT' },
        { name: 'OpenAI API', tag: 'OA' },
        { name: 'Gemini API', tag: 'GM' },
        { name: 'Claude Code', tag: 'CC' },
      ],
    },
    {
      title: 'Backend & Data',
      tools: [
        { name: 'Python', tag: 'PY' },
        { name: 'FastAPI', tag: 'FA' },
        { name: 'PostgreSQL', tag: 'PG' },
        { name: 'SQLAlchemy', tag: 'SA' },
        { name: 'MySQL', tag: 'MY' },
        { name: 'NoSQL', tag: 'NO' },
        { name: 'Firebase', tag: 'FB' },
        { name: 'Docker', tag: 'DK' },
        { name: 'AWS', tag: 'AW' },
      ],
    },
    {
      title: 'Frontend & Design',
      tools: [
        { name: 'React', tag: 'RE' },
        { name: 'Next.js', tag: 'NX' },
        { name: 'Tailwind CSS', tag: 'TW' },
        { name: 'Framer Motion', tag: 'FM' },
        { name: 'Figma', tag: 'FG' },
        { name: 'Canva', tag: 'CV' },
      ],
    },
    {
      title: 'Data Tools',
      tools: [
        { name: 'Power BI', tag: 'BI' },
        { name: 'Excel', tag: 'XL' },
        { name: 'Tableau', tag: 'TB' },
        { name: 'NumPy', tag: 'NP' },
        { name: 'Pandas', tag: 'PD' },
        { name: 'Matplotlib', tag: 'MP' },
      ],
    },
  ],
  experience: [
    {
      role: 'Software Developer Intern',
      company: 'Countrees AI',
      location: 'Remote',
      period: 'Mar 2025 – Aug 2025',
      points: [
        'Backend logic and structured data across database-driven apps and ERP systems.',
        'Optimized database operations and data flows.',
        'Contributed to backend architecture and system design.',
      ],
    },
  ],
  education: [
    {
      degree: 'B.Tech Computer Science',
      institution: 'Newton School of Technology, Rishihood University',
      period: '2024–2028',
      grade: 'CGPA 7.2/10',
    },
    {
      degree: 'Class XII (Senior Secondary)',
      institution: 'Central Public Senior Secondary School',
      period: '2022–2024',
      grade: '8.7/10',
    },
    {
      degree: 'Class X (Secondary School)',
      institution: 'St Francis Senior Secondary School, Hathras',
      period: '2010–2022',
      grade: '9.5/10',
    },
  ],
  activities: [
    {
      id: 'damru',
      title: 'Damru 2.0',
      role: 'Director',
      caption: 'cultural event planning & execution',
      description: 'Cultural event planning, team management, scheduling, on-ground execution.',
      year: '2024',
      gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    },
    {
      id: 'neutron',
      title: 'Neutron 2.0',
      role: 'Organizing Committee',
      caption: 'technical activities & operations',
      description: 'Technical activities, participant management, and hackathon co-ordination.',
      year: '2024',
      gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    },
    {
      id: 'mentor',
      title: 'Junior Mentor',
      role: 'Technical Mentor',
      caption: 'guiding junior cohort projects',
      description: 'Guiding students in technical learning, systems foundations, and projects.',
      year: '2025',
      gradient: 'from-lime-500/20 via-green-500/20 to-emerald-500/20',
    },
    {
      id: 'hackathons',
      title: '3 Hackathons',
      role: 'Top 10 Finish',
      caption: '3x top 10 competitive builder',
      description: 'Built high-throughput autonomous agents and real-time clinical assistants under time pressure.',
      year: '2024–2025',
      gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    },
  ],
};
