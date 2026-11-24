import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Code, Layout } from 'lucide-react';
import { Hero3DCanvas } from './canvas/Hero3DCanvas';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Column (Approx 58%) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left flex flex-col items-start pr-0 lg:pr-6"
          >
            {/* Subtitle */}
            <div className="text-[11px] sm:text-xs font-mono tracking-widest text-[#737373] uppercase mb-4 sm:mb-5">
              <span className="font-bold text-[#171717]">PIYUSH VERMA</span><br />
              <span>DESIGN-DRIVEN DEVELOPER</span>
            </div>

            {/* Massive Bold Headline */}
            <h1 className="font-display font-extrabold text-[42px] sm:text-[62px] lg:text-[68px] xl:text-[76px] text-[#171717] tracking-[-0.04em] leading-[0.98] mb-5 sm:mb-6">
              I BUILD DIGITAL<br />
              EXPERIENCES<br />
              THAT FEEL<br />
              <span className="inline-block px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl bg-[#C7F36B] text-[#171717] italic font-display font-black tracking-tight transform -rotate-1 mt-1">
                DIFFERENT.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-lg mb-8 font-normal">
              Combining thoughtful design, modern engineering, and creative experimentation to build meaningful digital experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 sm:mb-12">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-xs sm:text-sm bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all duration-300 shadow-sm transform hover:-translate-y-0.5"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-medium text-xs sm:text-sm bg-transparent hover:bg-black/5 text-[#171717] border border-black/15 transition-all duration-300"
              >
                <span>Let's Connect</span>
              </a>
            </div>

            {/* Bottom Metadata Tags */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono text-[#52525B] pt-2 border-t border-black/8 w-full">
              <span className="flex items-center gap-1.5 text-[#171717]">
                <MapPin className="w-3.5 h-3.5 text-[#171717]" />
                <span>India</span>
              </span>
              <span className="text-[#C2C0B8]">|</span>
              <span className="flex items-center gap-1.5 text-[#171717]">
                <Code className="w-3.5 h-3.5 text-[#171717]" />
                <span>Full-Stack Developer</span>
              </span>
              <span className="text-[#C2C0B8]">|</span>
              <span className="flex items-center gap-1.5 text-[#171717]">
                <Layout className="w-3.5 h-3.5 text-[#171717]" />
                <span>UI Engineer</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column (Approx 42%): 3D PV Monogram Sculpture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <Hero3DCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
