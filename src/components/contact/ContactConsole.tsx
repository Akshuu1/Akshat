'use client';

import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { Copy, Check, ArrowUpRight, Clock, MessageSquare, Download } from 'lucide-react';

export function ContactConsole() {
  const [istTime, setIstTime] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<'email' | 'phone' | null>(null);

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
        setIstTime(new Intl.DateTimeFormat('en-US', options).format(now));
      } catch {
        setIstTime('12:00:00 PM');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = async (text: string, key: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2400);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* 1. Live IST Time & Location Status Widget */}
      <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3">
        <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[var(--accent-lime)]" />
            <span>LOCAL TIME // IST</span>
          </span>
          <span className="flex items-center gap-1 text-emerald-500 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ONLINE</span>
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold font-sans tracking-tight text-[var(--text-primary)]">
            {istTime || '11:45:00 PM'}
          </span>
          <span className="text-[11px] text-[var(--text-muted)]">
            Delhi NCR · {siteConfig.contact.timezone}
          </span>
        </div>

        <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <span>response turnaround</span>
          <span className="text-[var(--text-primary)] font-semibold">&lt; 24 hours</span>
        </div>
      </div>

      {/* 2. Direct Email Channel Card */}
      <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3 group hover:border-[var(--text-primary)]/40 transition-colors">
        <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
          <span>01 {"//"} DIRECT EMAIL</span>
          <span className="text-[var(--accent-lime)]">INBOX</span>
        </div>

        <p className="font-mono text-xs sm:text-sm font-semibold text-[var(--text-primary)] break-all select-all">
          {siteConfig.contact.email}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => handleCopy(siteConfig.contact.email, 'email')}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-xs text-[var(--text-primary)] hover:border-[var(--text-primary)]/60 transition-all cursor-pointer"
            data-cursor="copy"
          >
            {copiedKey === 'email' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-bold text-[11px]">copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span className="text-[11px]">copy email</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-transparent text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>mailto:</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 3. Phone & WhatsApp Card */}
      <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3 group hover:border-[var(--text-primary)]/40 transition-colors">
        <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
          <span>02 {"//"} CALL & WHATSAPP</span>
          <span className="text-[var(--accent-lime)]">VOICE / CHAT</span>
        </div>

        <p className="font-mono text-sm sm:text-base font-semibold text-[var(--text-primary)]">
          {siteConfig.contact.phoneDisplay}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => handleCopy(siteConfig.contact.phone, 'phone')}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-xs text-[var(--text-primary)] hover:border-[var(--text-primary)]/60 transition-all cursor-pointer"
            data-cursor="copy"
          >
            {copiedKey === 'phone' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-bold text-[11px]">copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span className="text-[11px]">copy number</span>
              </>
            )}
          </button>

          <a
            href="https://wa.me/918954928960"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-transparent text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <MessageSquare className="w-3 h-3 text-emerald-500" />
            <span>whatsapp</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 4. Profiles & Curriculum Vitae Bento */}
      <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3">
        <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          03 {"//"} NETWORK & ARTIFACTS
        </span>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={siteConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)] hover:border-[var(--text-primary)]/50 transition-all flex items-center justify-between group"
            data-cursor="github"
          >
            <div className="flex items-center gap-2">
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="font-semibold text-xs">GitHub</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={siteConfig.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)] hover:border-[var(--text-primary)]/50 transition-all flex items-center justify-between group"
            data-cursor="linkedin"
          >
            <div className="flex items-center gap-2">
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span className="font-semibold text-xs">LinkedIn</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)] hover:border-[var(--text-primary)]/50 transition-all flex items-center justify-between group mt-2"
          data-cursor="resume"
        >
          <div className="flex items-center gap-2">
            <Download className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
            <span className="font-semibold text-xs text-[var(--text-primary)]">Download CV</span>
            <span className="text-[10px] text-[var(--text-muted)] font-normal">(PDF, 2026)</span>
          </div>
          <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
