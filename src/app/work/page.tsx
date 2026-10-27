import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { WorkPageView } from '@/components/work/WorkPageView';

export const metadata: Metadata = {
  title: 'Work — Selected Projects & Systems',
  description:
    'Case studies of autonomous coding harnesses, AI clinical extraction platforms, and enterprise data backends built by Akshat Agrawal.',
};

export default function WorkPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <WorkPageView projects={projects} />
    </Suspense>
  );
}
