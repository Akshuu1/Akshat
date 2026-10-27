'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface DisciplinesSectionProps {
  reducedMotion?: boolean;
}

const DISCIPLINES = [
  {
    id: 'full-stack',
    name: 'Full-stack',
    description: 'Web apps, backends and databases. React, Next.js, FastAPI, PostgreSQL.',
    href: '/craft#full-stack',
  },
  {
    id: 'ai-engineering',
    name: 'AI engineering',
    description: 'Agents and LLM pipelines that check their own work. ANVIL, HealthWe.',
    href: '/craft#ai-ml',
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Interfaces with taste: systems first, then the details that feel alive.',
    href: '/craft#designer',
  },
];

export function DisciplinesSection({ reducedMotion = false }: DisciplinesSectionProps) {
  return (
    <section
      id="what-i-do"
      className="relative w-full bg-[#0F1118] text-[#F2F1F7] pt-28 pb-28 sm:pt-36 sm:pb-36 scroll-mt-20 overflow-hidden"
    >
      {/* =================================================================== */}
      {/* TRANSITION FROM HERO: 160px Gradient + Faint Mountain-Ridge (6% op)  */}
      {/* =================================================================== */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-[#0F1118]" />
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute top-0 w-full h-24 text-white opacity-[0.06] fill-current"
          aria-hidden="true"
        >
          <path d="M0,0 L0,45 L110,30 L240,65 L380,18 L530,55 L680,15 L840,50 L1010,22 L1170,60 L1310,30 L1440,48 L1440,0 Z" />
        </svg>
      </div>

      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 md:px-14 relative z-20">
        {/* Header: "What I do" + "Three ways I build." */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2 pb-12 sm:pb-16"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-light tracking-tight text-[#F2F1F7]">
            What I <span className="font-serif italic font-normal text-[#A7AABF]">do.</span>
          </h2>
          <p
            className="text-sm sm:text-base font-sans"
            style={{ color: '#A7AABF' }}
          >
            Three ways I build.
          </p>
        </motion.div>

        {/* 3 Large Rows with Hairline Dividers */}
        <div className="border-t border-white/[0.08]">
          {DISCIPLINES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: reducedMotion ? 0 : index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={item.href}
                data-cursor="reel"
                className="group relative block w-full py-8 sm:py-12 md:py-14 px-4 sm:px-8 border-b border-white/[0.08] transition-colors duration-200 hover:bg-[#1D2130] rounded-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                  {/* Left: Huge Discipline Name */}
                  <div className="md:col-span-5">
                    <h3
                      className="font-sans font-light text-[#F2F1F7] tracking-tight transition-transform duration-200 group-hover:translate-x-3 leading-[1.05]"
                      style={{ fontSize: 'clamp(36px, 5.5vw, 92px)' }}
                    >
                      {item.name}
                    </h3>
                  </div>

                  {/* Middle: Short Description */}
                  <div className="md:col-span-5">
                    <p
                      className="text-sm sm:text-base leading-relaxed font-sans max-w-md"
                      style={{ color: '#A7AABF' }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Right: "view in craft" arrow */}
                  <div className="md:col-span-2 flex items-center md:justify-end gap-2 pt-2 md:pt-0">
                    <span
                      className="font-mono text-xs uppercase tracking-wider group-hover:text-[#F2F1F7] transition-colors hidden sm:inline"
                      style={{ color: '#8A8EA8' }}
                    >
                      view in craft
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#D6FF3D]/40 flex items-center justify-center text-[#8A8EA8] group-hover:text-[#D6FF3D] group-hover:bg-[#D6FF3D]/10 transition-all">
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
