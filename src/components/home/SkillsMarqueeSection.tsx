'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Database, Palette, ArrowUpRight, BarChart3 } from 'lucide-react';

interface SkillsMarqueeSectionProps {
  reducedMotion?: boolean;
}

type SkillCategory = 'all' | 'ai' | 'backend' | 'data' | 'frontend';

interface ToolItem {
  id: string;
  name: string;
  category: 'ai' | 'backend' | 'data' | 'frontend';
  categoryLabel: string;
  role: string;
  highlight: string;
  tags: string[];
  pairedWith: string[];
  status: 'production' | 'core' | 'specialized';
}

const TOOLS_DATA: ToolItem[] = [
  // --- AI & Intelligence ---
  {
    id: 'langgraph',
    name: 'LangGraph',
    category: 'ai',
    categoryLabel: 'Multi-Agent',
    role: 'Cyclic agentic loops & multi-actor state machines with checkpointing.',
    highlight: 'Stateful Agent Graphs',
    tags: ['Cycles', 'Checkpoints', 'Multi-Actor'],
    pairedWith: ['FastAPI', 'Python', 'Claude API'],
    status: 'production',
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ai',
    categoryLabel: 'Orchestration',
    role: 'Tool-calling pipelines, RAG ingestion, memory schemas & prompt chains.',
    highlight: 'LLM Orchestration',
    tags: ['Chains', 'Embeddings', 'Tool Use'],
    pairedWith: ['LangGraph', 'Python', 'OpenAI API'],
    status: 'production',
  },
  {
    id: 'claude-api',
    name: 'Claude & OpenAI API',
    category: 'ai',
    categoryLabel: 'Frontier Models',
    role: 'Deep reasoning, structured JSON extraction & tool-calling agent backends.',
    highlight: 'Reasoning & Structured I/O',
    tags: ['Tool-Calling', 'Function Calling', 'JSON Schema'],
    pairedWith: ['LangGraph', 'FastAPI', 'Python'],
    status: 'core',
  },
  {
    id: 'gemini-api',
    name: 'Gemini API',
    category: 'ai',
    categoryLabel: 'Multimodal',
    role: 'Long-context document analysis, native video & audio multimodal processing.',
    highlight: 'Multimodal & 2M Context',
    tags: ['Multimodal', 'Long-Context', 'Embeddings'],
    pairedWith: ['Python', 'Next.js', 'FastAPI'],
    status: 'production',
  },
  {
    id: 'rag-systems',
    name: 'RAG Architectures',
    category: 'ai',
    categoryLabel: 'Retrieval',
    role: 'Hybrid keyword + dense vector search, reranking & chunking strategies.',
    highlight: 'Hybrid Vector Retrieval',
    tags: ['Dense Retrieval', 'Rerankers', 'Chunking'],
    pairedWith: ['PostgreSQL', 'LangChain', 'Python'],
    status: 'production',
  },
  {
    id: 'nlp-semantics',
    name: 'NLP & Semantic Search',
    category: 'ai',
    categoryLabel: 'Language Core',
    role: 'Semantic embeddings, intent classification & metadata extraction.',
    highlight: 'Semantic Analysis',
    tags: ['Embeddings', 'Vector Space', 'Intent'],
    pairedWith: ['Python', 'PostgreSQL', 'LangGraph'],
    status: 'specialized',
  },

  // --- Backend & Systems ---
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    categoryLabel: 'Async Backend',
    role: 'High-throughput async Python APIs, SSE streaming & Pydantic validation.',
    highlight: 'Async REST & SSE Streaming',
    tags: ['AsyncIO', 'Pydantic v2', 'WebSockets'],
    pairedWith: ['Python', 'PostgreSQL', 'Docker', 'LangGraph'],
    status: 'core',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    categoryLabel: 'Core Language',
    role: 'Primary language for AI agent harnesses, backend services & scientific libraries.',
    highlight: 'Modern Python 3.12+',
    tags: ['Async', 'Typing', 'Data Pipelines'],
    pairedWith: ['FastAPI', 'LangGraph', 'PostgreSQL'],
    status: 'core',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL & pgvector',
    category: 'backend',
    categoryLabel: 'Database',
    role: 'Relational schemas, ACID transactions, JSONB & vector embeddings.',
    highlight: 'Relational + Vector Store',
    tags: ['pgvector', 'ACID', 'Indexes'],
    pairedWith: ['FastAPI', 'Python', 'Docker'],
    status: 'core',
  },
  {
    id: 'docker',
    name: 'Docker & Compose',
    category: 'backend',
    categoryLabel: 'Containers',
    role: 'Reproducible multi-container microservices, isolated sandbox testing.',
    highlight: 'Isolated Environments',
    tags: ['Containers', 'Compose', 'CI/CD'],
    pairedWith: ['FastAPI', 'PostgreSQL', 'AWS'],
    status: 'production',
  },
  {
    id: 'node-express',
    name: 'Node.js & Express',
    category: 'backend',
    categoryLabel: 'Runtime',
    role: 'Lightweight JavaScript microservices, event loops & webhook processors.',
    highlight: 'Event-driven I/O',
    tags: ['Event Loop', 'Webhooks', 'REST'],
    pairedWith: ['React', 'Next.js', 'PostgreSQL'],
    status: 'production',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'backend',
    categoryLabel: 'Cloud Platform',
    role: 'S3 storage, Lambda serverless, EC2 hosting & IAM security policies.',
    highlight: 'Cloud Infrastructure',
    tags: ['S3', 'Lambda', 'EC2', 'IAM'],
    pairedWith: ['Docker', 'FastAPI', 'Next.js'],
    status: 'production',
  },

  // --- Frontend & Design ---
  {
    id: 'nextjs',
    name: 'Next.js 15',
    category: 'frontend',
    categoryLabel: 'Full-Stack React',
    role: 'App Router, Server Components, Partial Prerendering & edge rendering.',
    highlight: 'Server Components & Edge',
    tags: ['App Router', 'RSC', 'Turbopack'],
    pairedWith: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI'],
    status: 'core',
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'frontend',
    categoryLabel: 'UI Architecture',
    role: 'Declarative component design, state machines, suspense & transitions.',
    highlight: 'Modern Component Systems',
    tags: ['Hooks', 'Suspense', 'Concurrent'],
    pairedWith: ['Next.js', 'TypeScript', 'Framer Motion'],
    status: 'core',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Type Safety',
    role: 'Strict compile-time guarantees, schema inference & contract validation.',
    highlight: 'End-to-End Type Safety',
    tags: ['Strict Typing', 'Generics', 'Inference'],
    pairedWith: ['Next.js', 'React', 'FastAPI'],
    status: 'core',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Design Tokens',
    role: 'Responsive typography, design token architectures & zero-runtime CSS.',
    highlight: 'Modern Token Architecture',
    tags: ['Fluid Type', 'Tokens', 'Responsive'],
    pairedWith: ['Next.js', 'React', 'Figma'],
    status: 'core',
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'frontend',
    categoryLabel: 'Motion Physics',
    role: 'Spring-driven micro-interactions, layout morphs & scroll choreography.',
    highlight: 'Physics-Based Choreography',
    tags: ['Spring Physics', 'Gestures', 'LayoutId'],
    pairedWith: ['React', 'Next.js', 'Tailwind CSS'],
    status: 'production',
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'frontend',
    categoryLabel: 'Product Design',
    role: 'High-fidelity wireframes, interaction prototypes & design systems.',
    highlight: 'Design Systems & Prototyping',
    tags: ['Components', 'Auto-Layout', 'Tokens'],
    pairedWith: ['Tailwind CSS', 'React', 'Next.js'],
    status: 'core',
  },

  // --- Data & Analytics ---
  {
    id: 'power-bi',
    name: 'Power BI & Tableau',
    category: 'data',
    categoryLabel: 'BI Dashboards',
    role: 'Executive KPI reporting, interactive DAX metrics & operational dashboards.',
    highlight: 'Business Intelligence & Visual Analytics',
    tags: ['Dashboards', 'DAX', 'Visuals'],
    pairedWith: ['SQL', 'Excel', 'PostgreSQL'],
    status: 'production',
  },
  {
    id: 'sql-analytics',
    name: 'SQL & Database Querying',
    category: 'data',
    categoryLabel: 'Data Shaping',
    role: 'Complex joins, window functions, CTEs & analytical query optimization.',
    highlight: 'Analytical SQL & Data Modeling',
    tags: ['PostgreSQL', 'MySQL', 'Aggregation'],
    pairedWith: ['Pandas', 'Power BI', 'FastAPI'],
    status: 'core',
  },
  {
    id: 'pandas-python',
    name: 'Pandas & NumPy',
    category: 'data',
    categoryLabel: 'Data Processing',
    role: 'Dataframe transformations, exploratory analysis & automated statistical modeling.',
    highlight: 'Python Data Science',
    tags: ['Wrangling', 'NumPy', 'DataFrames'],
    pairedWith: ['Python', 'Matplotlib', 'SQL'],
    status: 'production',
  },
];

