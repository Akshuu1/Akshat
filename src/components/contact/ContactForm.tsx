'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const topics = ['Internship', 'Freelance/Project', 'Just saying hi'] as const;

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  topic: z.enum(['Internship', 'Freelance/Project', 'Just saying hi'], {
    error: 'Please choose a topic',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [selectedTopic, setSelectedTopic] = useState<'Internship' | 'Freelance/Project' | 'Just saying hi'>('Internship');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: 'Internship',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const targetEmail = 'akshat.agrawal2024@nst.rishihood.edu.in';
    const mailtoSubject = encodeURIComponent(`[Portfolio Query - ${data.topic}] from ${data.name}`);
    const mailtoBody = encodeURIComponent(
      `Hi Akshat,\n\nName: ${data.name}\nEmail: ${data.email}\nTopic: ${data.topic}\n\nQuery / Message:\n${data.message}\n\n— Sent from portfolio contact console`
    );
    const mailtoLink = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setIsSuccess(true);
        try {
          window.location.href = mailtoLink;
        } catch {
          // ignore
        }
        // Trigger celebratory confetti micro-animation
        try {
          confetti({
            particleCount: 55,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#D6FF3D', '#111111', '#FF5A36', '#FAF8F5'],
          });
        } catch {
          // ignore
        }
        reset();
      } else {
        setSubmitError(json.message || 'Something went wrong. Please try again.');
      }
    } catch {
      try {
        window.location.href = mailtoLink;
      } catch {
        // ignore
      }
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-10 rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 space-y-4 font-mono"
          >
            <div className="w-14 h-14 rounded-full bg-[var(--accent-lime)] text-[var(--accent-lime-text)] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-sans text-[var(--text-primary)]">
              Message dispatched!
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
              Thank you for reaching out. I usually reply within 24 hours.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-4 px-5 py-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-xs font-mono hover:border-[var(--text-primary)] transition-colors"
            >
              send another note
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Topic Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                01 {"//"} What are you thinking?
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
                    className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 border cursor-pointer ${
                      selectedTopic === t
                        ? 'bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-bold border-black/20 shadow-xs'
                        : 'bg-[var(--bg-base)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.topic && (
                <p className="text-xs text-[var(--accent-tomato)] font-mono">{errors.topic.message}</p>
              )}
            </div>

            {/* Name & Email inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  02 {"//"} Name
                </label>
                <input
                  {...register('name')}
                  placeholder="Ada Lovelace"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)] text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                />
                {errors.name && (
                  <p className="text-xs text-[var(--accent-tomato)] font-mono">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  03 {"//"} Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="ada@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)] text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                />
                {errors.email && (
                  <p className="text-xs text-[var(--accent-tomato)] font-mono">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Message input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                04 {"//"} Message
              </label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder="Tell me about the role, project, or idea..."
                className="w-full px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)] text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--text-primary)] transition-colors resize-none"
              />
              {errors.message && (
                <p className="text-xs text-[var(--accent-tomato)] font-mono">{errors.message.message}</p>
              )}
            </div>

            {submitError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-mono text-[var(--accent-tomato)] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit button */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[var(--text-muted)] hidden sm:inline">
                or email directly if you prefer
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-base)] text-xs font-mono font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer ml-auto"
                data-cursor="send"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>dispatching...</span>
                  </>
                ) : (
                  <>
                    <span>send message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
