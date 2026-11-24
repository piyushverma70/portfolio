import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { WhyMe } from './components/WhyMe';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FontSwitcher } from './components/FontSwitcher';

export function App() {
  useEffect(() => {
    // Ensure dark mode class is completely removed if previously toggled
    document.documentElement.classList.remove('dark');

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F5F4F0] text-[#171717] selection:bg-[#C7F36B] selection:text-[#171717]">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Process />
        <WhyMe />
        <Contact />
      </main>
      <Footer />

      {/* In-Memory Typography Switcher (Resets on Refresh) */}
      <FontSwitcher />
    </div>
  );
}

export default App;
