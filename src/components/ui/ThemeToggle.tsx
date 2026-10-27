'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-cursor="theme"
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--text-primary)]/40 text-xs font-mono transition-all duration-200 cursor-pointer ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="flex items-center gap-1.5"
      >
        {theme === 'light' ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline text-[11px] font-medium text-[var(--text-primary)]">paper</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
            <span className="hidden sm:inline text-[11px] font-medium text-[var(--text-primary)]">obsidian</span>
          </>
        )}
      </motion.div>
    </button>
  );
}
