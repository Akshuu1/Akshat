'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import { Send, Check, AlertCircle, Loader2, Sparkles, ShieldCheck, Mail, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const topics = [
  'Internship / Placement',
  'Freelance / Project',
  'Data / Analytics',
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

export function ContactFormStudio() {
  const [selectedTopic, setSelectedTopic] = useState<TopicType>('Internship / Placement');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [messageLength, setMessageLength] = useState<number>(0);
  const [dispatchLinks, setDispatchLinks] = useState<{
    mailto: string;
    whatsapp: string;
    name: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const currentValues = watch();

  const handleDirectEmailClick = () => {
    const name = currentValues.name || 'Friend';
    const email = currentValues.email || '';
    const topic = selectedTopic;
    const msg = currentValues.message || '';
    const subject = encodeURIComponent(`[Portfolio Query - ${topic}] from ${name}`);
    const body = encodeURIComponent(
      `Hi Akshat,\n\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nQuery:\n${msg}\n\n— Sent from portfolio contact console`
    );
    window.location.href = `mailto:akshat.agrawal2024@nst.rishihood.edu.in?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    setStatusMessage('');

    const targetEmail = 'akshat.agrawal2024@nst.rishihood.edu.in';
    const mailtoSubject = encodeURIComponent(`[Portfolio Query - ${data.topic}] from ${data.name}`);
    const mailtoBody = encodeURIComponent(
      `Hi Akshat,\n\nName: ${data.name}\nEmail: ${data.email}\nTopic: ${data.topic}\n\nQuery / Message:\n${data.message}\n\n— Sent from portfolio contact console`
    );
    const mailtoLink = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    const whatsappText = encodeURIComponent(
      `Hi Akshat! I'm ${data.name} (${data.email}). Regarding [${data.topic}]: ${data.message}`
    );
    const whatsappLink = `https://wa.me/918954928960?text=${whatsappText}`;

    setDispatchLinks({
      mailto: mailtoLink,
      whatsapp: whatsappLink,
      name: data.name,
    });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus('success');
        setStatusMessage(json.message || "Query logged! Opening your mail client...");

        // Auto trigger mail client with pre-filled query
        try {
          window.location.href = mailtoLink;
        } catch {
          // ignore if popup blocker
        }

        // Celebratory confetti burst
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#D6FF3D', '#111111', '#FF5A36', '#F3F0E8'],
          });
        } catch {
          // ignore
        }
        reset();
        setMessageLength(0);
      } else {
        setStatus('error');
        setStatusMessage(json.message || 'Something went wrong. Please retry or dispatch via email directly.');
      }
    } catch {
      // In case of network interruption, fallback directly to mailto
      try {
        window.location.href = mailtoLink;
      } catch {
        // ignore
      }
      setStatus('success');
      setStatusMessage('Mail client opened! Hit send in your email app to reach Akshat directly.');
    }
  };

  return (
    <div className="rounded-[24px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 md:p-10 transition-colors duration-200">
      {/* Studio Card Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--border-hairline)] font-mono text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
          <span className="font-bold text-[var(--text-primary)]">DISPATCH CONSOLE</span>
          <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)]">
            DIRECT INBOX ROUTE
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ZERO SPAM</span>
        </div>
      </div>

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
            01 {"//"} TOPIC CHIPS
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="studio-name"
              className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]"
            >
              02 {"//"} YOUR NAME
            </label>
            <input
              id="studio-name"
              {...register('name')}
              placeholder="e.g. Theo Plawinski"
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
              htmlFor="studio-email"
              className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]"
            >
              03 {"//"} YOUR EMAIL
            </label>
            <input
              id="studio-email"
              {...register('email')}
              type="email"
              placeholder="hello@studio.design"
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
              htmlFor="studio-message"
              className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]"
            >
              04 {"//"} MESSAGE
            </label>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              {messageLength} characters (min 10)
            </span>
          </div>

          <textarea
            id="studio-message"
            {...messageRegistration}
            onChange={(e) => {
              messageRegistration.onChange(e);
              setMessageLength(e.target.value.length);
            }}
            rows={5}
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

        {/* Success Action Banner with Direct Query Dispatch Links */}
        <AnimatePresence>
          {status === 'success' && dispatchLinks && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-3 font-mono text-xs"
            >
              <div className="flex items-center gap-2 text-emerald-500 font-bold">
                <Check className="w-4 h-4 shrink-0" />
                <span>Query dispatched! Opened your email client with pre-filled inquiry.</span>
              </div>
              <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                If your email application didn&apos;t open automatically, use either direct button below to send your query directly to Akshat:
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href={dispatchLinks.mailto}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-base)] text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open in Mail App</span>
                </a>
                <a
                  href={dispatchLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] text-black text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-3.5 py-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs font-medium transition-colors ml-auto cursor-pointer"
                >
                  Clear / send another
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions Row: Status Morphing Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
            <button
              type="button"
              onClick={handleDirectEmailClick}
              className="inline-flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] underline transition-colors cursor-pointer"
              title="Compose message directly in your mail application"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Or open directly in mail app ↗</span>
            </button>
          </div>

          <div>
            {status !== 'success' && (
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-base)] text-xs font-mono font-bold hover:opacity-90 disabled:opacity-60 transition-all flex items-center gap-2.5 cursor-pointer shadow-sm ml-auto"
                data-cursor="send"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Dispatching Query...</span>
                  </>
                ) : (
                  <>
                    <span>Send Query</span>
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
