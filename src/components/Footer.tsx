import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-black/5 py-14 px-4 bg-[#F2EDE4]/60">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-['Syne'] font-extrabold text-lg text-[#18181B] tracking-wider">
            PIYUSH <span className="font-mono text-xs text-[#71717A]">.DEV</span>
          </span>
          <p className="text-xs text-[#71717A] font-mono mt-1">
            Handcrafted with patience, care, and full-stack precision by Piyush Verma.
          </p>
        </div>

        {/* Clean Icon Buttons (GitHub + Email + Scroll to Top) */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/piyushverma70"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#52525B] hover:text-[#18181B] shadow-sm transition-all hover:-translate-y-0.5"
            title="GitHub (@piyushverma70)"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="mailto:piyushverma5534@gmail.com"
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#52525B] hover:text-[#C86A4B] shadow-sm transition-all hover:-translate-y-0.5"
            title="Email Piyush (piyushverma5534@gmail.com)"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#18181B] text-[#FAF8F5] hover:bg-[#3F3F46] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
