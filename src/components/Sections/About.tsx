import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { Code2, Smartphone, MonitorSmartphone } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-surfaceLight/20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-textMuted leading-relaxed mb-6">
              {resumeData.profile}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-lg">
                <span className="text-primary font-bold text-xl">4+</span>
                <span className="text-sm text-textMuted">Years Exp.</span>
              </div>
              <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-lg">
                <span className="text-primary font-bold text-xl">10+</span>
                <span className="text-sm text-textMuted">Apps Built</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              {
                icon: <Smartphone className="text-primary" size={32} />,
                title: "Mobile Native",
                desc: "iOS & Android development with specialized native packages."
              },
              {
                icon: <MonitorSmartphone className="text-primary" size={32} />,
                title: "Cross-Platform",
                desc: "1 codebase, multiple platforms beautifully integrated."
              },
              {
                icon: <Code2 className="text-primary" size={32} />,
                title: "Clean Architecture",
                desc: "Bloc & Provider state management for scalable apps."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors hover-target group"
              >
                <div className="mb-4 bg-white/5 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-textMuted">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
