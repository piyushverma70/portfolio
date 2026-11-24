import React, { useState } from 'react';
import { Type, Check, RotateCcw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FontOption {
  id: string;
  name: string;
  tag: string;
  family: string;
}

const FONTS: FontOption[] = [
  {
    id: 'default',
    name: 'Studio Default',
    tag: 'Plus Jakarta + Syne',
    family: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },
  {
    id: 'serif',
    name: 'Editorial Serif',
    tag: 'Playfair Display',
    family: "'Playfair Display', Georgia, serif",
  },
  {
    id: 'mono',
    name: 'Terminal Mono',
    tag: 'JetBrains Mono',
    family: "'JetBrains Mono', monospace",
  },
  {
    id: 'grotesk',
    name: 'Space Grotesk',
    tag: 'Brutalist / Modern',
    family: "'Space Grotesk', system-ui, sans-serif",
  },
  {
    id: 'inter',
    name: 'Clean Digital',
    tag: 'Inter',
    family: "'Inter', system-ui, sans-serif",
  },
  {
    id: 'outfit',
    name: 'Warm Geometric',
    tag: 'Outfit',
    family: "'Outfit', system-ui, sans-serif",
  },
];

export const FontSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Stored ONLY in React memory state (not in localStorage) so page refresh automatically resets!
  const [selectedFont, setSelectedFont] = useState<string>('default');

  const applyFont = (font: FontOption) => {
    setSelectedFont(font.id);

    if (font.id === 'default') {
      document.body.style.fontFamily = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      document.documentElement.style.removeProperty('--custom-site-font');
    } else {
      document.body.style.fontFamily = font.family;
      document.documentElement.style.setProperty('--custom-site-font', font.family);
    }
  };

  const handleReset = () => {
    const defaultOpt = FONTS[0];
    applyFont(defaultOpt);
  };

  return (
    <>
      {/* Floating Toggle Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-xl border shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-xs font-mono ${
            selectedFont !== 'default'
              ? 'bg-[#18181B] text-[#FAF8F5] border-[#C86A4B]'
              : 'bg-white/95 text-[#18181B] border-black/10 hover:border-black/20'
          }`}
          title="Try different fonts across the website"
        >
          <Type className="w-3.5 h-3.5 text-[#C86A4B]" />
          <span>Aa Font</span>
          {selectedFont !== 'default' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86A4B] animate-pulse" />
          )}
        </button>

        {/* Font Selection Modal / Popover */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute bottom-12 left-0 w-72 p-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/10 shadow-[0_20px_50px_rgba(40,30,20,0.14)] text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5">
                <div>
                  <div className="text-xs font-semibold text-[#18181B]">
                    Typography Lab
                  </div>
                  <div className="text-[10px] text-[#71717A] font-mono">
                    Resets automatically on refresh
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-black/5 text-[#71717A] hover:text-[#18181B] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Font Options List */}
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {FONTS.map((font) => {
                  const isSelected = selectedFont === font.id;
                  return (
                    <button
                      key={font.id}
                      onClick={() => applyFont(font)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-[#18181B] text-[#FAF8F5] shadow-sm'
                          : 'hover:bg-[#F4EFE6] text-[#52525B]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="text-xs font-medium truncate"
                          style={{ fontFamily: font.family }}
                        >
                          {font.name}
                        </div>
                        <div
                          className={`text-[9px] font-mono ${
                            isSelected ? 'text-[#FAF8F5]/70' : 'text-[#A1A1AA]'
                          }`}
                        >
                          {font.tag}
                        </div>
                      </div>

                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Reset to Default Button */}
              {selectedFont !== 'default' && (
                <div className="pt-3 mt-3 border-t border-black/5">
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-mono text-[#71717A] hover:text-[#18181B] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Default</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
