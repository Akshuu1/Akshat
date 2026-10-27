'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HeroObjectProps {
  reducedMotion?: boolean;
}

const TRACE_STEPS = [
  'Reproduction',
  'Localization',
  'Patching',
  'Testing',
  'Review',
  'Trace Replay',
];

export function HeroObject({ reducedMotion = false }: HeroObjectProps) {
  const [activeStep, setActiveStep] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 90 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2, 2]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2, -2]);

  // Stepper loop: 1.2s each, ticking in lime
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % TRACE_STEPS.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;

    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion, mouseX, mouseY]);

  return (
    <motion.div
      animate={
        reducedMotion
          ? { y: 0 }
          : {
              y: [-8, 8, -8],
            }
      }
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full max-w-[620px] rounded-[24px] bg-[#F4F3F8] border border-white/80 shadow-[0_25px_60px_rgba(10,10,30,0.22)] p-4 sm:p-5 select-none pointer-events-auto"
    >
      {/* 1. Browser Window Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-black/10">
        {/* Window Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/10" />
        </div>

        {/* Center Title Pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/5 font-mono text-xs text-[#14141F]">
          <span className="font-bold">ANVIL</span>
          <span className="opacity-40">·</span>
          <span className="text-[#5E6073]">trace replay</span>
        </div>

        {/* Right Status */}
        <span className="font-mono text-[10px] text-[#5E6073] uppercase tracking-wider">
          SEPT 2026
        </span>
      </div>

      {/* 2. Compact Horizontal 6-Step Stepper */}
      <div className="py-4">
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 no-scrollbar">
          {TRACE_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            const isPassed = idx < activeStep;

            return (
              <div key={step} className="flex items-center gap-1 shrink-0">
                <div
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-300 ${
                    isActive
                      ? 'bg-black/[0.06] text-[#14141F] shadow-2xs'
                      : isPassed
                      ? 'text-[#14141F]/80'
                      : 'text-[#5E6073]/60'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isActive
                        ? 'bg-[#D6FF3D] ring-2 ring-[#D6FF3D]/40 animate-pulse'
                        : isPassed
                        ? 'bg-[#14141F]/50'
                        : 'bg-black/15'
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] whitespace-nowrap ${
                      isActive ? 'font-bold' : 'font-normal'
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {idx < TRACE_STEPS.length - 1 && (
                  <span className="text-black/20 text-xs px-0.5">→</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Sub-bar: Real workflow facts */}
      <div className="pt-2.5 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-[#5E6073]">
        <span>9-PHASE WORKFLOW</span>
        <span>GIT WORKTREE SANDBOX</span>
        <span>JSONL REPLAY</span>
      </div>
    </motion.div>
  );
}
