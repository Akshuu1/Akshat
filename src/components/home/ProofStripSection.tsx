'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ProofStripSectionProps {
  reducedMotion?: boolean;
}

const FACTS = [
  {
    value: '2024-28',
    label: 'B.Tech CS, Newton School of Technology',
    detail: 'Specializing in CS & AI at Rishihood University',
  },
  {
    value: 'Mar-Aug 2025',
    label: 'Software developer intern, Countrees AI',
    detail: 'Backend logic & structured data across database ERP systems',
  },
  {
    value: 'Top 10',
    label: '3 hackathons',
    detail: 'Placed in top 10 across 3 national hackathons',
  },
  {
    value: '7.2',
    label: 'CGPA',
    detail: 'Consistent academic foundation in computing core',
  },
];

export function ProofStripSection({ reducedMotion = false }: ProofStripSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-12 md:py-20 select-none">
      {/* Light Bezel Band (rounded 40px, ink #14141F, background #ECEBF2) */}
      <div
        ref={containerRef}
        className="relative w-full rounded-[36px] sm:rounded-[40px] bg-[#ECEBF2] text-[#14141F] p-8 sm:p-12 shadow-2xl overflow-hidden border border-black/5"
      >
        {/* Notch with pill "at a glance" */}
        <div className="flex items-center justify-between pb-8 sm:pb-12 border-b border-black/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141F] text-[#ECEBF2] font-mono text-xs font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6FF3D]" />
            <span>at a glance</span>
          </div>
          <span className="font-mono text-xs text-[#14141F]/50 hidden sm:inline-block tracking-widest uppercase">
            VERIFIED FACTS
          </span>
        </div>

        {/* 4 Facts Row (2x2 on mobile, 4 in a row on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8 pt-6 sm:pt-8">
          {FACTS.map((fact, idx) => (
            <motion.div
              key={idx}
              initial={reducedMotion ? {} : { opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reducedMotion ? {} : { y: -8 }}
              className="group relative p-3.5 sm:p-6 rounded-2xl bg-white/70 hover:bg-white border border-black/5 hover:border-black/15 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-default"
            >
              <div className="space-y-1.5 sm:space-y-2">
                {/* Big Number / Fact */}
                <div className="font-display text-[clamp(28px,9vw,44px)] sm:text-4xl text-[#14141F] tracking-tight group-hover:text-black transition-colors leading-tight">
                  {fact.value}
                </div>
                {/* Mono Caption */}
                <p className="font-mono text-xs sm:text-sm text-[#14141F]/80 leading-snug font-medium">
                  {fact.label}
                </p>
              </div>

              {/* One-line detail shown on hover in ink, always visible on mobile */}
              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-black/10">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#14141F]/65 group-hover:text-[#14141F] transition-colors leading-tight block">
                  {fact.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
