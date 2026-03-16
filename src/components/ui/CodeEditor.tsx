import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal } from 'lucide-react';
import clsx from 'clsx';

const codeSnippets = {
  'skills.js': `const developer = {
  name: 'Yatin San',
  role: 'Senior Flutter Developer',
  skills: {
    programming: ['Dart', 'Flutter', 'TypeScript', 'Node.js'],
    stateManagement: ['Bloc', 'Provider'],
    tools: ['Firebase', 'GraphQL', 'RESTful APIs'],
    deployment: ['App Store', 'Google Play', 'Web']
  },
  executeMission: function() {
    return 'Crafting high-performance mobile solutions';
  }
};

console.log(developer.executeMission());`,
  'main.dart': `void main() {
  final app = AppConfig(
    appName: 'Yatin Portfolio',
    platform: TargetPlatform.iOS,
    performance: const PerformanceLevel(
      fps: 60,
      animations: 'smooth',
    ),
  );
  
  app.run();
}`
};

export const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState<'skills.js' | 'main.dart'>('skills.js');
  const [isCompiling, setIsCompiling] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);

  const handleRunCode = () => {
    if (isCompiling) return;
    
    setIsCompiling(true);
    setShowConsole(true);
    setConsoleOutput(['> Compiling code...']);
    
    setTimeout(() => {
      setConsoleOutput(prev => [...prev, '> Executing...']);
    }, 800);

    setTimeout(() => {
      if (activeTab === 'skills.js') {
        setConsoleOutput(prev => [...prev, 'Crafting high-performance mobile solutions', '> Execution finished successfully']);
      } else {
        setConsoleOutput(prev => [...prev, 'Initializing Flutter Engine...', 'Running App: Yatin Portfolio on iOS', '> Execution finished successfully']);
      }
      setIsCompiling(false);
    }, 1800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl shadow-primary/10">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        
        <div className="flex bg-[#0d1117] rounded-md p-0.5 border border-white/5">
          <button 
            onClick={() => { setActiveTab('skills.js'); setShowConsole(false); }}
            className={clsx(
              "px-3 py-1 text-xs font-medium rounded-sm transition-colors",
              activeTab === 'skills.js' ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80"
            )}
          >
            skills.js
          </button>
          <button 
            onClick={() => { setActiveTab('main.dart'); setShowConsole(false); }}
            className={clsx(
              "px-3 py-1 text-xs font-medium rounded-sm transition-colors",
              activeTab === 'main.dart' ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80"
            )}
          >
            main.dart
          </button>
        </div>

        <button 
          onClick={handleRunCode}
          disabled={isCompiling}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-primary/20 text-primary hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-xs font-medium transition-colors"
        >
          <Play size={12} className={isCompiling ? "animate-pulse" : ""} />
          {isCompiling ? 'Running...' : 'Run Code'}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-left">
        <pre className="font-mono text-sm leading-relaxed">
          <code className="text-gray-300">
            {codeSnippets[activeTab].split('\\n').map((line, i) => (
              <div key={i} className="flex">
                <span className="w-8 shrink-0 text-white/20 select-none text-right mr-4">{i + 1}</span>
                <span className={getLineSyntax(line)}>{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Console Area */}
      <AnimatePresence>
        {showConsole && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-[#0d1117] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22]/50 border-b border-white/5">
              <Terminal size={14} className="text-white/50" />
              <span className="text-xs text-white/50 font-medium tracking-wider uppercase">Console</span>
            </div>
            <div className="p-4 font-mono text-sm">
              {consoleOutput.map((line, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className={clsx(
                    "mb-1",
                    line.startsWith('>') ? "text-primary/80" : "text-green-400"
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

// Extremely basic syntax highlighting helper just for this snippet
function getLineSyntax(line: string) {
  if (line.includes('const ') || line.includes('void ') || line.includes('final ')) return 'text-purple-400';
  if (line.includes('return ')) return 'text-purple-400';
  if (line.includes('console.log') || line.includes('print')) return 'text-cyan-300';
  if (line.includes('://')) return 'text-green-300';
  if (line.includes("'") || line.includes('"')) return 'text-green-300/90';
  if (line.includes('//')) return 'text-gray-500';
  if (line.includes('function') || line.includes('()')) return 'text-blue-400';
  return 'text-gray-300';
}
