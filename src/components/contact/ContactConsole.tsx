'use client';

import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { Clock } from 'lucide-react';
import { StickerPile } from '@/components/contact/StickerPile';

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

      {/* 2. Direct Channels & Real Links: The Sticker Pile */}
      <StickerPile />
    </div>
  );
}
