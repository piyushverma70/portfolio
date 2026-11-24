import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus, Minus, Code, Layout, ShoppingBag, Orbit } from 'lucide-react';

export const Services: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(0);

  const capabilities = [
    {
      index: "01",
      category: "Interface Design & Development",
      icon: Layout,
      lead: "Bespoke design systems, responsive interfaces, and accessible human-first digital experiences.",
      description: "Taking Figma prototypes or high-level brand concepts and translating them into pristine, fluid production code. Every transition, font weight, and spacing unit is art-directed to feel cohesive across phones, tablets, and ultra-wide screens.",
      tags: ["Design Systems", "Figma to React", "Responsive Grids", "Micro-Interactions", "Accessibility"],
    },
    {
      index: "02",
      category: "Full-Stack Engineering",
      icon: Code,
      lead: "Robust web applications built on Next.js, React 19, TypeScript, and modern backend APIs.",
      description: "Writing maintainable, type-safe architectures with clean component boundaries. From database modeling (PostgreSQL / SQLite) to edge functions, background jobs, and server-side rendering, everything is built for reliability.",
      tags: ["Next.js", "React 19", "TypeScript", "Node.js", "PostgreSQL", "REST & GraphQL"],
    },
    {
      index: "03",
      category: "E-Commerce & Integrations",
      icon: ShoppingBag,
      lead: "High-converting online stores, direct WhatsApp ordering channels, and secure checkout flows.",
      description: "Engineered for real commercial sales. Seamless payment gateway integrations (Stripe, Razorpay), custom cart state machines, direct WhatsApp commerce pipelines, and automated inventory / notification webhooks.",
      tags: ["WhatsApp Commerce", "Stripe & Razorpay", "Cart Systems", "Webhook Pipelines", "Inventory Sync"],
    },
    {
      index: "04",
      category: "Interactive Digital Experiences",
      icon: Orbit,
      lead: "Lightweight 3D WebGL elements, creative motion design, and silky-smooth scroll storytelling.",
      description: "Elevating websites from ordinary pages into award-worthy experiences. Custom Three.js geometries, ambient lighting, shader accents, and Lenis smooth scrolling designed to delight users while preserving sub-second initial load times.",
      tags: ["Three.js & WebGL", "Framer Motion", "Lenis Smooth Scroll", "Shaders & Lighting", "60-120 FPS"],
    },
  ];

  return (
    <section id="services" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-10 border-t border-black/8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24 pb-8 border-b border-black/8 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 text-[11px] font-mono text-[#171717] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]" />
              <span>02 / EXPERTISE</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#171717] tracking-tight leading-[1.08]">
              Disciplines &amp; <br />
              <span className="font-serif-editorial italic font-normal text-[#171717]">
                Technical Capabilities.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#737373] max-w-md leading-relaxed">
            Bridging the gap between fine visual design and rock-solid software engineering. Every discipline is executed with meticulous craftsmanship.
          </p>
        </div>

        {/* Editorial Ledger / Rows (Not Generic SaaS Cards!) */}
        <div className="border-t border-black/8 divide-y divide-black/8 text-left">
          {capabilities.map((item, idx) => {
            const isOpen = activeItem === idx;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`py-8 sm:py-12 transition-all duration-300 ${
                  isOpen ? 'bg-white/60 -mx-4 sm:-mx-6 px-4 sm:px-6 rounded-2xl' : 'hover:bg-black/[0.015]'
                }`}
              >
                <div
                  onClick={() => setActiveItem(isOpen ? null : idx)}
                  className="cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Category Title & Index */}
                  <div className="flex items-start sm:items-center gap-5 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base font-bold text-[#999999]">
                      {item.index}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-black/8 hidden sm:flex items-center justify-center text-[#171717]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-3xl text-[#171717] tracking-tight hover:text-[#737373] transition-colors">
                      {item.category}
                    </h3>
                  </div>

                  {/* Summary Lead & Toggle */}
                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/2">
                    <p className="text-xs sm:text-sm text-[#737373] line-clamp-1 hidden sm:block">
                      {item.lead}
                    </p>
                    <div className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center shrink-0 bg-white text-[#171717]">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-black/5 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10"
                  >
                    <div className="md:col-span-8">
                      <p className="text-sm sm:text-base text-[#52525B] leading-relaxed mb-6 font-normal">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full bg-white border border-black/8 text-xs font-mono text-[#171717]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-xs bg-[#171717] text-[#F5F4F0] hover:bg-[#C7F36B] hover:text-[#171717] transition-all"
                      >
                        <span>Inquire About {item.category.split(' ')[0]}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
