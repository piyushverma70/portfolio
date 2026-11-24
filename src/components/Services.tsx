import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  const serviceRows = [
    {
      num: "01",
      title: "Interface Design & Development",
      desc: "Designing and developing clean, modern and user-focused interfaces.",
    },
    {
      num: "02",
      title: "Full-Stack Engineering",
      desc: "Building scalable, secure and high-performance web applications.",
    },
    {
      num: "03",
      title: "E-Commerce & Integrations",
      desc: "Creating seamless shopping experiences with payments and third-party integrations.",
    },
    {
      num: "04",
      title: "Interactive Digital Experiences",
      desc: "Bringing ideas to life with creative interactions, animations and modern web tech.",
    },
  ];

  return (
    <section id="services" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
          <div>
            <div className="text-xs font-mono font-bold text-[#737373] tracking-widest mb-1">
              02.
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#171717] tracking-tight">
              SERVICES &amp; EXPERTISE
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#737373] max-w-md font-normal">
            What I do to turn ideas into functional, beautiful and high-performing products.
          </p>
        </div>

        {/* Content Grid: 4 Horizontal Rows (Left) & 3D Glass Plates (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
          {/* Left Column: 4 Editorial Rows */}
          <div className="lg:col-span-7 divide-y divide-black/8 border-t border-b border-black/8">
            {serviceRows.map((svc, idx) => (
              <motion.a
                key={svc.num}
                href="#contact"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group py-6 sm:py-7 flex items-center justify-between gap-6 hover:bg-black/[0.015] transition-all cursor-pointer block"
              >
                <div className="flex items-start sm:items-center gap-6 sm:gap-8">
                  <span className="font-mono text-xs sm:text-sm text-[#737373] font-medium pt-0.5 sm:pt-0">
                    {svc.num}
                  </span>

                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#171717] group-hover:text-[#737373] transition-colors mb-1 tracking-tight">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#737373] font-normal leading-relaxed max-w-xl">
                      {svc.desc}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:bg-[#171717] group-hover:text-[#C7F36B] transition-all">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right Column: Floating 3D Isometric Glass Plates */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <motion.div
              animate={{
                y: [-6, 6, -6],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-full max-w-[380px] aspect-[4/3] flex items-center justify-center"
            >
              {/* Subtle ambient lime glow */}
              <div className="absolute inset-0 bg-[#C7F36B]/20 rounded-full blur-[50px] pointer-events-none" />

              <img
                src="/assets/glass-plates.png"
                alt="3D Frosted Glass Plates with Electric Lime Glow"
                className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(23,23,23,0.08)] pointer-events-none"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
