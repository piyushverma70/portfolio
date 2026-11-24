import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Zap, Layers, Sparkles } from 'lucide-react';

export const WhyMe: React.FC = () => {
  const points = [
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "You work directly with me—the person designing and coding your site. No account managers, no game of telephone, no delays.",
      pillBg: "#FCE8DD",
      pillColor: "#8C4A32",
    },
    {
      icon: Zap,
      title: "Built For Speed",
      description: "No bloated page builders or heavy generic WordPress themes. Just clean React and modern CSS that loads in a blink.",
      pillBg: "#E2ECE4",
      pillColor: "#2D5A3C",
    },
    {
      icon: Layers,
      title: "Full-Stack Ownership",
      description: "From initial layouts and frontend components to backend APIs, database setups, and global CDN hosting—I take care of it all.",
      pillBg: "#EDE9F4",
      pillColor: "#534273",
    },
    {
      icon: Sparkles,
      title: "Thoughtful Polish",
      description: "Clean spacing, readable typography, subtle animations, and smooth scrolling that make visitors actually enjoy using your site.",
      pillBg: "#F2ECE1",
      pillColor: "#6B5A42",
    },
  ];

  return (
    <section id="why-me" className="relative py-28 px-4 overflow-hidden border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 45, damping: 16 }}
            className="lg:col-span-5 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1ECE4] border border-black/5 text-xs font-mono text-[#52525B] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86A4B]" />
              <span>THE DIRECT ADVANTAGE</span>
            </div>

            <h2 className="font-['Syne'] font-extrabold text-3xl sm:text-5xl text-[#18181B] tracking-tight leading-tight mb-6">
              Why Work With Me Directly?
            </h2>

            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed mb-8">
              Big agencies charge high retainers and pass your project to interns. When you work with me, I build it myself, test it thoroughly, and stay reachable whenever you have a question.
            </p>

            <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#EBE3D7]">
              <div className="text-sm font-semibold text-[#18181B] mb-1">
                "Direct, dependable, and easy to talk to."
              </div>
              <div className="text-xs text-[#71717A]">
                I treat every client project like my own portfolio.
              </div>
            </div>
          </motion.div>

          {/* Right Column: Cards */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 45, damping: 16 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left"
          >
            {points.map((pt) => {
              const Icon = pt.icon;
              return (
                <div
                  key={pt.title}
                  className="p-6 sm:p-7 rounded-3xl bg-comfort-card transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: pt.pillBg, color: pt.pillColor }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-['Syne'] font-bold text-lg text-[#18181B] mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-[#71717A] leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
