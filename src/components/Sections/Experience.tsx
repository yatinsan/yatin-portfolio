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
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center italic">Journey <span className="text-blue-500">So Far</span></h2>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 border-l border-white/10"
            >
              <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              
              <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.title}</h3>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="px-4 py-1 rounded-full bg-white/5 text-sm font-mono text-gray-400">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-400 flex gap-3">
                      <span className="text-blue-500">•</span>
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
