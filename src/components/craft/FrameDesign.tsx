'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CRAFT_DISCIPLINES } from '@/data/craft';

interface FrameDesignProps {
  reducedMotion?: boolean;
}

const PALETTE_SWATCHES = [
  { hex: '#0F1118', label: 'Ink' },
  { hex: '#1F3D2B', label: 'Forest' },
  { hex: '#4D1D30', label: 'Maroon' },
  { hex: '#3B2A1D', label: 'Espresso' },
  { hex: '#D6FF3D', label: 'Lime' },
];

export function FrameDesign({ reducedMotion }: FrameDesignProps) {
  const discipline = CRAFT_DISCIPLINES[2];
  const constraintsRef = useRef<HTMLDivElement>(null);

  const stickerTools = [
    'Figma',
    'Canva',
    'Design Systems',
    'Framer Motion',
    'Tailwind',
  ];

  return (
    <section
      id="designer"
      ref={constraintsRef}
      className="relative w-screen h-[100svh] flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden z-20 text-[#F6EBDD]"
      aria-label="Design Frame"
    >
      <h2 className="sr-only">Design & Layout</h2>

      {/* Top Discipline Tag */}
      <div className="relative z-20 flex items-center justify-between font-mono text-xs text-[#E5CAAD] tracking-wider uppercase">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F4B860] animate-pulse" />
          <span className="font-semibold text-white/90">Product Design</span>
        </span>
      </div>

      {/* Center 2-Column Collage */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto w-full">
        {/* Left 5 Columns: Serif Statement, Handwritten Note & Tape Strips */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#F4B860] uppercase tracking-wider block font-semibold">
              EDITORIAL · SYSTEMS · TASTE
            </span>
            <p className="font-serif text-4xl sm:text-6xl lg:text-7xl italic text-[#F6EBDD] tracking-tight leading-[1.05] [text-shadow:0_3px_16px_rgba(25,15,10,0.95)]">
              interfaces with taste.
            </p>
          </div>

          {/* Handwritten Annotation with Hand-Drawn Arrow */}
          <div className="flex items-center gap-2 font-handwriting text-2xl sm:text-3xl text-[#F4B860] pt-1 [text-shadow:0_2px_10px_rgba(25,15,10,0.9)]">
            <span>systems first, then feeling</span>
            <span className="text-3xl inline-block -rotate-12">⤹</span>
          </div>

          {/* 3 Lines on Tape Strips */}
          <div className="space-y-3 pt-2">
            {discipline.lines.map((line, idx) => {
              const rotation =
                idx === 0 ? '-rotate-1' : idx === 1 ? 'rotate-1' : '-rotate-2';
              return (
                <motion.div
                  key={idx}
                  whileHover={reducedMotion ? {} : { scale: 1.03, rotate: 0 }}
                  className={`relative inline-block px-5 py-2.5 bg-[#EFE4D2] text-[#251910] font-mono text-xs sm:text-sm font-semibold shadow-xl border-y border-black/10 transform ${rotation} transition-transform cursor-pointer select-none`}
                >
                  {/* Tape end notches */}
                  <div className="absolute -left-2 top-0 bottom-0 w-2 bg-[#EFE4D2]/80 opacity-60" />
                  <div className="absolute -right-2 top-0 bottom-0 w-2 bg-[#EFE4D2]/80 opacity-60" />
                  <span className="text-[#3B2A1D] mr-2">✦</span>
                  <span>{line}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Sticker Chips */}
          <div className="space-y-2 pt-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#F4B860] font-semibold block [text-shadow:0_2px_8px_rgba(20,10,5,0.95)]">
              CRAFT STICKERS:
            </span>
            <div className="flex flex-wrap gap-2">
              {stickerTools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-full bg-[#24150B]/90 border border-[#F4B860]/40 text-[#F6EBDD] font-mono text-xs font-medium shadow-md hover:border-[#F4B860] transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Optional Text Link to /work */}
          <div className="pt-2">
            <Link
              href="/work?filter=design"
              data-cursor="open"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#F4B860] hover:underline uppercase tracking-wider group font-semibold [text-shadow:0_1px_8px_rgba(15,17,24,0.8)]"
            >
              <span>see related work</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right 7 Columns: Draggable Overlapping Cards (±4deg with spring return) */}
        <div className="lg:col-span-7 relative h-[380px] sm:h-[440px] flex items-center justify-center pointer-events-auto">
          {/* Card 1: Type Specimen Card */}
          <motion.div
            drag={!reducedMotion}
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.05, zIndex: 40 }}
            initial={reducedMotion ? {} : { rotate: -4 }}
            className="absolute top-2 left-2 sm:left-8 w-48 sm:w-56 p-4 sm:p-5 rounded-2xl bg-[#EFE6D8] text-[#1E140C] shadow-2xl border border-black/10 cursor-grab active:cursor-grabbing z-10 select-none"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-black/60 pb-2 border-b border-black/10">
              <span>SPECIMEN // 01</span>
              <span>EDITORIAL</span>
            </div>
            <div className="py-2 text-center">
              <span className="font-serif italic text-4xl sm:text-5xl text-[#1E140C]">
                Aa
              </span>
            </div>
            <div className="space-y-0.5 font-mono text-[10px] text-black/75">
              <div>Instrument Serif (400)</div>
              <div>Space Grotesk (700)</div>
              <div>JetBrains Mono (500)</div>
              <div>Anton Display (400)</div>
            </div>
          </motion.div>

          {/* Card 2: Palette Swatch Card */}
          <motion.div
            drag={!reducedMotion}
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.05, zIndex: 40 }}
            initial={reducedMotion ? {} : { rotate: 3 }}
            className="absolute top-4 right-2 sm:right-6 w-52 sm:w-64 p-4 sm:p-5 rounded-2xl bg-[#EFE6D8] text-[#1E140C] shadow-2xl border border-black/10 cursor-grab active:cursor-grabbing z-20 select-none"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-black/60 pb-2 border-b border-black/10">
              <span>PALETTE // 5 SWATCHES</span>
              <span>HARMONY</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 py-3">
              {PALETTE_SWATCHES.map((swatch) => (
                <div key={swatch.hex} className="space-y-1 text-center">
                  <div
                    className="w-full h-8 sm:h-10 rounded-md border border-black/15 shadow-xs"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="font-mono text-[8px] text-black/60 block">
                    {swatch.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-mono text-[9px] text-black/65 leading-tight">
              Curated contrast: AA accessible on all theme grounds.
            </p>
          </motion.div>

          {/* Card 3: Spacing & Rhythm Calipers */}
          <motion.div
            drag={!reducedMotion}
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.05, zIndex: 40 }}
            initial={reducedMotion ? {} : { rotate: -2 }}
            className="absolute bottom-4 left-6 sm:left-16 w-52 sm:w-60 p-4 rounded-2xl bg-[#EFE6D8] text-[#1E140C] shadow-2xl border border-black/10 cursor-grab active:cursor-grabbing z-30 select-none"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-black/60 pb-2 border-b border-black/10">
              <span>CALIPERS // 8PX RHYTHM</span>
              <span className="text-[#3B2A1D] font-bold">1.618 φ</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 py-2.5 text-center font-mono text-[10px]">
              <span className="p-1 rounded bg-black/5">8px</span>
              <span className="p-1 rounded bg-black/5">16px</span>
              <span className="p-1 rounded bg-black/5">24px</span>
              <span className="p-1 rounded bg-[#D6FF3D] font-bold text-black">
                48px
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#F4B860] to-[#D6FF3D]" />
          </motion.div>

          {/* Card 4: Motion Curve Card */}
          <motion.div
            drag={!reducedMotion}
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.05, zIndex: 40 }}
            initial={reducedMotion ? {} : { rotate: 4 }}
            className="absolute bottom-2 right-4 sm:right-12 w-56 sm:w-64 p-4 rounded-2xl bg-[#EFE6D8] text-[#1E140C] shadow-2xl border border-black/10 cursor-grab active:cursor-grabbing z-20 select-none"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-black/60 pb-2 border-b border-black/10">
              <span>MOTION CURVE</span>
              <span>[0.16, 1, 0.3, 1]</span>
            </div>
            <div className="py-2 flex items-center justify-center">
              <svg
                width="160"
                height="50"
                viewBox="0 0 160 50"
                className="overflow-visible"
              >
                <path
                  d="M 10 40 C 30 10, 60 10, 150 10"
                  fill="none"
                  stroke="#1E140C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="40" r="3.5" fill="#F4B860" />
                <circle cx="150" cy="10" r="3.5" fill="#D6FF3D" />
              </svg>
            </div>
            <p className="font-mono text-[9px] text-black/65 text-center">
              Spring inertia physics & natural weight
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Mono Tools Line */}
      <div className="relative z-20 pt-4 border-t border-white/10 font-mono text-[11px] sm:text-xs text-[#E5CAAD] tracking-wider overflow-x-auto whitespace-nowrap text-right">
        <span>{discipline.tools}</span>
      </div>
    </section>
  );
}
