"use client";

import { motion } from "framer-motion";
import { Smartphone,Globe, Database, Server, Cpu, Palette } from "lucide-react";

const skills = [
  {
    title: "Flutter Development",
    desc: "Expert in building cross-platform apps with beautiful UIs and smooth animations.",
    icon: <Smartphone className="text-blue-400" />,
    color: "from-blue-500/20 to-cyan-500/20",
    size: "lg"
  },
  {
    title: "Next.js & React",
    desc: "Modern web apps with SSR and high performance.",
    icon: <Globe className="text-purple-400" />,
    color: "from-purple-500/20 to-pink-500/20",
    size: "md"
  },
  {
    title: "Express & Node",
    desc: "Scalable backend services.",
    icon: <Server className="text-green-400" />,
    color: "from-green-500/20 to-emerald-500/20",
    size: "sm"
  },
  {
    title: "MongoDB",
    desc: "NoSQL database design.",
    icon: <Database className="text-yellow-400" />,
    color: "from-yellow-500/20 to-orange-500/20",
    size: "sm"
  },
  {
    title: "SQL",
    desc: "Relational data management.",
    icon: <Cpu className="text-red-400" />,
    color: "from-red-500/20 to-rose-500/20",
    size: "md"
  },
  {
    title: "Design & UX",
    desc: "Crafting beautiful interfaces and user flows.",
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
              className={`group relative p-8 rounded-3xl glass hover:bg-white/10 transition-all cursor-default overflow-hidden ${
                skill.size === "lg" ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{skill.title}</h3>
                <p className="text-gray-400 leading-relaxed">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
