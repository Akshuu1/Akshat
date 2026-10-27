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
      title: 'AI Engineering',
      tag: 'AI / AGENTS',
      description:
        'LLM applications, agents, tool-calling workflows, and RAG pipelines that check their own work.',
      href: '/craft#ai-ml',
    },
    {
      id: 'design',
      step: '03',
      title: 'Design',
      tag: 'DESIGN',
      description:
        'Interfaces with taste: design systems, motion micro-interactions, and thoughtful layout.',
      href: '/craft#designer',
    },
  ] as DisciplineItem[],
  now: {
    status: 'B.Tech CS (2024–2028) @ Newton School of Technology',
    role: 'Full-Stack Developer & AI Engineer',
    focus: 'Web applications, backends, and AI systems.',
    timezone: 'Asia/Kolkata (IST)',
  },
};
