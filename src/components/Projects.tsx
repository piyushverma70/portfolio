import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, HeartHandshake, Bot } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-20 sm:py-28 px-4 overflow-hidden border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1ECE4] border border-black/5 text-xs font-mono text-[#52525B] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86A4B]" />
            <span>PROOF IN THE CRAFT</span>
          </div>
          <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight leading-snug">
            Real Work & Personal Inventions.
          </h2>
          <p className="text-[#71717A] mt-3 max-w-xl text-sm sm:text-base leading-relaxed">
            From a commercial client website running in production to an autonomous desktop AI agent built from passion.
          </p>
        </div>

        {/* 1. Featured Real Client Website Spotlight */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 45, damping: 16 }}
          className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-comfort-card text-left transition-all duration-300 relative overflow-hidden mb-6 sm:mb-8"
        >
          {/* Subtle Ambient Card Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FCE8DD]/50 via-transparent to-transparent rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8 mb-6 sm:mb-8 relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#E2ECE4] text-[#2D5A3C] border border-[#D5E3D8]">
                  ★ CLIENT PRODUCTION WEBSITE
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-[#52525B] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A3C]" />
                  <span>Live Online</span>
                </span>
              </div>

              <h3 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#18181B] mb-2 leading-snug">
                Kashish Masale & Spices
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#C86A4B] mb-3 sm:mb-4">
                Shankar Food Products — Pure & Authentic Indian Spices Platform
              </p>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-2xl">
                A complete commercial web presence engineered for Shankar Food Products to showcase their pure Indian spices and food products. Featuring clear typography, high-speed mobile navigation, and seamless customer order channels.
              </p>
            </div>

            {/* Visit Live Website CTA Button */}
            <div className="shrink-0 w-full sm:w-auto">
              <a
                href="https://kashishbyshankarfoodproducts.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-[#18181B] text-[#FAF8F5] hover:bg-[#3F3F46] shadow-[0_12px_28px_-6px_rgba(24,24,27,0.25)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Visit Live Website</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Key Deliverables & Tags */}
          <div className="pt-5 sm:pt-6 border-t border-black/5 relative z-10">
            <div className="text-xs font-mono text-[#71717A] uppercase tracking-wider mb-3">
              Delivered Website Scope
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="pill-tag">Commercial Brand Web Design</span>
              <span className="pill-tag">Full Product Catalog Architecture</span>
              <span className="pill-tag">Mobile-First Responsive Layout</span>
              <span className="pill-tag">Direct Inquiry & Order Flow</span>
              <span className="pill-tag">High-Speed Cloudflare Edge Delivery</span>
              <span className="pill-tag">Lighthouse Speed & SEO Optimization</span>
            </div>
          </div>
        </motion.div>

        {/* 2. Side Project: Venus AI (Autonomous Desktop AI Agent) */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 45, damping: 16 }}
          className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-comfort-card text-left transition-all duration-300 relative overflow-hidden mb-8 sm:mb-10"
        >
          {/* Subtle Ambient Card Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#EDE9F4]/50 via-transparent to-transparent rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8 mb-6 sm:mb-8 relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#EDE9F4] text-[#534273] border border-[#DDD5E8]">
                  SIDE PROJECT // DESKTOP AI AGENT
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-[#52525B] flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-[#534273]" />
                  <span>Autonomous Desktop Software</span>
                </span>
              </div>

              <h3 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#18181B] mb-2 leading-snug">
                Venus AI — Desktop Assistant
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#534273] mb-3 sm:mb-4">
                Autonomous Desktop AI Assistant | Engineered by Piyush Verma
              </p>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-2xl">
                A personal passion project exploring autonomous operating system agents. Venus AI observes the screen via computer vision, automates complex desktop workflows, responds via natural voice streaming, and executes multi-step computer tasks.
              </p>
            </div>

            {/* In Active Development Pill */}
            <div className="shrink-0 flex items-center">
              <div className="w-full sm:w-auto px-4 py-2 rounded-full text-xs font-mono font-medium bg-[#F1ECE4] border border-black/5 text-[#52525B] text-center">
                Personal Lab // Active R&D
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="pt-5 sm:pt-6 border-t border-black/5 relative z-10">
            <div className="text-xs font-mono text-[#71717A] uppercase tracking-wider mb-3">
              Core Capabilities & Architecture
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="pill-tag">Python & PyTorch</span>
              <span className="pill-tag">Autonomous Computer Vision</span>
              <span className="pill-tag">Desktop OS Automation</span>
              <span className="pill-tag">Multimodal LLM Orchestration</span>
              <span className="pill-tag">Real-Time Voice Streaming</span>
            </div>
          </div>
        </motion.div>

        {/* Quality Over Quantity Philosophy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 45, damping: 16 }}
          className="p-6 sm:p-8 rounded-3xl bg-[#FAF6F0] border border-[#EBE3D7] text-left flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EADCC9] text-[#18181B] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6 text-[#C86A4B]" />
            </div>
            <div>
              <h4 className="font-['Syne'] font-bold text-base sm:text-lg text-[#18181B] mb-1">
                One Client At A Time. Dedicated Craftsmanship.
              </h4>
              <p className="text-xs sm:text-sm text-[#71717A] max-w-xl leading-relaxed">
                Rather than rushing through dozens of cookie-cutter templates, I invest 100% focused attention into every single client. When you work with me, your project is my top priority.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white border border-black/10 text-[#18181B] hover:bg-[#18181B] hover:text-white transition-all shadow-sm text-center"
          >
            Be My Next Flagship Project
          </a>
        </motion.div>
      </div>
    </section>
  );
};
