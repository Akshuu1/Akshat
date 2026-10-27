'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { ArrowUpRight } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const isCraft = pathname?.startsWith('/craft');
  const isHome = pathname === '/';
  const [isVisible, setIsVisible] = useState(!isHome);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.75;

      if (isHome && currentScrollY < heroThreshold) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else if (currentScrollY < 40 && !isHome) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHome]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-4 md:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto relative w-full max-w-[940px] h-12 px-4 sm:px-5 rounded-full flex items-center justify-between transition-all duration-300 bg-white/[0.18] backdrop-blur-[16px] border border-white/30 text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          {/* LEFT: Monogram "A" + "Akshat Agrawal" */}
          <Link
            href="/"
            data-cursor="home"
            className="flex items-center gap-2.5 group select-none pr-2 focus-visible:outline-none"
          >
            <div className="w-7 h-7 rounded-[8px] bg-white text-black flex items-center justify-center font-mono font-black text-xs transition-transform duration-200 group-hover:scale-105 shadow-2xs">
              A
            </div>
            <span className="font-sans text-[13px] font-semibold text-white tracking-[-0.01em]">
              Akshat Agrawal
            </span>
          </Link>

          {/* CENTER: Links Work / Craft / About / Contact */}
          <div
            className="hidden md:flex items-center gap-1 select-none"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {siteConfig.navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const isHovered = hoveredPath === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="open"
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full font-sans text-[13px] transition-colors duration-150 ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill-active"
                      className="absolute inset-0 rounded-full -z-10 bg-white/20 border border-white/30 shadow-2xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {!isActive && isHovered && (
                    <motion.span
                      layoutId="nav-pill-hover"
                      className="absolute inset-0 rounded-full -z-10 bg-white/10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: ONE lime button "Get in touch" (hidden on /craft for clean reel experience) */}
          <div className="flex items-center gap-3">
            {!isCraft && (
              <Link
                href="/contact"
                data-cursor="contact"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D6FF3D] text-[#111111] font-sans text-xs font-bold hover:scale-105 transition-transform shadow-[0_2px_14px_rgba(214,255,61,0.35)] select-none"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden relative w-8 h-8 rounded-full flex flex-col items-center justify-center gap-1 hover:bg-white/10 text-white focus-visible:outline-none"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-[1.5px] bg-white rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-[1.5px] bg-white rounded-full"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 inset-x-4 z-50 p-6 rounded-[28px] border border-white/25 bg-black/80 backdrop-blur-2xl shadow-2xl md:hidden overflow-hidden text-white"
          >
            <div className="flex flex-col gap-2 font-sans text-base">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={`py-2 px-3 rounded-xl transition-colors ${
                  pathname === '/' ? 'bg-white/15 font-semibold' : 'text-white/70'
                }`}
              >
                Home
              </Link>
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`py-2 px-3 rounded-xl transition-colors ${
                    pathname.startsWith(link.href)
                      ? 'bg-white/15 font-semibold'
                      : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
