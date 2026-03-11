"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "@/components/Three/Scene";
import MobileModel from "@/components/Three/MobileModel";
import LaptopModel from "@/components/Three/LaptopModel";
import FloatingShapes from "@/components/Three/FloatingShapes";
import Hero from "@/components/Sections/Hero";
import Skills from "@/components/Sections/Skills";
import Experience from "@/components/Sections/Experience";
import Projects from "@/components/Sections/Projects";
import CustomCursor from "@/components/UI/CustomCursor";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      
      {/* 3D Background & Interactive Model */}
      <Scene>
        <FloatingShapes />
        
        {/* Mobile Model (Right) */}
        <group position={[3.5, 0, 0]}>
          <MobileModel scrollProgress={scrollYProgress.get()} />
        </group>

        {/* Laptop Model (Left) */}
        <group position={[-3.5, 0, 0]} rotation={[0, 0.5, 0]}>
          <LaptopModel scrollProgress={scrollYProgress.get()} />
        </group>
      </Scene>

      {/* Sections */}
      <div className="relative z-10">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        
        {/* Footer/Contact CTA */}
        <section id="contact" className="py-24 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 italic">Ready to build something <br /> <span className="text-blue-500">extraordinary?</span></h2>
            
            <div className="flex flex-col items-center gap-8 mb-12">
              <p className="text-gray-400 text-xl max-w-2xl">
                Let's discuss your next project. I'm currently open to new opportunities 
                and collaborations.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-lg font-mono">
                <a href="mailto:yatinksan@gmail.com" className="hover:text-blue-400 transition-colors">yatinksan@gmail.com</a>
                <span className="text-white/10 hidden md:block">|</span>
                <a href="tel:+916238584124" className="hover:text-blue-400 transition-colors">+91 6238584124</a>
                <span className="text-white/10 hidden md:block">|</span>
                <a href="https://github.com/yatinksan" target="_blank" className="hover:text-blue-400 transition-colors">github.com/yatinksan</a>
              </div>
            </div>

            <a 
              href="mailto:yatinksan@gmail.com"
              className="inline-block px-10 py-5 rounded-full accent-gradient font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-blue-500/20"
            >
              Let's Collaborate
            </a>
          </div>
        </section>
      </div>

      {/* Decorative background gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}
