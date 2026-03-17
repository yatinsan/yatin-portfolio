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
