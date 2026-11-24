import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Hero3DCanvas } from './canvas/Hero3DCanvas';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[94vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* Subtle Hairline Background Grid Guides */}
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none px-4 sm:px-6 lg:px-10">
        <div className="w-full h-full border-x border-black/[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Expressive Editorial Headline & Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left flex flex-col items-start"
          >
            {/* Top Identity / Role Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white border border-black/8 text-[11px] font-mono text-[#171717] mb-6 sm:mb-8 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#C7F36B] shadow-[0_0_8px_#C7F36B]" />
              <span className="tracking-wider uppercase font-semibold">PIYUSH VERMA</span>
              <span className="text-[#999999]">•</span>
              <span className="text-[#737373]">DESIGN-DRIVEN DEVELOPER</span>
            </div>

            {/* Oversized Expressive Headline */}
            <h1 className="font-display font-bold text-[38px] sm:text-6xl lg:text-[64px] xl:text-[72px] text-[#171717] tracking-[-0.03em] leading-[1.04] mb-6 sm:mb-7">
              I BUILD DIGITAL <br />
              <span className="font-serif-editorial italic font-normal text-[#171717] underline decoration-[#C7F36B] decoration-4 underline-offset-8">
                EXPERIENCES
              </span>{' '}
              <br className="hidden sm:inline" />
              THAT FEEL DIFFERENT.
            </h1>

            {/* Supporting Editorial Statement */}
            <p className="text-base sm:text-lg text-[#737373] leading-relaxed max-w-xl mb-8 sm:mb-10 font-normal">
              Combining thoughtful design, modern engineering, and creative experimentation to build meaningful digital experiences that captivate and perform.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-14">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-semibold text-sm bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-display font-medium text-sm bg-white hover:bg-white/80 text-[#171717] border border-black/10 transition-all duration-300 transform hover:-translate-y-0.5 shadow-xs"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4 text-[#737373]" />
              </a>
            </div>

            {/* Editorial Metadata Strip */}
            <div className="w-full pt-6 border-t border-black/8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                  LOCATION
                </div>
                <div className="text-xs font-medium text-[#171717]">
                  New Delhi, India
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                  AVAILABILITY
                </div>
                <div className="text-xs font-medium text-[#171717] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]" />
                  <span>Q1 / Q2 Projects</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                  FOCUS
                </div>
                <div className="text-xs font-medium text-[#171717]">
                  Creative Web &amp; Apps
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Signature 3D Abstract PV Sculpture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* The 3D Sculpture Canvas */}
            <Hero3DCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
