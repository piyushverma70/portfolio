import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Zap, Compass } from 'lucide-react';

export const WhyMe: React.FC = () => {
  const principles = [
    {
      icon: Heart,
      title: "Design Thinking",
      desc: "Build with the user in mind.",
    },
    {
      icon: ShieldCheck,
      title: "Clean & Scalable Code",
      desc: "Maintainable and future ready.",
    },
    {
      icon: Zap,
      title: "Performance Focused",
      desc: "Fast, smooth and reliable experiences.",
    },
    {
      icon: Compass,
      title: "Continuous Experimentation",
      desc: "Always learning and exploring new ideas.",
    },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-left mb-10">
          <div className="text-xs font-mono font-bold text-[#737373] tracking-widest mb-1">
            04.
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#171717] tracking-tight">
            ABOUT ME
          </h2>
        </div>

        {/* 3-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
          {/* Column 1: Portrait with Electric Lime Accent (Span 4) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex items-center justify-center lg:justify-start"
          >
            <div className="relative w-48 sm:w-56 aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-black/8 group">
              {/* Lime accent backing box */}
              <div className="absolute top-2 left-2 w-full h-full bg-[#C7F36B] rounded-3xl -z-10" />
              <img
                src="/assets/about-portrait.png"
                alt="Piyush Verma Portrait"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Column 2: Headline & Personal Bio (Span 4) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#171717] tracking-tight leading-snug mb-4">
              A developer who cares about the{' '}
              <span className="inline-block px-2.5 py-0.5 rounded-lg bg-[#C7F36B] text-[#171717] font-extrabold">
                details.
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
              I'm Piyush Verma, a developer and UI engineer who enjoys turning ideas into thoughtful digital experiences. I focus on clean design, solid engineering and the small details that make a product feel truly great to use.
            </p>
          </motion.div>

          {/* Column 3: 4 Principles with Minimal Line Icons (Span 4) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 space-y-5"
          >
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-black/8 flex items-center justify-center text-[#171717] shrink-0 mt-0.5 shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-[#171717] leading-tight mb-0.5">
                      {p.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#737373] font-normal">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
