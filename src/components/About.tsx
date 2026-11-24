import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Sparkles, Orbit } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      title: "Autonomous Agents & Orchestration",
      description:
        "Building multi-agent ecosystems (Antigravity, OpenCode, Claude Code) that autonomously plan, test, and write software with zero human latency.",
      accent: "#00f0ff",
    },
    {
      icon: Orbit,
      title: "3D & Immersive WebGL",
      description:
        "Pushing browser boundaries with Three.js, React Three Fiber, GLSL shaders, and silky 60-120 FPS interactive physics.",
      accent: "#a855f7",
    },
    {
      icon: Zap,
      title: "High-Velocity Fullstack Architecture",
      description:
        "From low-overhead static landing pages to distributed microservices, databases, and sub-second payment checkouts.",
      accent: "#00ffcc",
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#a855f7]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Core Philosophy
          </div>
          <h2 className="font-['Syne'] font-bold text-3xl sm:text-5xl text-white tracking-tight max-w-2xl">
            Where Machine Intelligence Meets Visual Elegance.
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-sm sm:text-base">
            Software is no longer just static screens. We build adaptive, living software that thinks autonomously and renders cinematically.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative p-8 rounded-3xl glass-panel glass-panel-hover transition-all duration-300"
              >
                {/* Glow dot */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${pillar.accent}15`, border: `1px solid ${pillar.accent}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: pillar.accent }} />
                </div>

                <h3 className="font-['Space_Grotesk'] font-bold text-xl text-white mb-3 group-hover:text-[#00f0ff] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {pillar.description}
                </p>

                {/* Subtle bottom line indicator */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${pillar.accent}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
