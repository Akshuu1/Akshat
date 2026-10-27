export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  periodMono: string;
  score: string;
  scoreType: string;
  highlights?: string[];
}

export const educationList: EducationItem[] = [
  {
    id: 'btech',
    degree: 'B.Tech in Computer Science',
    institution: 'Newton School of Technology, Rishihood University',
    period: '2024 — 2028',
    periodMono: '2024 — 2028',
    score: '7.2 / 10',
    scoreType: 'CGPA',
    highlights: [
      'Focusing on autonomous AI systems, distributed backend architectures, and production software engineering.',
      'Active leadership in university technical and cultural committees.',
    ],
  },
  {
    id: 'class-xii',
    degree: 'Senior Secondary (Class XII)',
    institution: 'Central Public Senior Secondary School',
    period: '2022 — 2024',
    periodMono: '2022 — 2024',
    score: '8.7 / 10',
    scoreType: 'Score',
    highlights: ['Core Science stream with Mathematics and Computer Science fundamentals.'],
  },
  {
    id: 'class-x',
    degree: 'Secondary School (Class X)',
    institution: 'St Francis Senior Secondary School, Hathras',
    period: '2010 — 2022',
    periodMono: '2010 — 2022',
    score: '9.5 / 10',
    scoreType: 'Score',
    highlights: ['Distinction in Mathematics, Science, and English.'],
  },
];
