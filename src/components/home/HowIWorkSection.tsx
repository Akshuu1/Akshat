'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

interface HowIWorkSectionProps {
  reducedMotion?: boolean;
}

const STAGES = [
  { id: 'repro', label: 'bug reproduction', group: 'stage' },
  { id: 'loc', label: 'code localization', group: 'stage' },
  { id: 'patch', label: 'patching', group: 'stage' },
  { id: 'test', label: 'testing', group: 'stage' },
  { id: 'review', label: 'review', group: 'stage' },
  { id: 'report', label: 'reporting', group: 'stage' },
  { id: 'budget', label: 'execution budgets', group: 'guardrail' },
  { id: 'loop', label: 'loop detection', group: 'guardrail' },
  { id: 'rollback', label: 'checkpoints/rollback', group: 'guardrail' },
];

export function HowIWorkSection({ reducedMotion = false }: HowIWorkSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Scroll-linked active step tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 25%'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (reducedMotion) return;
    const step = Math.min(STAGES.length - 1, Math.max(0, Math.floor(latest * STAGES.length)));
    setActiveStep(step);
  });

  return (
    <section
      id="how-i-work"
      ref={containerRef}
      className="relative w-full bg-[#0F1118] py-20 sm:py-28 scroll-mt-20 overflow-hidden"
    >
      {/* Light Bezel Surface Container: Inset 24px, Rounded 40px */}
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full bg-[#ECEBF2] text-[#14141F] rounded-[40px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] overflow-hidden p-8 sm:p-12 md:p-16 border border-white/40"
        >
          {/* =============================================================== */}
          {/* TOP CENTER CONCAVE NOTCH (Echoing Hero's Bezel)                 */}
          {/* Desktop: sculpted notch into top edge; Mobile: clean pill        */}
          {/* =============================================================== */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 hidden md:block">
            <div className="relative bg-[#0F1118] px-8 py-2.5 rounded-b-[24px] flex items-center justify-center">
              {/* Smooth Left SVG Fillet */}
              <div className="absolute -left-5 top-0 w-5 h-5 pointer-events-none overflow-hidden">
                <svg viewBox="0 0 20 20" className="w-full h-full fill-[#0F1118]">
                  <path d="M 0 0 C 0 11 9 20 20 20 L 0 20 Z" transform="scale(1, -1) translate(0, -20)" />
                </svg>
              </div>

              {/* Lime Pill: "ANVIL, 9 phases" */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6FF3D] text-[#111111] font-mono text-[11px] font-bold shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                <span>ANVIL, 9 phases</span>
              </div>

              {/* Smooth Right SVG Fillet */}
              <div className="absolute -right-5 top-0 w-5 h-5 pointer-events-none overflow-hidden">
                <svg viewBox="0 0 20 20" className="w-full h-full fill-[#0F1118]">
                  <path d="M 20 0 C 20 11 11 20 0 20 L 20 20 Z" transform="scale(1, -1) translate(0, -20)" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Pill (No notch on mobile per spec) */}
          <div className="md:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6FF3D] text-[#111111] font-mono text-[11px] font-bold mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
            <span>ANVIL, 9 phases</span>
          </div>

          <div className="space-y-10 sm:space-y-14 md:pt-4">
            {/* Header in Ink #14141F */}
            <div className="space-y-2 max-w-xl">
              <h2 className="text-3xl sm:text-5xl font-sans font-light tracking-tight text-[#14141F]">
                How I <span className="font-serif italic font-normal text-[#5E6073]">work.</span>
              </h2>
              <p className="font-mono text-xs sm:text-sm text-[#5E6073] uppercase tracking-wider">
                6 stages + 3 guardrails
              </p>
            </div>

            {/* ============================================================= */}
            {/* 9-STEP HORIZONTAL STRIP: Real ANVIL Phases (Scroll-Linked)     */}
            {/* ============================================================= */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-2 sm:gap-3">
                {STAGES.map((step, idx) => {
                  const isActive = !reducedMotion && idx === activeStep;
                  const isGuardrail = step.group === 'guardrail';

                  return (
                    <div
                      key={step.id}
                      className={`relative p-3 sm:p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[96px] ${
                        isActive
                          ? 'bg-[#14141F] text-white border-black shadow-md scale-[1.03] z-10'
                          : isGuardrail
                          ? 'bg-black/[0.04] text-[#14141F] border-black/10'
                          : 'bg-white/80 text-[#14141F] border-black/5'
                      }`}
                    >
                      {/* Top Row: Index + Dot */}
                      <div className="flex items-center justify-between pb-2">
                        <span
                          className={`font-mono text-[10px] uppercase font-bold tracking-wider ${
                            isActive ? 'text-[#D6FF3D]' : 'text-[#8A8EA8]'
                          }`}
                        >
                          {isGuardrail ? `G0${idx - 5}` : `0${idx + 1}`}
                        </span>

                        <span
                          className={`w-2 h-2 rounded-full transition-colors ${
                            isActive
                              ? 'bg-[#D6FF3D] shadow-[0_0_8px_#D6FF3D]'
                              : isGuardrail
                              ? 'bg-[#9AA3FF]'
                              : 'bg-black/20'
                          }`}
                        />
                      </div>

                      {/* Step Label */}
                      <div className="space-y-0.5">
                        <div
                          className={`font-mono text-[9px] uppercase tracking-wider ${
                            isActive ? 'text-white/60' : 'text-[#8A8EA8]'
                          }`}
                        >
                          {isGuardrail ? 'guardrail' : 'stage'}
                        </div>
                        <div
                          className={`font-sans text-xs sm:text-[13px] font-semibold leading-tight capitalize ${
                            isActive ? 'text-white' : 'text-[#14141F]'
                          }`}
                        >
                          {step.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Statement in Ink (Exact copy) */}
            <div className="pt-6 border-t border-black/10">
              <p className="font-sans text-sm sm:text-base text-[#14141F] leading-relaxed max-w-2xl font-medium">
                Git worktree sandboxing and JSONL traces with offline replay keep every run checkable.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
