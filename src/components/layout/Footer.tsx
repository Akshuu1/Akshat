'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { ArrowUp, Mail, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export function Footer() {
  const [istTime, setIstTime] = useState<string>('');

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-24 border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        {/* Top row: Big zine quote + back to top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-[var(--border-hairline)]">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[var(--bg-base)] border border-[var(--border-hairline)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-ping" />
              <span>delhi ncr, india · {siteConfig.contact.timezone}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              turning complex problems into <span className="font-serif italic font-normal text-2xl md:text-3xl">practical</span>, scalable solutions.
            </h3>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            data-cursor="top"
            className="group flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs border border-[var(--border-hairline)] bg-[var(--bg-base)] hover:border-[var(--text-primary)]/50 transition-all cursor-pointer"
          >
            <span>back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Middle row: Live clock + Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 font-mono text-xs">
          {/* Col 1: Live IST Clock */}
          <div className="space-y-2">
            <span className="text-[var(--text-muted)] uppercase tracking-wider text-[10px]">
              local time (ist)
            </span>
            <div className="flex items-center gap-2 font-mono text-base font-semibold text-[var(--text-primary)]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>{istTime || '19:00:00 IST'}</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              newton school of technology · rishihood univ
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <span className="text-[var(--text-muted)] uppercase tracking-wider text-[10px]">
              directory
            </span>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="hover:text-[var(--accent-lime-text)] hover:underline">
                  01 // home
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[var(--accent-lime-text)] hover:underline">
                  02 // selected work
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent-lime-text)] hover:underline">
                  03 // about & story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--accent-lime-text)] hover:underline">
                  04 // get in touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Case Studies Direct */}
          <div className="space-y-2">
            <span className="text-[var(--text-muted)] uppercase tracking-wider text-[10px]">
              case studies
            </span>
            <ul className="space-y-1.5">
              <li>
                <Link href="/work/anvil" className="hover:underline">
                  → anvil harness (ai)
                </Link>
              </li>
              <li>
                <Link href="/work/healthwe" className="hover:underline">
                  → healthwe (clinical ai)
                </Link>
              </li>
              <li>
                <Link href="/work/countrees-ai-erp" className="hover:underline">
                  → countrees erp (backend)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div className="space-y-2">
            <span className="text-[var(--text-muted)] uppercase tracking-wider text-[10px]">
              signals
            </span>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-1.5 text-xs hover:text-[var(--text-primary)] transition-colors"
                data-cursor="email"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span className="truncate">{siteConfig.contact.email}</span>
              </a>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={siteConfig.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] hover:scale-110 transition-transform"
                  aria-label="GitHub profile"
                  data-cursor="github"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] hover:scale-110 transition-transform"
                  aria-label="LinkedIn profile"
                  data-cursor="linkedin"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: Colophon + Copyright */}
        <div className="pt-8 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
            <span>designed & engineered by akshat agrawal · 2026</span>
          </div>
          <div>
            <span>no cookies · no tracking · pure craft</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
