import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code2, RefreshCw, Rocket } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Discover",
      desc: "Understand the problem, goals and real user needs.",
    },
    {
      num: "02",
      icon: PenTool,
      title: "Design",
      desc: "Turn insights into clear, thoughtful interfaces.",
    },
    {
      num: "03",
      icon: Code2,
      title: "Build",
      desc: "Develop with clean, scalable and modern code.",
    },
    {
      num: "04",
      icon: RefreshCw,
      title: "Refine",
      desc: "Test, improve and polish the experience.",
    },
    {
      num: "05",
      icon: Rocket,
      title: "Launch",
      desc: "Ship, monitor and keep improving.",
    },
  ];

  return (
    <section id="process" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Dark Container Box */}
        <div className="rounded-3xl bg-[#111113] text-[#F5F4F0] p-8 sm:p-12 lg:p-14 border border-white/10 text-left shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C7F36B]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 pb-6 border-b border-white/10 relative z-10">
            <div>
              <div className="text-xs font-mono font-bold text-[#737373] tracking-widest mb-1">
                02.
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                MY PROCESS
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#999999] max-w-md font-normal">
              A simple, focused process to turn ideas into real, impactful products.
            </p>
          </div>

          {/* 5-Stage Stepper Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left relative group"
                >
                  {/* Icon Box */}
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-[#E5E5E0] group-hover:text-[#C7F36B] group-hover:border-[#C7F36B]/40 transition-all mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Horizontal Line Node (Desktop) */}
                  <div className="w-full flex items-center my-3 relative">
                    <div className="w-full h-[1px] bg-white/15 group-hover:bg-[#C7F36B]/40 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C7F36B] absolute left-0 ring-4 ring-[#111113] shadow-[0_0_8px_#C7F36B]" />
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="font-display font-bold text-base sm:text-lg text-white mb-1.5 mt-2 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#999999] leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
