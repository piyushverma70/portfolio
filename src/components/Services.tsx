import React from 'react';
import { motion } from 'framer-motion';
import { Code, Orbit, Zap, ShoppingBag, Layout, Sparkles } from 'lucide-react';

export const Services: React.FC = () => {
  const leftServices = [
    {
      num: "01",
      icon: Code,
      title: "Full-Stack Web Engineering",
      description: "Clean, bespoke web platforms built on Next.js, React, and TypeScript. Robust APIs, scalable database architectures, and zero technical bloat.",
      tags: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
      pillBg: "#E2ECE4",
      pillColor: "#2D5A3C",
    },
    {
      num: "02",
      icon: Layout,
      title: "Tactile UI/UX Design Systems",
      description: "Figma concepts turned into living, breathing production code with accessible typography, responsive grids, and serene visual ergonomics.",
      tags: ["Design Systems", "Figma to Code", "Fluid Grids", "Micro-Interactions"],
      pillBg: "#FCE8DD",
      pillColor: "#8C4A32",
    },
    {
      num: "03",
      icon: Zap,
      title: "High-Converting Landing Pages",
      description: "Fast, focused pages designed to convert curiosity into committed customers with sub-second speeds and persuasive layout flow.",
      tags: ["Conversion Rate Flow", "Sub-Second Load", "Storytelling", "A/B Ready"],
      pillBg: "#F2ECE1",
      pillColor: "#6B5A42",
    },
  ];

  const rightServices = [
    {
      num: "04",
      icon: Orbit,
      title: "Organic 3D & Creative Motion",
      description: "Subtle WebGL scenes, interactive physics, custom shaders, and velvety smooth scrolling (Lenis) that feel delightful, never overwhelming.",
      tags: ["Three.js", "WebGL Physics", "Lenis Smooth Scroll", "Framer Motion"],
      pillBg: "#EDE9F4",
      pillColor: "#534273",
    },
    {
      num: "05",
      icon: ShoppingBag,
      title: "Frictionless eCommerce & Checkout",
      description: "Effortless shopping experiences with ultra-low cart abandonment, tokenized payments, and instant client-side cart transitions.",
      tags: ["Stripe Connect", "Headless Storefronts", "Instant Checkout", "Cart State"],
      pillBg: "#E8ECEF",
      pillColor: "#3B5266",
    },
    {
      num: "06",
      icon: Sparkles,
      title: "Lighthouse 100 & Technical SEO",
      description: "Obsessive optimization so your web presence ranks cleanly on search engines and delivers instant gratification on any device or network.",
      tags: ["Core Web Vitals", "Lighthouse 95+", "Edge Caching", "Semantic SEO"],
      pillBg: "#E2ECE4",
      pillColor: "#2D5A3C",
    },
  ];

  return (
    <section id="services" className="relative py-20 sm:py-28 px-4 overflow-hidden border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1ECE4] border border-black/5 text-xs font-mono text-[#52525B] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86A4B]" />
            <span>FULL ARCHITECTURE OFFERINGS</span>
          </div>
          <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight leading-snug">
            Everything You Need For The Web.
          </h2>
          <p className="text-[#71717A] mt-3 max-w-xl text-sm sm:text-base leading-relaxed">
            From low-end static pages to rich interactive 3D ecosystems and fullstack SaaS—handcrafted with care.
          </p>
        </div>

        {/* Dual Converging Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Column (Enters from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 45, damping: 16 }}
            className="flex flex-col gap-6"
          >
            {leftServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.num}
                  className="p-6 sm:p-8 lg:p-9 rounded-3xl bg-comfort-card text-left transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <span
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-full leading-normal"
                      style={{ background: svc.pillBg, color: svc.pillColor }}
                    >
                      SERVICE {svc.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#F8F6F0] flex items-center justify-center text-[#18181B]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-['Syne'] font-bold text-xl sm:text-2xl text-[#18181B] mb-2 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-5 sm:mb-6 font-normal">
                    {svc.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 sm:pt-5 border-t border-black/5">
                    {svc.tags.map((t) => (
                      <span key={t} className="pill-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Right Column (Enters from Right) */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 45, damping: 16 }}
            className="flex flex-col gap-6"
          >
            {rightServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.num}
                  className="p-6 sm:p-8 lg:p-9 rounded-3xl bg-comfort-card text-left transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <span
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-full leading-normal"
                      style={{ background: svc.pillBg, color: svc.pillColor }}
                    >
                      SERVICE {svc.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#F8F6F0] flex items-center justify-center text-[#18181B]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-['Syne'] font-bold text-xl sm:text-2xl text-[#18181B] mb-2 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-5 sm:mb-6 font-normal">
                    {svc.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 sm:pt-5 border-t border-black/5">
                    {svc.tags.map((t) => (
                      <span key={t} className="pill-tag">
                        {t}
                      </span>
                    ))}
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
