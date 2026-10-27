'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface Sticker {
  id: string;
  label: string;
  sublabel?: string;
  rotate: number;
  bgClass: string;
  textClass: string;
  borderClass: string;
  xOffset: number;
  yOffset: number;
}

const stickers: Sticker[] = [
  {
    id: 's1',
    label: 'ANVIL ⚡',
    sublabel: '9-phase autonomous harness',
    rotate: -3,
    bgClass: 'bg-[var(--accent-lime)]',
    textClass: 'text-[var(--accent-lime-text)] font-semibold',
    borderClass: 'border-black/20',
    xOffset: 0,
    yOffset: 0,
  },
  {
    id: 's2',
    label: 'FastAPI + Python',
    sublabel: 'async backend',
    rotate: 2.5,
    bgClass: 'bg-[var(--bg-surface-elevated)]',
    textClass: 'text-[var(--text-primary)]',
    borderClass: 'border-[var(--border-hairline)]',
    xOffset: 120,
    yOffset: 20,
  },
  {
    id: 's3',
    label: 'Git Worktrees 🌿',
    sublabel: '<100ms sandboxing',
    rotate: -1.5,
    bgClass: 'bg-[var(--bg-surface)]',
    textClass: 'text-[var(--text-primary)]',
    borderClass: 'border-[var(--border-hairline)]',
    xOffset: 240,
    yOffset: -10,
  },
  {
    id: 's4',
    label: 'HealthWe ✦',
    sublabel: 'clinical entity extractor',
    rotate: 3,
    bgClass: 'bg-[var(--bg-surface-elevated)]',
    textClass: 'text-[var(--text-primary)]',
    borderClass: 'border-[var(--border-hairline)]',
    xOffset: 40,
    yOffset: 55,
  },
  {
    id: 's5',
    label: 'NST Rishihood 🎓',
    sublabel: 'B.Tech CS 2024–28',
    rotate: -2,
    bgClass: 'bg-[var(--bg-surface)]',
    textClass: 'text-[var(--text-muted)]',
    borderClass: 'border-[var(--border-hairline)]',
    xOffset: 200,
    yOffset: 65,
  },
];

export function DraggableStickers() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-44 sm:h-40 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/60 p-4 overflow-hidden select-none"
    >
      <div className="absolute top-2.5 left-4 flex items-center justify-between w-[calc(100%-2rem)] text-[11px] font-mono text-[var(--text-muted)] pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-tomato)]" />
          interactive sticker canvas
        </span>
        <span className="opacity-70 text-[10px]">drag & toss anywhere</span>
      </div>

      <div className="relative w-full h-full pt-6 flex flex-wrap gap-2.5 items-center">
        {stickers.map((stk) => (
          <motion.div
            key={stk.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.06, cursor: 'grab' }}
            whileDrag={{ scale: 1.12, cursor: 'grabbing', zIndex: 30 }}
            initial={{ rotate: stk.rotate }}
            className={`px-3 py-1.5 rounded-xl border ${stk.bgClass} ${stk.textClass} ${stk.borderClass} shadow-xs transition-shadow cursor-grab active:cursor-grabbing font-mono text-xs flex flex-col gap-0.5`}
            data-cursor="drag"
          >
            <div className="flex items-center gap-1.5 font-medium tracking-tight">
              <span>{stk.label}</span>
            </div>
            {stk.sublabel && (
              <span className="text-[10px] opacity-75 font-normal tracking-normal">
                {stk.sublabel}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
