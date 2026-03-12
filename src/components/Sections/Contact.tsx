import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { Mail, Phone, MapPin, Github, Globe } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-surfaceLight/20 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-8" />
          <p className="text-textMuted max-w-2xl mx-auto text-lg">
            Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <a
              href={`mailto:${resumeData.contact.email}`}
              className="flex items-center gap-4 p-6 glass-panel rounded-xl hover:border-primary/50 transition-colors group hover-target"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-sm text-textMuted mb-1">Email</h4>
                <p className="text-white font-medium group-hover:text-primary transition-colors">{resumeData.contact.email}</p>
              </div>
            </a>

            <a
              href={`tel:${resumeData.contact.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-4 p-6 glass-panel rounded-xl hover:border-primary/50 transition-colors group hover-target"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-sm text-textMuted mb-1">Phone</h4>
                <p className="text-white font-medium group-hover:text-primary transition-colors">{resumeData.contact.phone}</p>
              </div>
            </a>
            
            <div className="flex items-center gap-4 p-6 glass-panel rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-sm text-textMuted mb-1">Location</h4>
                <p className="text-white font-medium">{resumeData.contact.location.split(',')[0]}, India</p>
              </div>
            </div>
          </motion.div>

          {/* Social Links & Action */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center h-full glass-panel p-10 rounded-2xl relative overflow-hidden"
          >
             {/* Background glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             
            <h3 className="text-2xl font-bold mb-6 text-white relative z-10">Find me online</h3>
            
            <div className="flex flex-col gap-4 relative z-10">
              <a
                href={resumeData.contact.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-textMuted hover:text-white transition-colors hover-target w-fit"
              >
                <Github size={20} />
                <span>GitHub Profile</span>
              </a>
              <a
                href={resumeData.contact.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-textMuted hover:text-white transition-colors hover-target w-fit"
              >
                <Globe size={20} />
                <span>Personal Website</span>
              </a>
            </div>

            <div className="mt-12 relative z-10">
              <a
                href={`mailto:${resumeData.contact.email}`}
                className="inline-block px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primaryDark transition-colors shadow-lg shadow-primary/25 hover-target w-full text-center"
              >
                Say Hello
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-32 pt-8 pb-8 border-t border-white/5 text-center px-6">
        <p className="text-textMuted text-sm">
          &copy; {new Date().getFullYear()} {resumeData.name}. Built with React, Tailwind & Three.js.
        </p>
      </footer>
    </section>
  );
};
