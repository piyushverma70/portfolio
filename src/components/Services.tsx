import React from 'react';
import { motion } from 'framer-motion';
import { Code, Orbit, Zap, ShoppingBag, Layout, Sparkles } from 'lucide-react';

export const Services: React.FC = () => {
  const leftServices = [
    {
      num: "01",
      icon: Code,
      title: "Full-Stack Web Development",
      description: "Custom web applications built on Next.js, React, and TypeScript. Reliable backend APIs, clean database setups, and maintainable code.",
      tags: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
      pillBg: "#E2ECE4",
      pillColor: "#2D5A3C",
    },
    {
      num: "02",
      icon: Layout,
      title: "Frontend & UI/UX Design",
      description: "Taking Figma designs and turning them into clean production code with responsive layouts, readable typography, and smooth interactions.",
      tags: ["Design Systems", "Figma to Code", "Responsive Grids", "Micro-Interactions"],
      pillBg: "#FCE8DD",
      pillColor: "#8C4A32",
    },
    {
      num: "03",
      icon: Zap,
      title: "High-Converting Landing Pages",
      description: "Fast-loading pages designed to explain your product clearly and turn visitors into leads or paying customers.",
      tags: ["Conversion Flow", "Fast Load", "Product Story", "Clear CTAs"],
      pillBg: "#F2ECE1",
      pillColor: "#6B5A42",
    },
  ];

  const rightServices = [
    {
      num: "04",
      icon: Orbit,
      title: "3D Graphics & Creative Motion",
      description: "Lightweight WebGL/Three.js visuals, interactive physics, and smooth scrolling that add character without slowing down page load.",
      tags: ["Three.js", "WebGL Physics", "Lenis Smooth Scroll", "Framer Motion"],
      pillBg: "#EDE9F4",
      pillColor: "#534273",
    },
    {
      num: "05",
      icon: ShoppingBag,
      title: "eCommerce & Payment Integrations",
      description: "Online stores with secure payment checkouts (Stripe / Razorpay), fast product catalogs, and smooth cart management.",
      tags: ["Stripe / Payments", "Product Catalogs", "Checkout Flow", "Cart State"],
      pillBg: "#E8ECEF",
      pillColor: "#3B5266",
    },
    {
      num: "06",
      icon: Sparkles,
      title: "Performance & Technical SEO",
      description: "Auditing and optimizing your site for sub-second load times, high Lighthouse scores, and proper Google search ranking.",
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
            <span>SERVICES &amp; CAPABILITIES</span>
          </div>
          <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight leading-snug">
            Everything You Need For The Web.
          </h2>
          <p className="text-[#71717A] mt-3 max-w-xl text-sm sm:text-base leading-relaxed">
            From fast static landing pages to custom web applications and online stores—built with care.
          </p>
        </div>

        {/* Services Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Column */}
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

          {/* Right Column */}
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
