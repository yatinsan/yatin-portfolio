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
    <section id="projects" ref={containerRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center italic">Featured <span className="text-blue-500">Works</span></h2>
        
        <div className="space-y-24">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1 group relative w-full">
                  <Tilt>
                    <div className="relative overflow-hidden rounded-3xl glass aspect-video">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors" />
                    </div>
                  </Tilt>
                </div>

                <div className="flex-1 space-y-6">
                  <span className="text-blue-400 font-mono text-sm tracking-widest">{project.category}</span>
                  <h3 className="text-4xl md:text-5xl font-bold">{project.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="flex gap-6 mt-8">
                    <button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-semibold border-b border-white/10 pb-1">
                      <Github size={20} />
                      Codebase
                    </button>
                    <button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-semibold border-b border-white/10 pb-1">
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
