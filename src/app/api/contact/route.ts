import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  topic: z.enum(
    [
      'Internship / Placement',
      'Freelance / Project',
      'AI & Agents',
      'Just saying hi',
      'Internship', // fallback support
    ],
    {
      error: 'Please choose a topic',
    }
  ),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  // Honeypot field for bot protection (hidden from humans)
  honeypot: z.string().optional(),
});

// Basic in-memory rate limiting map: ip -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export async function POST(request: Request) {
  try {
    // Basic IP rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    const now = Date.now();
    const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW);

    if (timestamps.length >= MAX_REQUESTS) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please wait a few minutes before sending another message.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, topic, message, honeypot } = result.data;

    // If honeypot is filled, silently discard spam bot submission
    if (honeypot && honeypot.length > 0) {
      console.warn('Spam bot detected via honeypot field, ignoring submission.');
      return NextResponse.json({
        success: true,
        message: 'Thank you for reaching out! Your message was received successfully.',
      });
    }

    // Record request timestamp for rate limiting
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);

    // Resend email integration if RESEND_API_KEY is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Akshat Portfolio <onboarding@resend.dev>',
            to: ['akshat.agrawal2024@nst.rishihood.edu.in'],
            subject: `[Portfolio Inquiry] ${topic} from ${name}`,
            text: `From: ${name} (${email})\nTopic: ${topic}\n\nMessage:\n${message}`,
          }),
        });
      } catch (err) {
        console.warn('Resend email delivery fallback:', err);
      }
    } else {
      console.log('Inquiry received (Resend key not set, fallback logging):', {
        name,
        email,
        topic,
        message,
        receivedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Got it, I'll reply within 48h.",
    });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An internal error occurred. Please try again or email directly.',
      },
      { status: 500 }
    );
  }
}
