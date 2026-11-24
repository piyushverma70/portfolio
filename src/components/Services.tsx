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

        {/* Content Grid: 4 Horizontal Rows (Left) & Pure CSS 3D Floating Glass Plates (Right) */}
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

          {/* Right Column: Pure Procedural CSS 3D Glass Device Plates (Zero Raster Images!) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex items-center justify-center relative min-h-[300px]"
            style={{ perspective: 1000 }}
          >
            {/* Ambient Lime Neon Glow */}
            <div className="absolute w-64 h-64 bg-[#C7F36B]/20 rounded-full blur-[60px] pointer-events-none" />

            {/* Floating Glass Plate Container */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
                rotateZ: [-1, 1, -1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-72 sm:w-80 h-52 sm:h-56"
              style={{
                transform: 'rotateX(55deg) rotateZ(-35deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Lower Glass Plate */}
              <div
                className="absolute inset-0 rounded-3xl border border-black/15 shadow-[0_30px_60px_-15px_rgba(23,23,23,0.18)]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(245,244,240,0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  transform: 'translateZ(-40px)',
                }}
              >
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#C7F36B] blur-md opacity-70 animate-pulse" />
                <div className="absolute inset-0 rounded-3xl border-t border-l border-white/90 pointer-events-none" />
              </div>

              {/* Upper Glass Plate (Hovering above) */}
              <div
                className="absolute inset-0 rounded-3xl border border-black/15 shadow-[0_25px_50px_-12px_rgba(23,23,23,0.15)]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.45) 100%)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  transform: 'translateZ(30px) translateY(-15px) translateX(20px)',
                }}
              >
                {/* Metallic Chrome Beveled Edge Highlight */}
                <div className="absolute inset-0 rounded-3xl border-t border-l border-white pointer-events-none" />
                <div className="absolute top-4 right-5 w-3 h-3 rounded-full bg-[#C7F36B] shadow-[0_0_12px_#C7F36B]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
