import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Services3DCanvas } from './canvas/Services3DCanvas';

export const Services: React.FC = () => {
  const serviceRows = [
    {
      num: "01",
      title: "Interface Design & Development",
      desc: "Designing and developing clean, modern and user-focused interfaces with fluid typography.",
    },
    {
      num: "02",
      title: "Full-Stack Engineering",
      desc: "Building scalable, secure and high-performance web applications on modern type-safe stacks.",
    },
    {
      num: "03",
      title: "E-Commerce & Integrations",
      desc: "Creating seamless shopping experiences with payment gateways and direct WhatsApp commerce.",
    },
    {
      num: "04",
      title: "Interactive Digital Experiences",
      desc: "Bringing ideas to life with creative interactions, lightweight WebGL, and silky-smooth animations.",
    },
  ];

  return (
    <section id="services" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 text-left">
          <div>
            <div className="text-xs font-mono font-bold text-[#737373] tracking-widest mb-1.5">
              02.
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#171717] tracking-tight">
              SERVICES &amp; EXPERTISE
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#737373] max-w-md font-normal">
            What I do to turn ideas into functional, beautiful, and high-performing digital products.
          </p>
        </div>

        {/* Content Grid: 4 Horizontal Rows (Left) & Layered Metallic Geometric Sculpture (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
          {/* Left Column: 4 Refined Editorial Rows (Span 7) */}
          <div className="lg:col-span-7 divide-y divide-black/8 border-t border-b border-black/8">
            {serviceRows.map((svc, idx) => (
              <motion.a
                key={svc.num}
                href="#contact"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group py-6 sm:py-7 flex items-center justify-between gap-6 hover:bg-black/[0.015] transition-all cursor-pointer block"
              >
                <div className="flex items-start sm:items-center gap-5 sm:gap-7">
                  <span className="font-mono text-xs sm:text-sm text-[#737373] font-medium pt-0.5 sm:pt-0">
                    {svc.num}
                  </span>

                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#171717] group-hover:text-[#737373] transition-colors mb-1 tracking-tight">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#737373] font-normal leading-relaxed max-w-xl">
                      {svc.desc}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:bg-[#171717] group-hover:text-[#C7F36B] transition-all">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right Column: Interactive 3D Floating Metallic Slabs (Span 5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <Services3DCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
