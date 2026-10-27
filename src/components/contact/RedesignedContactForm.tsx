'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const topics = [
  'Internship / Placement',
  'Freelance / Project',
  'AI & Agents',
  'Just saying hi',
] as const;

type TopicType = (typeof topics)[number];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  topic: z.enum(topics, {
    error: 'Please choose a topic',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function RedesignedContactForm() {
  const [selectedTopic, setSelectedTopic] = useState<TopicType>('Internship / Placement');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [messageLength, setMessageLength] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: 'Internship / Placement',
      honeypot: '',
    },
  });

  const messageRegistration = register('message');

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus('success');
        setStatusMessage(json.message || "got it, I'll reply within 48h.");

        // Celebratory confetti burst
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.75 },
            colors: ['#D6FF3D', '#111111', '#FF5A36', '#F3F0E8'],
          });
        } catch {
          // ignore
        }
        reset();
        setMessageLength(0);
      } else {
        setStatus('error');
        setStatusMessage(json.message || 'Something went wrong. Please retry or email directly.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Connection error. Please retry or reach out via direct email.');
    }
  };

  return (
    <div className="rounded-[24px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-10 transition-colors duration-200">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden Honeypot Field for Spam Bot Protection */}
        <input
          type="text"
          {...register('honeypot')}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* 1. Topic Chips */}
        <div className="space-y-2.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            01 {"//"} TOPIC OF DISCUSSION
          </label>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setSelectedTopic(t);
                  setValue('topic', t, { shouldValidate: true });
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border cursor-pointer ${
                  selectedTopic === t
                    ? 'bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-bold border-black/20 shadow-xs'
                    : 'bg-[var(--bg-base)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]/40'
                }`}
                data-cursor="filter"
              >
                {t}
              </button>
            ))}
          </div>
          {errors.topic && (
            <p className="text-xs text-[var(--accent-tomato)] font-mono" role="alert">
              {errors.topic.message}
            </p>
          )}
        </div>

        {/* 2. Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]"
            >
              02 {"//"} YOUR NAME
            </label>
            <input
              id="contact-name"
              {...register('name')}
              placeholder="Ada Lovelace"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)] text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-lime)] transition-colors"
            />
            {errors.name && (
              <p className="text-xs text-[var(--accent-tomato)] font-mono" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-email"
              className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]"
            >
              03 {"//"} YOUR EMAIL
            </label>
            <input
              id="contact-email"
              {...register('email')}
              type="email"
              placeholder="ada@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)] text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-lime)] transition-colors"
            />
            {errors.email && (
              <p className="text-xs text-[var(--accent-tomato)] font-mono" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* 3. Message Area with Character Counter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="contact-message"
              className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]"
            >
              04 {"//"} MESSAGE
            </label>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              {messageLength} characters (min 10)
            </span>
          </div>

          <textarea
            id="contact-message"
            {...messageRegistration}
            onChange={(e) => {
              messageRegistration.onChange(e);
              setMessageLength(e.target.value.length);
            }}
            rows={4}
            placeholder="Tell me about the engineering challenge, internship role, or system idea..."
            className="w-full px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)] text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-lime)] transition-colors resize-none"
          />
          {errors.message && (
            <p className="text-xs text-[var(--accent-tomato)] font-mono" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Error Notification Alert */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-mono text-[var(--accent-tomato)] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
              <a
                href="mailto:akshat.agrawal2024@nst.rishihood.edu.in"
                className="underline hover:text-[var(--text-primary)] font-bold shrink-0"
              >
                open mailto: ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions Row: Status Morphing Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {status === 'success' ? (
              <span className="text-emerald-500 font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>{statusMessage}</span>
              </span>
            ) : (
              <span>secure transmission · zero tracking</span>
            )}
          </span>

          <div>
            {status === 'success' ? (
              <motion.button
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                type="button"
                onClick={() => setStatus('idle')}
                className="px-6 py-3 rounded-full bg-[var(--accent-lime)] text-[var(--accent-lime-text)] text-xs font-mono font-bold flex items-center gap-2 border border-black/15 shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4 text-black" />
                <span>sent successfully! (click to reset)</span>
              </motion.button>
            ) : (
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-7 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-base)] text-xs font-mono font-semibold hover:opacity-90 disabled:opacity-60 transition-all flex items-center gap-2 cursor-pointer shadow-sm ml-auto"
                data-cursor="send"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>dispatching note...</span>
                  </>
                ) : (
                  <>
                    <span>send message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
