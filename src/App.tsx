import { useEffect, useState } from 'react';
import { CustomCursor } from './components/ui/CustomCursor';
import { SEO } from './components/ui/SEO';
// import { AssistantBird } from './components/ui/AssistantBird';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/Sections/Hero';
import { About } from './components/Sections/About';
import { Experience } from './components/Sections/Experience';
import { Projects } from './components/Sections/Projects';
import { Skills } from './components/Sections/Skills';
import { Contact } from './components/Sections/Contact';
import { BackgroundScene } from './components/Three/BackgroundScene';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { DraggableSimulator } from './components/ui/DraggableSimulator';
import { DraggableTerminal } from './components/ui/DraggableTerminal';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [showSimulator, setShowSimulator] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(200);

  // Smooth scroll implementation
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }, []);

  // Minimize terminal on scroll down
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 50; // pixels to scroll before minimizing

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      // If scrolling down significantly and terminal is open, minimize it
      if (scrollDiff > threshold && currentScrollY > 100 && isTerminalOpen) {
        setIsTerminalOpen(false);
      }
      
      // Update last scroll position, but only if we've moved significantly
      // to avoid triggering on tiny bounces
      if (Math.abs(scrollDiff) > threshold) {
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTerminalOpen]);

  // Calculate padding based on terminal state
  const mainPaddingBottom = isTerminalOpen ? terminalHeight : 40;

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-transparent text-textMain selection:bg-primary/30 selection:text-white relative">
        <SEO />
        <BackgroundScene />
        <CustomCursor />
        {/* <AssistantBird /> */}
        <Navbar />
        
        <main 
          style={{ paddingBottom: mainPaddingBottom }}
          className="transition-[padding-bottom] duration-300 ease-in-out"
        >
          <Hero onRun={() => setShowSimulator(true)} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <AnimatePresence>
          {showSimulator && (
            <DraggableSimulator onClose={() => setShowSimulator(false)} />
          )}
        </AnimatePresence>

        <DraggableTerminal 
          isOpen={isTerminalOpen} 
          setIsOpen={setIsTerminalOpen}
          terminalHeight={terminalHeight}
          setTerminalHeight={setTerminalHeight}
        />
      </div>
    </SmoothScroll>
  );
}

export default App;
