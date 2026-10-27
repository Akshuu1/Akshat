'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AboutActivity } from '@/data/about';
import { Trophy, Users, Compass, Sparkles } from 'lucide-react';

interface PolaroidProps {
  activity: AboutActivity;
  index: number;
}

export function Polaroid({ activity, index }: PolaroidProps) {
  // Alternate initial tilt angles between -3deg and +3deg
  const tiltAngle = index % 2 === 0 ? -3 : 3;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, rotate: tiltAngle }}
      whileInView={{ opacity: 1, y: 0, rotate: tiltAngle }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        rotate: 0,
        scale: 1.04,
        y: -8,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="relative p-4 pb-6 rounded-sm bg-[#FDFBF7] border border-[#D9D2C2] shadow-[0_12px_32px_rgba(0,0,0,0.22)] flex flex-col justify-between space-y-4 select-none cursor-pointer group"
      data-cursor="view"
    >
      {/* Translucent Washi Tape Strip at Top Center */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#EFE9DC]/80 border border-black/10 -rotate-1 backdrop-blur-xs shadow-xs pointer-events-none"
        aria-hidden="true"
      />

      {/* Polaroid Picture Area with Abstract Gradient & Motif */}
      <div
        className={`w-full aspect-[4/3] rounded-xs bg-gradient-to-br ${activity.gradient} border border-black/5 p-4 flex flex-col justify-between overflow-hidden relative`}
      >
        <div className="flex items-center justify-between text-[10px] font-mono text-[#111111]/80">
          <span className="bg-black/10 px-2 py-0.5 rounded-full font-bold">
            {activity.year}
          </span>
          <span className="uppercase tracking-wider">EVENT LOG</span>
        </div>

        {/* Abstract Iconic Glyph */}
        <div className="flex items-center justify-center py-3 text-[#111111]">
          {activity.id === 'damru' && <Users className="w-8 h-8 opacity-75" />}
          {activity.id === 'neutron' && <Compass className="w-8 h-8 opacity-75" />}
          {activity.id === 'mentor' && <Sparkles className="w-8 h-8 opacity-75" />}
          {activity.id === 'hackathons' && <Trophy className="w-8 h-8 opacity-75" />}
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#111111]/90">
          <span className="font-bold">{activity.title}</span>
          <span className="text-[#111111]/70">{activity.role}</span>
        </div>
      </div>

      {/* Polaroid Handwritten Caption Section */}
      <div className="space-y-1.5 px-1">
        <p className="font-handwriting text-2xl text-[#111111] leading-none font-bold">
          {activity.caption}
        </p>

        <p className="font-mono text-xs text-[#575349] leading-relaxed line-clamp-2">
          {activity.description}
        </p>
      </div>
    </motion.article>
  );
}
