'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface ScrollBadgeProps {
  reducedMotion?: boolean;
}

export function ScrollBadge({ reducedMotion = false }: ScrollBadgeProps) {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={handleScrollDown}
      type="button"
      data-cursor="open"
      aria-label="Scroll to explore next section"
      className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D6FF3D] text-[#111111] flex items-center justify-center shadow-[0_6px_28px_rgba(214,255,61,0.45)] hover:scale-105 active:scale-95 transition-transform cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white select-none z-30"
    >
      {/* Rotating Circular Text "SCROLL TO EXPLORE · " */}
      <motion.div
        animate={reducedMotion ? false : { rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 w-full h-full pointer-events-none p-1"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            id="badgeCirclePath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text className="font-mono text-[8.5px] uppercase tracking-[0.22em] font-black fill-[#111111]">
            <textPath href="#badgeCirclePath" startOffset="0%">
              scroll to explore · scroll to explore ·
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center Arrow */}
      <ArrowDown className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#111111] group-hover:translate-y-0.5 transition-transform" />
    </button>
  );
}
