import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { ExternalLink } from 'lucide-react';

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-transparent relative font-mono text-left">
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
            $ ls -la ~/projects
          </h2>
        </motion.div>

        <div className="flex flex-col space-y-8 text-sm md:text-base">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 text-gray-500 pb-4 border-b border-white/5 font-semibold">
            <div className="col-span-3 lg:col-span-2">permissions</div>
            <div className="col-span-1">size</div>
            <div className="col-span-2">date</div>
            <div className="col-span-6 lg:col-span-7">name / description</div>
          </div>

          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start group relative"
            >
              {/* Fake file meta */}
              <div className="col-span-3 border-b border-white/5 md:border-none pb-2 md:pb-0 flex mb-2 md:mb-0 lg:col-span-2 text-gray-500 truncate whitespace-nowrap">
                 drwxr-xr-x
              </div>
              <div className="col-span-1 hidden md:block text-gray-500">
                4096
              </div>
              <div className="col-span-2 hidden md:block text-gray-500">
                Oct 24 10:11
              </div>
              
              {/* Content */}
              <div className="col-span-1 md:col-span-6 lg:col-span-7">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold mb-1 group-hover:underline decoration-white/30 underline-offset-4"
                >
                  {project.name.toLowerCase().replace(/\s+/g, '-')}
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="flex gap-2 mt-2 opacity-60">
                  <span className="text-gray-500">-&gt;</span> 
                  <span className="text-[#98c379]">Flutter</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-[#98c379]">Dart</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
