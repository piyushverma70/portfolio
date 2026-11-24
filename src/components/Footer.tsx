import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-black/8 py-16 px-4 sm:px-6 lg:px-10 bg-white/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-left">
        {/* Brand & Attribution */}
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-6 h-6 rounded-md bg-[#171717] text-[#C7F36B] flex items-center justify-center font-display font-bold text-[10px]">
              PV
            </div>
            <span className="font-display font-bold text-base text-[#171717] tracking-tight">
              PIYUSH VERMA
            </span>
            <span className="text-[10px] font-mono text-[#999999]">• DIGITAL ATELIER</span>
          </div>

          <p className="text-xs text-[#737373] font-normal max-w-sm">
            Handcrafted with React 19, TypeScript, Three.js &amp; Tailwind CSS. Hosted on Cloudflare Edge CDN.
          </p>
        </div>

        {/* Global Coordinates & Time */}
        <div className="flex flex-col md:items-center">
          <div className="text-[11px] font-mono text-[#171717] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B] animate-pulse" />
            <span>NEW DELHI, INDIA (UTC+05:30)</span>
          </div>
          <div className="text-[10px] font-mono text-[#999999] mt-0.5">
            AVAILABLE WORLDWIDE FOR REMOTE PROJECTS
          </div>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/piyushverma70"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center text-[#171717] hover:bg-[#C7F36B] transition-colors shadow-xs"
            title="GitHub (@piyushverma70)"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="mailto:piyushverma5534@gmail.com"
            className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center text-[#171717] hover:bg-[#C7F36B] transition-colors shadow-xs"
            title="Email (piyushverma5534@gmail.com)"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            title="Return to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
