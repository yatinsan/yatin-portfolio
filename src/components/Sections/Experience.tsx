import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative bg-transparent font-mono text-left overflow-hidden">
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 text-gray-500 mb-2 text-sm">
            <span className="text-yellow-500/80">commit a1b2c3d</span>
            <span>HEAD {"->"}</span>
            <span className="text-blue-400">developer</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-100 tracking-tight">
             $ git log --stat --oneline
          </h2>
        </motion.div>

        <div className="relative space-y-16 pl-4 md:pl-0">
          {/* Vertical Line Connector - Only on Desktop */}
          <div className="absolute left-[3px] md:left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-yellow-500/50 via-blue-500/20 to-transparent hidden md:block" />

          {resumeData.experience.map((exp, index) => {
            const hash = Math.random().toString(16).substring(2, 9);
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-8 md:gap-0`}
              >
                {/* Timeline Node */}
                <div className="absolute left-[-15px] md:left-[50%] top-0 md:translate-x-[-50%] flex flex-col items-center z-20">
                    <div className="w-8 h-8 rounded-full bg-[#16161a] border-2 border-yellow-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                    </div>
                    <div className="mt-2 px-2 py-1 bg-white/5 backdrop-blur-sm rounded border border-white/10 text-[10px] text-gray-400 whitespace-nowrap">
                        {exp.period}
                    </div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] group`}>
                   <div className="bg-[#1e1e24]/40 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                      {/* Card Header (Git Log Style) */}
                      <div className="px-5 py-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-yellow-500 font-bold text-sm shrink-0">{hash}</span>
                            <span className="text-blue-400 text-[10px] bg-blue-400/10 px-1.5 py-0.5 rounded shrink-0">HEAD {"->"} {exp.company.toLowerCase().replace(/\s/g, '-')}</span>
                         </div>
                         <span className="text-gray-500 text-[10px] italic hidden sm:block">Experience Commit</span>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                            {exp.role} <span className="text-gray-500 font-normal">@ {exp.company}</span>
                        </h3>
                        
                        <div className="space-y-3 mb-6 font-sans">
                            {exp.description.slice(0, 3).map((desc, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1.5 opacity-80 text-xs shrink-0">+</span>
                                    <span className="text-gray-400 text-sm leading-relaxed">{desc}</span>
                                </div>
                            ))}
                        </div>

                        {/* Tech Tags */}
                        {exp.technologies && (
                            <div className="flex flex-wrap gap-2">
                                {exp.technologies.slice(0, 5).map((tech, i) => (
                                    <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-400 hover:border-yellow-500/50 hover:text-white transition-colors">
                                        {tech}
                                    </span>
                                ))}
                                {exp.technologies.length > 5 && (
                                    <span className="text-[10px] text-gray-500 self-center">+{exp.technologies.length - 5} more</span>
                                )}
                            </div>
                        )}
                      </div>

                      {/* Card Footer (Git Stat Style) */}
                      <div className="px-5 py-3 bg-black/20 border-t border-white/5 flex items-center gap-4 text-[11px] font-mono justify-center sm:justify-start">
                         <div className="flex items-center gap-1.5 text-gray-400">
                            <span className="opacity-60">files:</span>
                            <span>{Math.floor(Math.random() * 10) + 1} changed</span>
                         </div>
                         <div className="flex items-center gap-1.5 text-green-400">
                             <span>+{Math.floor(Math.random() * 500) + 100}</span>
                             <span className="opacity-60">ins</span>
                         </div>
                         <div className="flex items-center gap-1.5 text-red-400">
                             <span>-{Math.floor(Math.random() * 100) + 10}</span>
                             <span className="opacity-60">del</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            );
          })}
        </div>

        {/* Initial Commit Node */}
        <div className="mt-24 flex justify-center">
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="px-6 py-3 bg-[#1e1e24] border border-white/10 rounded-full text-gray-500 text-sm flex items-center gap-3 italic"
            >
                <div className="w-2 h-2 rounded-full bg-gray-600" />
                initial commit (Hello World)
            </motion.div>
        </div>
      </div>
    </section>
  );
};
