import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Eye, Sparkles, Sliders } from 'lucide-react';

export const WhyMe: React.FC = () => {
  const principles = [
    {
      num: "01",
      icon: Eye,
      title: "Meticulous Attention to Detail",
      desc: "Typography, negative space, interaction curves, and color contrast are never afterthoughts. A design only feels truly premium when every subtle detail works in quiet harmony.",
    },
    {
      num: "02",
      icon: Sliders,
      title: "Design-Driven Engineering",
      desc: "Great engineering starts with design empathy. Code exists to solve real human problems, eliminate friction, and create interfaces that feel natural, intuitive, and effortless.",
    },
    {
      num: "03",
      icon: Cpu,
      title: "Clean, Zero-Bloat Systems",
      desc: "No sluggish multi-megabyte CMS themes or fragile page builders. Only handcrafted TypeScript, modular React components, and edge caching that load in sub-seconds.",
    },
    {
      num: "04",
      icon: Sparkles,
      title: "Creative Experimentation",
      desc: "Blending creative WebGL 3D elements, ambient lighting, and bespoke typography while staying strictly grounded in accessibility and rock-solid usability.",
    },
  ];

  return (
    <section id="why-me" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-10 border-t border-black/8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          {/* Left Column: Personal Manifesto & Context */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 text-[11px] font-mono text-[#171717] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]" />
                <span>04 / PHILOSOPHY</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#171717] tracking-tight leading-[1.08] mb-6">
                Thoughtful Design. <br />
                <span className="font-serif-editorial italic font-normal text-[#171717]">
                  Intelligent Engineering.
                </span>
              </h2>

              <p className="text-base text-[#737373] leading-relaxed mb-8 font-normal">
                I operate as an independent creative developer because I believe the best digital experiences are built when the person shaping the visual concept is the same person engineering the architecture.
              </p>

              <div className="p-6 rounded-2xl bg-white border border-black/8 space-y-3 mb-8">
                <div className="text-xs font-mono text-[#737373] uppercase tracking-wider">
                  DIRECT COLLABORATION
                </div>
                <p className="text-sm text-[#171717] font-medium leading-relaxed">
                  "No layers of account managers or delayed handoffs. You collaborate directly with me from wireframe to deployment."
                </p>
                <div className="text-xs font-mono text-[#999999]">
                  — Piyush Verma
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/8 flex items-center justify-between text-xs font-mono text-[#737373]">
              <span>EST. DIGITAL ATELIER</span>
              <span>GLOBAL CLIENTELE</span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Principles Ledger */}
          <div className="lg:col-span-7 divide-y divide-black/8 border-t border-b border-black/8">
            {principles.map((p, idx) => {
              const Icon = p.icon;

              return (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="py-8 sm:py-10 group hover:bg-black/[0.015] transition-colors"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-sm font-bold text-[#999999] pt-1">
                      {p.num}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-white border border-black/8 flex items-center justify-center text-[#171717]">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-[#171717] tracking-tight">
                          {p.title}
                        </h3>
                      </div>

                      <p className="text-sm text-[#737373] leading-relaxed font-normal">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
