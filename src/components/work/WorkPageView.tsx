'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Project } from '@/data/projects';
import { ProjectWheel, CategoryFilter, CATEGORIES } from '@/components/work/ProjectWheel';
import { WorkIndexView } from '@/components/work/WorkIndexView';
import { Sparkles, ListFilter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkPageViewProps {
  projects: Project[];
}

export function WorkPageView({ projects }: WorkPageViewProps) {
  const [viewMode, setViewMode] = useState<'dial' | 'list'>('dial');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ai');
  const [, startTransition] = useTransition();

  // Sync category & view mode with URL & handle back/forward
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const readUrlParams = () => {
        const params = new URLSearchParams(window.location.search);
        const requestedFilter = params.get('filter') as CategoryFilter | null;
        if (
          requestedFilter === 'ai' ||
          requestedFilter === 'full-stack' ||
          requestedFilter === 'data' ||
          requestedFilter === 'design'
        ) {
          setActiveCategory(requestedFilter);
        } else {
          setActiveCategory('ai');
        }

        const requestedView = params.get('view');
        if (requestedView === 'list' || requestedView === 'dial') {
          startTransition(() => {
            setViewMode(requestedView);
          });
        }
      };

      readUrlParams();
      window.addEventListener('popstate', readUrlParams);
      return () => window.removeEventListener('popstate', readUrlParams);
    }
  }, []);

  const handleCategoryChange = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('filter', cat);
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleToggle = (mode: 'dial' | 'list') => {
    setViewMode(mode);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('view', mode);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const ViewSwitcher = (
    <div className="flex items-center gap-1 p-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] font-mono text-xs shadow-2xs">
      <button
        onClick={() => handleToggle('dial')}
        type="button"
        className={`px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
          viewMode === 'dial'
            ? 'bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-bold shadow-xs'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
        data-cursor="view"
      >
        <Sparkles className="w-3 h-3" />
        <span>dial view</span>
      </button>

      <button
        onClick={() => handleToggle('list')}
        type="button"
        className={`px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
          viewMode === 'list'
            ? 'bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-bold shadow-xs'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
        data-cursor="view"
      >
        <ListFilter className="w-3 h-3" />
        <span>list index</span>
      </button>
    </div>
  );

  if (viewMode === 'dial') {
    return (
      <div>
        <ProjectWheel
          projects={projects}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          sectionIndex="02"
          sectionTitle="WORK ARCHIVE"
          headerAction={ViewSwitcher}
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-8 md:pb-16 space-y-10">
      {/* Header Bar with View Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-hairline)]">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <span>INDEX {"//"} 02</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)]" />
            <span>SELECTED WORK ARCHIVE</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[var(--text-primary)]">
            Selected{' '}
            <span className="font-serif italic font-normal text-[var(--text-primary)]">
              Work
            </span>
          </h1>

          <p className="text-base md:text-lg text-[var(--text-muted)] font-mono leading-relaxed">
            Deep dives into autonomous coding-agent harnesses, clinical document extraction pipelines, and database query optimizations.
          </p>
        </div>

        <div className="shrink-0">{ViewSwitcher}</div>
      </div>

      {/* Interactive Work List with Category Tabs & Sibling Dimming */}
      <AnimatePresence mode="wait">
        <motion.div
          key="list"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <WorkIndexView
            projects={projects}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
