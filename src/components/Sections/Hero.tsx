"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone } from "lucide-react";
import Magnetic from "@/components/UI/Magnetic";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-sm font-medium mb-10">
            <Smartphone size={16} className="text-blue-500" />
            <span>Senior Flutter Developer</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-10 tracking-tight leading-[0.9]">
            Yatin <br />
            <span className="text-gradient">K Sanjeev</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400/80 mb-12 max-w-lg leading-relaxed">
            Crafting high-fidelity cross-platform experiences for over 4 years. 
            Blending performance with pixel-perfect design.
          </p>

          <div className="flex flex-wrap gap-6">
            <Magnetic>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 rounded-full accent-gradient hover:opacity-90 transition-all font-bold flex items-center gap-3 group shadow-lg shadow-blue-600/20"
              >
                Explore My Work
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
            </Magnetic>
            
            <Magnetic>
              <a 
                href="mailto:yatinksan@gmail.com"
                className="inline-block px-10 py-5 rounded-full glass hover:bg-white/10 transition-all font-bold text-center border-white/10"
              >
                Get in Touch
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <div className="relative h-[500px] hidden lg:block" />
      </div>
    </section>
  );
}
