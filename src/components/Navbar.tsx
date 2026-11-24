import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Selected Work', href: '#projects' },
    { label: 'The Method', href: '#process' },
    { label: 'Why Me', href: '#why-me' },
    { label: 'Get In Touch', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pt-3 sm:pt-5 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl flex items-center justify-between px-4 sm:px-6 py-3 rounded-full transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(40,30,20,0.08)] border border-black/5'
            : 'bg-white/40 backdrop-blur-md sm:bg-transparent border border-black/5'
        }`}
      >
        {/* Brand Monogram & Name */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group" onClick={handleLinkClick}>
          <div className="w-8 h-8 rounded-full bg-[#18181B] text-[#FAF8F5] flex items-center justify-center font-bold text-xs tracking-wider transition-transform duration-300 group-hover:scale-105 shrink-0">
            P
          </div>
          <div className="flex flex-col text-left">
            <span className="font-['Syne'] font-extrabold text-sm tracking-wide text-[#18181B] leading-none">
              PIYUSH
            </span>
            <span className="text-[10px] text-[#71717A] font-mono tracking-wider truncate max-w-[140px] sm:max-w-none">
              Full-Stack Web Craftsman
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8 text-xs font-medium text-[#52525B]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#18181B] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Status & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EEE7] border border-[#D5E3D8] text-[11px] text-[#2D5A3C] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D7A52] animate-pulse"></span>
            Available For Projects
          </div>

          <a
            href="#contact"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#18181B] text-[#FAF8F5] hover:bg-[#3F3F46] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all transform hover:-translate-y-0.5"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#18181B] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer / Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-40 p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.12)] md:hidden text-left"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717A]">
                  Navigation
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5EEE7] text-[10px] text-[#2D5A3C] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3D7A52] animate-pulse"></span>
                  Available
                </span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-base font-semibold text-[#18181B] hover:text-[#C86A4B] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA]" />
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-black/5 flex flex-col gap-2.5">
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-semibold bg-[#18181B] text-[#FAF8F5] shadow-sm"
                >
                  <span>Start A Project / Let's Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="mailto:piyushverma5534@gmail.com"
                  className="text-center text-xs font-mono text-[#71717A] hover:text-[#18181B] py-1"
                >
                  piyushverma5534@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
