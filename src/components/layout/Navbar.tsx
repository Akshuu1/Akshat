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

  useEffect(() => {
    const handleToggle = () => setMobileMenuOpen((prev) => !prev);
    window.addEventListener('toggle-mobile-menu', handleToggle);
    return () => window.removeEventListener('toggle-mobile-menu', handleToggle);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-[calc(env(safe-area-inset-top,0px)+8px)] md:top-5 inset-x-0 z-50 flex justify-center px-3 md:px-4 pointer-events-none transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto relative w-[calc(100%-24px)] md:w-full md:max-w-[940px] h-12 px-3.5 sm:px-5 rounded-full flex items-center justify-between transition-all duration-300 bg-[rgba(20,20,24,0.72)] backdrop-blur-[18px] border border-white/[0.14] text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
        >
          {/* LEFT: Monogram "A" + "Akshat Agrawal" (text hidden on mobile) */}
          <Link
            href="/"
            data-cursor="home"
            className="flex items-center gap-2.5 group select-none pr-2 focus-visible:outline-none"
          >
            <div className="w-7 h-7 rounded-[8px] bg-white text-black flex items-center justify-center font-mono font-black text-xs transition-transform duration-200 group-hover:scale-105 shadow-2xs">
              A
            </div>
            <span className="font-sans text-[13px] font-semibold text-white tracking-[-0.01em] hidden md:inline">
              Akshat Agrawal
            </span>
          </Link>

          {/* CENTER: Links Work / Craft / About / Contact (desktop only) */}
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

          {/* RIGHT: ONE lime button "Get in touch" (desktop only) + Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2">
            {!isCraft && (
              <Link
                href="/contact"
                data-cursor="contact"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D6FF3D] text-[#111111] font-sans text-xs font-bold hover:scale-105 transition-transform shadow-[0_2px_14px_rgba(214,255,61,0.35)] select-none"
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
              className="md:hidden relative w-9 h-9 min-h-[44px] min-w-[44px] rounded-full flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 text-white focus-visible:outline-none"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-[2px] bg-white rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-4 h-[2px] bg-white rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-[2px] bg-white rounded-full"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Sheet Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#0E1016]/95 flex flex-col justify-between p-6 pt-[calc(env(safe-area-inset-top,0px)+16px)] pb-[calc(env(safe-area-inset-bottom,0px)+24px)] md:hidden overflow-y-auto"
          >
            {/* Top row: Monogram and Close Button */}
            <div className="flex items-center justify-between w-full">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-[8px] bg-white text-black flex items-center justify-center font-mono font-black text-xs shadow-2xs">
                  A
                </div>
                <span className="font-sans text-sm font-semibold text-white tracking-tight">
                  Akshat Agrawal
                </span>
              </Link>
              <button
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* Middle: Large stacked navigation links */}
            <div className="flex flex-col gap-3 my-auto py-8">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={`text-3xl font-sans tracking-tight transition-colors py-2 ${
                  pathname === '/' ? 'text-[#D6FF3D] font-bold' : 'text-white/80 hover:text-white font-light'
                }`}
              >
                Home
              </Link>
              {siteConfig.navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`text-3xl font-sans tracking-tight transition-colors py-2 flex items-center justify-between ${
                      isActive ? 'text-[#D6FF3D] font-bold' : 'text-white/80 hover:text-white font-light'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-50" />
                  </Link>
                );
              })}
            </div>

            {/* Bottom: "Get in touch" full-width button */}
            <div className="w-full pt-4 border-t border-white/10">
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="w-full h-12 rounded-full bg-[#D6FF3D] text-[#111111] font-sans text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(214,255,61,0.35)] select-none"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
