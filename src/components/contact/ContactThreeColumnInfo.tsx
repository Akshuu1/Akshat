'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { Copy, Check, FileText, ArrowUpRight } from 'lucide-react';

export function ContactThreeColumnInfo() {
  const [copiedKey, setCopiedKey] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (text: string, key: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
      {/* Col 1: REACH ME */}
      <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex flex-col justify-between gap-3 group hover:border-[var(--text-primary)]/40 transition-colors">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            REACH ME {"//"} DIRECT
          </span>
          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
            {siteConfig.contact.email}
          </p>
        </div>

        <button
          onClick={() => handleCopy(siteConfig.contact.email, 'email')}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-xs text-[var(--text-primary)] hover:border-[var(--text-primary)]/50 transition-colors cursor-pointer w-fit"
          data-cursor="copy"
        >
          {copiedKey === 'email' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-bold text-[11px]">copied to clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="text-[11px]">click to copy</span>
            </>
          )}
        </button>
      </div>

      {/* Col 2: CALL / WHATSAPP */}
      <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex flex-col justify-between gap-3 group hover:border-[var(--text-primary)]/40 transition-colors">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            CALL / WHATSAPP {"//"} IST
          </span>
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {siteConfig.contact.phoneDisplay}
          </p>
        </div>

        <button
          onClick={() => handleCopy(siteConfig.contact.phone, 'phone')}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-xs text-[var(--text-primary)] hover:border-[var(--text-primary)]/50 transition-colors cursor-pointer w-fit"
          data-cursor="copy"
        >
          {copiedKey === 'phone' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-bold text-[11px]">copied to clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="text-[11px]">click to copy</span>
            </>
          )}
        </button>
      </div>

      {/* Col 3: FOLLOW & CV */}
      <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex flex-col justify-between gap-3 group hover:border-[var(--text-primary)]/40 transition-colors">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            FOLLOW {"//"} PROFILES & CV
          </span>
          <div className="flex items-center gap-3 pt-0.5">
            <a
              href={siteConfig.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] text-[var(--text-muted)] transition-colors"
              data-cursor="open"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <span>·</span>

            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] text-[var(--text-muted)] transition-colors"
              data-cursor="open"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={siteConfig.resumes.ai.href}
            target="_blank"
            rel="noopener noreferrer"
            download={siteConfig.resumes.ai.filename}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-xs text-[var(--text-primary)] hover:border-[var(--accent-lime)] transition-colors w-fit"
            data-cursor="resume"
            title="Download AI & ML Resume"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
            <span className="text-[11px]">AI / ML CV</span>
            <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
          </a>

          <a
            href={siteConfig.resumes.fullstack.href}
            target="_blank"
            rel="noopener noreferrer"
            download={siteConfig.resumes.fullstack.filename}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-xs text-[var(--text-primary)] hover:border-[#5CE1E6] transition-colors w-fit"
            data-cursor="resume"
            title="Download Full-Stack Resume"
          >
            <FileText className="w-3.5 h-3.5 text-[#5CE1E6]" />
            <span className="text-[11px]">Full-Stack CV</span>
            <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
          </a>
        </div>
      </div>
    </div>
  );
}
