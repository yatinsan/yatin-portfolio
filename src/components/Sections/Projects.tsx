import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { ExternalLink, FolderGit2 } from 'lucide-react';

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-surfaceLight/20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Key <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-6 rounded-2xl flex flex-col group hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 relative overflow-hidden"
            >
              {/* Subtle tech background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <div className="flex justify-between items-start mb-6 w-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <FolderGit2 size={24} />
                </div>
                <div className="flex gap-3">
                  <a href="#" className="text-textMuted hover:text-white transition-colors hover-target p-2 rounded-full hover:bg-white/5">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              
              <p className="text-sm text-textMuted leading-relaxed flex-grow">
                {project.description}
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                {/* Dynamically inferring likely tech stack from description just for visual flair if not explicitly stated setup array mapping */}
                {['Flutter', 'Dart', 'Native'].map(tech => (
                   <span key={tech} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                     {tech}
                   </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
