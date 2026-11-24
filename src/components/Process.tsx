import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Palette, Terminal, Rocket } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: Compass,
      title: "Discovery & Blueprint",
      subtitle: "Strategy Without Assumptions",
      description: "We uncover the exact goals, audience expectations, and technical needs. No bloated meetings—just a sharp, actionable architecture plan.",
      align: "left",
      pillBg: "#E2ECE4",
      pillColor: "#2D5A3C",
    },
    {
      step: "02",
      icon: Palette,
      title: "Tactile Prototyping",
      subtitle: "Visual Calm Before Code",
      description: "Typography, color temperatures, and interactive 3D physics tested in high fidelity. You feel the flow and comfort before engineering begins.",
      align: "right",
      pillBg: "#FCE8DD",
      pillColor: "#8C4A32",
    },
    {
      step: "03",
      icon: Terminal,
      title: "Bespoke Engineering",
      subtitle: "Handcrafted Modern Code",
      description: "Built modularly with Next.js, React, and TypeScript. Fluid responsive grids, zero layout shifts, and clean maintainable code you actually own.",
      align: "left",
      pillBg: "#EDE9F4",
      pillColor: "#534273",
    },
    {
      step: "04",
      icon: Rocket,
      title: "Lighthouse 100 Launch",
      subtitle: "Flawless Global Deployment",
      description: "Speed audit, asset minification, and global edge deployment. Your website loads instantly and feels effortless anywhere in the world.",
      align: "right",
      pillBg: "#F2ECE1",
      pillColor: "#6B5A42",
    },
  ];

  return (
    <section id="process" className="relative py-28 px-4 overflow-hidden border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1ECE4] border border-black/5 text-xs font-mono text-[#52525B] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86A4B]" />
            <span>THE CRAFT PROTOCOL</span>
          </div>
          <h2 className="font-['Syne'] font-extrabold text-3xl sm:text-5xl text-[#18181B] tracking-tight">
            How Thoughtful Websites Are Built.
          </h2>
          <p className="text-[#71717A] mt-3 max-w-xl text-sm sm:text-base">
            A serene, disciplined four-step journey from early concept to worldwide deployment.
          </p>
        </div>

        {/* Dual Converging 2x2 Grid (Left builds from Left, Right builds from Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => {
            const isLeft = step.align === "left";
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: isLeft ? -70 : 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ type: "spring", stiffness: 45, damping: 16 }}
                className="p-8 sm:p-10 rounded-3xl bg-comfort-card text-left flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-full"
                      style={{ background: step.pillBg, color: step.pillColor }}
                    >
                      STAGE {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#F8F6F0] flex items-center justify-center text-[#18181B]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-['Syne'] font-bold text-2xl text-[#18181B] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-[#C86A4B] mb-4">{step.subtitle}</p>
                  <p className="text-sm text-[#52525B] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-xs font-mono text-[#71717A]">
                  <span>Pacing</span>
                  <span className="text-[#2D5A3C] font-semibold">Calm & Deliberate</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
