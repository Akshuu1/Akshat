'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface DisciplinesTilesSectionProps {
  reducedMotion?: boolean;
}

export function DisciplinesTilesSection({ reducedMotion = false }: DisciplinesTilesSectionProps) {
  return (
    <section className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-16 md:py-24 select-none">
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#F2F1F7]">
          What I <span className="font-serif italic font-normal text-[#F2F1F7]">do</span>
        </h2>
        <p
          className="font-mono text-sm sm:text-base mt-2 text-[#D0D3E2]"
        >
          Four ways I build.
        </p>
      </div>

      {/* 4 Tiles in 2x2 Grid (Desktop) / Stack on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* ================================================================= */}
        {/* TILE 1: FULL-STACK (Blueprint Tile)                              */}
        {/* ================================================================= */}
        <Link
          href="/craft#full-stack"
          data-cursor="open"
          className="group relative rounded-[28px] sm:rounded-[36px] bg-[#1F3D2B] border border-white/10 p-6 sm:p-9 flex flex-col justify-between overflow-hidden min-h-auto md:min-h-[64svh] shadow-xl hover:-translate-y-2.5 transition-transform duration-300"
        >
          {/* Faint Grid Lines */}
          <div
            className="absolute inset-0 bg-paper-grid opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Row: Meta + Arrow */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#C5D4BD]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D6FF3D]" />
              <span>Full Stack</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#D6FF3D] flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#14141F] transition-colors" />
            </div>
          </div>

          {/* Center Graphic: Architecture Glyph (Browser -> API -> DB) drawn with SVG */}
          <div className="relative z-10 my-auto py-6 sm:py-8 flex items-center justify-center w-full">
            <div className="w-full max-w-[280px] p-3 sm:p-4 rounded-xl bg-[#142A1D]/80 border border-white/10 backdrop-blur-sm relative">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <line x1="32%" y1="50%" x2="48%" y2="50%" stroke="#D6FF3D" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="66%" y1="50%" x2="80%" y2="50%" stroke="#D6FF3D" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center font-mono text-[9px] sm:text-[10px]">
                <div className="p-1.5 sm:p-2 rounded bg-[#1A3324] border border-[#D6FF3D]/30 text-[#F2F1F7]">
                  Browser
                </div>
                <div className="p-1.5 sm:p-2 rounded bg-[#1A3324] border border-[#D6FF3D]/30 text-[#F2F1F7]">
                  API
                </div>
                <div className="p-1.5 sm:p-2 rounded bg-[#1A3324] border border-[#D6FF3D]/30 text-[#F2F1F7]">
                  Database
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info: Title, Line, Tools */}
          <div className="relative z-10 space-y-2.5 sm:space-y-3 pt-4">
            <h3
              style={{ fontSize: 'clamp(28px, 7.5vw, 60px)' }}
              className="font-display uppercase tracking-tight text-[#F2F1F7] leading-none whitespace-nowrap"
            >
              Full-stack
            </h3>
            <p className="font-mono text-xs sm:text-sm text-[#A8B5A2] leading-snug">
              Web apps, backends and databases.
            </p>
            <div className="pt-3 border-t border-white/10 font-mono text-[11px] text-[#A8B5A2] tracking-wider">
              React / Next.js / FastAPI / PostgreSQL
            </div>
          </div>
        </Link>

        {/* ================================================================= */}
        {/* TILE 2: AI ENGINEERING (Glow Tile)                               */}
        {/* ================================================================= */}
        <Link
          href="/craft#ai-ml"
          data-cursor="open"
          className="group relative rounded-[28px] sm:rounded-[36px] bg-[#4D1D30] border border-white/10 p-6 sm:p-9 flex flex-col justify-between overflow-hidden min-h-auto md:min-h-[64svh] shadow-xl hover:-translate-y-2.5 transition-transform duration-300"
        >
          {/* Top Row: Meta + Arrow */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#E5B5C3]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF9EB5]" />
              <span>AI Engineering</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#D6FF3D] flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#14141F] transition-colors" />
            </div>
          </div>

          {/* Center Graphic: Pink Glowing Orb + Slowly Orbiting Ring of 6 Dots */}
          <div className="relative z-10 my-auto py-6 sm:py-8 flex items-center justify-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
              {/* Blurred Radial Glowing Orb */}
              <motion.div
                animate={reducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.6, 0.85, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full blur-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,158,181,0.85) 0%, rgba(212,77,118,0.4) 70%, transparent 100%)',
                }}
              />
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF9EB5] shadow-[0_0_16px_#FF9EB5]" />

              {/* Orbiting Ring of 6 Dots */}
              <motion.div
                animate={reducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-pink-300/25 pointer-events-none"
              >
                {[
                  { left: '100%', top: '50%' },
                  { left: '75%', top: '93.3%' },
                  { left: '25%', top: '93.3%' },
                  { left: '0%', top: '50%' },
                  { left: '25%', top: '6.7%' },
                  { left: '75%', top: '6.7%' },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#FF9EB5] shadow-xs"
                    style={{
                      left: pos.left,
                      top: pos.top,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom Info: Title, Line, Tools */}
          <div className="relative z-10 space-y-2.5 sm:space-y-3 pt-4">
            <h3
              style={{ fontSize: 'clamp(28px, 7.5vw, 60px)' }}
              className="font-display uppercase tracking-tight text-[#F2F1F7] leading-none whitespace-nowrap"
            >
              AI engineering
            </h3>
            <p className="font-mono text-xs sm:text-sm text-[#E5B5C3] leading-snug">
              LLM apps and agents that check their own work.
            </p>
            <div className="pt-3 border-t border-white/10 font-mono text-[11px] text-[#D8A7B5] tracking-wider">
              LangChain / LangGraph / RAG / Claude API
            </div>
          </div>
        </Link>

        {/* ================================================================= */}
        {/* TILE 3: DATA ANALYSIS (Chart Dashboard Tile)                     */}
        {/* ================================================================= */}
        <Link
          href="/craft#data-analyst"
          data-cursor="open"
          className="group relative rounded-[28px] sm:rounded-[36px] bg-[#12284A] border border-white/10 p-6 sm:p-9 flex flex-col justify-between overflow-hidden min-h-auto md:min-h-[64svh] shadow-xl hover:-translate-y-2.5 transition-transform duration-300"
        >
          {/* Faint Grid Lines */}
          <div
            className="absolute inset-0 bg-paper-grid opacity-15 pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Row: Meta + Arrow */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#CFCFD8]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5CE1E6] animate-pulse" />
              <span>Data Analysis</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#5CE1E6] flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#12284A] transition-colors" />
            </div>
          </div>

          {/* Center Graphic: Small animated bar-and-line chart drawn with SVG */}
          <div className="relative z-10 my-auto py-6 sm:py-8 flex items-center justify-center w-full">
            <div className="w-full max-w-[280px] p-4 rounded-xl bg-[#0B1A33]/85 border border-white/10 backdrop-blur-sm relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono text-[#CFCFD8]">
                <span className="flex items-center gap-1.5 font-bold text-[#5CE1E6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5CE1E6] animate-pulse" />
                  METRIC RUNTIME
                </span>
                <span className="text-[#8E9EB5]">SQL · BI · PANDAS</span>
              </div>

              <div className="pt-3 pb-1">
                <svg viewBox="0 0 220 90" className="w-full h-24 overflow-visible" aria-hidden="true">
                  {/* Horizontal Gridlines */}
                  <line x1="0" y1="20" x2="220" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <line x1="0" y1="45" x2="220" y2="45" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <line x1="0" y1="70" x2="220" y2="70" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

                  {/* Bars rising */}
                  {[
                    { x: 18, h: 32, y: 38 },
                    { x: 62, h: 48, y: 22 },
                    { x: 106, h: 28, y: 42 },
                    { x: 150, h: 56, y: 14 },
                    { x: 194, h: 44, y: 26 },
                  ].map((bar, i) => (
                    <motion.rect
                      key={i}
                      x={bar.x - 7}
                      y={bar.y}
                      width="14"
                      height={bar.h}
                      rx="3"
                      fill="rgba(92, 225, 230, 0.28)"
                      stroke="#5CE1E6"
                      strokeWidth="1"
                      initial={reducedMotion ? false : { scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                      style={{ originY: '70px' }}
                    />
                  ))}

                  {/* Line chart drawn with pathLength */}
                  <motion.path
                    d="M 18,48 L 62,32 L 106,50 L 150,20 L 194,28"
                    fill="none"
                    stroke="#5CE1E6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reducedMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />

                  {/* Dots on line */}
                  {[
                    { cx: 18, cy: 48 },
                    { cx: 62, cy: 32 },
                    { cx: 106, cy: 50 },
                    { cx: 150, cy: 20 },
                    { cx: 194, cy: 28 },
                  ].map((pt, i) => (
                    <motion.circle
                      key={i}
                      cx={pt.cx}
                      cy={pt.cy}
                      r="3.5"
                      fill="#12284A"
                      stroke="#5CE1E6"
                      strokeWidth="2"
                      initial={reducedMotion ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + i * 0.08 }}
                    />
                  ))}

                  {/* Axis labels */}
                  <text x="18" y="85" textAnchor="middle" fill="#8E9EB5" fontSize="8" fontFamily="monospace">JAN</text>
                  <text x="62" y="85" textAnchor="middle" fill="#8E9EB5" fontSize="8" fontFamily="monospace">FEB</text>
                  <text x="106" y="85" textAnchor="middle" fill="#8E9EB5" fontSize="8" fontFamily="monospace">MAR</text>
                  <text x="150" y="85" textAnchor="middle" fill="#8E9EB5" fontSize="8" fontFamily="monospace">APR</text>
                  <text x="194" y="85" textAnchor="middle" fill="#8E9EB5" fontSize="8" fontFamily="monospace">MAY</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Info: Title, Line, Tools */}
          <div className="relative z-10 space-y-2.5 sm:space-y-3 pt-4">
            <h3
              style={{ fontSize: 'clamp(28px, 7.5vw, 60px)' }}
              className="font-display uppercase tracking-tight text-[#F2F1F7] leading-none whitespace-nowrap"
            >
              Data analysis
            </h3>
            <p className="font-mono text-xs sm:text-sm text-[#CFCFD8] leading-snug">
              Turning raw data into clear answers.
            </p>
            <div className="pt-3 border-t border-white/10 font-mono text-[11px] text-[#A7B6CB] tracking-wider">
              SQL / Power BI / Pandas
            </div>
          </div>
        </Link>

        {/* ================================================================= */}
        {/* TILE 4: DESIGN (Paper Tile)                                      */}
        {/* ================================================================= */}
        <Link
          href="/craft#designer"
          data-cursor="open"
          className="group relative rounded-[28px] sm:rounded-[36px] bg-[#3B2A1D] border border-white/10 p-6 sm:p-9 flex flex-col justify-between overflow-hidden min-h-auto md:min-h-[64svh] shadow-xl hover:-translate-y-2.5 transition-transform duration-300"
        >
          {/* Top Row: Meta + Arrow */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#E5CAAD]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F4B860]" />
              <span>Design</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#D6FF3D] flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#14141F] transition-colors" />
            </div>
          </div>

          {/* Center Graphic: Cream Torn-Paper Card + Tape Strip + Palette + Handwritten 'aa' */}
          <div className="relative z-10 my-auto py-6 sm:py-8 flex items-center justify-center">
            <div className="relative w-full max-w-[220px] sm:max-w-[240px] p-4 rounded-xl bg-[#EFE4D2] text-[#14141F] shadow-2xl rotate-0 sm:rotate-2 group-hover:rotate-0 transition-transform duration-300">
              {/* Tape Strip */}
              <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#E2D5BE] text-[9px] font-mono font-bold tracking-wider uppercase shadow-xs -rotate-2">
                SYSTEM
              </div>

              {/* Handwritten 'aa' in Caveat */}
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <span className="font-handwriting text-3xl font-bold text-[#14141F]">
                  aa
                </span>
                <span className="font-mono text-[9px] text-black/60 uppercase">
                  Specimen
                </span>
              </div>

              {/* Tiny Colour Palette Row */}
              <div className="flex gap-1.5 pt-2">
                <div className="w-4 h-4 rounded-full bg-[#0E1016]" />
                <div className="w-4 h-4 rounded-full bg-[#1F3D2B]" />
                <div className="w-4 h-4 rounded-full bg-[#4D1D30]" />
                <div className="w-4 h-4 rounded-full bg-[#3B2A1D]" />
                <div className="w-4 h-4 rounded-full bg-[#D6FF3D]" />
              </div>
            </div>
          </div>

          {/* Bottom Info: Title, Line, Tools */}
          <div className="relative z-10 space-y-2.5 sm:space-y-3 pt-4">
            <h3
              style={{ fontSize: 'clamp(28px, 7.5vw, 60px)' }}
              className="font-display uppercase tracking-tight text-[#F2F1F7] leading-none whitespace-nowrap"
            >
              Design
            </h3>
            <p className="font-mono text-xs sm:text-sm text-[#E5CAAD] leading-snug">
              Interfaces with taste.
            </p>
            <div className="pt-3 border-t border-white/10 font-mono text-[11px] text-[#D8BC9E] tracking-wider">
              Figma / Design systems / Motion
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
