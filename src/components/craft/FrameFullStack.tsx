'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CRAFT_DISCIPLINES } from '@/data/craft';

interface FrameFullStackProps {
  reducedMotion?: boolean;
}

export function FrameFullStack({ reducedMotion }: FrameFullStackProps) {
  const discipline = CRAFT_DISCIPLINES[0];
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section
      id="full-stack"
      className="relative w-screen h-[100svh] flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden z-20 text-[#F3F0E8]"
      aria-label="Full Stack Frame"
    >
      <h2 className="sr-only">Full Stack Engineering</h2>

      {/* Faint 24px Grid Overlay */}
      <div
        className="absolute inset-0 bg-paper-grid opacity-15 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Discipline Tag */}
      <div className="relative z-20 flex items-center justify-between font-mono text-xs text-[#C5D4BD] tracking-wider uppercase">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D6FF3D] animate-pulse" />
          <span className="font-semibold text-white/90">Full Stack Systems</span>
        </span>
      </div>

      {/* Center 2-Column Split (Left-heavy, technical) */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto w-full">
        {/* Left 6 Columns: Statement & Spec Rows */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#D6FF3D] uppercase tracking-wider block font-semibold">
              WEB APPS · BACKENDS · DATABASES
            </span>
            <p
              style={{ color: '#F3F0E8' }}
              className="font-mono text-base sm:text-xl text-[#F3F0E8] max-w-lg leading-relaxed [text-shadow:0_2px_12px_rgba(15,17,24,0.9)]"
            >
              {discipline.statement}
            </p>
          </div>

          {/* 3 Spec Rows */}
          <div className="space-y-3 pt-2 max-w-lg">
            {discipline.lines.map((line, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const isHovered = hoveredRow === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="group relative cursor-pointer"
                >
                  <div className="flex items-center justify-between py-2 text-xs sm:text-sm font-mono transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-[#D6FF3D] font-bold">{num}</span>
                      <span className="text-[#F3F0E8] group-hover:text-white transition-colors [text-shadow:0_2px_8px_rgba(15,17,24,0.85)]">
                        {line}
                      </span>
                    </div>
                  </div>
                  {/* Thin line that extends on hover */}
                  <div className="relative h-px w-full bg-white/20 overflow-hidden">
                    <motion.div
                      animate={{
                        width: isHovered ? '100%' : '18%',
                        backgroundColor: isHovered ? '#D6FF3D' : 'rgba(214, 255, 61, 0.4)',
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="h-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional Text Link to /work */}
          <div className="pt-2">
            <Link
              href="/work?filter=full-stack"
              data-cursor="open"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#D6FF3D] hover:underline uppercase tracking-wider group font-semibold [text-shadow:0_1px_8px_rgba(15,17,24,0.8)]"
            >
              <span>see related work</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right 6 Columns: Clean Architecture Diagram (Browser -> API -> Database) */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#142A1D]/85 border border-white/15 backdrop-blur-md shadow-2xl relative overflow-hidden">
            {/* SVG Connecting Paths with pathLength */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              {/* Line 1: Browser -> API */}
              <motion.line
                x1="32%"
                y1="50%"
                x2="48%"
                y2="50%"
                stroke="#D6FF3D"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              {/* Line 2: API -> Database */}
              <motion.line
                x1="66%"
                y1="50%"
                x2="80%"
                y2="50%"
                stroke="#D6FF3D"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
              />
            </svg>

            {/* 3 Architecture Nodes */}
            <div className="relative z-10 grid grid-cols-3 gap-3 items-center text-center">
              {/* Node 1: Browser */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#1A3324]/90 border border-[#D6FF3D]/30 shadow-md">
                <div className="w-2 h-2 rounded-full bg-[#D6FF3D] mx-auto mb-2 shadow-[0_0_8px_#D6FF3D]" />
                <div className="font-mono text-xs sm:text-sm font-bold text-[#F3F0E8] tracking-wide">
                  Browser
                </div>
                <div className="font-mono text-[10px] text-[#C5D4BD] mt-1">
                  React / Next.js
                </div>
              </div>

              {/* Node 2: API */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#1A3324]/90 border border-[#D6FF3D]/30 shadow-md">
                <div className="w-2 h-2 rounded-full bg-[#D6FF3D] mx-auto mb-2 shadow-[0_0_8px_#D6FF3D]" />
                <div className="font-mono text-xs sm:text-sm font-bold text-[#F3F0E8] tracking-wide">
                  API
                </div>
                <div className="font-mono text-[10px] text-[#C5D4BD] mt-1">
                  FastAPI / Node.js
                </div>
              </div>

              {/* Node 3: Database */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#1A3324]/90 border border-[#D6FF3D]/30 shadow-md">
                <div className="w-2 h-2 rounded-full bg-[#D6FF3D] mx-auto mb-2 shadow-[0_0_8px_#D6FF3D]" />
                <div className="font-mono text-xs sm:text-sm font-bold text-[#F3F0E8] tracking-wide">
                  Database
                </div>
                <div className="font-mono text-[10px] text-[#C5D4BD] mt-1">
                  PostgreSQL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mono Tools Line */}
      <div className="relative z-20 pt-4 border-t border-white/10 font-mono text-[11px] sm:text-xs text-[#C5D4BD] tracking-wider overflow-x-auto whitespace-nowrap">
        <span>{discipline.tools}</span>
      </div>
    </section>
  );
}
