'use client';

import React from 'react';
import Link from 'next/link';
import { PosterHeader } from '@/components/about/PosterHeader';
import { HelloBlock } from '@/components/about/HelloBlock';
import { ExperienceEducation } from '@/components/about/ExperienceEducation';
import { SkillsGrid } from '@/components/about/SkillsGrid';
import { Polaroid } from '@/components/about/Polaroid';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { aboutData } from '@/data/about';
import { siteConfig } from '@/data/siteConfig';
import { Download, ArrowUpRight, Sparkles, MessageSquare } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full relative min-h-screen bg-paper-grid text-[var(--text-primary)] transition-colors duration-200">
      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-24 space-y-16 sm:space-y-24">
        {/* Section 1: Poster Header */}
        <PosterHeader />

        {/* Section 2: Bio & Character Story */}
        <HelloBlock />

        {/* Section 3: Track Record & Academic Foundations */}
        <ExperienceEducation />

        {/* Section 4: Technical Skills & Toolchain */}
        <SkillsGrid />

        {/* Section 5: Leadership & Stuff I Do Polaroid Wall */}
        <section className="relative w-full pt-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border-hairline)]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#FF5A36]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-semibold text-[var(--text-primary)]">04 // BEYOND THE TERMINAL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-primary)] uppercase tracking-tight">
                Stuff I <span className="font-serif italic font-normal text-[var(--text-primary)]">Do</span>
              </h2>
            </div>

            <p className="font-mono text-xs text-[var(--text-muted)] max-w-sm">
              Community leadership, hackathon sprints, and junior mentorship captured in snapshots.
            </p>
          </div>

          {/* Polaroids Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 overflow-x-auto sm:overflow-visible pb-4 snap-x">
            {aboutData.activities.map((activity, idx) => (
              <div key={activity.id} className="snap-center shrink-0 w-full">
                <Polaroid activity={activity} index={idx} />
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Closing Section: Invitation & Direct Connect */}
        <section className="relative w-full pt-16 pb-8 border-t border-[var(--border-hairline)] text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
              <span>OPEN FOR 2026 INTERNSHIPS</span>
            </div>

            <h3 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tighter text-[var(--text-primary)] uppercase leading-none">
              let&apos;s make{' '}
              <span className="font-serif italic font-normal text-[var(--text-primary)]">
                something
              </span>
              .
            </h3>

            <p className="font-mono text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto">
              Open to internships, collaborations and good conversations.
            </p>
          </div>

          {/* Magnetic Primary CTA & Secondary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <MagneticButton>
              <Link
                href="/contact"
                data-cursor="chat"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-mono text-sm font-bold shadow-[0_4px_24px_rgba(214,255,61,0.25)] hover:scale-105 transition-transform"
              >
                <MessageSquare className="w-4 h-4" />
                <span>start a conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </MagneticButton>

            <a
              href={siteConfig.resumes.ai.href}
              download={siteConfig.resumes.ai.filename}
              data-cursor="cv"
              className="inline-flex items-center gap-2 px-5 py-4 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-xs sm:text-sm hover:border-[var(--accent-lime)] hover:bg-[var(--bg-surface-elevated)] transition-colors"
              title="Download AI & Machine Learning Resume (PDF)"
            >
              <Download className="w-4 h-4 text-[var(--accent-lime)]" />
              <span>CV · AI &amp; ML</span>
            </a>

            <a
              href={siteConfig.resumes.fullstack.href}
              download={siteConfig.resumes.fullstack.filename}
              data-cursor="cv"
              className="inline-flex items-center gap-2 px-5 py-4 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-xs sm:text-sm hover:border-[#5CE1E6] hover:bg-[var(--bg-surface-elevated)] transition-colors"
              title="Download Full-Stack Engineering Resume (PDF)"
            >
              <Download className="w-4 h-4 text-[#5CE1E6]" />
              <span>CV · Full-Stack</span>
            </a>
          </div>

          {/* Direct Social Links */}
          <div className="flex items-center justify-center gap-6 pt-6 font-mono text-xs text-[var(--text-muted)]">
            <a
              href={siteConfig.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <span className="opacity-30">/</span>

            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <span className="opacity-30">/</span>

            <Link
              href="/craft"
              data-cursor="reel"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              04 craft reel ↗
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
