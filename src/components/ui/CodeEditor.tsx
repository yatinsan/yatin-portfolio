import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import '../../styles/portfolio-theme.css'; 
import { Play, Folder, Terminal } from 'lucide-react';
import clsx from 'clsx';

const codeSnippet = `// Welcome to my workspace
import { Developer } from './universe';

const Portfolio = () => {
  return (
    <Developer
      name="Yatin San"
      role="Senior Flutter Developer"
      passion="Crafting exceptional digital experiences"
    />
  );
};`;

export const CodeEditor = () => {
  const [isCompiling, setIsCompiling] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleRunCode = () => {
    if (isCompiling) return;
    
    setIsCompiling(true);
    setShowConsole(true);
    setConsoleOutput(['> Compiling code...']);
    
    setTimeout(() => {
      setConsoleOutput(prev => [...prev, '> Executing...']);
    }, 800);

    setTimeout(() => {
      setConsoleOutput(prev => [
        ...prev, 
        'Loading Yatin San Profile...', 
        '> Execution finished successfully'
      ]);
      setIsCompiling(false);
    }, 1800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-[#2d2f36] bg-[#16161a] shadow-2xl shadow-primary/10">
      
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e24] border-b border-[#2d2f36]">
        {/* MacOS Dots */}
        <div className="flex items-center gap-2 w-1/3">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        
        {/* Center Title */}
        <div className="flex items-center justify-center gap-2 w-1/3">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
          <span className="text-gray-400 text-xs font-mono">portfolio.tsx</span>
        </div>

        {/* Empty right area to balance flex box */}
        <div className="w-1/3"></div>
      </div>

      {/* Code Area */}
      <div className="p-6 overflow-x-auto text-left bg-transparent">
        <pre className="!bg-transparent !m-0 !p-0 font-mono text-sm leading-relaxed">
          <code className="!-bg-transparent !p-0 language-tsx">
            {codeSnippet.split('\\n').map((line, i) => (
              <div key={i} className="flex">
                <span className="w-8 shrink-0 text-gray-600 select-none text-right mr-6 text-xs leading-relaxed opacity-60">
                  {i + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: Prism.highlight(line, Prism.languages.tsx, 'tsx') || ' ' }} />
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Actions / Buttons Area */}
      <div className="flex items-center gap-4 px-6 pb-6 pt-2">
        <button 
          onClick={handleRunCode}
          disabled={isCompiling}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-transparent border border-[#e65320] text-[#e65320] hover:bg-[#e65320]/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors"
        >
          <Play size={14} className={isCompiling ? "animate-pulse" : ""} />
          {isCompiling ? 'Running...' : 'Run Profile'}
        </button>

        <a 
          href="#projects"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-transparent border border-white/10 text-gray-300 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors"
        >
          <Folder size={14} />
          View Projects
        </a>
      </div>

      {/* Console Area */}
      <AnimatePresence>
        {showConsole && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[#2d2f36] bg-[#1a1a1e] overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-2 bg-[#1e1e24] border-b border-[#2d2f36]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-gray-500" />
                <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">Console</span>
              </div>
              <button 
                onClick={() => setShowConsole(false)}
                className="text-gray-500 hover:text-white text-xs px-2"
              >
                Clear
              </button>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              {consoleOutput.map((line, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className={clsx(
                    "mb-1",
                    line.startsWith('>') ? "text-[#e65320]" : "text-[#4ade80]" // Match bottom button orange, success green
                  )}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
