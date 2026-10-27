'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkIndexViewProps {
  projects: Project[];
  initialFilter?: string | null;
}

type FilterCategory = 'all' | 'full-stack' | 'ai' | 'design' | 'backend';

export function WorkIndexView({ projects, initialFilter }: WorkIndexViewProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(() => {
    if (initialFilter === 'full-stack' || initialFilter === 'ai' || initialFilter === 'design' || initialFilter === 'backend') {
      return initialFilter;
    }
    return 'all';
  });
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialFilter && (initialFilter === 'full-stack' || initialFilter === 'ai' || initialFilter === 'design' || initialFilter === 'backend')) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return p.category === 'ai' || p.categoryLabel.toLowerCase().includes('ai');
    if (activeFilter === 'backend') return p.category === 'backend' || p.categoryLabel.toLowerCase().includes('backend');
    if (activeFilter === 'full-stack') return p.category === 'full-stack' || p.categoryLabel.toLowerCase().includes('full-stack');
    if (activeFilter === 'design') return p.stack.some((s) => s.toLowerCase().includes('design') || s.toLowerCase().includes('figma') || s.toLowerCase().includes('interface')) || p.categoryLabel.toLowerCase().includes('design');
    return true;
  });

  const filterTabs: { label: string; value: FilterCategory }[] = [
    { label: 'all projects', value: 'all' },
    { label: 'full-stack', value: 'full-stack' },
    { label: 'ai systems', value: 'ai' },
    { label: 'design', value: 'design' },
    { label: 'backend & data', value: 'backend' },
  ];

  return (
    <div className="space-y-12">
      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[var(--border-hairline)]">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs cursor-pointer transition-all duration-200 border ${
                isActive
                  ? 'bg-[var(--accent-lime)] text-[var(--accent-lime-text)] border-black/20 font-bold shadow-xs'
                  : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]/40'
              }`}
              data-cursor="filter"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Projects Editorial Rows */}
      <div
        className="space-y-4"
        onMouseLeave={() => setHoveredSlug(null)}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredSlug === project.slug;
            const isAnyHovered = hoveredSlug !== null;
            const isDimmed = isAnyHovered && !isHovered;
            const indexStr = (index + 1).toString().padStart(2, '0');

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
                    {/* Left: Index & Giant Title */}
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
                        <span className="font-bold text-[var(--text-primary)]">{indexStr} {"//"}</span>
                        <span className="px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)] text-[10px] uppercase font-semibold">
                          {project.categoryLabel}
                        </span>
                        <span>{project.year}</span>
                        <span className="hidden sm:inline">· {project.role}</span>
                      </div>

                      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] flex flex-wrap items-baseline gap-3">
                        <span>{project.title}</span>
                        <span className="text-lg md:text-2xl font-serif italic font-normal text-[var(--text-muted)]">
                          {project.subtitle}
                        </span>
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
                        {project.stack.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[var(--text-muted)]">
                            +{project.stack.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs border border-[var(--border-hairline)] bg-[var(--bg-base)] group-hover:bg-[var(--accent-lime)] group-hover:text-[var(--accent-lime-text)] group-hover:border-black/20 transition-all duration-200">
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
