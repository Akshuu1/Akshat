'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { Copy, Check, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export function ContactSignals() {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-4">
      {/* Email Card */}
      <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center justify-between gap-4">
        <div className="space-y-1 overflow-hidden">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-[var(--text-muted)]">
            <Mail className="w-3 h-3 text-[var(--accent-lime)]" />
            <span>EMAIL // DIRECT INBOX</span>
          </div>
          <p className="font-mono text-xs sm:text-sm font-semibold text-[var(--text-primary)] truncate">
            {siteConfig.contact.email}
          </p>
        </div>

        <button
          onClick={() => copyToClipboard(siteConfig.contact.email, 'email')}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-xs font-mono hover:border-[var(--text-primary)]/50 transition-colors cursor-pointer"
          data-cursor="copy"
        >
          {copiedType === 'email' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-semibold text-[11px]">copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">copy</span>
            </>
          )}
        </button>
      </div>

      {/* Phone Card */}
      <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-[var(--text-muted)]">
            <Phone className="w-3 h-3 text-[var(--accent-lime)]" />
            <span>PHONE // CALL OR WHATSAPP</span>
          </div>
          <p className="font-mono text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
            {siteConfig.contact.phoneDisplay}
          </p>
        </div>

        <button
          onClick={() => copyToClipboard(siteConfig.contact.phone, 'phone')}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-xs font-mono hover:border-[var(--text-primary)]/50 transition-colors cursor-pointer"
          data-cursor="copy"
        >
          {copiedType === 'phone' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-semibold text-[11px]">copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">copy</span>
            </>
          )}
        </button>
      </div>

      {/* Social / Profiles */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <a
          href={siteConfig.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--text-primary)]/40 hover:bg-[var(--bg-surface-elevated)] transition-all flex items-center justify-between"
          data-cursor="github"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-primary)]">
            <GithubIcon className="w-4 h-4" />
            <span>github</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
        </a>

        <a
          href={siteConfig.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--text-primary)]/40 hover:bg-[var(--bg-surface-elevated)] transition-all flex items-center justify-between"
          data-cursor="linkedin"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-primary)]">
            <LinkedinIcon className="w-4 h-4" />
            <span>linkedin</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
        </a>
      </div>
    </div>
  );
}
