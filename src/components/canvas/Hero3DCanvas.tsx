import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics using Framer Motion springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Subtle Background Crosshair Grid Marks */}
      <div className="absolute top-10 left-10 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>
      <div className="absolute top-10 right-10 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>
      <div className="absolute bottom-10 left-10 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>
      <div className="absolute bottom-10 right-10 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>

      {/* Floating 3D Sculpture Object */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [-8, 8, -8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 w-[280px] sm:w-[350px] lg:w-[410px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Soft Ambient Lime Glow Underlay */}
        <div className="absolute inset-0 bg-[#C7F36B]/25 rounded-full blur-[65px] pointer-events-none -z-10 transform scale-90" />

        {/* 3D PV Sculpture Image */}
        <img
          src="/assets/pv-sculpture.png"
          alt="PV 3D Monogram Sculpture"
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_45px_rgba(23,23,23,0.12)]"
          loading="eager"
        />
      </motion.div>

      {/* Bottom Right Micro-label */}
      <div className="absolute bottom-2 right-4 text-right text-[10px] font-mono tracking-widest text-[#737373] leading-tight pointer-events-none">
        <div>CREATIVE</div>
        <div>DEVELOPER</div>
        <div className="font-bold text-[#171717]">PV.</div>
      </div>
    </div>
  );
};
