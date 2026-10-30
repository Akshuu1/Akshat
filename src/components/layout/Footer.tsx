'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/siteConfig';
import {
  ArrowUp,
  Mail,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
  MapPin,
  Clock,
  Phone,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export function Footer() {
  const [istTime, setIstTime] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setIstTime(formatter.format(now));
      } catch {
        setIstTime('07:00:00 PM');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-24 border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors duration-200 overflow-hidden select-none">
      {/* Background Subtle Paper Grid */}
      <div
        className="absolute inset-0 bg-paper-grid opacity-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 pt-16 sm:pt-20 pb-12 space-y-14 sm:space-y-16">
        {/* ================================================================= */}
        {/* 1. TOP CALL TO ACTION & AUTHOR BADGE                              */}
        {/* ================================================================= */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 pb-12 border-b border-[var(--border-hairline)]">
          {/* Left: Bold Statement */}
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-[var(--bg-base)] border border-[var(--border-hairline)] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-ping" />
              <span className="font-semibold tracking-wide">
                DELHI NCR · {siteConfig.contact.timezone}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-[var(--text-primary)] leading-[1.05]">
              Let&apos;s build something{' '}
              <span className="font-serif italic font-normal text-[var(--accent-tomato)] underline decoration-[var(--accent-lime)] decoration-wavy decoration-2">
                remarkable
              </span>
              .
            </h2>

            <p className="font-mono text-xs sm:text-sm text-[var(--text-muted)] max-w-xl leading-relaxed">
              Open to engineering internships, freelance systems, and collaborative software projects for 2026–2027.
            </p>
          </div>

          {/* Right: Author Identity Card + Primary CTAs */}
          <div className="flex flex-col items-start lg:items-end gap-5 shrink-0 w-full sm:w-auto">
            {/* Mini Profile Stamp with akshat.png */}
            <div className="flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-hairline)] shadow-sm">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#111111] border border-black/10 shrink-0">
                <Image
                  src="/akshat.png"
                  alt="Akshat Agrawal"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-0.5 font-mono text-xs text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[var(--text-primary)]">Akshat Agrawal</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  B.Tech CS @ Newton School of Tech
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                data-cursor="chat"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-mono text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-transform"
              >
                <span>start a conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="copy"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] hover:border-[var(--text-primary)]/40 font-mono text-xs text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>copy email</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                data-cursor="top"
                className="p-3 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] hover:border-[var(--text-primary)]/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <ArrowUp className="w-4 h-4 text-[var(--text-primary)]" />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. DIRECTORY & SIGNALS (4 Columns)                                */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-mono text-xs">
          {/* Col 1: Live IST Clock & Locale */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">
              <Clock className="w-3.5 h-3.5 text-[var(--accent-tomato)]" />
              <span>LOCAL TIME // IST</span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] space-y-1.5">
              <div className="flex items-center gap-2 text-base font-bold text-[var(--text-primary)]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{istTime || '19:30:00 IST'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <MapPin className="w-3 h-3 text-[var(--accent-tomato)]" />
                <span>Delhi NCR (28.61° N, 77.20° E)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Directory Links */}
          <div className="space-y-3">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold block">
              DIRECTORY
            </span>
            <ul className="space-y-2 text-[var(--text-muted)]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--text-primary)] hover:translate-x-1 inline-block transition-transform"
                >
                  01 // Home
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="hover:text-[var(--text-primary)] hover:translate-x-1 inline-block transition-transform"
                >
                  02 // My work
                </Link>
              </li>
              <li>
                <Link
                  href="/craft"
                  className="hover:text-[var(--text-primary)] hover:translate-x-1 inline-block transition-transform"
                >
                  03 // Craft my work
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--text-primary)] hover:translate-x-1 inline-block transition-transform"
                >
                  04 // About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[var(--text-primary)] hover:translate-x-1 inline-block transition-transform"
                >
                  05 // Get in touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Disciplines (The 4 core disciplines) */}
          <div className="space-y-3">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold block">
              DISCIPLINES
            </span>
            <ul className="space-y-2 text-[var(--text-muted)]">
              <li>
                <Link
                  href="/craft#full-stack"
                  className="hover:text-[#D6FF3D] hover:underline flex items-center gap-1.5"
                >
                  <span className="text-[var(--accent-lime)]">→</span> full-stack systems
                </Link>
              </li>
              <li>
                <Link
                  href="/craft#ai-ml"
                  className="hover:text-[#FF9EB5] hover:underline flex items-center gap-1.5"
                >
                  <span className="text-[#FF9EB5]">→</span> ai engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/craft#data-analyst"
                  className="hover:text-[#5CE1E6] hover:underline flex items-center gap-1.5"
                >
                  <span className="text-[#5CE1E6]">→</span> data analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/craft#designer"
                  className="hover:text-[#F4B860] hover:underline flex items-center gap-1.5"
                >
                  <span className="text-[#F4B860]">→</span> interface design
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Online Signals & Direct Channels */}
          <div className="space-y-3">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold block">
              SIGNALS
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors break-all"
                data-cursor="email"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--accent-tomato)] shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                data-cursor="phone"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--accent-lime)] shrink-0" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </a>

              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href={siteConfig.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] hover:scale-110 hover:border-[var(--text-primary)]/50 transition-all text-[var(--text-primary)]"
                  aria-label="GitHub profile"
                  data-cursor="github"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] hover:scale-110 hover:border-[var(--text-primary)]/50 transition-all text-[var(--text-primary)]"
                  aria-label="LinkedIn profile"
                  data-cursor="linkedin"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. BIG SIGNATURE WATERMARK                                        */}
        {/* ================================================================= */}
        <div className="pt-6 overflow-hidden pointer-events-none select-none">
          <div className="font-display font-black tracking-tighter uppercase text-center text-[clamp(44px,11.5vw,132px)] leading-[0.82] text-[var(--text-primary)] opacity-[0.06] dark:opacity-[0.08]">
            AKSHAT AGRAWAL
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. COLOPHON & BOTTOM BAR                                          */}
        {/* ================================================================= */}
        <div className="pt-6 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
            <span>engineered with Next.js, TypeScript &amp; Framer Motion</span>
          </div>

          <div>
            <span>no tracking · no cookies · pure craft · 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
