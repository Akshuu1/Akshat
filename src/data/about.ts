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
    cornerLeft: 'FULL-STACK / AI ENGINEER / DATA ANALYST / DESIGNER',
    cornerRight: '2026',
    wordmark: 'ABOUT',
    handwrittenNote: 'akshat agrawal',
  },
  bio: {
    hello: "Hi, I'm Akshat. I build at the intersection of AI, software engineering and product development, turning complex problems into practical things. I like backends that don't fall over, agents that check their own work, and interfaces that feel alive. I also like turning messy data into clear answers.",
  },
  skills: [
    {
      title: 'AI & Agents',
      tools: [
        { name: 'Generative AI', tag: 'AI' },
        { name: 'LangChain', tag: 'LC' },
        { name: 'LangGraph', tag: 'LG' },
        { name: 'RAG', tag: 'RG' },
        { name: 'NLP', tag: 'NL' },
        { name: 'OpenAI API', tag: 'OA' },
        { name: 'Claude API', tag: 'CA' },
        { name: 'Gemini API', tag: 'GM' },
      ],
    },
    {
      title: 'Backend & Data',
      tools: [
        { name: 'Python', tag: 'PY' },
        { name: 'FastAPI', tag: 'FA' },
        { name: 'Node.js', tag: 'ND' },
        { name: 'Express', tag: 'EX' },
        { name: 'PostgreSQL', tag: 'PG' },
        { name: 'SQLAlchemy', tag: 'SA' },
        { name: 'MySQL', tag: 'MY' },
        { name: 'Docker', tag: 'DK' },
        { name: 'AWS', tag: 'AW' },
      ],
    },
    {
      title: 'Frontend & Design',
      tools: [
        { name: 'React', tag: 'RE' },
        { name: 'Next.js', tag: 'NX' },
        { name: 'JavaScript', tag: 'JS' },
        { name: 'TypeScript', tag: 'TS' },
        { name: 'Framer Motion', tag: 'FM' },
        { name: 'Figma', tag: 'FG' },
        { name: 'Design Systems', tag: 'DS' },
      ],
    },
    {
      title: 'Data & Analytics',
      tools: [
        { name: 'Power BI', tag: 'BI' },
        { name: 'Tableau', tag: 'TB' },
        { name: 'Excel', tag: 'XL' },
        { name: 'SQL', tag: 'SQ' },
        { name: 'MySQL', tag: 'MY' },
        { name: 'PostgreSQL', tag: 'PG' },
        { name: 'Pandas', tag: 'PD' },
        { name: 'NumPy', tag: 'NP' },
        { name: 'Matplotlib', tag: 'MP' },
        { name: 'Seaborn', tag: 'SB' },
      ],
    },
  ],
  experience: [
    {
      role: 'Software & Systems Developer',
      company: 'Independent / Projects',
      location: 'Remote',
      period: '2024 – Present',
      points: [
        'Architected autonomous AI harnesses, full-stack applications, and high-performance backend pipelines.',
        'Engineered robust database schemas, low-latency APIs, and automated test reproduction loops.',
        'Contributed to backend architecture, system design, and data-flow optimization across distributed services.',
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
      description: 'Built full-stack and AI software solutions under fast-paced hackathon constraints.',
      year: '2024–2025',
      gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    },
  ],
};
