'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CRAFT_DISCIPLINES } from '@/data/craft';

interface FrameAIProps {
  reducedMotion?: boolean;
}

export function FrameAI({ reducedMotion }: FrameAIProps) {
  const discipline = CRAFT_DISCIPLINES[1];
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);
  const [hoveredPill, setHoveredPill] = useState<number | null>(null);

  const orbitTools = discipline.toolsList;

  return (
    <section
      id="ai-ml"
      className="relative w-screen h-[100svh] flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden z-20 text-[#F6E9EC]"
      aria-label="AI Engineering Frame"
    >
      <h2 className="sr-only">AI Engineering</h2>

      {/* Top Discipline Tag */}
      <div className="relative z-20 flex items-center justify-between font-mono text-xs text-[#E5B5C3] tracking-wider uppercase">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF9EB5] animate-pulse" />
          <span className="font-semibold text-white/90">Autonomous Systems</span>
        </span>
      </div>

      {/* Centered Composition: Radial Backdrop + Orbit + Serif Statement */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto text-center max-w-4xl mx-auto w-full">
        {/* Deep Atmospheric Backdrop & Soft Pink Radial Glow */}
        <div
          className="absolute w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] rounded-full pointer-events-none blur-3xl opacity-80"
          style={{
            background:
              'radial-gradient(circle, rgba(77,29,48,0.95) 0%, rgba(77,29,48,0.85) 45%, rgba(255,158,181,0.2) 75%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Orbiting Ring of 8 Tool Pills */}
        <div
          onMouseEnter={() => setIsOrbitPaused(true)}
          onMouseLeave={() => setIsOrbitPaused(false)}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={
              reducedMotion || isOrbitPaused || hoveredPill !== null
                ? false
                : { rotate: 360 }
            }
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="relative w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] lg:w-[620px] lg:h-[620px] rounded-full border border-pink-300/20 pointer-events-auto"
            style={{
              maxHeight: 'min(72vh, 620px)',
              maxWidth: 'min(72vh, 620px)',
            }}
            aria-hidden="true"
          >
            {orbitTools.map((tool, idx) => {
              const angle = (idx / orbitTools.length) * 2 * Math.PI;
              return (
                <div
                  key={tool}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * 50}%)`,
                    top: `calc(50% + ${Math.sin(angle) * 50}%)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <motion.div
                    animate={
                      reducedMotion || isOrbitPaused || hoveredPill !== null
                        ? false
                        : { rotate: -360 }
                    }
                    transition={{
                      duration: 38,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="px-3.5 py-1 rounded-full bg-[#2E0F1D]/90 border border-[#FF9EB5]/50 text-[#FF9EB5] font-mono text-[10px] sm:text-[11px] tracking-wider whitespace-nowrap shadow-lg backdrop-blur-md flex items-center gap-1.5 cursor-default hover:border-[#FF9EB5] hover:scale-105 transition-transform"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9EB5] inline-block opacity-80" />
                    <span>{tool}</span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Serif Statement Centered Over Orb */}
        <div className="relative z-30 space-y-6 max-w-2xl px-4 pointer-events-auto">
          <p className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F6E9EC] leading-[1.08] [text-shadow:0_3px_18px_rgba(40,10,24,0.95)]">
            agents that{' '}
            <span className="italic font-normal text-[#FF9EB5] underline decoration-[#FF9EB5]/50 underline-offset-8">
              check
            </span>{' '}
            their own work.
          </p>

          {/* 3 Floating Thoughts under Statement */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {discipline.lines.map((line, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => {
                  setHoveredPill(idx);
                  setIsOrbitPaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredPill(null);
                  setIsOrbitPaused(false);
                }}
                animate={
                  reducedMotion
                    ? {}
                    : {
                        y: [0, idx % 2 === 0 ? -6 : 6, 0],
                      }
                }
                transition={{
                  duration: 3.5 + idx,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 font-mono text-xs sm:text-sm cursor-pointer shadow-lg backdrop-blur-md ${
                  hoveredPill === idx
                    ? 'bg-[#FF9EB5] text-[#3A1020] border-white scale-105 shadow-[0_0_24px_rgba(255,158,181,0.6)] font-bold'
                    : 'bg-[#2E0F1D]/85 text-[#F6E9EC] border-[#FF9EB5]/35 hover:border-[#FF9EB5]/80'
                }`}
              >
                <span>{line}</span>
              </motion.div>
            ))}
          </div>

          {/* Optional Text Link to /work */}
          <div className="pt-2">
            <Link
              href="/work?filter=ai"
              data-cursor="open"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#FF9EB5] hover:underline uppercase tracking-wider group font-semibold [text-shadow:0_1px_8px_rgba(15,17,24,0.8)]"
            >
              <span>see related work</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Mono Tools Line */}
      <div className="relative z-20 pt-4 border-t border-white/10 font-mono text-[11px] sm:text-xs text-[#E5B5C3] tracking-wider overflow-x-auto whitespace-nowrap text-center">
        <span>{discipline.tools}</span>
      </div>
    </section>
  );
}
