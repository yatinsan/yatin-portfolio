import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';

export const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {Object.entries(resumeData.skills).map(([category, skills], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 capitalize border-b border-white/10 pb-4">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    className="px-4 py-2 bg-surfaceLight/50 border border-white/10 rounded-lg text-sm text-textMain hover:border-primary/50 hover:text-primary transition-colors cursor-default hover-target"
                  >
                    {skill}
                  </motion.div>
                ))}
            </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
