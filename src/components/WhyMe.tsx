import React from 'react';
import { motion } from 'framer-motion';

export const WhyMe: React.FC = () => {
  const principles = [
    {
      num: "01",
      title: "Design Thinking",
      desc: "Build with the user in mind. Every layout decision starts with empathy, clarity, and intuitive flow.",
    },
    {
      num: "02",
      title: "Clean & Scalable Code",
      desc: "Maintainable, type-safe architecture designed for zero technical debt and effortless iteration.",
    },
    {
      num: "03",
      title: "Performance Focused",
      desc: "Fast, smooth and reliable experiences with sub-second page loads and zero layout shifts.",
    },
    {
      num: "04",
      title: "Continuous Experimentation",
      desc: "Always learning, exploring modern web standards, and bringing creative motion to life without sacrificing stability.",
    },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-left mb-10 sm:mb-12">
          <div className="text-xs font-mono font-bold text-[#737373] tracking-widest mb-1.5">
            03.
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#171717] tracking-tight">
            ABOUT ME
          </h2>
        </div>

        {/* 2-Column Editorial Typography Layout (No Personal Photograph) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          {/* Left Column: Manifesto & Personal Introduction (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display font-bold text-3xl sm:text-5xl lg:text-[52px] text-[#171717] tracking-tight leading-[1.06] mb-6">
                Thoughtful Design.<br />
                <span className="font-serif-editorial italic font-normal text-[#171717]">
                  Intelligent Engineering.
                </span>
              </h3>

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed font-normal mb-8">
                I'm Piyush Verma, a developer and UI engineer who enjoys turning ideas into thoughtful digital experiences. I focus on clean design, solid engineering and the small details that make a product feel truly great to use.
              </p>
            </div>

            <div className="pt-6 border-t border-black/8 text-xs font-mono text-[#737373] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C7F36B]" />
              <span>INDEPENDENT DIGITAL CRAFTSMAN • NEW DELHI, INDIA</span>
            </div>
          </motion.div>

          {/* Right Column: Four Numbered Working Principles (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 divide-y divide-black/8 border-t border-b border-black/8"
          >
            {principles.map((p) => (
              <div key={p.num} className="py-6 sm:py-7 group hover:bg-black/[0.015] transition-colors">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#999999] shrink-0">
                    {p.num}
                  </span>

                  <div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-[#171717] tracking-tight mb-1.5">
                      {p.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#737373] leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
