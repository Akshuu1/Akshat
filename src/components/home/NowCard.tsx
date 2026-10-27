'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Clock, MapPin } from 'lucide-react';
import { homeData } from '@/data/home';

export function NowCard() {
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setIstTime(timeStr);
      } catch {
        setIstTime('Live // IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard className="p-6 sm:p-8 max-w-3xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-hairline)]">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
          <span className="font-bold text-[var(--text-primary)]">CURRENT STATUS // NOW</span>
        </div>

        {/* Live IST Clock */}
        <div className="flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] text-[var(--text-primary)] w-fit shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
          <span>{istTime || 'Loading...'} IST</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <MapPin className="w-3.5 h-3.5 text-[var(--accent-tomato)]" />
          <span>{homeData.now.role}</span>
        </div>
        <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium leading-relaxed">
          {homeData.now.focus}
        </p>
      </div>

      <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
        <span>Open for 2026 Internships</span>
        <span className="text-[var(--accent-lime)] font-bold">● Active Terminal</span>
      </div>
    </GlassCard>
  );
}
