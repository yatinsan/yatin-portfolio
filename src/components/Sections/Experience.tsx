import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { Briefcase } from 'lucide-react';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="relative border-l-2 border-primary/30 ml-4 md:ml-0 md:pl-0">
          {/* Vertical line specifically for timeline alignment when centering on large screens is not used */}
          
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative pl-8 md:pl-12 py-6 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-9px] top-8 w-4 h-4 bg-surface rounded-full border-2 border-primary group-hover:bg-primary transition-colors" />
              
              <div className="glass-panel p-8 rounded-2xl hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      {exp.role} 
                    </h3>
                    <h4 className="text-xl text-primary font-medium flex items-center gap-2 mt-1">
                      <Briefcase size={18} className="text-primary" />
                      {exp.company}
                    </h4>
                  </div>
                  <span className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium self-start md:self-auto shrink-0">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-3 mt-6">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-textMuted flex items-start gap-3 text-sm md:text-base">
                      <span className="text-primary mt-1.5 opacity-50 text-xs">▹</span>
                      <span className="leading-relaxed">{desc}</span>
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
};
