'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface SelectedWorkSectionProps {
  reducedMotion?: boolean;
}

const SELECTED_WORK = [
  {
    id: 'anvil',
    name: 'ANVIL',
    year: '2026',
    tagline: 'Autonomous coding-agent harness that turns GitHub issues into verified patches.',
    href: '/work/anvil',
  },
  {
    id: 'healthwe',
    name: 'HealthWe',
    year: '2026',
    tagline: 'AI clinical documentation platform with citation validation.',
    href: '/work/healthwe',
  },
  {
    id: 'countrees',
    name: 'Countrees AI ERP',
    year: '2025',
    tagline: 'Backend and structured data systems for enterprise workflows.',
    href: '/work/countrees',
  },
];

export function SelectedWorkSection({ reducedMotion = false }: SelectedWorkSectionProps) {
  return (
    <section
      id="selected-work"
      className="relative w-full bg-[#161925] text-[#F2F1F7] py-24 sm:py-32 scroll-mt-20 overflow-hidden"
    >
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 md:px-14 space-y-10 sm:space-y-12">
        {/* Header: "Selected work" + "see all work" text link */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-light tracking-tight text-[#F2F1F7]">
            Selected <span className="font-serif italic font-normal text-[#A7AABF]">work.</span>
          </h2>

          <Link
            href="/work"
            data-cursor="open"
            className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm hover:text-[#D6FF3D] transition-colors w-fit"
            style={{ color: '#A7AABF' }}
          >
            <span>see all work</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D6FF3D]" />
          </Link>
        </motion.div>

        {/* Compact List of 3 Rows (name + year + one short line, arrow) - NO tags, NO posters */}
        <div className="border-t border-white/[0.08]">
          {SELECTED_WORK.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: reducedMotion ? 0 : idx * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={item.href}
                data-cursor="view"
                className="group relative block w-full py-6 sm:py-8 px-4 sm:px-6 border-b border-white/[0.08] transition-colors duration-200 hover:bg-[#1D2130] rounded-2xl"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Name + Year */}
                  <div className="flex items-baseline gap-4 md:w-1/3 shrink-0">
                    <span className="font-sans font-medium text-2xl sm:text-3xl text-[#F2F1F7] group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-[#8A8EA8]">
                      {item.year}
                    </span>
                  </div>

                  {/* Middle: One short line */}
                  <div className="md:w-1/2">
                    <p className="text-sm sm:text-base text-[#A7AABF] group-hover:text-[#F2F1F7] transition-colors font-sans">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Right: Arrow */}
                  <div className="flex items-center md:justify-end md:w-1/6 shrink-0">
                    <div className="w-9 h-9 rounded-full border border-white/10 group-hover:border-[#D6FF3D]/40 flex items-center justify-center text-[#8A8EA8] group-hover:text-[#D6FF3D] group-hover:bg-[#D6FF3D]/10 transition-all">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
