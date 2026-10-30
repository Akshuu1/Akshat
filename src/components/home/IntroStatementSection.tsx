'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface IntroStatementSectionProps {
  reducedMotion?: boolean;
}

interface WordToken {
  text: string;
  isItalicSerif?: boolean;
}

const WORDS: WordToken[] = [
  { text: "I'm" },
  { text: 'Akshat,' },
  { text: 'a' },
  { text: 'full-stack' },
  { text: 'developer' },
  { text: 'and' },
  { text: 'AI engineer', isItalicSerif: true },
  { text: 'who' },
  { text: 'also' },
  { text: 'designs.' },
  { text: 'I' },
  { text: 'build' },
  { text: 'things' },
  { text: 'that' },
  { text: 'work,' },
  { text: 'then' },
  { text: 'make' },
  { text: 'them' },
  { text: 'feel good.', isItalicSerif: true },
];

function RevealWord({
  token,
  progress,
  start,
  end,
  reducedMotion,
}: {
  token: WordToken;
  progress: MotionValue<number>;
  start: number;
  end: number;
  reducedMotion?: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.35, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);

  if (reducedMotion) {
    return (
      <span
        className={`inline-block mr-[0.28em] ${
          token.isItalicSerif ? 'font-serif italic font-normal text-[#F2F1F7]' : 'font-light text-[#F2F1F7]'
        }`}
      >
        {token.text}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.28em] transition-colors will-change-transform ${
        token.isItalicSerif ? 'font-serif italic font-normal text-[#F2F1F7]' : 'font-light text-[#F2F1F7]'
      }`}
    >
      {token.text}
    </motion.span>
  );
}

export function IntroStatementSection({ reducedMotion = false }: IntroStatementSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Measure scroll through the pinned 200vh container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#16161A] text-[#F2F1F7]"
      aria-label="Introduction Statement"
    >
      {/* 160px Seamless Transition Gradient from transparent into #16161A */}
      <div
        className="absolute -top-[160px] left-0 right-0 h-[160px] pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#16161A]" />
      </div>

      {/* Desktop pinned container (~175vh), normal flow on mobile */}
      <div className="relative w-full h-auto md:h-[175vh]">
        <div className="relative md:sticky md:top-0 h-auto md:h-[100svh] min-h-0 md:min-h-[580px] flex flex-col justify-center max-w-[1200px] mx-auto px-6 sm:px-12 py-16 md:py-0">
          {/* Small Mono Label */}
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#202026] border border-white/10 font-mono text-xs text-[#C0C3D8] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6FF3D]" />
              <span>hello</span>
            </span>
          </div>

          {/* Huge Reveal Paragraph */}
          <h2
            className="font-sans font-light tracking-tight text-[#F2F1F7] leading-[1.16] select-none text-[clamp(26px,7vw,38px)] md:text-[clamp(32px,4.4vw,72px)] max-w-full md:max-w-[22ch]"
          >
            {WORDS.map((token, i) => {
              const step = 1 / WORDS.length;
              const start = i * step * 0.85;
              const end = start + step * 1.5;
              return (
                <RevealWord
                  key={i}
                  token={token}
                  progress={scrollYProgress}
                  start={start}
                  end={Math.min(end, 1)}
                  reducedMotion={reducedMotion}
                />
              );
            })}
          </h2>

          {/* Small Round Lime Link */}
          <div className="mt-8 sm:mt-12">
            <Link
              href="/about"
              data-cursor="about"
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#D6FF3D] text-[#14141F] font-mono text-xs sm:text-sm font-semibold hover:bg-[#cbf731] transition-all duration-200 shadow-lg shadow-[#D6FF3D]/10 hover:shadow-[#D6FF3D]/25"
            >
              <span>more about me</span>
              <div className="w-5 h-5 rounded-full bg-[#14141F]/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#14141F]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
