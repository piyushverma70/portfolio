import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
    { label: 'Work', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 transition-all duration-300">
      <nav
        className={`w-full max-w-7xl flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-[#F5F4F0]/90 backdrop-blur-xl border border-black/8 shadow-sm'
            : 'bg-[#F5F4F0]/60 backdrop-blur-md border border-black/5'
        }`}
      >
        {/* Brand Mark */}
        <a
          href="#hero"
          className="font-display font-extrabold text-xl tracking-tight text-[#171717] hover:opacity-80 transition-opacity"
          onClick={handleLinkClick}
        >
          PV.
        </a>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-9 text-xs font-medium text-[#52525B]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#171717] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Status Pill & Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF7D5] border border-[#C5EBA1] text-[11px] font-mono font-medium text-[#171717]">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span>Available for work</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-[#171717] hover:bg-black/5 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[68px] left-4 right-4 bg-[#F5F4F0]/98 backdrop-blur-2xl rounded-2xl border border-black/10 shadow-2xl p-6 z-40"
          >
            <div className="flex flex-col gap-4 text-left">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="font-display font-semibold text-lg text-[#171717] hover:text-[#737373] transition-colors py-1.5 border-b border-black/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 text-xs font-mono text-[#737373]">
                piyushverma5534@gmail.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
