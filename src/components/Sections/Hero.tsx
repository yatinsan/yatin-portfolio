import { motion, useScroll, useTransform } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { ChevronDown } from 'lucide-react';
import { TextReveal } from '../ui/TextReveal';
import { Magnetic } from '../ui/Magnetic';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.9]);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Gradient Overlay for better text readability against the 3D background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background pointer-events-none" />

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4"
        >
          <span className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm">
            Available for new opportunities
          </span>
        </motion.div>

        <TextReveal
          as="h1"
          text="Yatin San"
          delay={0.1}
          stagger={0.08}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-gradient hover-target block mt-2 md:inline md:mt-0"
        />

        <TextReveal
          as="h2"
          text="Senior Flutter Developer crafting exceptional digital experiences through high-performance mobile solutions."
          delay={0.4}
          stagger={0.02}
          className="text-2xl md:text-3xl text-textMuted font-light mb-8 max-w-2xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Magnetic strength={0.4}>
            <a
              href="#projects"
              className="block px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primaryDark transition-colors hover-target shadow-lg shadow-primary/25"
            >
              View My Work
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              className="block px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors hover-target backdrop-blur-sm"
            >
              Contact Me
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <a href="#about" className="text-textMuted hover:text-white transition-colors hover-target p-2 inline-block">
            <ChevronDown size={32} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
