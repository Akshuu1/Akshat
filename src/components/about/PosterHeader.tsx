'use client';

import React from 'react';
import { aboutData } from '@/data/about';

export function PosterHeader() {
  return (
    <header className="relative w-full pt-4 sm:pt-8 pb-8 sm:pb-12 border-b border-[var(--border-hairline)] select-none">
      {/* 1. Corner Tracker Strip */}
      <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] pb-6 border-b border-[var(--border-hairline)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5A36]" />
          <span className="font-semibold text-[var(--text-primary)]">{aboutData.header.cornerLeft}</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span>PORTFOLIO ZINE</span>
          <span className="opacity-40">/</span>
          <span className="font-bold text-[var(--text-primary)]">VOL. {aboutData.header.cornerRight}</span>
        </div>
      </div>

      {/* 2. Editorial Headline & Tagline */}
      <div className="pt-8 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-primary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6FF3D] border border-black/30" />
            <span className="font-medium text-[var(--text-primary)]">THE DEVELOPER BEHIND THE HARNESS</span>
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-black text-[var(--text-primary)] uppercase tracking-tighter leading-[0.88]">
            ABOUT<span className="text-[#FF5A36]">.</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[var(--text-primary)] max-w-2xl leading-snug">
            Engineering where <span className="italic font-normal px-1.5 py-0.5 rounded bg-[#D6FF3D] text-[#111111]">AI agents</span> meet resilient backend systems and tactile interfaces.
          </p>
        </div>

        {/* Right Stamp: Handwritten Signature & Credential */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-3 pb-2">
          <div className="flex items-center gap-2 text-right">
            <svg
              width="45"
              height="28"
              viewBox="0 0 45 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#FF5A36] shrink-0 transform -rotate-12"
              aria-hidden="true"
            >
              <path
                d="M 5 22 Q 25 24 38 8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 30 8 L 38 8 L 36 16"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="font-handwriting text-3xl text-[#FF5A36] select-none font-bold">
              {aboutData.header.handwrittenNote} ✍
            </span>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
            NEWTON SCHOOL OF TECHNOLOGY · B.TECH &apos;28
          </span>
        </div>
      </div>
    </header>
  );
}
