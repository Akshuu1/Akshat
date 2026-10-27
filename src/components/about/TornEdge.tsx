'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TornEdgeProps {
  className?: string;
}

export function TornEdge({ className = '' }: TornEdgeProps) {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0.15, 0.55], [0, -35]);

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none z-20 ${className}`}>
      <motion.div
        style={{ y: parallaxY }}
        className="w-full relative"
      >
        {/* Jagged Torn Paper SVG matching #EFE9DC with soft shadow */}
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-24 md:h-28 text-[var(--bg-base)] filter drop-shadow-[0_16px_20px_rgba(0,0,0,0.45)]"
        >
          {/* Detailed torn jagged contour */}
          <path
            d="
              M 0 0
              L 0 75
              Q 35 90 70 70
              T 140 85
              T 210 68
              T 280 88
              T 350 72
              T 420 92
              T 490 70
              T 560 86
              T 630 69
              T 700 91
              T 770 74
              T 840 88
              T 910 68
              T 980 92
              T 1050 73
              T 1120 89
              T 1190 70
              T 1260 88
              T 1330 72
              T 1400 90
              L 1440 76
              L 1440 0
              Z
            "
            fill="currentColor"
          />

          {/* Micro-fiber tear line accent */}
          <path
            d="
              M 0 76
              Q 35 91 70 71
              T 140 86
              T 210 69
              T 280 89
              T 350 73
              T 420 93
              T 490 71
              T 560 87
              T 630 70
              T 700 92
              T 770 75
              T 840 89
              T 910 69
              T 980 93
              T 1050 74
              T 1120 90
              T 1190 71
              T 1260 89
              T 1330 73
              T 1400 91
              L 1440 77
            "
            stroke="var(--border-hairline)"
            strokeWidth="1.2"
            opacity="0.8"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
}
