import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 text-left">
          <div>
            <div className="text-xs font-mono font-bold text-[#737373] tracking-widest mb-1">
              01.
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#171717] tracking-tight">
              SELECTED WORK
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#737373] max-w-md font-normal flex items-center gap-1.5">
            <span>A showcase of projects where design, code and real-world problem solving come together.</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#171717] shrink-0" />
          </p>
        </div>

        {/* --- MAIN FEATURED PROJECT CARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white border border-black/8 p-6 sm:p-8 lg:p-10 mb-6 text-left shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Device Mockup Display */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#1E1E22] border border-black/10 shadow-xl group">
                <img
                  src="/assets/featured-project-mockup.png"
                  alt="DineNest Featured Project Mockup"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Right: Project Metadata */}
            <div className="lg:col-span-5 flex flex-col items-start justify-center">
              <span className="px-3 py-1 rounded-full bg-[#F5F4F0] text-[11px] font-mono text-[#737373] mb-4">
                Full-Stack Web App
              </span>

              <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#171717] mb-3 tracking-tight">
                DineNest
              </h3>

              <p className="text-sm text-[#737373] leading-relaxed mb-6 font-normal">
                A modern restaurant discovery and table booking platform with a clean, intuitive ordering experience and sub-second performance.
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md bg-[#F5F4F0] text-xs font-mono text-[#171717]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://kashishbyshankarfoodproducts.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-display font-semibold text-xs bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all shadow-sm"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/piyushverma70/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-display font-medium text-xs bg-transparent hover:bg-black/5 text-[#171717] border border-black/15 transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- TWO ASYMMETRIC SUB-CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Sub-card 1: E-Commerce Platform */}
          <motion.a
            href="https://kashishbyshankarfoodproducts.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="group rounded-2xl bg-white border border-black/8 p-5 sm:p-6 flex items-center gap-5 hover:border-black/20 hover:shadow-sm transition-all"
          >
            <div className="w-24 sm:w-28 h-18 sm:h-20 rounded-xl overflow-hidden bg-[#171717] shrink-0 border border-black/10">
              <img
                src="/assets/project-subcard-1.png"
                alt="E-Commerce Platform Thumbnail"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <div className="font-display font-bold text-base sm:text-lg text-[#171717] group-hover:text-[#737373] transition-colors flex items-center gap-1.5 mb-1">
                <span>E-Commerce Platform</span>
                <ArrowUpRight className="w-4 h-4 text-[#737373]" />
              </div>
              <p className="text-xs text-[#737373] font-normal leading-relaxed">
                Shop, pay and manage orders seamlessly.
              </p>
            </div>
          </motion.a>

          {/* Sub-card 2: AI Desktop Assistant */}
          <motion.a
            href="https://github.com/piyushverma70/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group rounded-2xl bg-white border border-black/8 p-5 sm:p-6 flex items-center gap-5 hover:border-black/20 hover:shadow-sm transition-all"
          >
            <div className="w-24 sm:w-28 h-18 sm:h-20 rounded-xl overflow-hidden bg-[#171717] shrink-0 border border-black/10">
              <img
                src="/assets/project-subcard-2.png"
                alt="AI Desktop Assistant Thumbnail"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <div className="font-display font-bold text-base sm:text-lg text-[#171717] group-hover:text-[#737373] transition-colors flex items-center gap-1.5 mb-1">
                <span>AI Desktop Assistant</span>
                <ArrowUpRight className="w-4 h-4 text-[#737373]" />
              </div>
              <p className="text-xs text-[#737373] font-normal leading-relaxed">
                A smart, voice-enabled productivity assistant.
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
