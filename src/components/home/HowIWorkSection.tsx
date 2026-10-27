'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HowIThinkSectionProps {
  reducedMotion?: boolean;
}

const PRINCIPLES = [
  'Build it small, make it work, then make it good.',
  'Systems first, details second.',
  'If it can fail, it should say so.',
  'Design is how it feels, not how it looks.',
];

export function HowIWorkSection({ reducedMotion = false }: HowIThinkSectionProps) {
  return (
    <section
      id="how-i-think"
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

              {/* Lime Pill: "principles" */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6FF3D] text-[#111111] font-mono text-[11px] font-bold shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                <span>principles</span>
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
            <span>principles</span>
          </div>

          <div className="space-y-10 sm:space-y-12 md:pt-4">
            {/* Header in Ink #14141F */}
            <div className="space-y-2 max-w-xl">
              <h2 className="text-3xl sm:text-5xl font-sans font-light tracking-tight text-[#14141F]">
                How I <span className="font-serif italic font-normal text-[#5E6073]">think.</span>
              </h2>
              <p className="font-mono text-xs sm:text-sm text-[#5E6073] uppercase tracking-wider">
                Four principles I build by
              </p>
            </div>

            {/* 4 Short Principles in Large Type, Each One Line */}
            <div className="border-t border-black/10">
              {PRINCIPLES.map((principle, idx) => (
                <motion.div
                  key={idx}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: reducedMotion ? 0 : idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group py-6 sm:py-8 border-b border-black/10 flex items-baseline gap-6 sm:gap-10 transition-colors"
                >
                  <span className="font-mono text-xs sm:text-sm text-[#8A8EA8] tracking-widest shrink-0 font-medium">
                    0{idx + 1}
                  </span>
                  <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#14141F] group-hover:text-black transition-colors leading-snug">
                    {principle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const HowIThinkSection = HowIWorkSection;