const CATEGORIES: { id: SkillCategory; label: string; icon: React.ComponentType<{ className?: string }>; count: number; accent: string }[] = [
  { id: 'all', label: 'All Stack', icon: Sparkles, count: TOOLS_DATA.length, accent: '#D6FF3D' },
  { id: 'ai', label: 'AI & Agents', icon: Cpu, count: TOOLS_DATA.filter((t) => t.category === 'ai').length, accent: '#FF9EB5' },
  { id: 'backend', label: 'Backend & Systems', icon: Database, count: TOOLS_DATA.filter((t) => t.category === 'backend').length, accent: '#D6FF3D' },
  { id: 'data', label: 'Data & Analytics', icon: BarChart3, count: TOOLS_DATA.filter((t) => t.category === 'data').length, accent: '#5CE1E6' },
  { id: 'frontend', label: 'Frontend & Design', icon: Palette, count: TOOLS_DATA.filter((t) => t.category === 'frontend').length, accent: '#F4B860' },
];

export function SkillsMarqueeSection({ reducedMotion = false }: SkillsMarqueeSectionProps) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [hoveredToolId, setHoveredToolId] = useState<string | null>(null);

  const activeTool = TOOLS_DATA.find((t) => t.id === (hoveredToolId || selectedToolId)) || TOOLS_DATA[0];

  const filteredTools = activeCategory === 'all' 
    ? TOOLS_DATA 
    : TOOLS_DATA.filter((tool) => tool.category === activeCategory);

  return (
    <section 
      className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-16 md:py-24 select-none"
      aria-label="Interactive Toolchain & Stack"
    >
      {/* =================================================================== */}
      {/* 1. SECTION HEADER (Tactile Hardware Station / Tech Deck)             */}
      {/* =================================================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/10">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1D2B] border border-white/10 text-white font-mono text-xs tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#D6FF3D] animate-pulse" />
            <span className="text-[#F2F1F7] font-semibold">Active Toolchain</span>
            <span className="text-white/40 hidden sm:inline">// 18 Instruments</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#F2F1F7]">
            Tools of the <span className="font-serif italic font-normal text-[#F2F1F7]">trade</span>.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#D0D3E2] leading-relaxed">
            Not just names on a resume — the engines, runtimes, and primitives powering my daily production code.
          </p>
        </div>

        {/* ================================================================= */}
        {/* 2. CATEGORY SELECTOR TABS (Filter Pills)                          */}
        {/* ================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none snap-x">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 py-2 rounded-full font-mono text-xs flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#10121F] font-bold shadow-lg shadow-white/10'
                    : 'bg-[#161824] hover:bg-[#1E2234] text-[#B4B7CB] hover:text-white border border-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#10121F]' : 'text-white/60'}`} />
                <span>{cat.label}</span>
                <span 
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-[#10121F]/15 text-[#10121F]' : 'bg-white/10 text-white/70'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. TACTILE HARDWARE MODULES GRID                                    */}
      {/* =================================================================== */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 pt-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool, idx) => {
            const isHovered = hoveredToolId === tool.id;
            const isSelected = selectedToolId === tool.id;
            const isRelated = activeTool.pairedWith.includes(tool.name);

            // Domain accents
            const accentColor = 
              tool.category === 'ai' ? '#FF9EB5' : 
              tool.category === 'backend' ? '#D6FF3D' : 
              tool.category === 'data' ? '#5CE1E6' : '#F4B860';

            return (
              <motion.div
                key={tool.id}
                layout
                initial={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, delay: idx * 0.02 }}
                onMouseEnter={() => setHoveredToolId(tool.id)}
                onMouseLeave={() => setHoveredToolId(null)}
                onClick={() => setSelectedToolId(tool.id === selectedToolId ? null : tool.id)}
                style={{
                  borderColor: isHovered || isSelected ? accentColor : isRelated ? `${accentColor}55` : 'rgba(255, 255, 255, 0.08)',
                }}
                className={`group relative rounded-[20px] bg-[#141622] p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[170px] overflow-hidden ${
                  isHovered || isSelected
                    ? 'shadow-xl -translate-y-1 bg-[#181B2B]'
                    : isRelated
                    ? 'bg-[#161928]'
                    : 'hover:border-white/20'
                }`}
              >
                {/* Subtle colored glow corner on hover */}
                <div
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
                  style={{
                    background: accentColor,
                    opacity: isHovered || isSelected ? 0.22 : 0,
                  }}
                />

                {/* Top Row: Category tag + Status Indicator */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: accentColor }}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 font-medium">
                      {tool.categoryLabel}
                    </span>
                  </div>

                  {/* Status chip */}
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                    {tool.status}
                  </span>
                </div>

                {/* Middle: Tool Name + Micro role */}
                <div className="relative z-10 space-y-1.5 my-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight group-hover:text-white transition-colors">
                      {tool.name}
                    </h3>
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                      style={{ 
                        background: isHovered || isSelected ? accentColor : 'rgba(255,255,255,0.06)',
                        color: isHovered || isSelected ? '#10121F' : 'rgba(255,255,255,0.6)'
                      }}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-xs text-[#B4B7CB] leading-relaxed line-clamp-2">
                    {tool.role}
                  </p>
                </div>

                {/* Bottom Row: Tags */}
                <div className="relative z-10 flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-[6px] bg-white/[0.04] border border-white/5 font-mono text-[10px] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* =================================================================== */}
      {/* 4. ACTIVE TELEMETRY BAR / SYSTEM BUS INSPECTOR                      */}
      {/* =================================================================== */}
      <div className="mt-8 rounded-[20px] bg-[#12141F] border border-white/15 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-white/80 shadow-2xl relative overflow-hidden">
        {/* Glow ambient bar */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{
            background: 
              activeTool.category === 'ai' ? '#FF9EB5' :
              activeTool.category === 'backend' ? '#D6FF3D' : '#F4B860'
          }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pl-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#D6FF3D]" />
            <span className="text-white/40 uppercase tracking-widest text-[10px]">INSPECT:</span>
            <span className="text-white font-bold">{activeTool.name}</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-white/60">
            <span className="text-white/30">|</span>
            <span className="text-white/50">{activeTool.highlight}</span>
          </div>
        </div>

        {/* Synergies / Paired with */}
        <div className="flex items-center gap-2 pl-2 md:pl-0 flex-wrap">
          <span className="text-white/40 text-[10px] uppercase tracking-wider">SYNERGIES:</span>
          {activeTool.pairedWith.map((pair) => (
            <span
              key={pair}
              className="px-2 py-0.5 rounded-full bg-white/10 text-white font-medium text-[11px]"
            >
              +{pair}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
