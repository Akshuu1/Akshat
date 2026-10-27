'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BannerWordsProps {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
}

const WORDS = [
  { text: 'FULL STACK', centerProgress: 0.0, color: '#F3F0E8' },
  { text: 'AI ENGINEER', centerProgress: 1 / 3, color: '#F6E9EC' },
  { text: 'DATA ANALYST', centerProgress: 2 / 3, color: '#F2F1F7' },
  { text: 'DESIGNER', centerProgress: 1.0, color: '#F6EBDD' },
];

function BannerWordItem({
  word,
  progress,
  reducedMotion,
}: {
  word: (typeof WORDS)[number];
  progress: MotionValue<number>;
  reducedMotion?: boolean;
}) {
  const p_i = word.centerProgress;

  // Parallax offset relative to 1x track: shifts by +60vw over progress 0..1
  // resulting in net screen velocity of 0.7x
  const parallaxX = useTransform(progress, (p) => {
    if (reducedMotion) return '0vw';
    const offset = (p - p_i) * 60;
    return `${offset}vw`;
  });

  // Solid paper color fill: fills in as frame centers, fades out neighbors
  const fillOpacity = useTransform(
    progress,
    [p_i - 0.18, p_i, p_i + 0.18],
    [0, 0.75, 0]
  );

  // Outline stroke opacity: 14% baseline when distant, increases to 100% when centered
  const strokeOpacity = useTransform(
    progress,
    [p_i - 0.35, p_i - 0.18, p_i, p_i + 0.18, p_i + 0.35],
    [0.14, 0.35, 1, 0.35, 0.14]
  );

  return (
    <div className="relative w-screen h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      <motion.div
        style={{ x: parallaxX }}
        className="relative flex items-center justify-center will-change-transform"
      >
        {/* Outlined Base Layer (2px stroke, no fill, 14% to 100% opacity) */}
        <motion.span
          style={{ opacity: strokeOpacity }}
          className="font-display font-normal uppercase tracking-tight whitespace-nowrap text-transparent leading-[0.85]"
          aria-hidden="true"
        >
          <span
            style={{
              fontSize: 'min(28vw, 46vh)',
              WebkitTextStroke: '2px rgba(243, 240, 232, 0.65)',
            }}
          >
            {word.text}
          </span>
        </motion.span>

        {/* Solid Paper Fill Layer (fills in solid paper color as it centres, fades out neighbors) */}
        <motion.span
          style={{ opacity: fillOpacity, color: word.color }}
          className="absolute inset-0 flex items-center justify-center font-display font-normal uppercase tracking-tight whitespace-nowrap leading-[0.85] pointer-events-none"
          aria-hidden="true"
        >
          <span
            style={{
              fontSize: 'min(28vw, 46vh)',
            }}
          >
            {word.text}
          </span>
        </motion.span>
      </motion.div>
    </div>
  );
}

export function BannerWords({ progress, reducedMotion }: BannerWordsProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-[400vw] h-[100svh] flex pointer-events-none select-none z-10"
    >
      {WORDS.map((word) => (
        <BannerWordItem
          key={word.text}
          word={word}
          progress={progress}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
