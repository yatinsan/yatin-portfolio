import { motion } from 'framer-motion';
import { Battery, Wifi, Signal, X } from 'lucide-react';

export const DraggableSimulator = ({ onClose }: { onClose?: () => void }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: -100, y: 0, opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
      className="absolute top-1/4 right-10 z-50 cursor-grab active:cursor-grabbing hidden xl:block"
    >
      {/* Close Button - Moved outside the overflow-hidden container */}
      {onClose && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-red-600 transition-all z-[70] cursor-pointer active:scale-90 border-4 border-[#16161a]"
        >
          <X size={20} />
        </button>
      )}

      <div className="w-[280px] h-[580px] bg-[#16161a] rounded-[3rem] border-8 border-[#2d2f36] shadow-2xl overflow-hidden relative border-opacity-50">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2d2f36] rounded-b-2xl z-20" />
        
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-7 pb-2 text-[10px] text-white/70 font-medium z-10 relative">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal size={10} />
            <Wifi size={10} />
            <Battery size={10} />
          </div>
        </div>

        {/* Screen Content (Sample Flutter UI) */}
        <div className="h-full w-full bg-[#0a0a0c] overflow-y-auto pb-10 custom-scrollbar">
          <div className="p-4 pt-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Dashboard</h3>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">YS</div>
            </div>

            {/* Cards */}
            <div className="space-y-4">
              {[
                { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', color: 'text-green-400' },
                { label: 'Active Projects', value: '12', change: '+2', color: 'text-blue-400' },
                { label: 'App Installs', value: '984', change: '+14%', color: 'text-orange-400' }
              ].map((card, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{card.label}</span>
                  <div className="flex items-end justify-between mt-1">
                    <span className="text-xl font-bold text-white">{card.value}</span>
                    <span className={`text-xs ${card.color}`}>{card.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Placeholder */}
            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl h-32 relative overflow-hidden">
               <span className="text-xs text-gray-500 mb-2 block">Weekly Activity</span>
               <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end gap-1 px-4">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        key={i} 
                        className="flex-1 bg-primary/40 rounded-t-sm" 
                    />
                  ))}
               </div>
            </div>

            {/* Transactions */}
            <div className="mt-6">
               <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Recent Transactions</h4>
               <div className="space-y-3">
                  {[
                    { name: 'Apple Store', date: 'Mar 15, 2024', amount: '-$12.99' },
                    { name: 'Payment Received', date: 'Mar 14, 2024', amount: '+$1,200.00' },
                    { name: 'Github', date: 'Mar 12, 2024', amount: '-$7.00' }
                  ].map((t, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                       <div>
                          <p className="text-gray-200 font-medium">{t.name}</p>
                          <p className="text-[10px] text-gray-500">{t.date}</p>
                       </div>
                       <span className={t.amount.startsWith('+') ? 'text-green-400' : 'text-gray-400'}>{t.amount}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20" />
      </div>
    </motion.div>
  );
};
