export interface CraftDiscipline {
  id: 'full-stack' | 'ai-ml' | 'data' | 'designer';
  modeIndex: number;
  modeNumber: string; // "01 / 04"
  label: string; // "Full Stack", "AI Engineer", "Data Analyst", "Designer"
  short?: string;
  slug?: string;
  outlineLabel: string; // "FULL STACK", "AI ENGINEER", "DATA ANALYST", "DESIGNER"
  filterParam: 'full-stack' | 'ai' | 'data' | 'design';
  colors: {
    bg: string;
    text: string;
    accent: string;
  };
  reelQuote: string;
  statement: string;
  lines: string[];
  tools: string;
  toolsList: string[];
}

export const CRAFT_DISCIPLINES: CraftDiscipline[] = [
  {
    id: 'full-stack',
    modeIndex: 0,
    modeNumber: '01 / 04',
    label: 'Full Stack',
    short: 'Full Stack',
    slug: '#full-stack',
    outlineLabel: 'FULL STACK',
    filterParam: 'full-stack',
    colors: {
      bg: '#1F3D2B', // forest green
      text: '#F3F0E8', // warm paper
      accent: '#D6FF3D', // electric lime
    },
    reelQuote: 'web apps, backends and databases.',
    statement: 'web apps, backends and databases.',
    lines: [
      'REST APIs and database design',
      'React and Next.js interfaces',
      'Docker and AWS basics',
    ],
    tools: 'React / Next.js / Node.js / Express / FastAPI / PostgreSQL / Docker / AWS',
    toolsList: ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    id: 'ai-ml',
    modeIndex: 1,
    modeNumber: '02 / 04',
    label: 'AI Engineer',
    short: 'AI / ML',
    slug: '#ai-ml',
    outlineLabel: 'AI ENGINEER',
    filterParam: 'ai',
    colors: {
      bg: '#4D1D30', // deep maroon
      text: '#F6E9EC', // light pink-tinted text
      accent: '#FF9EB5', // accent pink
    },
    reelQuote: 'LLM apps and agents that check their own work.',
    statement: 'agents that check their own work.',
    lines: [
      'Prompting and tool-calling',
      'RAG and NLP pipelines',
      'Evaluation and testing of model output',
    ],
    tools: 'LangChain / LangGraph / OpenAI API / Claude API / RAG / NLP / Evaluation',
    toolsList: ['LangChain', 'LangGraph', 'RAG', 'NLP', 'OpenAI API', 'Gemini API', 'Claude API', 'Model Training'],
  },
  {
    id: 'data',
    modeIndex: 2,
    modeNumber: '03 / 04',
    label: 'Data Analyst',
    short: 'Data',
    slug: '#data-analyst',
    outlineLabel: 'DATA ANALYST',
    filterParam: 'data',
    colors: {
      bg: '#12284A', // deep navy
      text: '#F2F1F7', // AA contrast light paper
      accent: '#5CE1E6', // cyan
    },
    reelQuote: 'numbers into decisions, clearly.',
    statement: 'numbers into decisions, clearly.',
    lines: [
      'Cleaning and shaping data with SQL and Pandas',
      'Dashboards in Power BI and Tableau',
      'Charts and analysis with Python and Excel',
    ],
    tools: 'Power BI / Tableau / Excel / SQL / MySQL / PostgreSQL / Pandas / NumPy / Matplotlib / Seaborn',
    toolsList: [
      'Power BI',
      'Tableau',
      'Excel',
      'SQL',
      'MySQL',
      'PostgreSQL',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
    ],
  },
  {
    id: 'designer',
    modeIndex: 3,
    modeNumber: '04 / 04',
    label: 'Designer',
    short: 'Designer',
    slug: '#designer',
    outlineLabel: 'DESIGNER',
    filterParam: 'design',
    colors: {
      bg: '#3B2A1D', // warm espresso
      text: '#F6EBDD', // warm cream
      accent: '#F4B860', // amber
    },
    reelQuote: 'interfaces with taste.',
    statement: 'interfaces with taste.',
    lines: [
      'Design systems in Figma',
      'Motion and micro-interactions',
      'Typography and layout',
    ],
    tools: 'Figma / Canva / Design Systems / Framer Motion / Tailwind',
    toolsList: ['Figma', 'Canva', 'Design Systems', 'Framer Motion', 'Tailwind'],
  },
];

export const REEL_WORDS = [
  { index: 0, modeIndex: 0, label: 'Full Stack' },
  { index: 1, modeIndex: 1, label: 'AI Engineer' },
  { index: 2, modeIndex: 2, label: 'Data Analyst' },
  { index: 3, modeIndex: 3, label: 'Designer' },
  { index: 4, modeIndex: 0, label: 'Full Stack' },
  { index: 5, modeIndex: 1, label: 'AI Engineer' },
  { index: 6, modeIndex: 2, label: 'Data Analyst' },
  { index: 7, modeIndex: 3, label: 'Designer' },
];
