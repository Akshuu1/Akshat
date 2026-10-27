'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { CharacterSticker } from './CharacterSticker';

interface StatementMarqueeProps {
  reducedMotion?: boolean;
}

// Single continuous velocity-linked marquee track
function VelocityTrack({
  text,
  baseVelocity = 1.5,
  outlined = false,
  reducedMotion = false,
}: {
  text: string;
  baseVelocity: number;
  outlined?: boolean;
  reducedMotion?: boolean;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    if (reducedMotion) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 16);

    const currentVelocity = velocityFactor.get();
    if (currentVelocity < -0.1) {
      directionFactor.current = -1;
    } else if (currentVelocity > 0.1) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.abs(currentVelocity);

    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${(v % 50) - 25}%`);

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap select-none w-full">
      <motion.div
        style={{ x: reducedMotion ? '0%' : x }}
        className="flex whitespace-nowrap gap-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black uppercase tracking-tighter"
      >
        <span
          className={
            outlined
              ? 'text-transparent [-webkit-text-stroke:1.5px_#D6FF3D]'
              : 'text-[#F3F0E8]'
          }
        >
          {text} · {text} · {text} · {text}
        </span>
        <span
          className={
            outlined
              ? 'text-transparent [-webkit-text-stroke:1.5px_#D6FF3D]'
              : 'text-[#F3F0E8]'
          }
        >
          {text} · {text} · {text} · {text}
        </span>
      </motion.div>
    </div>
  );
}

export function StatementMarquee({ reducedMotion = false }: StatementMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 bg-[#0E0E0C] overflow-hidden flex flex-col justify-center items-center select-none"
      aria-label="Interactive statement marquee"
    >
      {/* Subtle radial aura in background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(circle at center, rgba(214, 255, 61, 0.15) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Top & Bottom Marquee Tracks behind the Sticker (z-0) */}
      <div className="relative w-full space-y-4 sm:space-y-6 z-0 pointer-events-none opacity-90 py-6">
        {/* Row 1: Solid Paper White Text, moves left */}
        <VelocityTrack
          text="FULL-STACK ✦ AI SYSTEMS ✦ DESIGN ✦"
          baseVelocity={-1.8}
          outlined={false}
          reducedMotion={reducedMotion}
        />

        {/* Row 2: Electric Lime Outlined Text, moves right */}
        <VelocityTrack
          text="✦ AGENTS THAT WORK ✦ RESILIENT BACKENDS ✦ TACTILE UI ✦"
          baseVelocity={1.4}
          outlined={true}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Central Portrait Sticker sitting ABOVE the text (z-20) */}
      <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-auto">
        <CharacterSticker size="lg" dieCutOutline={true} />

        {/* Subtle Mono Caption Sticker Tag below */}
        <div className="mt-3 px-3 py-1 rounded-full bg-[#111111]/90 border border-[#D6FF3D]/40 font-mono text-[10px] sm:text-xs text-[#D6FF3D] tracking-wider uppercase backdrop-blur-md shadow-lg font-bold">
          builder · 2026
        </div>
      </div>
    </section>
  );
}
