import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-10 border-t border-black/8 text-left">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-2">
          <span className="font-display font-extrabold text-base text-[#171717] tracking-tight">
            PV.
          </span>
          <span className="text-xs text-[#737373] font-normal">
            Piyush Verma — Design-Driven Developer
          </span>
        </div>

        {/* Right: Social Icons & Scroll to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/piyushverma70"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#171717] hover:bg-[#C7F36B] transition-colors"
            title="GitHub (@piyushverma70)"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#171717] hover:bg-[#C7F36B] transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#171717] hover:bg-[#C7F36B] transition-colors"
            title="Twitter"
          >
            <TwitterIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="mailto:piyushverma5534@gmail.com"
            className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#171717] hover:bg-[#C7F36B] transition-colors"
            title="Email (piyushverma5534@gmail.com)"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] flex items-center justify-center transition-all cursor-pointer shadow-xs ml-1"
            title="Scroll to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
