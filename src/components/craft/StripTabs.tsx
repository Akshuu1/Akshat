'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface StripTabsProps {
  activeIndex: number;
  accentColor: MotionValue<string>;
  onSelectFrame: (index: number) => void;
}

const TABS = [
  { label: 'Full stack', index: 0, hash: '#full-stack' },
  { label: 'AI engineer', index: 1, hash: '#ai-ml' },
  { label: 'Data analyst', index: 2, hash: '#data-analyst' },
  { label: 'Designer', index: 3, hash: '#designer' },
];

export function StripTabs({
  activeIndex,
  accentColor,
  onSelectFrame,
}: StripTabsProps) {
  return (
    <nav
      aria-label="Discipline Filmstrip Navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none"
    >
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-[#0F1118]/85 border border-white/15 backdrop-blur-md shadow-2xl">
        {TABS.map((tab, idx) => {
          const isActive = activeIndex === tab.index;
          return (
            <button
              key={tab.label}
              onClick={() => onSelectFrame(tab.index)}
              className="relative px-3 sm:px-4 py-1 text-xs font-mono tracking-wider transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-white/40 rounded-full cursor-pointer flex items-center gap-1.5"
            >
              <span
                className={`transition-colors duration-200 ${
                  isActive ? 'text-white font-bold' : 'text-white/60 hover:text-white/90'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Accent Underline & Indicator */}
              {isActive && (
                <motion.div
                  layoutId="strip-active-indicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                  style={{ backgroundColor: accentColor }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
