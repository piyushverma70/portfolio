import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Selected Work', href: '#projects' },
    { label: 'Expertise', href: '#services' },
    { label: 'The Method', href: '#process' },
    { label: 'Philosophy', href: '#why-me' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 sm:pt-4 transition-all duration-300">
      <nav
        className={`w-full max-w-7xl flex items-center justify-between px-5 sm:px-7 py-3 rounded-2xl transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_12px_36px_-12px_rgba(23,23,23,0.08)] border border-black/8'
            : 'bg-white/50 backdrop-blur-md sm:bg-transparent border border-black/5'
        }`}
      >
        {/* Brand Identity / Atelier Monogram */}
        <a href="#hero" className="flex items-center gap-3 group" onClick={handleLinkClick}>
          <div className="w-8 h-8 rounded-lg bg-[#171717] text-[#C7F36B] flex items-center justify-center font-display font-bold text-xs tracking-wider transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(199,243,107,0.4)] shrink-0">
            PV
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-sm tracking-tight text-[#171717] leading-tight">
              PIYUSH VERMA
            </span>
            <span className="text-[10px] text-[#737373] font-mono tracking-wider">
              DIGITAL ATELIER
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-[#737373]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#171717] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#171717] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Status & Action Button */}
        <div className="flex items-center gap-3">
          {/* Availability Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/8 text-[11px] text-[#171717] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#C7F36B] shadow-[0_0_8px_#C7F36B] animate-pulse" />
            <span className="tracking-tight">Available For Projects</span>
          </div>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-semibold bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#171717] hover:bg-black/5 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[68px] left-4 right-4 bg-white/98 backdrop-blur-2xl rounded-2xl border border-black/10 shadow-2xl p-6 z-40"
          >
            <div className="flex flex-col gap-4 text-left">
              {/* Availability tag inside drawer */}
              <div className="flex items-center gap-2 pb-3 border-b border-black/5 text-xs font-mono text-[#737373]">
                <span className="w-2 h-2 rounded-full bg-[#C7F36B] animate-pulse" />
                <span>Available for new collaborations</span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="font-display font-medium text-lg text-[#171717] hover:text-[#737373] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#737373]" />
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-black/5 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#171717] text-[#C7F36B] font-display font-semibold text-sm"
                >
                  <span>Let's Connect</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="text-[11px] font-mono text-[#999999] text-center pt-2">
                  piyushverma5534@gmail.com
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
