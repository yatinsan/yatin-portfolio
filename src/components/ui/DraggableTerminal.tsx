import { motion } from 'framer-motion';
import { Terminal, Maximize2, X, Minus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export const DraggableTerminal = () => {
    const [history, setHistory] = useState<string[]>([
        'Welcome to Yatin-OS v2.4.0 (stable)',
        'Type "help" for a list of commands.',
        ''
    ]);
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const command = inputValue.trim();
            if (command === '') return;

            setHistory(prev => [...prev, `$ ${command}`, 'wrong command', '']);
            setInputValue('');
        }
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ x: -100, y: 100, opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-1/4 left-10 z-50 cursor-grab active:cursor-grabbing hidden xl:block w-[400px]"
        >
            <div className="bg-[#1e1e24] rounded-lg border border-[#2d2f36] shadow-2xl overflow-hidden font-mono">
                {/* Header */}
                <div className="px-4 py-2 bg-[#1a1a1e] border-b border-[#2d2f36] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-primary" />
                        <span className="text-[10px] text-gray-400 font-bold tracking-wider">TERMINAL</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-600 hover:bg-[#ffbd2e] transition-colors cursor-pointer flex items-center justify-center">
                            <Minus size={8} className="text-black opacity-0 hover:opacity-100" />
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-600 hover:bg-[#27c93f] transition-colors cursor-pointer flex items-center justify-center">
                            <Maximize2 size={8} className="text-black opacity-0 hover:opacity-100" />
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-600 hover:bg-[#ff5f56] transition-colors cursor-pointer flex items-center justify-center">
                            <X size={8} className="text-black opacity-0 hover:opacity-100" />
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div 
                    ref={scrollRef}
                    className="p-4 h-[250px] overflow-y-auto text-xs leading-relaxed custom-scrollbar bg-black/40 backdrop-blur-md"
                >
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
                </div>
            </div>
        </motion.div>
    );
};
