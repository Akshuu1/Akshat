import React from 'react';
import type { Metadata } from 'next';
import { FilmStrip } from '@/components/craft/FilmStrip';

export const metadata: Metadata = {
  title: 'Craft — Kinetic Filmstrip & Disciplines',
  description:
    'Horizontal continuous discipline filmstrip across Full-Stack, AI Engineering, and Product Design.',
};

export default function CraftPage() {
  return (
    <main className="w-full overflow-visible pb-0 mb-0">
      <h1 className="sr-only">Craft — Discipline Film Strip</h1>
      <FilmStrip />
    </main>
  );
}
