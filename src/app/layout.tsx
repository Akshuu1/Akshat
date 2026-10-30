import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Instrument_Serif, JetBrains_Mono, Anton, Caveat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { siteConfig } from '@/data/siteConfig';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: '400',
  style: ['italic', 'normal'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const anton = Anton({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: '400',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://akshatagrawal.dev'),
  title: {
    default: 'Akshat Agrawal | Full-stack developer, AI engineer & data analyst',
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [
    'Akshat Agrawal',
    'Full-stack developer',
    'AI engineer',
    'Data analyst',
    'Designer',
    'FastAPI',
    'Next.js',
    'Python',
    'React',
    'Newton School of Technology',
  ],
  authors: [{ name: siteConfig.name, url: 'https://akshatagrawal.dev' }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://akshatagrawal.dev',
    title: siteConfig.title,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.tagline,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`dark ${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${anton.variable} ${caveat.variable}`}
    >
      <body suppressHydrationWarning className="font-sans antialiased bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-200">
        <ThemeProvider>
          <SmoothScroll>
            <CustomCursor />
            {/* Grain overlay for tactile editorial zine feel */}
            <div
              className="fixed inset-0 pointer-events-none bg-grain z-30 opacity-60"
              aria-hidden="true"
            />
            <div className="relative min-h-[100svh] flex flex-col justify-between">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
