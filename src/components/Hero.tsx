import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Hero3DCanvas } from './canvas/Hero3DCanvas';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background 3D Canvas */}
      <Hero3DCanvas />

      {/* Warm Ambient Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#FCE8DD]/40 via-[#E2ECE4]/30 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Hero Grid */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
        {/* Left Side: Headline & Bio */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 45, damping: 16 }}
          className="lg:col-span-7 text-left pr-0 lg:pr-4"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1ECE4] border border-black/5 text-xs font-mono text-[#52525B] mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86A4B]" />
            <span>FULL-STACK WEB DEVELOPER</span>
          </div>

          {/* Headline */}
          <h1 className="font-['Syne'] font-extrabold text-[32px] sm:text-5xl lg:text-5xl xl:text-[54px] text-[#18181B] tracking-tight leading-[1.15] mb-5 sm:mb-6">
            Websites Crafted With{' '}
            <span className="italic font-serif font-normal text-[#C86A4B] block sm:inline">
              Calm Precision
            </span>{' '}
            & Pure Performance.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#52525B] leading-relaxed max-w-lg mb-8">
            I'm <span className="text-[#18181B] font-semibold">Piyush</span>. I build clean, fast, and responsive websites that look sharp and actually convert. From custom React frontends to reliable backends and ecommerce, I build things right.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-[#18181B] text-[#FAF8F5] hover:bg-[#3F3F46] shadow-[0_12px_28px_-6px_rgba(24,24,27,0.25)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Start A Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#projects"
              className="flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-sm bg-white/90 hover:bg-white text-[#18181B] border border-black/5 shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Works</span>
            </a>
          </div>
        </motion.div>

        {/* Right Side: Overview Cards */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 45, damping: 16 }}
          className="lg:col-span-5 flex flex-col gap-4 text-left w-full"
        >
          {/* Card 1: Speed */}
          <div className="p-6 sm:p-7 rounded-3xl bg-comfort-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-medium text-[#71717A] uppercase tracking-wider">
                Performance Target
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E2ECE4] text-[#2D5A3C] font-mono">
                Lighthouse 95+
              </span>
            </div>
            <h3 className="font-['Syne'] font-bold text-xl text-[#18181B] mb-2 leading-snug">
              Fast, Responsive & Smooth.
            </h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Pages that load in under a second with smooth transitions and layouts that work cleanly on phones, tablets, and laptops.
            </p>
          </div>

          {/* Card 2: Metrics Strip */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-comfort-card">
              <div className="text-2xl font-bold font-['Syne'] text-[#18181B]">100%</div>
              <div className="text-[11px] font-mono text-[#71717A] mt-1">Handcrafted Code</div>
            </div>
            <div className="p-5 rounded-3xl bg-comfort-card">
              <div className="text-2xl font-bold font-['Syne'] text-[#C86A4B]">&lt; 0.8s</div>
              <div className="text-[11px] font-mono text-[#71717A] mt-1">Average Page Load</div>
            </div>
          </div>

          {/* Card 3: Quality Guarantee */}
          <div className="p-5 rounded-3xl bg-[#FAF6F0] border border-[#EBE3D7] flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EADCC9] flex items-center justify-center text-[#18181B] shrink-0">
              <MessageCircle className="w-4 h-4 text-[#C86A4B]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#18181B]">Direct Collaboration</div>
              <div className="text-[11px] text-[#71717A]">You work directly with me—no middlemen or delays.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
