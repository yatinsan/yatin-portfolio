"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Tilt from "@/components/UI/Tilt";

const projects = [
// ... (rest of projects array)
  {
    title: "Winlucks",
    category: "Flutter | Firebase",
    desc: "A shopping and giveaway app for merchants and users, published as separate specialized apps.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80"
  },
  {
    title: "Channel HES",
    category: "Flutter | Method Channels",
    desc: "Video streaming app with a custom native player integration for seamless streaming.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
  },
  {
    title: "HLM (Help Like Monk)",
    category: "Flutter | Web | Node.js",
    desc: "Service management system for repair centers to track status and manage customer requests.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=800&q=80"
  },
  {
    title: "Dermazone",
    category: "Flutter | APIs",
    desc: "Healthcare booking platform for UAE, connecting users with doctors and hospitals.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
  },
  {
    title: "Owleto",
    category: "Flutter | Logistics",
    desc: "Comprehensive food delivery suite with modules for users, merchants, and delivery personnel.",
    image: "https://images.unsplash.com/photo-1526367790999-0150786486a9?w=800&q=80"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="projects" ref={containerRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-bold mb-24 text-center tracking-tight italic">
          Featured <span className="text-gradient">Works</span>
        </h2>
        
        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
              >
                <div className="flex-1 group relative w-full">
                  <Tilt>
                    <div className="relative overflow-hidden rounded-[2.5rem] glass aspect-video">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                  </Tilt>
                </div>

                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <span className="text-blue-400 font-mono text-xs tracking-[0.3em] uppercase">{project.category}</span>
                    <h3 className="text-5xl md:text-6xl font-bold tracking-tight">{project.title}</h3>
                  </div>
                  
                  <p className="text-gray-400/80 text-xl leading-relaxed max-w-xl">
                    {project.desc}
                  </p>
                  
                  <div className="flex gap-8 mt-10">
                    <button className="flex items-center gap-2.5 text-white/90 hover:text-blue-400 transition-all font-bold border-b border-white/5 hover:border-blue-400 transition-colors pb-2">
                      <Github size={20} />
                      Source Code
                    </button>
                    <button className="flex items-center gap-2.5 text-white/90 hover:text-blue-400 transition-all font-bold border-b border-white/5 hover:border-blue-400 transition-colors pb-2">
                      <ExternalLink size={20} />
                      Live Demo
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
