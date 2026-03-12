import { motion } from 'framer-motion';
import { HeroScene } from '../Three/HeroScene';
import { resumeData } from '../../data/resume';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center text-center">
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

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6"
        >
          Hi, I'm <span className="text-gradient hover-target block mt-2 md:inline md:mt-0">{resumeData.name.split(' ')[0]}</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-2xl md:text-3xl text-textMuted font-light mb-8 max-w-2xl"
        >
          Crafting exceptional digital experiences as a{' '}
          <span className="text-white font-medium">{resumeData.role}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primaryDark transition-colors hover-target shadow-lg shadow-primary/25"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors hover-target backdrop-blur-sm"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

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
