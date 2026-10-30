'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectPreviewCardProps {
  project: Project;
  index: number;
}

export function ProjectPreviewCard({ project, index }: ProjectPreviewCardProps) {
  const indexStr = (index + 1).toString().padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 md:p-10 transition-all duration-300 hover:border-[var(--text-primary)]/40 hover:bg-[var(--bg-surface-elevated)]"
      data-cursor="view"
    >
      <Link href={`/work/${project.slug}`} className="block focus:outline-none">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[var(--border-hairline)] font-mono text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[var(--text-primary)]">{indexStr} {"//"}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--bg-base)] border border-[var(--border-hairline)] uppercase text-[10px] tracking-wider text-[var(--text-primary)]">
              {project.categoryLabel}
            </span>
            <span>{project.year}</span>
          </div>
          <span className="hidden sm:inline text-[11px] text-[var(--text-muted)]">
            {project.role}
          </span>
        </div>

        {/* Content Body */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1">
              <h3
                style={{ color: 'var(--text-primary)' }}
                className="text-2xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] group-hover:translate-x-1 transition-transform duration-200"
              >
                {project.title}
                <span
                  style={{ color: 'var(--text-primary)' }}
                  className="inline-block text-xl md:text-2xl font-serif italic font-normal text-[var(--text-primary)] ml-3"
                >
                  — {project.subtitle}
                </span>
              </h3>
            </div>

            <p
              style={{ color: 'var(--text-muted)' }}
              className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl"
            >
              {project.summary}
            </p>

            {/* Stack Tags */}
            <div className="pt-2 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--bg-base)] border border-[var(--border-hairline)] text-[var(--text-primary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Action Pill */}
          <div className="lg:col-span-4 flex lg:justify-end items-center self-end lg:self-center">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--bg-base)] border border-[var(--border-hairline)] text-xs font-mono group-hover:bg-[var(--accent-lime)] group-hover:text-[var(--accent-lime-text)] group-hover:border-black/20 transition-all duration-200">
              <span className="font-medium">case study</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
