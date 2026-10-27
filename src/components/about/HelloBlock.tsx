'use client';

import React from 'react';
import Link from 'next/link';
import { SelectionBox } from './SelectionBox';
import { aboutData } from '@/data/about';
import { ArrowUpRight, MapPin, Terminal } from 'lucide-react';

export function HelloBlock() {
  return (
    <section className="relative w-full py-8 sm:py-12 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Figma Selection Box Avatar & Quick Info Stamp */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-4">
          <SelectionBox />

          {/* Quick Info Stamp Card */}
          <div className="w-full max-w-[280px] p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm space-y-2 font-mono text-xs text-[var(--text-muted)]">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
              <span className="flex items-center gap-1.5 text-[var(--text-primary)] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#D6FF3D] border border-black/20 animate-pulse" />
                <span>ONLINE // IST</span>
              </span>
              <span>2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
              <MapPin className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>Delhi NCR, India</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)] leading-snug">
              B.Tech CS @ Newton School of Technology (Rishihood University)
            </div>
          </div>
        </div>

        {/* Right Column: Giant HELLO + Human Narrative Paragraph + Project Badges */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
              <span className="font-semibold text-[var(--text-primary)]">01 // THE ESSENCE</span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-display font-black text-[var(--text-primary)] uppercase tracking-tight leading-none">
              HELLO<span className="text-[#FF5A36]">.</span>
            </h2>
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[var(--text-primary)] leading-relaxed">
            {aboutData.bio.hello}
          </p>

          {/* Built Recently Badges */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
              <Terminal className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span className="font-semibold text-[var(--text-primary)]">KEY PRODUCTION SYSTEMS</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {aboutData.projects.map((proj) => (
                <Link
                  key={proj.name}
                  href={proj.href}
                  data-cursor="open"
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-primary)] hover:border-[var(--text-primary)]/40 hover:bg-[var(--bg-surface-elevated)] transition-colors font-mono text-xs font-medium"
                >
                  <span className="font-bold">{proj.name}</span>
                  <span className="opacity-70 text-[11px]">({proj.description})</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
