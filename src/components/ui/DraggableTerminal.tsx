import { motion } from 'framer-motion';
import { Terminal, X, ChevronUp, List, Info, AlertCircle, Ban } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';

type Tab = 'TERMINAL' | 'OUTPUT' | 'DEBUG CONSOLE' | 'PROBLEMS';

interface TerminalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    terminalHeight: number;
    setTerminalHeight: (height: number) => void;
}

export const DraggableTerminal = ({ isOpen, setIsOpen, terminalHeight, setTerminalHeight }: TerminalProps) => {
    const [history, setHistory] = useState<string[]>([
        'Welcome to Yatin-OS v2.4.0 (stable)',
        'Type "help" for a list of commands.',
        ''
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isResizing, setIsResizing] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('TERMINAL');
    
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, activeTab, isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const command = inputValue.trim();
            if (command === '') return;

            setHistory(prev => [...prev, `$ ${command}`, 'wrong command', '']);
            setInputValue('');
        }
    };

    // Resizing logic from top edge
    const startResizing = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((e: MouseEvent) => {
        if (isResizing) {
            const newHeight = window.innerHeight - e.clientY;
            setTerminalHeight(Math.max(150, Math.min(newHeight, window.innerHeight * 0.8)));
        }
    }, [isResizing, setTerminalHeight]);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing, resize, stopResizing]);

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-0 left-10 bg-[#1e1e24] border-x border-t border-[#2d2f36] px-4 py-1 flex items-center gap-2 text-[10px] text-gray-400 font-bold tracking-wider rounded-t-md hover:text-white transition-colors z-[100]"
            >
                <Terminal size={12} className="text-primary" />
                TERMINAL
                <ChevronUp size={12} />
            </button>
        );
    }

    return (
        <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-[#1e1e24] border-t border-[#2d2f36] shadow-2xl font-mono flex flex-col hidden xl:flex"
            style={{ height: terminalHeight }}
        >
            {/* Resize Handle (Top Edge) */}
            <div 
                onMouseDown={startResizing}
                className="absolute -top-1 left-0 right-0 h-2 cursor-ns-resize hover:bg-primary/20 transition-colors z-[110]"
            />

            {/* VS Code Style Header */}
            <div className="flex items-center justify-between px-4 bg-[#1e1e24] border-b border-[#2d2f36] shrink-0 h-10">
                <div className="flex items-center h-full">
                    {[
                        { id: 'PROBLEMS' as Tab, label: 'PROBLEMS', count: 0 },
                        { id: 'OUTPUT' as Tab, label: 'OUTPUT' },
                        { id: 'DEBUG CONSOLE' as Tab, label: 'DEBUG CONSOLE' },
                        { id: 'TERMINAL' as Tab, label: 'TERMINAL' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "px-3 h-full text-[11px] font-medium transition-colors flex items-center gap-1.5 border-b-2",
                                activeTab === tab.id 
                                    ? "text-white border-primary" 
                                    : "text-gray-500 border-transparent hover:text-gray-300"
                            )}
                        >
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className="bg-white/10 px-1.5 py-0.5 rounded-full text-[9px]">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                    <button className="hover:text-white p-1 transition-colors"><List size={14} /></button>
                    <button className="hover:text-white p-1 transition-colors"><ChevronUp size={14} /></button>
                    <button onClick={() => setIsOpen(false)} className="hover:text-white p-1 transition-colors group">
                        <X size={14} className="group-hover:text-red-400" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div 
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto text-xs leading-relaxed custom-scrollbar bg-black/20"
            >
                {activeTab === 'TERMINAL' ? (
                    <>
                        {history.map((line, i) => (
                            <div key={i} className={line.startsWith('$') ? 'text-white' : line === 'wrong command' ? 'text-red-400' : 'text-primary/70'}>
                                {line}
                            </div>
                        ))}
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-white">$</span>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none flex-1 text-white caret-primary"
                                autoFocus
                            />
                        </div>
                    </>
                ) : activeTab === 'PROBLEMS' ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2 opacity-50">
                        <Ban size={48} strokeWidth={1} />
                        <p>No problems have been detected in the workspace.</p>
                    </div>
                ) : (
                    <div className="text-gray-500 italic flex items-center gap-2">
                        <Info size={14} />
                        No {activeTab.toLowerCase()} to display yet.
                    </div>
                )}
            </div>

            {/* Bottom Bar (VS Code Status Bar style) */}
            <div className="h-6 bg-primary px-3 flex items-center justify-between text-[10px] text-white shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-default">
                        <AlertCircle size={10} /> 0
                        <Info size={10} /> 0
                    </div>
                    <span>main*</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>UTF-8</span>
                    <span>TypeScript JSX</span>
                </div>
            </div>
        </motion.div>
    );
};
