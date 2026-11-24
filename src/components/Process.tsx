import React from 'react';
import { motion } from 'framer-motion';
import { Search, Palette, Terminal, CheckCircle, Rocket, ArrowRight } from 'lucide-react';

export const Process: React.FC = () => {
  const stages = [
    {
      num: "01",
      title: "DISCOVER",
      subtitle: "Scope & Architecture",
      icon: Search,
      desc: "Deep analysis of your product goals, audience behavior, and technical constraints. We select the ideal stack and map out every requirement before writing code.",
    },
    {
      num: "02",
      title: "DESIGN",
      subtitle: "Editorial Systems & Flow",
      icon: Palette,
      desc: "Art-directing the visual identity, typographic scales, spatial grids, and interactive prototypes. Every screen is refined until it feels bespoke and unmistakable.",
    },
    {
      num: "03",
      title: "BUILD",
      subtitle: "Clean Type-Safe Engineering",
      icon: Terminal,
      desc: "Handcrafted React 19 and TypeScript with strict performance budgets. Fluid responsive layouts, modular state machines, and zero layout shift.",
    },
    {
      num: "04",
      title: "REFINE",
      subtitle: "Polish & Performance Audits",
      icon: CheckCircle,
      desc: "Rigorous cross-device testing, touch responsiveness checks, Core Web Vitals optimization, and 60-120fps motion profiling.",
    },
    {
      num: "05",
      title: "LAUNCH",
      subtitle: "Edge Deployment & Handover",
      icon: Rocket,
      desc: "Instant global deployment via Cloudflare Pages / Edge CDN networks, automated SSL, SEO metadata verification, and clean documentation.",
    },
  ];

  return (
    <section id="process" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-10 border-t border-black/8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24 pb-8 border-b border-black/8 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 text-[11px] font-mono text-[#171717] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]" />
              <span>03 / THE METHOD</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#171717] tracking-tight leading-[1.08]">
              An Intentional, <br />
              <span className="font-serif-editorial italic font-normal text-[#171717]">
                Five-Stage Discipline.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#737373] max-w-md leading-relaxed">
            DISCOVER → DESIGN → BUILD → REFINE → LAUNCH. Clear communication, predictable velocity, and zero ambiguity from start to finish.
          </p>
        </div>

        {/* Editorial Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left relative">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;

            return (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between pt-6 border-t-2 border-black/10 hover:border-[#171717] transition-colors duration-300"
              >
                <div>
                  {/* Stage Number & Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#737373] group-hover:text-[#171717] transition-colors">
                      STAGE {stage.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-black/8 flex items-center justify-center text-[#171717] group-hover:bg-[#C7F36B] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Stage Title */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#171717] mb-1 tracking-tight">
                    {stage.title}
                  </h3>

                  <div className="text-[11px] font-mono text-[#999999] uppercase tracking-wider mb-4">
                    {stage.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#737373] leading-relaxed font-normal">
                    {stage.desc}
                  </p>
                </div>

                {/* Connecting Arrow for desktop (except last) */}
                {idx < stages.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-5 text-[#999999]">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
