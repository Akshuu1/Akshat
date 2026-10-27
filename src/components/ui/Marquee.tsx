'use client';

import React from 'react';
import { toolsMarqueeList } from '@/data/skills';

export function Marquee() {
  const items = [...toolsMarqueeList, ...toolsMarqueeList, ...toolsMarqueeList];

  return (
    <div
      className="relative w-full overflow-hidden border-y border-[var(--border-hairline)] bg-[var(--bg-surface)]/60 py-3 select-none"
      aria-label="Core technologies and toolset"
    >
      <div className="flex w-max animate-marquee space-x-6 text-xs font-mono text-[var(--text-muted)] tracking-wider">
        {items.map((tool, idx) => (
          <div key={`${tool}-${idx}`} className="flex items-center space-x-6">
            <span className="hover:text-[var(--text-primary)] transition-colors">
              {tool}
            </span>
            <span className="text-[var(--accent-lime)] text-[10px]">✦</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
}
