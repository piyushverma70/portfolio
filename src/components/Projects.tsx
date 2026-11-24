import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Globe } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 text-left">
          <div>
            <div className="text-xs font-mono font-bold text-[#737373] tracking-widest mb-1.5">
              01.
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#171717] tracking-tight">
              SELECTED WORK
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#737373] max-w-md font-normal flex items-center gap-1.5">
            <span>A showcase of client engineering where design, code, and real-world commercial performance come together.</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#171717] shrink-0" />
          </p>
        </div>

        {/* --- MAIN FEATURED PROJECT CARD: KASHISH MASALE & SPICES --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white border border-black/8 p-6 sm:p-10 lg:p-12 text-left shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Expanded High-Precision CSS Device Mockup */}
            <div className="lg:col-span-7 xl:col-span-7 flex items-center justify-center">
              <div className="w-full rounded-2xl overflow-hidden bg-[#18181B] border border-black/15 shadow-2xl">
                {/* Browser Title Bar */}
                <div className="px-4 py-3 bg-[#1F1F23] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-[#999999] tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-[#737373]" />
                    kashishbyshankarfoodproducts.co.in
                  </span>
                  <div className="w-4" />
                </div>

                {/* Device Canvas Content */}
                <div className="p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#18181B] via-[#222227] to-[#121214] text-white flex flex-col justify-between min-h-[280px] sm:min-h-[340px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#C7F36B] text-[#171717] text-[10px] font-mono font-bold uppercase tracking-wider">
                        Production Live
                      </span>
                      <span className="text-xs text-[#999999] font-mono">Shankar Food Products</span>
                    </div>

                    <h4 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight mb-3">
                      Kashish Masale &amp; Spices
                    </h4>

                    <p className="text-xs sm:text-sm text-[#999999] max-w-lg font-normal leading-relaxed">
                      Commercial storefront showcasing authentic Indian spice blends with direct customer WhatsApp ordering, sub-second 4G mobile delivery, and zero layout shift.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-[#E5E5E0]">
                    <span className="px-3 py-1 rounded-md bg-white/10 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C7F36B]" /> Mobile-First UI
                    </span>
                    <span className="px-3 py-1 rounded-md bg-white/10">Lighthouse 95+</span>
                    <span className="px-3 py-1 rounded-md bg-white/10">WhatsApp Commerce</span>
                    <span className="px-3 py-1 rounded-md bg-white/10">Cloudflare Edge CDN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Project Metadata */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start justify-center">
              <span className="px-3.5 py-1.5 rounded-full bg-[#F5F4F0] text-[11px] font-mono text-[#737373] mb-4">
                Client Production Website
              </span>

              <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#171717] mb-3 tracking-tight">
                Kashish Masale
              </h3>

              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed mb-6 font-normal">
                Engineered the complete commercial web presence for Shankar Food Products with fluid responsive grids, catalog browsing, and instant WhatsApp inquiry flows designed to convert mobile visitors into wholesale buyers.
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Cloudflare CDN', 'WhatsApp API'].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md bg-[#F5F4F0] text-xs font-mono text-[#171717]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons: View Project CTA + Text-only GitHub Link (No Github Icon!) */}
              <div className="flex items-center gap-3">
                <a
                  href="https://kashishbyshankarfoodproducts.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full font-display font-semibold text-xs sm:text-sm bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all shadow-sm"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/piyushverma70/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full font-display font-medium text-xs sm:text-sm bg-transparent hover:bg-black/5 text-[#171717] border border-black/15 transition-all"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#737373]" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
