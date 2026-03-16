import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative bg-transparent font-mono text-left">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-b border-white/10 pb-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200">
            <span className="text-gray-500 mr-2">##</span> 
            $ git log --stat --oneline
          </h2>
        </motion.div>

        <div className="space-y-12">
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                <span className="text-[#e2c08d] font-bold text-lg">
                  commit <span className="opacity-50 text-sm">{Math.random().toString(16).substring(2, 9)}</span>
                </span>
                <span className="text-gray-500 text-sm">({exp.period})</span>
              </div>
              
              <div className="pl-4 md:pl-8 border-l-2 border-white/5">
                <div className="text-[#61dafb] font-semibold text-lg mb-1">
                  Merge pull request #{index + 1} from {exp.company.toLowerCase().replace(/\s/g, '-')}
                </div>
                <div className="text-gray-300 font-medium mb-4">
                  {exp.role} @ {exp.company}
                </div>
                
                <div className="space-y-2 text-sm md:text-base text-gray-400">
                  {exp.description.slice(0, 3).map((desc, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1.5 opacity-80 text-xs">+</span>
                      <span className="leading-relaxed">{desc}</span>
                    </div>
                  ))}
                  {exp.description.length > 3 && (
                     <div className="flex items-start gap-3 opacity-50">
                       <span className="text-gray-500 mt-1.5 text-xs">...</span>
                       <span>and {exp.description.length - 3} more optimizations</span>
                     </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
