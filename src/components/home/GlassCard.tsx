'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className = '',
  hoverEffect = false,
}: GlassCardProps) {
  return (
    <div
      className={`
        relative rounded-2xl md:rounded-3xl
        bg-[var(--bg-surface)]/85
        backdrop-blur-xl
        border border-[var(--border-hairline)]
        shadow-[0_16px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)]
        text-[var(--text-primary)]
        transition-all duration-300
        ${
          hoverEffect
            ? 'hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
            : ''
        }
        ${className}
      `}
    >
      {/* Subtle specular reflection highlight on top edge */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-2xl md:rounded-t-3xl bg-gradient-to-r from-transparent via-[var(--border-strong)]/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
