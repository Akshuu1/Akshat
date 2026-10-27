'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface SelectedWorkSectionProps {
  reducedMotion?: boolean;
}

// 1. ANVIL SVG ART: 9 dots in a line joined by a path with a loop-back arrow
function AnvilArt() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-full max-h-[180px] select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="loop-arrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#D6FF3D" />
        </marker>
        <linearGradient id="path-grad" x1="30" y1="90" x2="310" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9AA3FF" stopOpacity="0.4" />
          <stop offset="0.6" stopColor="#D6FF3D" />
          <stop offset="1" stopColor="#9AA3FF" />
        </linearGradient>
      </defs>

      {/* Main forward path connecting 9 dots */}
      <path
        d="M 30 100 H 310"
        stroke="url(#path-grad)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />

      {/* Loop-back curved arrow from end back to step 1 */}
      <path
        d="M 310 100 C 310 160, 240 175, 170 175 C 90 175, 30 155, 30 114"
        stroke="#D6FF3D"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#loop-arrow)"
      />

      {/* Loop label chip */}
      <rect x="135" y="163" width="70" height="22" rx="11" fill="#161824" stroke="#D6FF3D" strokeWidth="1" />
      <text x="170" y="178" fill="#D6FF3D" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        LOOP REPLAY
      </text>

      {/* 9 Dots along the path */}
      {[
        { x: 30, active: true },
        { x: 65, active: false },
        { x: 100, active: false },
        { x: 135, active: true },
        { x: 170, active: false },
        { x: 205, active: false },
        { x: 240, active: true },
        { x: 275, active: false },
        { x: 310, active: true },
      ].map((dot, idx) => (
        <g key={idx}>
          {dot.active && (
            <circle cx={dot.x} cy="100" r="10" fill="#D6FF3D" fillOpacity="0.15" />
          )}
          <circle
            cx={dot.x}
            cy="100"
            r={dot.active ? '5' : '3.5'}
            fill={dot.active ? '#D6FF3D' : '#1D2130'}
            stroke={dot.active ? '#D6FF3D' : '#9AA3FF'}
            strokeWidth="1.5"
          />
          <text
            x={dot.x}
            y="82"
            fill={dot.active ? '#D6FF3D' : '#8A8EA8'}
            fontSize="9"
            fontFamily="monospace"
            textAnchor="middle"
          >
            0{idx + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

// 2. HealthWe SVG ART: a document with 3 highlighted lines, each linked to a small citation chip
function HealthWeArt() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-full max-h-[180px] select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Document Sheet */}
      <rect
        x="45"
        y="25"
        width="160"
        height="170"
        rx="12"
        fill="#1D2130"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
      />

      {/* Doc header / title lines */}
      <rect x="65" y="45" width="60" height="6" rx="3" fill="#9AA3FF" fillOpacity="0.6" />
      <rect x="65" y="60" width="120" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />

      {/* Highlight Line 1 (Lavender) */}
      <rect x="65" y="78" width="115" height="12" rx="3" fill="#9AA3FF" fillOpacity="0.18" stroke="#9AA3FF" strokeWidth="1.5" />
      {/* Connector Line 1 to Citation 1 */}
      <path d="M 180 84 H 225 C 235 84, 235 65, 245 65 H 255" stroke="#9AA3FF" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Citation Chip 1 */}
      <rect x="255" y="53" width="55" height="24" rx="12" fill="#161824" stroke="#9AA3FF" strokeWidth="1.5" />
      <text x="282" y="69" fill="#9AA3FF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        REF [1]
      </text>

      {/* Regular text line */}
      <rect x="65" y="100" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />

      {/* Highlight Line 2 (Lime) */}
      <rect x="65" y="114" width="120" height="12" rx="3" fill="#D6FF3D" fillOpacity="0.15" stroke="#D6FF3D" strokeWidth="1.5" />
      {/* Connector Line 2 to Citation 2 */}
      <path d="M 185 120 H 245" stroke="#D6FF3D" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Citation Chip 2 */}
      <rect x="245" y="108" width="65" height="24" rx="12" fill="#161824" stroke="#D6FF3D" strokeWidth="1.5" />
      <text x="277" y="124" fill="#D6FF3D" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        CLAUDE ↗
      </text>

      {/* Regular text line */}
      <rect x="65" y="136" width="110" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />

      {/* Highlight Line 3 (Lavender) */}
      <rect x="65" y="150" width="110" height="12" rx="3" fill="#9AA3FF" fillOpacity="0.18" stroke="#9AA3FF" strokeWidth="1.5" />
      {/* Connector Line 3 to Citation 3 */}
      <path d="M 175 156 H 225 C 235 156, 235 175, 245 175 H 255" stroke="#9AA3FF" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Citation Chip 3 */}
      <rect x="255" y="163" width="55" height="24" rx="12" fill="#161824" stroke="#9AA3FF" strokeWidth="1.5" />
      <text x="282" y="179" fill="#9AA3FF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        REF [3]
      </text>
    </svg>
  );
}

