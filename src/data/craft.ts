export interface CraftDiscipline {
  id: 'full-stack' | 'ai-ml' | 'designer';
  modeIndex: number;
  modeNumber: string; // "01 / 03"
  label: string; // "Full Stack", "AI Engineer", "Designer"
  outlineLabel: string; // "FULL STACK", "AI ENGINEER", "DESIGNER"
  filterParam: 'full-stack' | 'ai' | 'design';
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
    modeNumber: '01 / 03',
    label: 'Full Stack',
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
    modeNumber: '02 / 03',
    label: 'AI Engineer',
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
    id: 'designer',
    modeIndex: 2,
    modeNumber: '03 / 03',
    label: 'Designer',
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
  { index: 2, modeIndex: 2, label: 'Designer' },
  { index: 3, modeIndex: 0, label: 'Full Stack' },
  { index: 4, modeIndex: 1, label: 'AI Engineer' },
  { index: 5, modeIndex: 2, label: 'Designer' },
];
