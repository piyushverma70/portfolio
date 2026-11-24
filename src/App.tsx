import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { WhyMe } from './components/WhyMe';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LampPullCord } from './components/LampPullCord';
import { FontSwitcher } from './components/FontSwitcher';

export function App() {
  useEffect(() => {
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
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#18181B] selection:bg-[#EADCC9] selection:text-[#18181B] transition-colors duration-300">
      {/* Hanging Lamp Pull Rope (Toggles Dark / Light Mode with ASMR spring physics & click sound) */}
      <LampPullCord />

      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <WhyMe />
        <Contact />
      </main>
      <Footer />

      {/* Temporary In-Memory Typography / Font Switcher (Resets on Refresh) */}
      <FontSwitcher />
    </div>
  );
}

export default App;
