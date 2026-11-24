import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Code, Layout } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Eyebrow Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between border-b border-black/8 pb-4 mb-8 sm:mb-12"
        >
          <div className="text-[11px] sm:text-xs font-mono tracking-widest text-[#737373] uppercase">
            <span className="font-bold text-[#171717]">PIYUSH VERMA</span>
            <span className="mx-2 text-[#C2C0B8]">/</span>
            <span>DESIGN-DRIVEN DEVELOPER</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#737373]">
            <span>PORTFOLIO '26</span>
            <span className="text-[#C2C0B8]">/</span>
            <span className="text-[#171717] font-semibold">CREATIVE DEV</span>
          </div>
        </motion.div>

        {/* Main Grand Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14"
        >
          <h1 className="font-display font-extrabold text-[36px] xs:text-[42px] sm:text-[64px] md:text-[76px] lg:text-[88px] xl:text-[98px] text-[#171717] tracking-[-0.04em] leading-[1.0] sm:leading-[0.94] max-w-5xl">
            I BUILD DIGITAL<br />
            EXPERIENCES <br className="sm:hidden" />THAT<br className="hidden sm:inline" />{' '}
            FEEL{' '}
            <span className="inline-block px-3 sm:px-6 py-0.5 sm:py-1 rounded-2xl bg-[#C7F36B] text-[#171717] italic font-display font-black tracking-tight transform -rotate-1 mt-1">
              DIFFERENT.
            </span>
          </h1>
        </motion.div>

        {/* Bottom Editorial Grid: Description, CTAs & Specs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-8 border-t border-black/8"
        >
          {/* Left Column: Description & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl mb-8 font-normal">
              Combining thoughtful design, modern engineering, and creative experimentation to build fast, tactile, and meaningful digital products.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-display font-semibold text-xs sm:text-sm bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all duration-300 shadow-sm transform hover:-translate-y-0.5"
              >
                <span>Explore Selected Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-display font-medium text-xs sm:text-sm bg-transparent hover:bg-black/5 text-[#171717] border border-black/15 transition-all duration-300"
              >
                <span>Let's Connect</span>
              </a>
            </div>
          </div>

          {/* Right Column: Metadata & Engineering Disciplines */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between gap-3 font-mono text-[11px] sm:text-xs text-[#52525B]">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 lg:justify-end">
              <span className="flex items-center gap-1.5 text-[#171717]">
                <MapPin className="w-3.5 h-3.5 text-[#171717]" />
                <span>India / Remote</span>
              </span>
              <span className="text-[#C2C0B8]">|</span>
              <span className="flex items-center gap-1.5 text-[#171717]">
                <Code className="w-3.5 h-3.5 text-[#171717]" />
                <span>Full-Stack Engineering</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 lg:justify-end">
              <span className="flex items-center gap-1.5 text-[#171717]">
                <Layout className="w-3.5 h-3.5 text-[#171717]" />
                <span>UI & Design Systems</span>
              </span>
              <span className="text-[#C2C0B8]">|</span>
              <span className="text-[#737373]">Crafting Web Excellence</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
