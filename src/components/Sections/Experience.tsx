"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Senior Flutter Developer",
    company: "Pixbit Solutions",
    period: "2021 - PRESENT",
    description: [
      "Successfully published 10+ apps on iOS, Android, and Web.",
      "Collaborated with product managers and designers to create intuitive user experiences.",
      "Optimized app performance and reduced load times by 30% through code refactoring.",
      "Mentored and led a team of junior developers, ensuring code quality."
    ]
  },
  {
    title: "Flutter Developer",
    company: "Freelance",
    period: "2020 - 2021",
    description: [
      "Delivered multiple freelance projects for diverse industries.",
      "Focused on custom requirements and user-centric design."
    ]
  }
];

export default function Experience() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-bold mb-20 text-center tracking-tight italic">
          Journey <span className="text-gradient">So Far</span>
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative pl-10 border-l border-white/5"
            >
              <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              
              <div className="glass p-10 rounded-3xl hover:bg-white/[0.05] transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-blue-400 font-medium tracking-wide">{exp.company}</p>
                  </div>
                  <span className="px-5 py-1.5 rounded-full bg-white/5 text-xs font-mono text-gray-500 border border-white/5">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-400 flex gap-4 text-lg items-start leading-relaxed">
                      <span className="text-blue-500 mt-1.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
