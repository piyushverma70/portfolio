import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-10 border-t border-black/8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24 pb-8 border-b border-black/8 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 text-[11px] font-mono text-[#171717] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]" />
              <span>01 / SELECTED WORK</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#171717] tracking-tight leading-[1.08]">
              Crafted With <br />
              <span className="font-serif-editorial italic font-normal text-[#171717]">
                Purpose &amp; Precision.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#737373] max-w-md leading-relaxed">
            A curated selection of commercial client websites, systems software, and interactive digital products engineered for performance.
          </p>
        </div>

        {/* --- PROJECT 01: HEROIC FULL-WIDTH EDITORIAL FEATURE --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 sm:mb-28 group"
        >
          <div className="atelier-card rounded-3xl p-6 sm:p-10 lg:p-14 text-left relative overflow-hidden bg-white">
            {/* Project Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-black/8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full badge-lime">
                  01 — CLIENT PRODUCTION
                </span>
                <span className="text-xs font-mono text-[#737373] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A3C]" />
                  <span>Live Online</span>
                </span>
              </div>

              <div className="text-xs font-mono text-[#999999]">
                YEAR: 2026 • COMMERCIAL
              </div>
            </div>

            {/* Asymmetric Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Context & Metadata */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#171717] mb-3 leading-tight tracking-tight">
                    Kashish Masale &amp; Spices
                  </h3>
                  <div className="text-xs font-mono text-[#737373] mb-5 uppercase tracking-wider">
                    Shankar Food Products — Pure &amp; Authentic Spices
                  </div>

                  <p className="text-sm sm:text-base text-[#737373] leading-relaxed mb-6 font-normal">
                    Complete commercial digital storefront engineered for Shankar Food Products to showcase their legacy spice catalog. Built with mobile-first architecture for lightning-fast browsing on cellular networks and streamlined direct WhatsApp wholesale customer inquiries.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-black/8">
                  <div>
                    <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1.5">
                      MY CONTRIBUTION
                    </div>
                    <div className="text-xs font-medium text-[#171717]">
                      End-to-end UX/UI Design, Responsive Frontend Architecture, WhatsApp Commerce Flow, Cloudflare Edge Deployment.
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-2">
                      TECH STACK
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Cloudflare CDN', 'WhatsApp API'].map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-md bg-[#F5F4F0] text-[11px] font-mono text-[#171717]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <a
                      href="https://kashishbyshankarfoodproducts.co.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-xs bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all duration-300 shadow-xs"
                    >
                      <span>Visit Live Website</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Preview Composition */}
              <div className="lg:col-span-7">
                <a
                  href="https://kashishbyshankarfoodproducts.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-2xl overflow-hidden bg-[#FBF9F5] border border-black/8 p-4 sm:p-8 transition-transform duration-500 group-hover:scale-[1.01]"
                >
                  {/* Mock Browser Frame */}
                  <div className="rounded-xl overflow-hidden bg-white shadow-xl border border-black/8">
                    <div className="px-4 py-2.5 bg-[#FAF8F5] border-b border-black/8 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0]" />
                      </div>
                      <span className="text-[10px] font-mono text-[#999999]">
                        kashishbyshankarfoodproducts.co.in
                      </span>
                      <div className="w-4" />
                    </div>

                    {/* Editorial Mockup Canvas */}
                    <div className="p-6 sm:p-10 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6F0] to-[#F5ECE1] min-h-[260px] sm:min-h-[340px] flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[11px] font-mono tracking-wider text-[#A05C38] uppercase font-semibold">
                          ESTD. QUALITY SPICES
                        </span>
                        <h4 className="font-display font-bold text-2xl sm:text-3xl text-[#171717] mt-1 mb-3">
                          Kashish Masale
                        </h4>
                        <p className="text-xs sm:text-sm text-[#737373] max-w-sm">
                          Pure coriander, turmeric, chili powders, and custom culinary blends delivered across regions.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-black/5">
                        <div className="px-3 py-1.5 rounded-lg bg-white/80 border border-black/5 text-[11px] font-mono text-[#171717]">
                          ✓ 100% Mobile Optimized
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-white/80 border border-black/5 text-[11px] font-mono text-[#171717]">
                          ✓ Sub-second Load
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-[#C7F36B]/50 text-[11px] font-mono text-[#171717] font-medium">
                          ✓ Direct WhatsApp Ordering
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- PROJECTS 02 & 03: ASYMMETRIC DUAL EDITORIAL SPLIT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Project 02: Venus AI (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 group text-left"
          >
            <div className="atelier-card rounded-3xl p-6 sm:p-10 h-full flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-black/8">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#171717] text-[#C7F36B]">
                    02 — SYSTEMS &amp; AI
                  </span>
                  <span className="text-xs font-mono text-[#999999]">
                    TAURI • RUST • REACT
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#171717] mb-2 tracking-tight">
                  Venus AI — Local &amp; Cloud Intelligence
                </h3>
                <p className="text-xs font-mono text-[#737373] mb-4 uppercase tracking-wider">
                  Desktop AI Workspace with Autonomous Multi-Agent Workflows
                </p>

                <p className="text-sm text-[#737373] leading-relaxed mb-6 font-normal">
                  High-performance desktop intelligence application designed for developers and researchers. Integrates local offline models via Ollama with cloud LLM providers, providing zero-latency streaming, agent chaining, and private memory context.
                </p>

                {/* Visual Terminal Canvas */}
                <div className="rounded-2xl bg-[#171717] text-[#F5F4F0] p-5 sm:p-6 mb-6 font-mono text-xs border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-[11px] text-[#737373]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <span>venus-agent-daemon // v2.4</span>
                    <span className="text-[#C7F36B]">ONLINE</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="text-[#999999]">$ venus --model deepseek-v4 --offline=true</div>
                    <div className="text-[#C7F36B]">&gt; Model loaded: DeepSeek-V4 (Quantized GGUF, 4.2GB VRAM)</div>
                    <div className="text-[#E5E5E0]">&gt; Agent swarm initialized: Codebase Parser, Test Runner, Security Scanner</div>
                    <div className="text-[#737373]">&gt; Benchmark: 84 tokens/sec • 0 cloud roundtrips</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-black/8">
                <div>
                  <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                    CONTRIBUTION &amp; STACK
                  </div>
                  <div className="text-xs text-[#171717] font-medium mb-2">
                    Cross-platform IPC bridging, token streaming UI, context compression state machine.
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Tauri', 'Rust', 'React 19', 'TypeScript', 'Ollama', 'Tailwind CSS'].map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md bg-[#F5F4F0] text-[10px] font-mono text-[#171717]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://github.com/piyushverma70/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-medium text-xs bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository &amp; Architecture</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 03: Web Forge (Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 group text-left"
          >
            <div className="atelier-card rounded-3xl p-6 sm:p-10 h-full flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-black/8">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#F5F4F0] text-[#171717]">
                    03 — CLOUD PLATFORM
                  </span>
                  <span className="text-xs font-mono text-[#999999]">
                    REACT 19 • REST
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#171717] mb-2 tracking-tight">
                  Web Forge Dashboard
                </h3>
                <p className="text-xs font-mono text-[#737373] mb-4 uppercase tracking-wider">
                  Full-Stack Microservices &amp; Deployment Console
                </p>

                <p className="text-sm text-[#737373] leading-relaxed mb-6 font-normal">
                  Unified cloud infrastructure manager providing live server metrics, webhook debugging, automated edge builds, and instant rollbacks with sub-millisecond status synchronization.
                </p>

                {/* Visual Metric Canvas */}
                <div className="rounded-2xl bg-[#F5F4F0] border border-black/8 p-5 mb-6">
                  <div className="text-[10px] font-mono text-[#737373] mb-3 uppercase tracking-wider">
                    PRODUCTION TELEMETRY
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-3 bg-white rounded-xl border border-black/5">
                      <div className="text-xs text-[#737373] font-mono">Edge Latency</div>
                      <div className="font-display font-bold text-lg text-[#171717]">18ms</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-black/5">
                      <div className="text-xs text-[#737373] font-mono">Uptime</div>
                      <div className="font-display font-bold text-lg text-[#2D5A3C]">99.98%</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-[#737373] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C7F36B]" />
                    <span>Real-time WebSocket telemetry stream</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-black/8">
                <div>
                  <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                    TECH STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'WebSockets'].map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md bg-[#F5F4F0] text-[10px] font-mono text-[#171717]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://github.com/piyushverma70/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-medium text-xs bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Explore Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
