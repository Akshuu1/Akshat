export interface CraftProjectPoster {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string;
  isPlaceholder?: boolean;
  figmaUrl?: string;
  artType: 'stack' | 'database' | 'neural' | 'worktree' | 'bezier' | 'canvas';
}

export interface CraftDiscipline {
  id: 'full-stack' | 'ai-ml' | 'designer';
  modeIndex: number;
  modeNumber: string; // "01 / 03"
  label: string; // "Full Stack", "AI / ML Engineer", "Designer"
  outlineLabel: string; // "FULL STACK", "AI / ML", "DESIGNER"
  colors: {
    bg: string;
    text: string;
    accent: string;
  };
  reelQuote: string; // Bottom-left line on the reel
  statement: {
    prefix: string;
    italicWord: string;
    suffix: string;
  };
  tools: string[]; // ONE line of plain mono text separated by " / "
  projects: CraftProjectPoster[];
}

export const CRAFT_DISCIPLINES: CraftDiscipline[] = [
  {
    id: 'full-stack',
    modeIndex: 0,
    modeNumber: '01 / 03',
    label: 'Full Stack',
    outlineLabel: 'FULL STACK',
    colors: {
      bg: '#1F3D2B', // forest green
      text: '#F3F0E8', // warm paper
      accent: '#D6FF3D', // electric lime
    },
    reelQuote: 'web apps, backends and databases that hold up.',
    statement: {
      prefix: 'web apps, backends and databases that ',
      italicWord: 'hold up',
      suffix: ' in production.',
    },
    tools: [
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'FastAPI',
      'PostgreSQL',
      'Docker',
      'AWS',
    ],
    projects: [
      {
        id: 'healthwe',
        title: 'HealthWe',
        subtitle: 'AI Clinical Documentation Platform',
        description:
          'AI clinical documentation platform; Python, FastAPI, PostgreSQL with strict citation verification and HIPAA-ready schemas.',
        tags: ['Python', 'FastAPI', 'PostgreSQL'],
        href: '/work/healthwe',
        artType: 'database',
      },
      {
        id: 'countrees-ai-erp',
        title: 'Countrees AI ERP',
        subtitle: 'Enterprise Backend Workflows',
        description:
          'Backend and structured data work during internship; optimized queries, modular FastAPI services, and Docker deployments.',
        tags: ['FastAPI', 'PostgreSQL', 'Docker'],
        href: '/work/countrees-ai-erp',
        artType: 'stack',
      },
    ],
  },
  {
    id: 'ai-ml',
    modeIndex: 1,
    modeNumber: '02 / 03',
    label: 'AI / ML Engineer',
    outlineLabel: 'AI / ML',
    colors: {
      bg: '#4D1D30', // deep maroon
      text: '#F6E9EC', // light pink-tinted text
      accent: '#FF9EB5', // accent pink
    },
    reelQuote: 'agents and LLM pipelines that check their own work.',
    statement: {
      prefix: 'agents, LLM pipelines and systems that ',
      italicWord: 'check',
      suffix: ' their own work.',
    },
    tools: [
      'LangChain',
      'LangGraph',
      'RAG',
      'NLP',
      'OpenAI API',
      'Gemini API',
      'Claude API',
    ],
    projects: [
      {
        id: 'anvil',
        title: 'ANVIL',
        subtitle: 'Autonomous Coding Harness',
        description:
          'Autonomous coding-agent harness with 9-phase self-testing workflow, isolated Git worktree sandboxing, and JSONL execution trace replay.',
        tags: ['Python', 'OpenAI API', 'Claude Code'],
        href: '/work/anvil',
        artType: 'worktree',
      },
      {
        id: 'healthwe-clinical',
        title: 'HealthWe Clinical AI',
        subtitle: 'Extraction & Citation Validation',
        description:
          'Claude API clinical extraction engine validating patient symptoms with exact timestamps and strict schema enforcement.',
        tags: ['Claude API', 'FastAPI', 'NLP'],
        href: '/work/healthwe',
        artType: 'neural',
      },
    ],
  },
  {
    id: 'designer',
    modeIndex: 2,
    modeNumber: '03 / 03',
    label: 'Designer',
    outlineLabel: 'DESIGNER',
    colors: {
      bg: '#3B2A1D', // warm espresso
      text: '#F6EBDD', // warm cream
      accent: '#F4B860', // amber
    },
    reelQuote: 'interfaces with taste, systems first.',
    statement: {
      prefix: 'interfaces with taste: systems first, then the details that ',
      italicWord: 'feel alive',
      suffix: '.',
    },
    tools: [
      'Figma',
      'Canva',
      'Design Systems',
      'Framer Motion',
      'Tailwind',
    ],
    projects: [
      {
        id: 'portfolio-design',
        title: 'This Portfolio',
        subtitle: 'Tactile Editorial Design System',
        description:
          'This portfolio itself: custom typography system, spring-physics micro-interactions, dark/light tactile themes, and kinetic reels.',
        tags: ['Design System', 'Motion', 'Typography'],
        href: '/',
        artType: 'bezier',
      },
      {
        id: 'figma-slot',
        title: '[ADD DESIGN PROJECT]',
        subtitle: 'Figma Case Study Slot',
        description:
          'Design project placeholder ready for Figma file link or product prototype case study.',
        tags: ['Figma', 'UI/UX', 'Design'],
        href: 'https://www.figma.com',
        isPlaceholder: true,
        figmaUrl: 'https://www.figma.com',
        artType: 'canvas',
      },
    ],
  },
];

// Endless repeated loop for the kinetic reel (6 rows)
export const REEL_WORDS = [
  { index: 0, modeIndex: 0, label: 'Full Stack' },
  { index: 1, modeIndex: 1, label: 'AI Engineer' },
  { index: 2, modeIndex: 2, label: 'Designer' },
  { index: 3, modeIndex: 0, label: 'Full Stack' },
  { index: 4, modeIndex: 1, label: 'AI Engineer' },
  { index: 5, modeIndex: 2, label: 'Designer' },
];
