"use client";

import { motion } from "framer-motion";
import { Smartphone, Globe, Database, Server, Cpu, Palette } from "lucide-react";
import Tilt from "@/components/UI/Tilt";

const skills = [
// ... (rest of skills array)
  {
    title: "Flutter & Dart",
    desc: "Expertise in Bloc, Provider, and building native packages using method channels.",
    icon: <Smartphone className="text-blue-400" />,
    color: "from-blue-500/20 to-cyan-500/20",
    size: "lg"
  },
  {
    title: "Node.js & TypeScript",
    desc: "Scalable backend services and web applications with robust typing.",
    icon: <Server className="text-purple-400" />,
    color: "from-purple-500/20 to-pink-500/20",
    size: "md"
  },
  {
    title: "State Management",
    desc: "Advanced implementation of Bloc and Provider patterns for complex app flows.",
    icon: <Cpu className="text-green-400" />,
    color: "from-green-500/20 to-emerald-500/20",
    size: "sm"
  },
  {
    title: "Firebase & Cloud",
    desc: "Real-time sync, auth, and cloud functions for serverless solutions.",
    icon: <Database className="text-yellow-400" />,
    color: "from-yellow-500/20 to-orange-500/20",
    size: "sm"
  },
  {
    title: "GraphQL & REST",
    desc: "Designing and integrating efficient APIs for high-performance data fetching.",
    icon: <Globe className="text-red-400" />,
    color: "from-red-500/20 to-rose-500/20",
    size: "md"
  },
  {
    title: "Deployment",
    desc: "Full CI/CD lifecycle for App Store, Google Play, and Web.",
    icon: <Palette className="text-indigo-400" />,
    color: "from-indigo-500/20 to-blue-500/20",
    size: "sm"
  }
];

export default function Skills() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tech Arsenal</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive set of tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative ${
                skill.size === "lg" ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Tilt>
                <div className="relative p-8 rounded-3xl glass hover:bg-white/10 transition-all cursor-default overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{skill.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{skill.desc}</p>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
