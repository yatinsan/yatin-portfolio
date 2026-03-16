import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';

export const About = () => {
  return (
    <section id="about" className="py-24 relative bg-transparent font-mono text-left">
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
            # About.system
          </h2>
        </motion.div>

        <div className="space-y-12">
          
          {/* whoami prompt */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-bold">➜</span>
              <span className="text-green-400 font-semibold">whoami</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base border-l-2 border-white/5 pl-4 ml-1">
              {resumeData.profile}
            </p>
          </motion.div>

          {/* cat mission.txt prompt */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-bold">➜</span>
              <span className="text-green-400 font-semibold">cat mission.txt</span>
            </div>
            <div className="text-gray-400 leading-relaxed text-sm md:text-base border-l-2 border-white/5 pl-4 ml-1">
              <p>Translating complex business requirements into robust mobile solutions.</p>
              <p className="mt-2 text-gray-500">// Currently focused on high-performance cross-platform architecture, state management optimization, and delivering pixel-perfect native experiences.</p>
            </div>
          </motion.div>

          {/* System Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 p-6 bg-[#0d1117] border border-white/5 rounded-lg font-mono text-sm"
          >
            <div className="text-gray-500 mb-4">-- System Capabilities --</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-blue-400 mb-1">uptime</div>
                <div className="text-gray-300">4+ Years Exp.</div>
              </div>
              <div>
                <div className="text-blue-400 mb-1">deployments</div>
                <div className="text-gray-300">10+ Published Apps</div>
              </div>
              <div>
                <div className="text-blue-400 mb-1">architecture</div>
                <div className="text-gray-300">Clean & Scalable</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
