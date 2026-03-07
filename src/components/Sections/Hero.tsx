"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Code2, Database, Layout } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Smartphone size={16} />
            <span>Flutter & Full-Stack Developer</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            Crafting <br />
            <span className="text-gradient">Digital Experiences</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            I build high-performance mobile apps with Flutter and robust web systems with 
            Next.js, Express, and MongoDB.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 transition-all font-semibold flex items-center gap-2 group">
              View Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full glass hover:bg-white/10 transition-all font-semibold">
              Contact Me
            </button>
          </div>
        </motion.div>

        <div className="relative h-[600px] hidden lg:block">
          {/* This space is reserved for the 3D mobile model which will be rendered in the Scene */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
