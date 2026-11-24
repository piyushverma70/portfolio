import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  const serviceRows = [
    {
      num: "01",
      title: "Interface Design & Development",
      desc: "Designing and developing clean, modern and user-focused interfaces with fluid typography.",
    },
    {
      num: "02",
      title: "Full-Stack Engineering",
      desc: "Building scalable, secure and high-performance web applications on modern type-safe stacks.",
    },
    {
      num: "03",
      title: "E-Commerce & Integrations",
      desc: "Creating seamless shopping experiences with payment gateways and direct WhatsApp commerce.",
    },
    {
      num: "04",
      title: "Interactive Digital Experiences",
      desc: "Bringing ideas to life with creative interactions, lightweight WebGL, and silky-smooth animations.",
    },
  ];

  return (
    <section id="services" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 text-left">
          <div>
            <div className="text-xs font-mono font-bold text-[#737373] tracking-widest mb-1.5">
              02.
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#171717] tracking-tight">
              SERVICES &amp; EXPERTISE
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#737373] max-w-md font-normal">
            What I do to turn ideas into functional, beautiful, and high-performing digital products.
          </p>
        </div>

        {/* Content Grid: 4 Horizontal Rows (Left) & Layered Metallic Geometric Sculpture (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
          {/* Left Column: 4 Refined Editorial Rows (Span 7) */}
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
                <div className="flex items-start sm:items-center gap-5 sm:gap-7">
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

          {/* Right Column: Refined Metallic Geometric Architecture Visual (Span 5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex items-center justify-center relative p-6 sm:p-8"
          >
            {/* Ambient Lime Neon Glow */}
            <div className="absolute w-72 h-72 bg-[#C7F36B]/20 rounded-full blur-[70px] pointer-events-none" />

            {/* Layered Metallic Geometry Card */}
            <motion.div
              animate={{
                y: [-6, 6, -6],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-full max-w-[340px] aspect-square rounded-3xl bg-gradient-to-br from-white/95 to-[#FAF8F5]/80 border border-black/10 shadow-[0_20px_50px_-15px_rgba(23,23,23,0.08)] p-6 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Bar with Micro-coordinates */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#999999] pb-3 border-b border-black/5">
                <span>SYSTEM // ATELIER</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]" />
                  60 FPS
                </span>
              </div>

              {/* Central Metallic Geometric Forms (Pure SVG Construction) */}
              <div className="relative flex items-center justify-center my-auto py-4">
                <svg
                  viewBox="0 0 240 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto drop-shadow-md"
                >
                  <defs>
                    <linearGradient id="chromeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="35%" stopColor="#ebebeb" />
                      <stop offset="55%" stopColor="#cfcfcf" />
                      <stop offset="80%" stopColor="#f2f2f2" />
                      <stop offset="100%" stopColor="#bababa" />
                    </linearGradient>
                    <linearGradient id="chromeGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#f0f0f0" />
                      <stop offset="70%" stopColor="#cccccc" />
                      <stop offset="100%" stopColor="#e8e8e8" />
                    </linearGradient>
                    <linearGradient id="limeGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C7F36B" />
                      <stop offset="100%" stopColor="#9DE036" />
                    </linearGradient>
                  </defs>

                  {/* Backing Geometric Iso Plate */}
                  <polygon
                    points="120,20 210,65 120,110 30,65"
                    fill="url(#chromeGrad2)"
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="30,65 120,110 120,122 30,77"
                    fill="#9e9e9e"
                  />
                  <polygon
                    points="120,110 210,65 210,77 120,122"
                    fill="#757575"
                  />

                  {/* Upper Floating Metallic Iso Plate */}
                  <polygon
                    points="120,55 200,95 120,135 40,95"
                    fill="url(#chromeGrad1)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="40,95 120,135 120,145 40,105"
                    fill="#a8a8a8"
                  />
                  <polygon
                    points="120,135 200,95 200,105 120,145"
                    fill="#858585"
                  />

                  {/* Electric Lime Accent Core Dot */}
                  <circle
                    cx="120"
                    cy="95"
                    r="8"
                    fill="url(#limeGlowGrad)"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="animate-pulse"
                  />

                  {/* Fine Precision Crosshairs */}
                  <line x1="120" y1="80" x2="120" y2="110" stroke="rgba(23,23,23,0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="105" y1="95" x2="135" y2="95" stroke="rgba(23,23,23,0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
                </svg>
              </div>

              {/* Bottom Label */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#737373] pt-3 border-t border-black/5">
                <span>METALLIC GEOMETRY</span>
                <span>PRECISION CRAFT</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
