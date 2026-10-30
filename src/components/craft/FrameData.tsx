'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart2 } from 'lucide-react';
import { CRAFT_DISCIPLINES } from '@/data/craft';

interface FrameDataProps {
  reducedMotion?: boolean;
}

export function FrameData({ reducedMotion }: FrameDataProps) {
  const discipline = CRAFT_DISCIPLINES.find((d) => d.id === 'data') || CRAFT_DISCIPLINES[2];
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
  const bars = [
    { x: 30, h: 42, y: 78 },
    { x: 80, h: 65, y: 55 },
    { x: 130, h: 50, y: 70 },
    { x: 180, h: 85, y: 35 },
    { x: 230, h: 72, y: 48 },
    { x: 280, h: 96, y: 24 },
  ];

  return (
    <section
      id="data-analyst"
      className="relative w-screen h-[100svh] flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden z-20 text-[#F2F1F7]"
      aria-label="Data Analyst Frame"
    >
      <h2 className="sr-only">Data Analyst Engineering</h2>

      {/* Faint Grid Lines */}
      <div
        className="absolute inset-0 bg-paper-grid opacity-15 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Discipline Tag */}
      <div className="relative z-20 flex items-center justify-between font-mono text-xs text-[#CFCFD8] tracking-wider uppercase">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5CE1E6] animate-pulse" />
          <span className="font-semibold text-white/90">Data Analyst</span>
        </span>
      </div>

      {/* Center 2-Column Split: Solid "DATA" on left, Chart Panel + 3 Rows on right */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto w-full">
        {/* Left Column: Solid word "DATA" huge & statement */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#5CE1E6] uppercase tracking-wider block font-semibold">
              CLEAN · SHAPE · VISUALIZE
            </span>
            <div className="select-none">
              <span className="font-display font-black text-6xl sm:text-8xl lg:text-9xl tracking-tighter text-[#5CE1E6] leading-none [text-shadow:0_4px_30px_rgba(92,225,230,0.3)] block">
                DATA
              </span>
            </div>
            <p className="font-mono text-base sm:text-xl text-[#F2F1F7] max-w-lg leading-relaxed [text-shadow:0_2px_12px_rgba(15,17,24,0.9)]">
              numbers into{' '}
              <span className="font-serif italic font-normal text-[#F2F1F7]">decisions</span>
              , clearly.
            </p>
          </div>

          {/* Optional Text Link to /work */}
          <div className="pt-2">
            <Link
              href="/work?filter=data"
              data-cursor="open"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#5CE1E6] hover:underline uppercase tracking-wider group font-semibold [text-shadow:0_1px_8px_rgba(15,17,24,0.8)]"
            >
              <span>see related work</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Sketch Dashboard Chart Panel + 3 Lines */}
        <div className="lg:col-span-7 space-y-6">
          {/* Sketch Dashboard SVG Chart Panel */}
          <div className="w-full p-5 sm:p-6 rounded-2xl bg-[#0B1A33]/90 border border-[#5CE1E6]/25 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs text-[#CFCFD8]">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#5CE1E6]" />
                <span className="font-semibold text-white/90">ANALYTICS SKETCHPAD</span>
              </div>
              <span className="text-[10px] text-[#8E9EB5]">PIPELINE · CADENCE</span>
            </div>

            {/* SVG Chart: Gridlines + Bars Rising + PathLength Line + Jan–Jun Labels */}
            <div className="pt-4 pb-2">
              <svg viewBox="0 0 320 145" className="w-full h-36 sm:h-44 overflow-visible" aria-hidden="true">
                {/* Horizontal Gridlines */}
                <line x1="15" y1="25" x2="305" y2="25" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <line x1="15" y1="55" x2="305" y2="55" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <line x1="15" y1="85" x2="305" y2="85" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <line x1="15" y1="120" x2="305" y2="120" stroke="rgba(255,255,255,0.18)" />

                {/* Bars Rising */}
                {bars.map((bar, i) => (
                  <motion.rect
                    key={i}
                    x={bar.x - 10}
                    y={bar.y}
                    width="20"
                    height={bar.h}
                    rx="4"
                    fill="rgba(92, 225, 230, 0.22)"
                    stroke="#5CE1E6"
                    strokeWidth="1.2"
                    initial={reducedMotion ? false : { scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                    style={{ originY: '120px' }}
                  />
                ))}

                {/* Curved Trend Line drawn with pathLength */}
                <motion.path
                  d="M 30,82 Q 80,45 130,68 T 230,42 T 280,22"
                  fill="none"
                  stroke="#5CE1E6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={reducedMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: 'easeInOut' }}
                />

                {/* Dots at data checkpoints */}
                {[
                  { cx: 30, cy: 82 },
                  { cx: 80, cy: 56 },
                  { cx: 130, cy: 68 },
                  { cx: 180, cy: 38 },
                  { cx: 230, cy: 42 },
                  { cx: 280, cy: 22 },
                ].map((pt, i) => (
                  <motion.circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="4"
                    fill="#12284A"
                    stroke="#5CE1E6"
                    strokeWidth="2"
                    initial={reducedMotion ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.25, delay: 0.8 + i * 0.07 }}
                  />
                ))}

                {/* Axis Labels (Jan–Jun placeholders) */}
                {months.map((m, i) => (
                  <text
                    key={m}
                    x={bars[i].x}
                    y="138"
                    textAnchor="middle"
                    fill="#8E9EB5"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {m}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          {/* 3 Spec Rows */}
          <div className="space-y-3 pt-1">
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
                      <span className="text-[#5CE1E6] font-bold">{num}</span>
                      <span className="text-[#F2F1F7] group-hover:text-white transition-colors [text-shadow:0_2px_8px_rgba(15,17,24,0.85)]">
                        {line}
                      </span>
                    </div>
                  </div>
                  {/* Thin line that extends on hover */}
                  <div className="relative h-px w-full bg-white/20 overflow-hidden">
                    <motion.div
                      animate={{
                        width: isHovered ? '100%' : '18%',
                        backgroundColor: isHovered ? '#5CE1E6' : 'rgba(92, 225, 230, 0.4)',
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="h-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Mono Tools Line */}
      <div className="relative z-20 pt-4 border-t border-white/10 font-mono text-[11px] sm:text-xs text-[#CFCFD8] tracking-wider overflow-x-auto whitespace-nowrap">
        <span>{discipline.tools}</span>
      </div>
    </section>
  );
}
