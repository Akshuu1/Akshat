export interface HomeProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  tags: string[];
  date: string;
  href: string;
  accent: string;
}

export interface DisciplineItem {
  id: string;
  step: string;
  title: string;
  description: string;
  href: string;
  tag: string;
}

export const homeData = {
  hero: {
    navChip: 'Open to internships · 2026–27',
    headline: {
      line1: 'Building where',
      line2Part1: 'AI meets',
      line2Part2: 'software.',
    },
    supportLine:
      'Full-stack developer and AI systems builder. B.Tech CS at Newton School of Technology.',
    ctaPrimary: {
      label: 'See my work',
      href: '/work',
    },
    ctaSecondary: {
      label: 'or say hi',
      href: '/contact',
    },
    anvil: {
      title: 'ANVIL',
      date: 'Sept 2026',
      steps: [
        'Bug reproduction',
        'Code localization',
        'Patching',
        'Testing',
        'Review',
        'Reporting',
      ],
      footer:
        '9-phase agent workflow · Git worktree sandbox · JSONL traces with offline replay',
      href: '/work/anvil',
    },
  },
  disciplines: [
    {
      id: 'fullstack',
      step: '01',
      title: 'Full-Stack Development',
      tag: 'FULL-STACK',
      description:
        'Web applications, scalable APIs, and database-driven services built with Next.js, TypeScript, and FastAPI.',
      href: '/craft#full-stack',
    },
    {
      id: 'ai-ml',
      step: '02',
      title: 'AI Systems & Agents',
      tag: 'AI / AGENTS',
      description:
        'Multi-phase agent workflows with Git worktree sandboxing, structured JSONL execution traces, and verified code patching.',
      href: '/craft#ai-ml',
    },
    {
      id: 'design',
      step: '03',
      title: 'Systematic Product Design',
      tag: 'DESIGN',
      description:
        'Clean editorial typography, tactile motion physics, and responsive interface systems built from first principles.',
      href: '/craft#designer',
    },
  ] as DisciplineItem[],
  projects: [
    {
      id: 'anvil',
      title: 'ANVIL',
      date: 'Sept 2026',
      tagline: 'Autonomous coding-agent harness',
      description:
        'Autonomous coding agent harness that processes GitHub issues into verified patches with zero manual edits.',
      specs: [
        '9-phase self-testing workflow',
        'Isolated Git worktree sandbox',
        'JSONL execution trace replay',
      ],
      tags: ['Python', 'OpenAI API', 'Claude Code'],
      href: '/work/anvil',
      accent: '#D6FF3D',
    },
    {
      id: 'healthwe',
      title: 'HealthWe',
      date: 'Sept 2026',
      tagline: 'AI clinical documentation platform',
      description:
        'AI clinical documentation platform extracting structured records from doctor-patient audio with citation validation.',
      specs: [
        'Claude API clinical extraction',
        'Citation & timestamp verification',
        'FastAPI + PostgreSQL backend',
      ],
      tags: ['Python', 'FastAPI', 'PostgreSQL'],
      href: '/work/healthwe',
      accent: '#70A5FF',
    },
    {
      id: 'countrees-ai',
      title: 'Countrees AI ERP',
      date: '2025',
      tagline: 'Software Developer Intern · Mar–Aug 2025',
      description:
        'Backend services and structured data workflows across database-driven applications and enterprise ERP modules.',
      specs: [
        'Relational database schema design',
        'Modular FastAPI microservices',
        'Docker containerized deployment',
      ],
      tags: ['Python', 'FastAPI', 'Docker'],
      href: '/work/countrees-ai-erp',
      accent: '#F4B860',
    },
  ] as HomeProjectItem[],
  now: {
    status: 'B.Tech CS (2024–2028) @ Newton School of Technology',
    role: 'Full-Stack Developer & AI Systems Builder',
    focus:
      'Autonomous agent harnesses, backend services, and tactile web interfaces.',
    stats: '3 hackathons (Top 10) · 1 internship (Countrees AI) · 2 projects (ANVIL, HealthWe)',
    timezone: 'Asia/Kolkata (IST)',
  },
};
