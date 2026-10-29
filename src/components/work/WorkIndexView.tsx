'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { CategoryFilter, CATEGORIES } from '@/components/work/ProjectWheel';
import { ArrowUpRight, Maximize2, X } from 'lucide-react';
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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

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

      {/* If Design category: render a pure visual gallery grid without extra boxes or case study pages */}
      {activeCategory === 'design' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {filteredProjects.map((project, index) => {
            const indexStr = (index + 1).toString().padStart(2, '0');
            return (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setLightboxImage(project.imageUrl || null)}
                className="group relative rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4 sm:p-5 hover:border-[var(--category-accent)] transition-all duration-300 shadow-md cursor-pointer space-y-3.5 select-none"
              >
                <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
                  <span className="font-bold text-[var(--text-primary)]">
                    {indexStr} {"//"} {project.categoryLabel}
                  </span>
                  <span>{project.year}</span>
                </div>

                <div className="relative w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center p-2 border border-black/10">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200 pointer-events-none">
                    <span className="px-4 py-2 rounded-full bg-black/85 text-white font-mono text-xs font-bold flex items-center gap-2 border border-white/20 shadow-xl">
                      <Maximize2 className="w-3.5 h-3.5 text-[var(--category-accent)]" />
                      <span>Expand Full Screen</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {project.title}{' '}
                    {project.subtitle && (
                      <span className="font-serif italic font-normal text-[var(--text-muted)] text-base sm:text-lg">
                        — {project.subtitle}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono line-clamp-1">
                    {project.summary}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Filtered Technical Projects Editorial Rows */
        <div className="space-y-4" onMouseLeave={() => setHoveredSlug(null)}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isHovered = hoveredSlug === (project.slug || project.id);
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
      )}

      {/* Fullscreen Lightbox for Design Gallery */}
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
              alt="Design Preview"
              className="max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
