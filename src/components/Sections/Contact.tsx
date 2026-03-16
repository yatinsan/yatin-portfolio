import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 relative bg-transparent font-mono text-left border-t border-white/5 mt-12">
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
            $ ./contact.exe
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center group">
            <span className="text-gray-500 w-24">email</span>
            <a 
              href={`mailto:${resumeData.contact.email}`}
              className="text-[#61dafb] hover:text-[#569cd6] hover:underline underline-offset-4 decoration-white/30 transition-colors"
            >
              "{resumeData.contact.email}"
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center group">
            <span className="text-gray-500 w-24">github</span>
            <a 
              href={resumeData.contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#98c379] hover:text-[#569cd6] hover:underline underline-offset-4 decoration-white/30 transition-colors"
            >
              "github.com/{resumeData.contact.github.split('/').pop()}"
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center group">
            <span className="text-gray-500 w-24">website</span>
            <a 
              href={resumeData.contact.website}
              target="_blank"
              rel="noreferrer"
              className="text-[#e06c75] hover:text-[#569cd6] hover:underline underline-offset-4 decoration-white/30 transition-colors"
            >
              "{resumeData.contact.website.replace(/^https?:\/\//, '')}"
            </a>
          </div>

          <div className="pt-8 text-gray-500 text-sm mt-8 border-t border-white/5">
            <p>Built with <span className="text-[#e2c08d]">&lt;3</span> using React, Tailwind & Three.js</p>
            <p className="mt-2 text-xs opacity-50">&copy; {new Date().getFullYear()} {resumeData.name}. All systems operational.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
