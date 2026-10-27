'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface SelectedWorkSectionProps {
  reducedMotion?: boolean;
}

const SELECTED_PROJECTS = [
  {
    slug: 'anvil',
    title: 'ANVIL',
    year: '2026',
    description: 'Autonomous coding-agent harness.',
  },
  {
    slug: 'healthwe',
    title: 'HealthWe',
    year: '2026',
    description: 'AI clinical documentation platform.',
  },
  {
    slug: 'countrees',
    title: 'Countrees AI ERP',
    year: '2025',
    description: 'Backend and structured data work.',
  },
];

export function SelectedWorkSection({ reducedMotion = false }: SelectedWorkSectionProps) {
  return (
    <section className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-12 md:py-20 select-none">
      {/* Light Bezel Band (rounded 40px, ink #14141F, bg #ECEBF2) */}
      <div className="relative w-full rounded-[28px] sm:rounded-[40px] bg-[#ECEBF2] text-[#14141F] p-5 sm:p-12 shadow-2xl overflow-hidden border border-black/5">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 sm:pb-12 border-b border-black/10">
          <div>
            <span className="font-mono text-xs text-[#14141F]/60 uppercase tracking-widest block mb-1">
              Curated Output
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#14141F]">
              Selected work
            </h2>
          </div>

          <Link
            href="/work"
            data-cursor="view"
            className="group inline-flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm font-semibold text-[#14141F] hover:text-black border-b border-black/20 hover:border-black transition-all pb-0.5"
          >
            <span>see all work</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* ONLY 3 Rows: Compact, Stacks name above description on mobile, arrow stays right */}
        <div className="divide-y divide-black/10 pt-2">
          {SELECTED_PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              data-cursor="view"
              className="group flex flex-col md:flex-row md:items-center justify-between py-4 sm:py-8 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-2xl hover:bg-[#D6FF3D]/25 transition-all duration-300 gap-1.5 md:gap-0"
            >
              {/* Top / Left: Project Name + Year + Mobile Arrow */}
              <div className="flex items-center justify-between md:justify-start gap-4 md:gap-6 w-full md:w-auto">
                <div className="flex items-baseline gap-3 md:gap-6">
                  <span className="font-display text-xl sm:text-3xl md:text-4xl tracking-tight text-[#14141F] group-hover:translate-x-2 md:group-hover:translate-x-3 transition-transform duration-300 font-bold">
                    {project.title}
                  </span>
                  <span className="font-mono text-xs text-[#14141F]/60 font-medium">
                    {project.year}
                  </span>
                </div>
                {/* Mobile arrow on top right */}
                <div className="md:hidden w-7 h-7 rounded-full border border-black/15 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#14141F]" />
                </div>
              </div>

              {/* One-Line Description + Desktop Arrow */}
              <div className="flex items-center justify-between md:justify-end gap-6">
                <span className="font-mono text-xs sm:text-sm text-[#14141F]/75 group-hover:text-[#14141F] transition-colors font-medium">
                  {project.description}
                </span>
                <div className="hidden md:flex w-8 h-8 rounded-full border border-black/15 items-center justify-center group-hover:border-black group-hover:bg-[#14141F] transition-all">
                  <ArrowUpRight className="w-4 h-4 text-[#14141F] group-hover:text-white group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
