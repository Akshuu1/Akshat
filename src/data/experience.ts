export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  periodMono: string;
  type: 'internship' | 'leadership' | 'mentorship';
  description: string;
  bullets: string[];
  skills: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 'software-systems-developer',
    role: 'Software & Systems Developer',
    company: 'Independent & Projects',
    location: 'Remote',
    period: '2024 – Present',
    periodMono: '2024.08 — Present',
    type: 'internship',
    description:
      'Engineered backend logic, autonomous AI harnesses, and structured data pipelines across production-ready systems.',
    bullets: [
      'Built autonomous coding agent harnesses and clinical document extraction platforms.',
      'Optimized database operations, storage, and processing workflows for efficiency, reliability, and low query latency.',
      'Contributed to backend architecture, system design, and data-flow optimization across distributed services.',
    ],
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Next.js', 'System Design'],
  },
];

export interface LeadershipItem {
  id: string;
  title: string;
  role: string;
  summary: string;
  tags: string[];
}

export const leadershipAndActivities: LeadershipItem[] = [
  {
    id: 'damru',
    title: 'Damru 2.0',
    role: 'Director',
    summary:
      'Headed cultural event planning, cross-functional team management, critical path scheduling, and live on-ground execution for large-scale university festivities.',
    tags: ['Event Direction', 'Team Management', 'Scheduling', 'Logistics'],
  },
  {
    id: 'neutron',
    title: 'Neutron 2.0',
    role: 'Organizing Committee',
    summary:
      'Orchestrated technical activities, competitive problem tracks, and participant management for the university flagship tech festival.',
    tags: ['Technical Ops', 'Participant Flow', 'Problem Sets'],
  },
  {
    id: 'junior-mentor',
    title: 'Junior Mentor',
    role: 'Mentor & Guide',
    summary:
      'Actively guided junior engineering students in technical learning trajectories, fundamental programming patterns, and project architectures.',
    tags: ['Mentorship', 'Code Reviews', 'Peer Learning'],
  },
  {
    id: 'hackathons',
    title: 'Hackathons',
    role: 'Competitor & Top 10 Finalist',
    summary:
      'Competed across 3 major hackathons with rapid 24-48hr sprints, securing a Top 10 finish building practical automated software solutions.',
    tags: ['3 Hackathons', 'Top 10 Finish', 'Rapid Prototyping'],
  },
];
