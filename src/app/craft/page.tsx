import React from 'react';
import type { Metadata } from 'next';
import { ReelStage } from '@/components/craft/ReelStage';

export const metadata: Metadata = {
  title: 'Craft — Kinetic Discipline Reel',
  description:
    'Full-screen edge-to-edge kinetic typography reel and production project showcases across Full-Stack, AI/ML Engineering, and Product Design.',
};

export default function CraftPage() {
  return (
    <main className="w-full min-h-screen overflow-visible">
      <h1 className="sr-only">Craft — Motion Design Reel & Projects</h1>
      <ReelStage />
    </main>
  );
}
