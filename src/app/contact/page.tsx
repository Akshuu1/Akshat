import React from 'react';
import type { Metadata } from 'next';
import { ContactConsole } from '@/components/contact/ContactConsole';
import { ContactFormStudio } from '@/components/contact/ContactFormStudio';
import { StretchyWord } from '@/components/ui/StretchyWord';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact — Let's build something real",
  description:
    'Start a conversation with Akshat Agrawal regarding autonomous AI agents, distributed systems engineering, or 2026–27 internship opportunities.',
};

export default function ContactPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-20 space-y-16 md:space-y-24 overflow-visible">
      {/* 1. Studio Editorial Hero Header */}
      <section className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
          <span className="font-semibold text-[var(--text-primary)]">
            open for internships · 2026–27
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.92] text-[var(--text-primary)]">
          let&apos;s build <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-[var(--text-primary)]">
            something real
          </span>
          <span className="text-[var(--accent-lime)]">.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] font-mono leading-relaxed max-w-2xl">
          I build autonomous AI agent harnesses, resilient backend architectures, and web interfaces that feel alive.
        </p>
      </section>

      {/* 2. Asymmetric Split Grid: Left Direct Signals & Right Dispatch Console */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct Signal Hub */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] pb-1 border-b border-[var(--border-hairline)]">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
              <span>DIRECT SIGNALS</span>
            </span>
            <span>VERIFIED INFO</span>
          </div>

          <ContactConsole />
        </div>

        {/* Right Column: Dispatch Form Studio */}
        <div className="lg:col-span-7">
          <ContactFormStudio />
        </div>
      </section>

      {/* 3. The Grand Finale: Stretchy CONTACT Wordmark */}
      <section
        className="w-full pt-16 md:pt-24 border-t border-[var(--border-hairline)] overflow-visible space-y-4"
        aria-label="Interactive stretchy contact wordmark"
      >
        <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)]" />
            <span>04 {"//"} CURSOR & TOUCH INTERACTIVE</span>
          </span>
          <span className="text-[11px] opacity-70 hidden sm:inline">
            drag cursor or finger across letters to stretch
          </span>
        </div>

        <div className="overflow-visible pt-2">
          <StretchyWord text="CONTACT" ariaLabel="Contact" />
        </div>
      </section>
    </div>
  );
}
