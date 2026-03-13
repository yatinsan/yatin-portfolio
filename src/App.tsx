import { useEffect } from 'react';
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

function App() {
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

  return (
    <div className="min-h-screen bg-transparent text-textMain selection:bg-primary/30 selection:text-white relative">
      <SEO />
      <BackgroundScene />
      <CustomCursor />
      {/* <AssistantBird /> */}
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
