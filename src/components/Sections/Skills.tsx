import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';

export const Skills = () => {
  return (
    <section id="skills" className="py-24 relative bg-transparent font-mono text-left">
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
            # Skills.json
          </h2>
        </motion.div>

        {/* JSON Display Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-[#0d1117] rounded-xl border border-white/5 overflow-hidden shadow-2xl"
        >
          {/* Header Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-4 text-gray-400 text-xs tracking-wider">skills.json</span>
          </div>

          <div className="p-6 overflow-x-auto">
            <pre className="text-sm md:text-base leading-relaxed">
              <span className="text-gray-400">{'{'}</span>
              {Object.entries(resumeData.skills).map(([category, skills], idx, arr) => (
                <div key={category} className="ml-4 md:ml-8 my-1 flex flex-col md:flex-row md:items-start text-gray-300">
                  <span className="text-[#61dafb]">
                    "{category.replace(/([A-Z])/g, ' $1').trim()}"
                  </span>
                  <span className="text-gray-400 mx-2">:</span>
                  <span className="text-gray-400">[</span>
                  <div className="ml-4 md:ml-2 flex flex-wrap gap-x-2 text-[#98c379]">
                    {skills.map((skill, sIdx) => (
                      <span key={skill}>
                        "{skill}"{sIdx < skills.length - 1 ? <span className="text-gray-400">,</span> : ''}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-400 -ml-2 md:ml-1">
                    ]{idx < arr.length - 1 ? ',' : ''}
                  </span>
                </div>
              ))}
              <span className="text-gray-400">{'}'}</span>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
