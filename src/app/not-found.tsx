import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-28 flex flex-col items-center justify-center text-center space-y-8 min-h-[60vh]">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-muted)]">
        <Compass className="w-3.5 h-3.5 text-[var(--accent-lime)] animate-spin" />
        <span>HTTP STATUS 404 // ROUTE NOT FOUND</span>
      </div>

      <div className="space-y-4 max-w-xl">
        <h1 className="text-7xl sm:text-9xl font-bold font-mono tracking-tighter text-[var(--text-primary)]">
          4<span className="text-[var(--accent-lime)] font-serif italic font-normal">0</span>4
        </h1>

        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          this page took a{' '}
          <span className="font-serif italic font-normal text-[var(--text-primary)]">
            gap year.
          </span>
        </h2>

        <p className="text-sm md:text-base text-[var(--text-muted)] font-mono leading-relaxed">
          It might have moved, been renamed, or never existed in the first place.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-base)] text-xs font-mono font-medium hover:opacity-90 transition-opacity"
          data-cursor="home"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>back to safe ground</span>
        </Link>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-mono hover:border-[var(--text-primary)]/40 transition-colors"
        >
          <span>view projects instead</span>
        </Link>
      </div>
    </div>
  );
}
