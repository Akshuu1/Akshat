'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { homeData } from '@/data/home';

interface AnvilTraceProps {
  reducedMotion?: boolean;
}

const STEPS = [
  { id: 1, label: 'Bug reproduction' },
  { id: 2, label: 'Code localization' },
  { id: 3, label: 'Patching' },
  { id: 4, label: 'Testing' },
  { id: 5, label: 'Review' },
  { id: 6, label: 'Reporting' },
];

export function AnvilTrace({ reducedMotion = false }: AnvilTraceProps) {
  const [activeStep, setActiveStep] = useState(0);

  // Stepper loop: 1.2s per step, ticks through automatically
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 text-[#14141F] select-none">
      {/* 1. Header Row: "ANVIL" + "Sept 2026" */}
      <div className="flex items-center justify-between pb-4 border-b border-[#14141F]/10">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D6FF3D] border border-black/10" />
          <h3 className="font-sans font-bold text-lg sm:text-xl text-[#14141F] tracking-tight">
            {homeData.hero.anvil.title}
          </h3>
          <span className="font-mono text-[10px] text-[#5E6073] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/5">
            AGENT HARNESS
          </span>
        </div>

        <span className="font-mono text-xs text-[#5E6073] font-medium">
          {homeData.hero.anvil.date}
        </span>
      </div>

      {/* 2. Vertical Stepper of 6 steps (ticking loop replay) */}
      <div
        className="relative my-4 sm:my-6 space-y-2.5"
        role="region"
        aria-label="ANVIL Execution Trace Stepper"
      >
        <span className="sr-only">
          Current replay step: {STEPS[activeStep].label}. Completed steps: {STEPS.slice(0, activeStep).map(s => s.label).join(', ')}.
        </span>

        {STEPS.map((step, idx) => {
          const isActive = idx === activeStep;
          const isPassed = idx < activeStep;

          return (
            <div
              key={step.id}
              className={`relative flex items-center justify-between px-3.5 py-1.5 sm:py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-black/[0.04] text-[#14141F] shadow-2xs'
                  : 'text-[#5E6073] opacity-75'
              }`}
            >
              {/* Left Indicator & Step Label */}
              <div className="flex items-center gap-3">
                {/* Status Dot */}
                <div className="relative flex items-center justify-center w-4 h-4">
                  {isActive ? (
                    <motion.span
                      layoutId="anvil-active-dot"
                      className="w-2.5 h-2.5 rounded-full bg-[#D6FF3D] shadow-[0_0_8px_rgba(214,255,61,0.8)]"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  ) : isPassed ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14141F]/40" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14141F]/15" />
                  )}
                </div>

                {/* Step Name */}
                <span
                  className={`font-mono text-xs sm:text-sm tracking-tight ${
                    isActive ? 'font-bold text-[#14141F]' : 'font-normal'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Step Sequence Badge */}
              <span className="font-mono text-[10px] opacity-40">
                0{step.id} / 06
              </span>
            </div>
          );
        })}
      </div>

      {/* 3. Footer Row: Real facts only + Round lime arrow button */}
      <div className="pt-4 border-t border-[#14141F]/10 flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-[#5E6073] leading-snug max-w-sm">
          {homeData.hero.anvil.footer}
        </p>

        {/* Round Lime Arrow Button -> /work/anvil */}
        <Link
          href={homeData.hero.anvil.href}
          data-cursor="open"
          aria-label="View ANVIL case study"
          className="w-10 h-10 rounded-full bg-[#D6FF3D] text-[#111111] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-[0_2px_14px_rgba(214,255,61,0.4)] shrink-0"
        >
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
