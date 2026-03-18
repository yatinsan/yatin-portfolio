import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../../data/resume';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';
import { Mail, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitToGoogleSheets } from '../../lib/googleSheets';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    const success = await submitToGoogleSheets(formData);
    
    if (success) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } else {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
    setIsSubmitting(false);
  };

  const contactJson = `{
  "status": "open_to_work",
  "email": "${resumeData.contact.email}",
  "socials": {
    "github": "@${resumeData.contact.github.split('/').pop()}",
    "linkedin": "@yatin-san-6238584124",
    "website": "yatinksan.com"
  },
  "location": "${resumeData.contact.location}"
}`;

  return (
    <section id="contact" className="py-24 relative bg-transparent font-mono text-left border-t border-white/5 mt-12 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90(deg), #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-[#e65320]/10 flex items-center justify-center border border-[#e65320]/30">
            <Mail className="text-[#e65320]" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200">
            $ ./contact.exe
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Window: contact_info.json */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-[#2d2f36] bg-[#16161a] overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e24] border-b border-[#2d2f36]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-xs">{'</>'}</span>
                <span className="text-gray-400 text-xs font-mono">contact_info.json</span>
              </div>
            </div>
            
            <div className="p-6 overflow-x-auto min-h-[300px]">
              <pre className="!bg-transparent !m-0 !p-0 font-mono text-sm leading-relaxed">
                <code className="language-json">
                  {contactJson}
                </code>
              </pre>
              <div className="mt-8 text-gray-500 text-xs animate-pulse">
                // Waiting for connection...
                <br />-
              </div>
            </div>
          </motion.div>

          {/* Right Window: sendMessage.ts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-[#e65320]/30 bg-[#16161a] overflow-hidden shadow-2xl"
          >
            <div className="flex items-center px-4 py-3 bg-[#1e1e24] border-b border-[#2d2f36]">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#16161a] rounded-t-md border-x border-t border-[#e65320]/40 -mb-[13px] z-10">
                <span className="text-blue-400 text-[10px] font-bold">TS</span>
                <span className="text-gray-300 text-xs font-mono">sendMessage.ts</span>
                <span className="text-gray-500 text-[10px] ml-1">×</span>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="font-mono text-sm">
                <span className="text-gray-500 italic">// Run this script to send a message</span>
                <div className="mt-2 group">
                  <span className="text-purple-400">const</span> <span className="text-blue-300">send</span> = <span className="text-purple-400">async</span> () ={">"} {'{'}
                </div>
                
                <div className="ml-4 mt-4 space-y-4">
                  <div className="flex items-center gap-2 group">
                    <span className="text-purple-400">const</span> <span className="text-orange-300">name</span> = "
                    <input 
                      type="text"
                      className="bg-transparent border-b border-gray-700 focus:border-[#e65320] outline-none text-[#98c379] px-1 w-full max-w-[200px] transition-colors"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    ";
                  </div>

                  <div className="flex items-center gap-2 group">
                    <span className="text-purple-400">const</span> <span className="text-orange-300">email</span> = "
                    <input 
                      type="email"
                      className="bg-transparent border-b border-gray-700 focus:border-[#e65320] outline-none text-[#98c379] px-1 w-full max-w-[250px] transition-colors"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    ";
                  </div>

                  <div className="mt-4">
                    <span className="text-purple-400">await</span> <span className="text-blue-300">api</span>.<span className="text-yellow-200">submit</span>({'{'}
                    <div className="ml-4 mt-2">
                      <div className="text-orange-300">name, email,</div>
                      <div className="flex items-start gap-2 group">
                        <span className="text-orange-300">message</span>: `
                        <textarea 
                          className="bg-transparent border-l border-gray-700 focus:border-[#e65320] outline-none text-gray-300 px-3 w-full min-h-[100px] transition-colors resize-none ml-1"
                          placeholder="Type your message here ..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                        `
                      </div>
                    </div>
                    {'}'});
                  </div>
                </div>
                <div className="mt-2">{'}'}</div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#0d2a1f] border border-[#27c93f]/30 text-[#27c93f] hover:bg-[#123d2d] transition-colors rounded-md font-bold text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Play size={16} className={isSubmitting ? "animate-spin" : "group-hover:scale-110 transition-transform"} />
                  {isSubmitting ? 'EXECUTING...' : 'RUN SCRIPT'}
                </button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-[#27c93f] text-sm"
                    >
                      <CheckCircle2 size={16} />
                      <span>Message sent successfully!</span>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-[#ff5f56] text-sm"
                    >
                      <AlertCircle size={16} />
                      <span>Failed to send. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>Built with <span className="text-[#e65320]">&lt;3</span> using React, Tailwind & Three.js</p>
          <p className="opacity-50">&copy; {new Date().getFullYear()} {resumeData.name}. All systems operational.</p>
        </div>
      </div>
    </section>
  );
};