// 3. Countrees AI ERP SVG ART: stacked table rows feeding into a database cylinder
function CountreesArt() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-full max-h-[180px] select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="down-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 2 1 L 8 5 L 2 9 z" fill="#D6FF3D" />
        </marker>
      </defs>

      {/* Stacked Table Rows on Top */}
      <g>
        {/* Row 1 */}
        <rect x="60" y="24" width="220" height="20" rx="6" fill="#1D2130" stroke="#9AA3FF" strokeWidth="1.5" />
        <rect x="75" y="32" width="40" height="4" rx="2" fill="#9AA3FF" />
        <rect x="130" y="32" width="60" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="210" y="32" width="50" height="4" rx="2" fill="#D6FF3D" fillOpacity="0.8" />

        {/* Row 2 */}
        <rect x="60" y="52" width="220" height="20" rx="6" fill="#1D2130" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <rect x="75" y="60" width="35" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="125" y="60" width="70" height="4" rx="2" fill="#9AA3FF" />
        <rect x="215" y="60" width="45" height="4" rx="2" fill="#D6FF3D" fillOpacity="0.8" />

        {/* Row 3 */}
        <rect x="60" y="80" width="220" height="20" rx="6" fill="#1D2130" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <rect x="75" y="88" width="45" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="135" y="88" width="55" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="205" y="88" width="55" height="4" rx="2" fill="#9AA3FF" />
      </g>

      {/* Data Flow Arrows down to cylinder */}
      <path d="M 120 106 V 135" stroke="#9AA3FF" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 170 106 V 135" stroke="#D6FF3D" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#down-arrow)" />
      <path d="M 220 106 V 135" stroke="#9AA3FF" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Database Cylinder at Bottom */}
      <g>
        {/* Lower Cylinder Body */}
        <path
          d="M 120 160 V 185 C 120 196, 220 196, 220 185 V 160"
          stroke="#9AA3FF"
          strokeWidth="1.5"
          fill="#1D2130"
        />
        {/* Middle Ring */}
        <path
          d="M 120 160 C 120 171, 220 171, 220 160"
          stroke="#D6FF3D"
          strokeWidth="1.5"
        />
        {/* Top Rim */}
        <ellipse
          cx="170"
          cy="146"
          rx="50"
          ry="14"
          fill="#161824"
          stroke="#D6FF3D"
          strokeWidth="1.5"
        />
        <text x="170" y="150" fill="#D6FF3D" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          FASTAPI / DB
        </text>
      </g>
    </svg>
  );
}

const PROJECTS = [
  {
    id: 'anvil',
    title: 'ANVIL',
    date: 'Sept 2026',
    description: 'Autonomous coding-agent harness that turns GitHub issues into verified patches.',
    tags: ['Python', 'OpenAI API', 'Git worktrees'],
    href: '/work/anvil',
    Art: AnvilArt,
  },
  {
    id: 'healthwe',
    title: 'HealthWe',
    date: 'Sept 2026',
    description: 'AI clinical documentation platform with Claude API extraction and citation validation.',
    tags: ['Python', 'FastAPI', 'PostgreSQL'],
    href: '/work/healthwe',
    Art: HealthWeArt,
  },
  {
    id: 'countrees',
    title: 'Countrees AI ERP',
    date: '2025',
    description: 'Backend and structured data work during my internship.',
    tags: ['Python', 'FastAPI', 'Docker'],
    href: '/work/countrees',
    Art: CountreesArt,
  },
];

export function SelectedWorkSection({ reducedMotion = false }: SelectedWorkSectionProps) {
  return (
    <section
      id="selected-work"
      className="relative w-full bg-[#161925] text-[#F2F1F7] py-24 sm:py-32 scroll-mt-20 overflow-hidden"
    >
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 md:px-14 space-y-12 sm:space-y-16">
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

        {/* 3 Tall Project Posters in Horizontal Row (Desktop) / Scroll-Snap (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROJECTS.map((proj, idx) => {
            const ArtComponent = proj.Art;

            return (
              <motion.div
                key={proj.id}
                initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: reducedMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative rounded-[28px] bg-[#1D2130] border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
                style={{
                  height: 'min(62vh, 560px)',
                  minHeight: '480px',
                }}
              >
                <Link
                  href={proj.href}
                  data-cursor="view"
                  className="flex flex-col h-full justify-between"
                >
                  {/* Top 58%: Unique SVG Art on Tinted Surface */}
                  <div className="relative h-[58%] bg-[#161824] rounded-t-[27px] border-b border-white/[0.06] flex items-center justify-center p-6 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2.5">
                      <ArtComponent />
                    </div>

                    {/* Subtle Top-Right Date Tag */}
                    <div
                      className="absolute top-4 right-4 font-mono text-[11px] bg-[#1D2130]/90 px-2.5 py-1 rounded-full border border-white/[0.08]"
                      style={{ color: '#8A8EA8' }}
                    >
                      {proj.date}
                    </div>
                  </div>

                  {/* Below 42%: Title, ONE Line Description, 3 Mono Tags, Lime Arrow */}
                  <div className="h-[42%] p-6 sm:p-7 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-sans font-bold text-3xl sm:text-4xl text-[#F2F1F7] tracking-tight group-hover:text-white transition-colors">
                        {proj.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm leading-snug line-clamp-2"
                        style={{ color: '#A7AABF' }}
                      >
                        {proj.description}
                      </p>
                    </div>

                    {/* Bottom Row: 3 Mono Tags + Round Lime Arrow */}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.06]">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-[#161824] border border-white/[0.08] font-mono text-[10px]"
                            style={{ color: '#A7AABF' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="w-10 h-10 rounded-full bg-[#D6FF3D] text-[#111111] flex items-center justify-center shadow-[0_2px_14px_rgba(214,255,61,0.35)] transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_4px_20px_rgba(214,255,61,0.5)] shrink-0">
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
