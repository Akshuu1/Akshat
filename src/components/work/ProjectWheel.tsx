'use client';

import React, { useRef, useState, useMemo, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
} from 'framer-motion';
import { Project } from '@/data/projects';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowUpRight, Terminal, Cpu, Maximize2, X } from 'lucide-react';

export type CategoryFilter = 'ai' | 'full-stack' | 'data' | 'design';

export const CATEGORIES: { id: CategoryFilter; label: string; accent: string }[] = [
  { id: 'ai', label: 'AI Engineer', accent: '#D6FF3D' },
  { id: 'full-stack', label: 'Full Stack', accent: '#7CF0B4' },
  { id: 'data', label: 'Data Analyst', accent: '#5CE1E6' },
  { id: 'design', label: 'Designer', accent: '#F4B860' },
];

interface ProjectWheelProps {
  projects: Project[];
  activeCategory?: CategoryFilter;
  onCategoryChange?: (cat: CategoryFilter) => void;
  sectionIndex?: string;
  sectionTitle?: string;
  headerAction?: React.ReactNode;
}

const TOTAL_TICKS = 72; // every 5 degrees around 360°

// Motion preference subscription using React useSyncExternalStore
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false;
}

// Clean bespoke SVG visual for cards (no fake chips, metrics, or statuses)
function ProjectStickerVisual({
  project,
  categoryAccent,
}: {
  project: Project;
  categoryAccent: string;
}) {
  if (project.placeholder) {
    return (
      <div className="w-full h-24 rounded-xl border border-dashed border-[var(--category-accent)]/50 bg-[var(--bg-base)]/50 flex flex-col items-center justify-center gap-1.5 p-2">
        <div
          className="w-7 h-7 rounded-full border border-dashed flex items-center justify-center text-sm font-bold"
          style={{ borderColor: categoryAccent, color: categoryAccent }}
        >
          +
        </div>
        <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
          + add project
        </span>
      </div>
    );
  }

  if (project.imageUrl) {
    return (
      <div className="w-full h-32 sm:h-36 rounded-xl bg-black/40 border border-[var(--border-hairline)] overflow-hidden relative group flex items-center justify-center p-1">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 pointer-events-none">
          <span className="font-mono text-[9px] text-white font-bold uppercase tracking-wider truncate">
            {project.title}
          </span>
        </div>
      </div>
    );
  }

  if (project.slug === 'anvil') {
    return (
      <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-3 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between">
          <Terminal className="w-4 h-4 text-[var(--category-accent)]" />
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--category-accent)] animate-pulse" />
            <span className="font-mono text-[9px] text-[var(--text-muted)]">HARNESS</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 py-1">
          <div className="h-0.5 w-10 bg-[var(--border-hairline)]" />
          <Cpu className="w-5 h-5 text-[var(--text-primary)] shrink-0" />
          <div className="h-0.5 w-10 bg-[var(--border-hairline)]" />
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>WORKTREE</span>
          <span>TRACE</span>
        </div>
      </div>
    );
  }

  if (project.slug === 'healthwe') {
    return (
      <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-3 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>EXTRACTION</span>
          <span className="text-[var(--category-accent)] font-bold">PIPELINE</span>
        </div>
        <div className="py-1 flex items-center justify-center">
          <svg viewBox="0 0 140 28" className="w-full h-7 stroke-[var(--category-accent)] fill-none">
            <path
              d="M 0,14 L 35,14 L 45,3 L 55,25 L 65,8 L 75,18 L 85,14 L 140,14"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>CLINICAL</span>
          <span>REPORTS</span>
        </div>
      </div>
    );
  }

  if (project.slug === 'marketing-ab-test') {
    return (
      <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-3 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>A/B TEST</span>
          <span className="text-[var(--category-accent)] font-bold">+43.1% LIFT</span>
        </div>
        <div className="py-1 flex items-center justify-center">
          <svg viewBox="0 0 140 28" className="w-full h-7 fill-none">
            {/* Control curve */}
            <path
              d="M 5,24 Q 45,24 60,14 Q 75,5 90,14 Q 105,24 135,24"
              stroke="var(--text-muted)"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
            {/* Treatment curve with lift */}
            <path
              d="M 5,24 Q 40,24 55,6 Q 70,2 85,6 Q 100,24 135,24"
              stroke="var(--category-accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>588K USERS</span>
          <span>p = 1.99e-13</span>
        </div>
      </div>
    );
  }

  if (project.slug === 'nyc-yellow-taxi') {
    return (
      <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-3 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>GEOSPATIAL</span>
          <span className="text-[var(--category-accent)] font-bold">48.7M TRIPS</span>
        </div>
        <div className="py-1 flex items-center justify-center">
          <svg viewBox="0 0 140 28" className="w-full h-7 fill-none">
            {/* Spatial route vector flow */}
            <path
              d="M 10,22 Q 40,4 70,16 T 130,8"
              stroke="var(--category-accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="10" cy="22" r="2.5" fill="var(--category-accent)" />
            <circle cx="70" cy="16" r="2.5" fill="var(--category-accent)" />
            <circle cx="130" cy="8" r="2.5" fill="var(--category-accent)" />
            <line x1="20" y1="26" x2="120" y2="26" stroke="var(--border-hairline)" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>$0.75 CBD FEE</span>
          <span>$1.03B GROSS</span>
        </div>
      </div>
    );
  }

  if (project.slug === 'stock-market-risk') {
    return (
      <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-3 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>RISK & MPT</span>
          <span className="text-[var(--category-accent)] font-bold">SHARPE OPT</span>
        </div>
        <div className="py-1 flex items-center justify-center">
          <svg viewBox="0 0 140 28" className="w-full h-7 fill-none">
            {/* Markowitz Efficient Frontier curve */}
            <path
              d="M 15,25 Q 25,6 65,4 Q 105,3 130,2"
              stroke="var(--category-accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Scatter dots */}
            <circle cx="35" cy="18" r="1.5" fill="var(--text-muted)" />
            <circle cx="50" cy="12" r="1.5" fill="var(--text-muted)" />
            <circle cx="65" cy="4" r="3" fill="var(--category-accent)" />
            <circle cx="85" cy="10" r="1.5" fill="var(--text-muted)" />
            <circle cx="110" cy="7" r="1.5" fill="var(--text-muted)" />
          </svg>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>10K MONTE CARLO</span>
          <span>VaR 95%</span>
        </div>
      </div>
    );
  }

  if (project.slug === 'blinkit-delivery-analytics') {
    return (
      <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-3 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>LOOKER BI</span>
          <span className="text-[var(--category-accent)] font-bold">10-MIN SLA</span>
        </div>
        <div className="grid grid-cols-4 gap-1 py-1">
          <div className="h-5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[8px] font-mono">p50</div>
          <div className="h-5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[8px] font-mono">p90</div>
          <div className="h-5 rounded bg-[var(--category-accent)]/20 border border-[var(--category-accent)]/40 flex items-center justify-center text-[8px] font-mono text-[var(--category-accent)]">p99</div>
          <div className="h-5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[8px] font-mono">HUB</div>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>DARK STORES</span>
          <span>DISPATCH</span>
        </div>
      </div>
    );
  }

  if (project.slug === 'airbnb-market-intelligence') {
    return (
      <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-3 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>TABLEAU</span>
          <span className="text-[var(--category-accent)] font-bold">RevPAR</span>
        </div>
        <div className="py-1 flex items-center justify-center">
          <svg viewBox="0 0 140 28" className="w-full h-7 fill-none">
            <rect x="15" y="10" width="20" height="14" rx="2" fill="var(--bg-surface-elevated)" stroke="var(--border-hairline)" />
            <rect x="45" y="4" width="20" height="20" rx="2" fill="var(--category-accent)" fillOpacity="0.3" stroke="var(--category-accent)" />
            <rect x="75" y="14" width="20" height="10" rx="2" fill="var(--bg-surface-elevated)" stroke="var(--border-hairline)" />
            <rect x="105" y="8" width="20" height="16" rx="2" fill="var(--bg-surface-elevated)" stroke="var(--border-hairline)" />
          </svg>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>OCCUPANCY</span>
          <span>DYNAMIC PRICING</span>
        </div>
      </div>
    );
  }

  // Portfolio or design projects
  return (
    <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-3 flex flex-col justify-between overflow-hidden relative">
      <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
        <span>INTERFACE</span>
        <span>MOTION</span>
      </div>
      <div className="flex items-center justify-center py-1">
        <div
          className="w-24 h-7 rounded border border-dashed flex items-center justify-around px-2"
          style={{ borderColor: categoryAccent }}
        >
          <div className="w-2 h-2 rounded-xs" style={{ backgroundColor: categoryAccent }} />
          <div className="w-6 h-0.5 bg-[var(--border-hairline)]" />
          <div className="w-2 h-2 rounded-full border border-[var(--text-muted)]" />
        </div>
      </div>
      <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
        <span>SYSTEM</span>
        <span>TOKENS</span>
      </div>
    </div>
  );
}

