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
    name: 'Atelier Default',
    tag: 'Space Grotesk + Inter',
    family: "'Inter', system-ui, -apple-system, sans-serif",
  },
  {
    id: 'editorial',
    name: 'Instrument Serif',
    tag: 'Awwwards Editorial',
    family: "'Instrument Serif', Georgia, serif",
  },
  {
    id: 'space',
    name: 'Space Grotesk',
    tag: 'Brutalist / Modern',
    family: "'Space Grotesk', system-ui, sans-serif",
  },
  {
    id: 'mono',
    name: 'JetBrains Mono',
    tag: 'Technical Monospace',
    family: "'JetBrains Mono', monospace",
  },
  {
    id: 'system',
    name: 'Native System',
    tag: 'San Francisco / Segoe',
    family: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
];

export const FontSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState<string>('default');

  const applyFont = (font: FontOption) => {
    setSelectedFont(font.id);

    if (font.id === 'default') {
      document.body.style.fontFamily = "'Inter', system-ui, -apple-system, sans-serif";
      document.documentElement.style.removeProperty('--custom-site-font');
    } else {
      document.documentElement.style.setProperty('--custom-site-font', font.family);
      document.body.style.fontFamily = font.family;
    }
  };

  const resetFont = () => {
    applyFont(FONTS[0]);
  };

  return (
    <aside aria-label="Typography Lab" className="fixed bottom-5 left-5 z-40">
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_8px_24px_rgba(23,23,23,0.08)] hover:border-black/20 text-[#171717] transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        title="Interactive Typography Switcher (Temporary in-memory preview)"
      >
        <div className="w-5 h-5 rounded-md bg-[#171717] text-[#C7F36B] flex items-center justify-center font-display font-bold text-[10px]">
          Aa
        </div>
        <span className="text-xs font-mono font-medium hidden sm:inline text-[#171717]">
          Font
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]" />
      </button>

      {/* Flyout Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 left-0 w-72 sm:w-80 bg-white/98 backdrop-blur-2xl rounded-2xl border border-black/10 shadow-2xl p-5 text-left overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-[#171717]" />
                <span className="font-display font-bold text-sm text-[#171717]">
                  Typography Lab
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-[#737373] hover:text-[#171717] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-[#737373] font-normal leading-relaxed mb-4">
              Preview the entire website in different curated typographic scales. Resets automatically on refresh.
            </p>

            {/* Font Options List */}
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {FONTS.map((font) => {
                const isSelected = selectedFont === font.id;
                return (
                  <button
                    key={font.id}
                    onClick={() => applyFont(font)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#171717] text-[#C7F36B] font-semibold'
                        : 'bg-[#F5F4F0] text-[#171717] hover:bg-[#EBE9E4]'
                    }`}
                  >
                    <div>
                      <div
                        className="text-xs tracking-tight"
                        style={{ fontFamily: font.family }}
                      >
                        {font.name}
                      </div>
                      <div
                        className={`text-[10px] font-mono ${
                          isSelected ? 'text-[#C7F36B]/80' : 'text-[#737373]'
                        }`}
                      >
                        {font.tag}
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-[#C7F36B]" />}
                  </button>
                );
              })}
            </div>

            {/* Footer Reset */}
            <div className="pt-3 mt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-[#737373]">
              <span className="text-[10px]">Session-only preview</span>
              <button
                onClick={resetFont}
                className="inline-flex items-center gap-1 text-[#171717] hover:text-[#C7F36B] transition-colors cursor-pointer font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
