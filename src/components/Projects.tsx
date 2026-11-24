import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Terminal, Activity } from 'lucide-react';
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

        {/* --- MAIN FEATURED PROJECT CARD: KASHISH MASALE & SPICES --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white border border-black/8 p-6 sm:p-8 lg:p-10 mb-6 text-left shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Handcrafted High-Precision CSS Device Mockup */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <div className="w-full rounded-2xl overflow-hidden bg-[#18181B] border border-black/15 shadow-2xl">
                {/* Browser Title Bar */}
                <div className="px-4 py-2.5 bg-[#1F1F23] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#999999] tracking-wider">
                    kashishbyshankarfoodproducts.co.in
                  </span>
                  <div className="w-4" />
                </div>

                {/* Device Canvas Content */}
                <div className="p-6 sm:p-10 bg-gradient-to-br from-[#18181B] via-[#222227] to-[#121214] text-white flex flex-col justify-between min-h-[260px] sm:min-h-[300px]">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C7F36B] text-[#171717] text-[10px] font-mono font-bold uppercase tracking-wider">
                        Production Live
                      </span>
                      <span className="text-xs text-[#999999] font-mono">Shankar Food Products</span>
                    </div>

                    <h4 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                      Kashish Masale &amp; Spices
                    </h4>

                    <p className="text-xs sm:text-sm text-[#999999] max-w-md font-normal leading-relaxed">
                      Commercial storefront showcasing authentic Indian spice blends with direct customer WhatsApp ordering and sub-second 4G mobile delivery.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-[#E5E5E0]">
                    <span className="px-2.5 py-1 rounded-md bg-white/10 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C7F36B]" /> Mobile-First UI
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/10">Lighthouse 95+</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/10">WhatsApp Commerce</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Project Metadata */}
            <div className="lg:col-span-5 flex flex-col items-start justify-center">
              <span className="px-3 py-1 rounded-full bg-[#F5F4F0] text-[11px] font-mono text-[#737373] mb-4">
                Commercial Brand Website
              </span>

              <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#171717] mb-3 tracking-tight">
                Kashish Masale
              </h3>

              <p className="text-sm text-[#737373] leading-relaxed mb-6 font-normal">
                Engineered the complete commercial web presence for Shankar Food Products with fluid responsive grids, catalog browsing, and instant WhatsApp inquiry flows.
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Cloudflare CDN'].map((t) => (
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

        {/* --- TWO ASYMMETRIC SUB-CARDS (PURE CSS & REACT) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Sub-card 1: Venus AI */}
          <motion.a
            href="https://github.com/piyushverma70/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="group rounded-2xl bg-white border border-black/8 p-5 sm:p-6 flex items-center gap-5 hover:border-black/20 hover:shadow-sm transition-all"
          >
            <div className="w-20 sm:w-24 h-16 sm:h-20 rounded-xl bg-[#171717] flex items-center justify-center text-[#C7F36B] shrink-0 border border-white/10 shadow-xs">
              <Terminal className="w-7 h-7" />
            </div>
            <div>
              <div className="font-display font-bold text-base sm:text-lg text-[#171717] group-hover:text-[#737373] transition-colors flex items-center gap-1.5 mb-1">
                <span>Venus AI — Desktop Workspace</span>
                <ArrowUpRight className="w-4 h-4 text-[#737373]" />
              </div>
              <p className="text-xs text-[#737373] font-normal leading-relaxed">
                Multi-agent orchestration with offline Ollama and cloud LLMs in Tauri &amp; Rust.
              </p>
            </div>
          </motion.a>

          {/* Sub-card 2: Web Forge Dashboard */}
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
            <div className="w-20 sm:w-24 h-16 sm:h-20 rounded-xl bg-[#171717] flex items-center justify-center text-[#C7F36B] shrink-0 border border-white/10 shadow-xs">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <div className="font-display font-bold text-base sm:text-lg text-[#171717] group-hover:text-[#737373] transition-colors flex items-center gap-1.5 mb-1">
                <span>Web Forge — Cloud Platform</span>
                <ArrowUpRight className="w-4 h-4 text-[#737373]" />
              </div>
              <p className="text-xs text-[#737373] font-normal leading-relaxed">
                Full-stack cloud developer telemetry with real-time WebSocket pipelines.
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