export function ProjectWheel({
  projects,
  activeCategory: propActiveCategory,
  onCategoryChange: propOnCategoryChange,
  sectionIndex = '01',
  sectionTitle = 'SELECTION',
  headerAction,
}: ProjectWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalCategory, setInternalCategory] = useState<CategoryFilter>('ai');
  const activeCategory = propActiveCategory || internalCategory;

  const handleCategoryChange = (cat: CategoryFilter) => {
    if (propOnCategoryChange) {
      propOnCategoryChange(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const activeCategoryConfig =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const categoryAccent = activeCategoryConfig.accent;

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p.categories?.includes(activeCategory));
  }, [projects, activeCategory]);

  const count = filteredProjects.length;
  // Wheel angle step = min(40deg, 160deg / count)
  const angleStep = Math.min(40, 160 / Math.max(count, 1));

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  // Category counts for tab badges
  const categoryCounts = useMemo(() => {
    return {
      ai: projects.filter((p) => p.categories?.includes('ai')).length,
      'full-stack': projects.filter((p) => p.categories?.includes('full-stack')).length,
      data: projects.filter((p) => p.categories?.includes('data')).length,
      design: projects.filter((p) => p.categories?.includes('design')).length,
    };
  }, [projects]);

  // Reset scroll and rotation to project 01 on category switch
  useEffect(() => {
    setActiveIndex(0);
    if (containerRef.current) {
      const top = containerRef.current.offsetTop;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [activeCategory]);

  // Scroll tracking across (100vh + 100vh x count) section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const maxRotation = Math.max(0, (count - 1) * angleStep);

  const rawRotation = useTransform(scrollYProgress, [0, 1], [0, maxRotation]);

  const wheelRotation = useSpring(rawRotation, {
    stiffness: 80,
    damping: 20,
    mass: 0.8,
  });

  // Active project calculation based on wheel rotation
  useMotionValueEvent(wheelRotation, 'change', (latest) => {
    let closestIndex = 0;
    let minDistance = Infinity;

    filteredProjects.forEach((_, idx) => {
      const baseAngle = -idx * angleStep;
      const currentAngle = latest + baseAngle;
      const distance = Math.abs(currentAngle);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex && closestIndex >= 0 && closestIndex < filteredProjects.length) {
      setActiveIndex(closestIndex);
    }
  });

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % CATEGORIES.length;
      handleCategoryChange(CATEGORIES[nextIndex].id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
      handleCategoryChange(CATEGORIES[prevIndex].id);
    }
  };

  // If reduced motion is preferred, render standard accessible cards list
  if (reducedMotion) {
    return (
      <section
        style={{ ['--category-accent' as string]: categoryAccent }}
        className="max-w-[1200px] mx-auto px-6 md:px-12 space-y-8 pt-8"
      >
        <div className="flex flex-col gap-4 pb-4 border-b border-[var(--border-hairline)]">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {sectionIndex} {"//"} {sectionTitle}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Selected <span className="font-serif italic font-normal">Projects</span>
              </h2>
            </div>
            {headerAction ? (
              headerAction
            ) : (
              <Link
                href="/work"
                className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                view all case studies ↗
              </Link>
            )}
          </div>

          {/* Category Tabs */}
          <div
            role="tablist"
            aria-label="Project categories"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
          >
            {CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat.id;
              const countBadge = categoryCounts[cat.id];
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleCategoryChange(cat.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs flex items-center gap-2 transition-all duration-200 cursor-pointer border shrink-0 ${
                    isActive
                      ? 'font-bold shadow-xs'
                      : 'border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]/40 bg-transparent'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: 'var(--category-accent)',
                          borderColor: 'transparent',
                          color: '#14141F',
                        }
                      : {}
                  }
                  data-cursor="filter"
                >
                  <span>{cat.label}</span>
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none"
                    style={{
                      backgroundColor: isActive ? 'rgba(0,0,0,0.15)' : 'var(--bg-surface-elevated)',
                      color: isActive ? '#14141F' : 'var(--text-muted)',
                    }}
                  >
                    {String(countBadge).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {filteredProjects.map((p, idx) => (
            <article
              key={p.slug || p.id}
              className="p-8 rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>0{idx + 1} {"//"} {p.categoryLabel}</span>
                <span>{p.year}</span>
              </div>
              <h3 className="text-2xl font-bold">
                {p.title} {p.subtitle ? `— ${p.subtitle}` : ''}
              </h3>
              {p.imageUrl ? (
                <div
                  onClick={() => setLightboxImage(p.imageUrl || null)}
                  className="w-full rounded-2xl overflow-hidden border border-[var(--border-hairline)] bg-black/40 p-2 cursor-pointer flex items-center justify-center"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="max-h-[55vh] w-auto max-w-full object-contain rounded-xl"
                  />
                </div>
              ) : (
                <>
                  <p className="text-sm text-[var(--text-muted)]">{p.summary}</p>
                  {!p.placeholder && (
                    <Link
                      href={`/work/${p.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold"
                      style={{ backgroundColor: 'var(--category-accent)', color: '#14141F' }}
                    >
                      <span>view case study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  // Counter format: "01 / 02  AI ENGINEER"
  const categoryLabelUpper =
    activeCategory === 'ai'
      ? 'AI ENGINEER'
      : activeCategory === 'full-stack'
      ? 'FULL STACK'
      : activeCategory === 'data'
      ? 'DATA ANALYST'
      : 'DESIGNER';

  const counterText = `${String(activeIndex + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}  ${categoryLabelUpper}`;

  // Title formatting: first word upright, second part italic serif
  const titleParts = (activeProject?.title || '').split(' ');
  const firstWord = titleParts[0] || '';
  const restOfTitle = titleParts.slice(1).join(' ');
  const subtitleText = activeProject?.subtitle ? ` — ${activeProject.subtitle}` : '';

  return (
    <section
      ref={containerRef}
      style={{
        height: `${100 + 100 * count}vh`,
        ['--category-accent' as string]: categoryAccent,
      }}
      className="relative w-full"
      aria-label="Selected Work Interactive Project Wheel"
    >
      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--bg-base)] flex flex-col justify-between pt-20 md:pt-24 pb-8 transition-colors duration-200">
        {/* Top Header Bar */}
        <div className="w-full max-w-[1240px] mx-auto px-6 md:px-12 shrink-0 z-20 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {sectionIndex} {"//"} {sectionTitle}
              </span>
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--category-accent)' }}
              />
              <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                SCROLL-DRIVEN PROJECT DIAL
              </span>
            </div>

            {headerAction ? (
              headerAction
            ) : (
              <Link
                href="/work"
                className="group inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                data-cursor="all"
              >
                <span>index view (all)</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            )}
          </div>

          {/* UNDER THE HEADER LINE: Category Switcher Left-Aligned Pill Tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar py-0.5">
            <div
              role="tablist"
              aria-label="Project categories"
              className="flex items-center gap-2"
            >
              {CATEGORIES.map((cat, idx) => {
                const isActive = activeCategory === cat.id;
                const countBadge = categoryCounts[cat.id];
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    id={`tab-${cat.id}`}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleCategoryChange(cat.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`px-3.5 py-1.5 rounded-full font-mono text-xs flex items-center gap-2 transition-all duration-200 cursor-pointer border shrink-0 ${
                      isActive
                        ? 'font-bold shadow-xs'
                        : 'border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]/40 bg-transparent'
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: 'var(--category-accent)',
                            borderColor: 'transparent',
                            color: '#14141F',
                          }
                        : {}
                    }
                    data-cursor="filter"
                  >
                    <span>{cat.label}</span>
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none"
                      style={{
                        backgroundColor: isActive ? 'rgba(0,0,0,0.15)' : 'var(--bg-surface-elevated)',
                        color: isActive ? '#14141F' : 'var(--text-muted)',
                      }}
                    >
                      {String(countBadge).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Main Area: Left Wheel Arc + Right Details Panel */}
        <div className="relative flex-1 w-full max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between min-h-0">
          {/* ============================================================ */}
          {/* LEFT: THE GIANT PROJECT WHEEL DIAL                           */}
          {/* ============================================================ */}
          <div className="relative w-full lg:w-[48%] h-[300px] sm:h-[360px] lg:h-full flex items-center justify-start pointer-events-none select-none">
            {/* The Huge Circular Dial */}
            <motion.div
              style={{
                rotate: wheelRotation,
                willChange: 'transform',
              }}
              className="absolute -left-[90vw] sm:-left-[60vw] lg:-left-[42vw] top-1/2 -translate-y-1/2 w-[145vh] h-[145vh] max-w-[1150px] max-h-[1150px] rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)]/45 pointer-events-auto"
            >
              {/* Inner Decorative Hairline Circles */}
              <div className="absolute inset-8 rounded-full border border-dashed border-[var(--border-hairline)] opacity-60" />
              <div className="absolute inset-24 rounded-full border border-[var(--border-hairline)] opacity-35" />

              {/* Center Pivot Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] flex items-center justify-center">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: 'var(--category-accent)' }}
                />
              </div>

              {/* 72 Hairline SVG Ticks around the perimeter */}
              <svg
                viewBox="0 0 1000 1000"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {Array.from({ length: TOTAL_TICKS }).map((_, i) => {
                  const deg = i * 5;
                  const isMajor = deg % 30 === 0;
                  const rad = (deg * Math.PI) / 180;
                  const cx = 500;
                  const cy = 500;
                  const outerR = 496;
                  const innerR = isMajor ? 468 : 484;

                  const x1 = cx + outerR * Math.cos(rad);
                  const y1 = cy + outerR * Math.sin(rad);
                  const x2 = cx + innerR * Math.cos(rad);
                  const y2 = cy + innerR * Math.sin(rad);

                  return (
                    <line
                      key={deg}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={deg === 0 ? 'var(--category-accent)' : 'var(--border-hairline)'}
                      strokeWidth={deg === 0 ? 2 : isMajor ? 1.5 : 0.9}
                      className={isMajor && deg !== 0 ? 'stroke-[var(--text-muted)]' : ''}
                    />
                  );
                })}
              </svg>

              {/* Arc labels: one-word project name placed outside tick ring with 16px gap (translate 516px) */}
              {filteredProjects.map((proj, idx) => {
                const baseAngle = -idx * angleStep;
                const rawWord = proj.placeholder
                  ? 'DESIGN'
                  : proj.title.replace(/^\[|\]$/g, '').split(' ')[0];
                const oneWord = rawWord.toUpperCase();

                return (
                  <div
                    key={`arc-lbl-${proj.slug || proj.id || idx}`}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${baseAngle}deg) translate(516px) rotate(90deg)`,
                      transformOrigin: '0 0',
                    }}
                    className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] select-none whitespace-nowrap opacity-75 pointer-events-none"
                  >
                    {oneWord}
                  </div>
                );
              })}

              {/* Project Cards with 900ms transition between categories */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  className="absolute inset-0 pointer-events-none"
                >
                  {filteredProjects.map((proj, idx) => {
                    const baseAngle = -idx * angleStep;
                    const isActive = activeIndex === idx;

                    return (
                      <WheelProjectCard
                        key={proj.slug || proj.id || idx}
                        project={proj}
                        baseAngle={baseAngle}
                        index={idx}
                        activeIndex={activeIndex}
                        isActive={isActive}
                        wheelRotation={wheelRotation}
                        onClick={() => setActiveIndex(idx)}
                        categoryAccent={categoryAccent}
                        staggerDelay={idx * 0.06}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: ACTIVE PROJECT DETAILS EDITORIAL PANEL                */}
          {/* ============================================================ */}
          <div className="relative w-full lg:w-[48%] pl-0 lg:pl-10 z-20 flex flex-col justify-center py-4 lg:py-0">
            <AnimatePresence mode="wait">
              {activeProject?.imageUrl ? (
                /* Pure Visual Design Panel: Shows the artwork directly with zero extra boxes and zero case study page links */
                <motion.div
                  key={`${activeCategory}-${activeProject?.slug || activeProject?.id}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
                    <span
                      className="px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider text-[#14141F]"
                      style={{ backgroundColor: 'var(--category-accent)' }}
                    >
                      {activeProject?.categoryLabel}
                    </span>
                    <span>0{activeIndex + 1} {"//"} {activeProject?.year}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                      <span>{firstWord} </span>
                      <span className="font-serif italic font-normal text-[var(--text-muted)]">
                        {restOfTitle} {subtitleText}
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono mt-1">
                      {activeProject?.summary}
                    </p>
                  </div>

                  {/* The Case Study Image Itself - Click to Expand */}
                  <div
                    onClick={() => setLightboxImage(activeProject.imageUrl || null)}
                    className="group relative rounded-2xl overflow-hidden border border-[var(--border-hairline)] bg-black/40 p-2 sm:p-2.5 shadow-2xl cursor-pointer hover:border-[var(--category-accent)] transition-all duration-300"
                    title="Click to view full screen"
                  >
                    <div className="relative w-full max-h-[48vh] sm:max-h-[54vh] flex items-center justify-center rounded-xl overflow-hidden">
                      <img
                        src={activeProject.imageUrl}
                        alt={activeProject.title}
                        className="max-h-[48vh] sm:max-h-[54vh] w-auto max-w-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200">
                        <span className="px-3.5 py-1.5 rounded-full bg-black/85 text-white font-mono text-xs font-bold flex items-center gap-1.5 border border-white/20 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5 text-[var(--category-accent)]" />
                          <span>Expand Image</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Standard Engineering View */
                <motion.div
                  key={`${activeCategory}-${activeProject?.slug || activeProject?.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  {/* Meta Header */}
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
                    <span
                      className="px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider text-[#14141F]"
                      style={{ backgroundColor: 'var(--category-accent)' }}
                    >
                      {activeProject?.categoryLabel || categoryLabelUpper}
                    </span>
                    <span>{"//"} {activeProject?.year}</span>
                    <span className="hidden sm:inline">· {activeProject?.role}</span>
                  </div>

                  {/* Display Title: first word upright, second part italic serif */}
                  <div className="space-y-2">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
                      <span>{firstWord} </span>
                      <span className="font-serif italic font-normal text-[var(--text-muted)]">
                        {restOfTitle} {subtitleText}
                      </span>
                    </h3>
                  </div>

                  {/* One-Line Editorial Summary */}
                  <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-xl">
                    {activeProject?.placeholder
                      ? (activeCategory === 'data' ? 'Add a Power BI, Tableau or Python analysis here.' : 'Add your design work here.')
                      : activeProject?.summary}
                  </p>

                  {/* Stack Pills in Mono (up to 4) */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeProject?.stack?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-primary)] shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Case Study Button (hidden for placeholder) */}
                  {!activeProject?.placeholder && (
                    <div className="pt-3 flex items-center gap-4">
                      <MagneticButton dataCursor="view">
                        <Link
                          href={`/work/${activeProject?.slug}`}
                          className="px-6 py-3 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-2 shadow-sm text-[#14141F] hover:opacity-90"
                          style={{ backgroundColor: 'var(--category-accent)' }}
                        >
                          <span>view case study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </MagneticButton>

                      <span className="text-[11px] font-mono text-[var(--text-muted)] hidden sm:inline">
                        read full architecture & tradeoffs
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Bar: Dial Gauge Counter & Progress Strip */}
        <div className="w-full max-w-[1240px] mx-auto px-6 md:px-12 shrink-0 z-20">
          <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            {/* Step Counter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[var(--text-primary)]">
                {counterText}
              </span>
              <span className="hidden sm:inline text-[11px] opacity-75">
                — {activeProject?.title}
              </span>
            </div>

            {/* Visual Dial Progress Line */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
                scroll to rotate dial
              </span>
              <div className="w-28 sm:w-36 h-1 rounded-full bg-[var(--border-hairline)] overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: 'var(--category-accent)' }}
                  animate={{
                    width: `${((activeIndex + 1) / Math.max(count, 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox for Design Project Artwork */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 z-50 shadow-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={lightboxImage}
              alt="Design Asset Full Resolution"
              className="max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Individual card placed on the rotating wheel
interface WheelProjectCardProps {
  project: Project;
  baseAngle: number;
  index: number;
  activeIndex: number;
  isActive: boolean;
  wheelRotation: MotionValue<number>;
  onClick: () => void;
  categoryAccent: string;
  staggerDelay: number;
}

function WheelProjectCard({
  project,
  baseAngle,
  index,
  activeIndex,
  isActive,
  wheelRotation,
  onClick,
  categoryAccent,
  staggerDelay,
}: WheelProjectCardProps) {
  // Counter-rotation keeps card upright relative to the rotating wheel
  const counterRotation = useTransform(wheelRotation, (r: number) => -(r + baseAngle));

  const distance = Math.abs(index - activeIndex);

  // Sharpness rules:
  // Active: sharp (blur 0, opacity 1)
  // Distance 1 (neighbor): opacity 0.35, blur 2px, hide small inner text
  // Distance 2+: opacity 0.12, blur 2px, hide small inner text
  const targetOpacity = distance === 0 ? 1.0 : distance === 1 ? 0.35 : 0.12;
  const targetFilter = distance === 0 ? 'blur(0px)' : 'blur(2px)';

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `rotate(${baseAngle}deg) translate(370px)`,
        transformOrigin: '0 0',
      }}
      className="pointer-events-auto"
    >
      <motion.div
        initial={{ rotate: -60, opacity: 0, scale: 0.8 }}
        animate={{
          rotate: 0,
          opacity: targetOpacity,
          scale: isActive ? 1.0 : distance === 1 ? 0.82 : 0.72,
        }}
        exit={{
          rotate: 60,
          opacity: 0,
          scale: 0.8,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        }}
        transition={{
          duration: 0.9,
          delay: staggerDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          filter: targetFilter,
          willChange: 'transform, opacity, filter',
        }}
        onClick={onClick}
        whileHover={{ scale: isActive ? 1.03 : 0.88 }}
        className={`w-64 sm:w-72 p-4 rounded-2xl border transition-colors duration-200 cursor-pointer shadow-md select-none ${
          project.placeholder
            ? 'border-dashed border-2 border-[var(--category-accent)]/60 bg-[var(--bg-surface)]/60'
            : isActive
            ? 'bg-[var(--bg-surface-elevated)] border-[var(--category-accent)] ring-2 ring-[var(--category-accent)]/70 shadow-lg'
            : 'bg-[var(--bg-surface)] border-[var(--border-hairline)] hover:border-[var(--text-primary)]/40'
        }`}
        data-cursor="view"
      >
        <motion.div style={{ rotate: counterRotation }} className="space-y-3">
          {/* Card Top Meta */}
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
            <span className="font-bold text-[var(--text-primary)]">
              0{index + 1} {"//"} {project.year}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full uppercase font-medium ${
                isActive
                  ? 'text-[#14141F] font-bold'
                  : 'bg-[var(--bg-base)] text-[var(--text-muted)]'
              }`}
              style={isActive ? { backgroundColor: 'var(--category-accent)' } : {}}
            >
              {project.categories?.[0] === 'ai'
                ? 'AI'
                : project.categories?.[0] === 'full-stack'
                ? 'FULL STACK'
                : project.categories?.[0] === 'data'
                ? 'DATA'
                : 'DESIGN'}
            </span>
          </div>

          {/* Clean Unique SVG Art */}
          <ProjectStickerVisual project={project} categoryAccent={categoryAccent} />

          {/* Title & One-line summary */}
          <div className="space-y-1">
            <h4 className="text-base font-bold tracking-tight text-[var(--text-primary)] flex items-center justify-between">
              <span>{project.title}</span>
              {!project.placeholder && (
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform"
                  style={{ color: isActive ? 'var(--category-accent)' : 'var(--text-muted)' }}
                />
              )}
            </h4>
            {/* Small inner summary: only visible on the sharp active card */}
            {distance === 0 && (
              <p className="text-[11px] font-mono text-[var(--text-muted)] truncate">
                {project.summary}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
