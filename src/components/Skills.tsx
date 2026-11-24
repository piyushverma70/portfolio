import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Database, Layers } from 'lucide-react';

export const Skills: React.FC = () => {
  const skillCategories = [
    {
      category: "AI & Autonomous Agents",
      icon: Cpu,
      color: "#00f0ff",
      skills: [
        "Multi-Agent Orchestration",
        "LLM Fine-tuning & Prompting",
        "OpenCode & Antigravity Bridge",
        "Computer Vision & OCR",
        "Python & PyTorch",
        "LangChain & LlamaIndex",
      ],
    },
    {
      category: "3D & Interactive WebGL",
      icon: Layers,
      color: "#a855f7",
      skills: [
        "Three.js & WebGL",
        "React Three Fiber (R3F)",
        "GLSL Custom Shaders",
        "Framer Motion & GSAP",
        "Canvas Physics Engines",
        "Lenis Smooth Scrolling",
      ],
    },
    {
      category: "Fullstack & Cloud",
      icon: Database,
      color: "#00ffcc",
      skills: [
        "React 19 & TypeScript",
        "Next.js & Astro",
        "Tailwind CSS & Shadcn UI",
        "Node.js & FastAPI",
        "PostgreSQL & SQLite",
        "Docker & Cloudflare",
      ],
    },
  ];

  return (
    <section id="arsenal" className="relative py-28 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/20 text-[#00ffcc] font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Technical Arsenal
          </div>
          <h2 className="font-['Syne'] font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Tools & Engineering Stack
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-sm sm:text-base">
            Curated technologies powering robust, scalable, and immersive digital platforms.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-panel p-8 rounded-3xl relative overflow-hidden"
              >
                {/* Accent Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-lg text-white">
                    {cat.category}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 border border-white/5 text-slate-300 hover:border-white/20 hover:text-white transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
