'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { CategoryFilter, CATEGORIES } from '@/components/work/ProjectWheel';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkIndexViewProps {
  projects: Project[];
  activeCategory?: CategoryFilter;
  onCategoryChange?: (cat: CategoryFilter) => void;
  initialFilter?: string | null;
}

export function WorkIndexView({
  projects,
  activeCategory = 'ai',
  onCategoryChange,
}: WorkIndexViewProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const activeCategoryConfig =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const categoryAccent = activeCategoryConfig.accent;

  const categoryCounts: Record<CategoryFilter, number> = {
    ai: projects.filter((p) => p.categories?.includes('ai')).length,
    'full-stack': projects.filter((p) => p.categories?.includes('full-stack')).length,
    data: projects.filter((p) => p.categories?.includes('data')).length,
    design: projects.filter((p) => p.categories?.includes('design')).length,
  };

  const filteredProjects = projects.filter((p) =>
    p.categories?.includes(activeCategory)
  );

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (!onCategoryChange) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % CATEGORIES.length;
      onCategoryChange(CATEGORIES[nextIndex].id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
      onCategoryChange(CATEGORIES[prevIndex].id);
    }
  };

  return (
    <div
      style={{ ['--category-accent' as string]: categoryAccent }}
      className="space-y-8"
    >
      {/* Category Filter Tabs under header */}
      <div className="flex items-center overflow-x-auto no-scrollbar pb-4 border-b border-[var(--border-hairline)]">
        <div
          role="tablist"
          aria-label="Project categories"
          className="flex items-center gap-2"
        >
          {CATEGORIES.map((cat, idx) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id];
            return (
              <button
                key={cat.id}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onCategoryChange?.(cat.id)}
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
                    backgroundColor: isActive
                      ? 'rgba(0,0,0,0.15)'
                      : 'var(--bg-surface-elevated)',
                    color: isActive ? '#14141F' : 'var(--text-muted)',
                  }}
                >
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Projects Editorial Rows (name, year, one-line summary, tags, arrow) */}
      <div className="space-y-4" onMouseLeave={() => setHoveredSlug(null)}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredSlug === (project.slug || project.id);
            const isAnyHovered = hoveredSlug !== null;
            const isDimmed = isAnyHovered && !isHovered;
            const indexStr = (index + 1).toString().padStart(2, '0');

            if (project.placeholder) {
              return (
                <motion.div
                  key={project.id || 'placeholder'}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border-2 border-dashed border-[var(--category-accent)]/50 bg-[var(--bg-surface)]/60 p-6 md:p-8 space-y-3"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
                        <span className="font-bold text-[var(--text-primary)]">
                          {indexStr} {"//"}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold text-[#14141F]"
                          style={{ backgroundColor: 'var(--category-accent)' }}
                        >
                          DESIGN
                        </span>
                        <span>{project.year}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                        + Add Project
                      </h2>
                      <p className="text-xs md:text-sm text-[var(--text-muted)]">
                        Add your design work here.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-[var(--bg-base)] border border-[var(--border-hairline)] text-[var(--text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: isDimmed ? 0.35 : 1,
                  y: 0,
                  scale: isHovered ? 1.01 : 1,
                }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                className="group relative rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 md:p-8 hover:border-[var(--text-primary)]/40 hover:bg-[var(--bg-surface-elevated)] transition-colors duration-200"
                data-cursor="view"
              >
                <Link href={`/work/${project.slug}`} className="block focus:outline-none">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Index, Title, Year, Summary */}
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
                        <span className="font-bold text-[var(--text-primary)]">
                          {indexStr} {"//"}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold text-[#14141F]"
                          style={{ backgroundColor: 'var(--category-accent)' }}
                        >
                          {activeCategory.toUpperCase()}
                        </span>
                        <span>{project.year}</span>
                        <span className="hidden sm:inline">· {project.role}</span>
                      </div>

                      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] flex flex-wrap items-baseline gap-3">
                        <span>{project.title}</span>
                        {project.subtitle && (
                          <span className="text-lg md:text-2xl font-serif italic font-normal text-[var(--text-muted)]">
                            — {project.subtitle}
                          </span>
                        )}
                      </h2>

                      <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-2xl line-clamp-2">
                        {project.summary}
                      </p>
                    </div>

                    {/* Right: Stack tags & Action arrow */}
                    <div className="flex flex-wrap lg:flex-col lg:items-end justify-between items-center gap-4 shrink-0">
                      <div className="flex flex-wrap gap-1.5 max-w-xs justify-start lg:justify-end">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-base)] border border-[var(--border-hairline)] text-[var(--text-primary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs border border-[var(--border-hairline)] bg-[var(--bg-base)] group-hover:text-[#14141F] group-hover:border-transparent transition-all duration-200"
                        style={{
                          // On group hover, it lights up with the category accent
                        }}
                      >
                        <span>open case study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
