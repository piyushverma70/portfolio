import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface LampPullCordProps {
  onToggle?: (isDark: boolean) => void;
}

export const LampPullCord: React.FC<LampPullCordProps> = ({ onToggle }) => {
  const [isDark, setIsDark] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const controls = useAnimation();
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize theme from document or system
  useEffect(() => {
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(hasDarkClass);
  }, []);

  // Synthesize realistic mechanical lamp pull switch click sound (Web Audio API)
  const playSwitchSound = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Sharp crisp mechanical click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isDark ? 950 : 1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay restrictions or unsupported
    }
  };

  const triggerToggle = async () => {
    playSwitchSound();
    setIsPulling(true);

    // Pull down animation
    await controls.start({
      y: 38,
      transition: { duration: 0.12, ease: "easeOut" }
    });

    // Toggle theme
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (onToggle) onToggle(nextDark);

    // Snap back with elastic spring
    await controls.start({
      y: 0,
      transition: { type: "spring", stiffness: 450, damping: 12 }
    });
    setIsPulling(false);
  };

  return (
    <div className="fixed top-0 right-4 sm:right-8 z-50 flex flex-col items-center pointer-events-auto select-none group">
      {/* Ceiling / Bracket Mount */}
      <div className="w-5 h-2.5 bg-[#27272A] dark:bg-[#E4E4E7] rounded-b-md shadow-sm transition-colors duration-300" />

      {/* Interactive Spring Cord + Acorn Toggle */}
      <motion.div
        animate={controls}
        initial={{ y: 0 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 45 }}
        dragElastic={0.35}
        onDragEnd={(_e, info) => {
          if (info.offset.y > 18) {
            triggerToggle();
          } else {
            controls.start({ y: 0, transition: { type: "spring", stiffness: 400, damping: 15 } });
          }
        }}
        onClick={triggerToggle}
        className="flex flex-col items-center cursor-grab active:cursor-grabbing"
        title={isDark ? "Pull cord to turn on Light mode" : "Pull cord to turn on Dark mode"}
      >
        {/* Hanging Cord */}
        <div className="w-[1.5px] h-14 sm:h-18 bg-gradient-to-b from-[#A1A1AA] via-[#71717A] to-[#C86A4B] dark:from-[#71717A] dark:via-[#A1A1AA] dark:to-[#E27D5F] transition-all duration-300" />

        {/* Tactile Brass / Terracotta Bell Pull Acorn */}
        <div className="relative -mt-0.5">
          {/* Subtle Ambient Light Glow on Toggle */}
          <div
            className={`absolute inset-0 rounded-full blur-[6px] transition-opacity duration-300 ${
              isDark ? 'bg-[#FDE047] opacity-60' : 'bg-[#C86A4B] opacity-30'
            }`}
          />

          <div
            className={`relative w-4 h-6 rounded-full border border-white/20 shadow-md flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 ${
              isDark
                ? 'bg-gradient-to-b from-[#E6A770] via-[#C86A4B] to-[#8C4A32]'
                : 'bg-gradient-to-b from-[#F6E2D8] via-[#EADCC9] to-[#C86A4B]'
            }`}
          >
            {/* Bead center core */}
            <div className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-sm" />
          </div>
        </div>

        {/* Tactile Hanging Tag Indicator */}
        <div className="mt-1 px-2 py-0.5 rounded-full bg-black/70 dark:bg-white/80 backdrop-blur-md text-[9px] font-mono tracking-wider text-white dark:text-[#18181B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm">
          {isPulling ? "Click!" : isDark ? "Pull: Light" : "Pull: Dark"}
        </div>
      </motion.div>
    </div>
  );
};
