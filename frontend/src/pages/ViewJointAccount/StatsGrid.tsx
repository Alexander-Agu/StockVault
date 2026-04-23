interface StatsGridProps {
  balance: number;
  payoutCycle: any;
  totalPaidSlots: number;
  totalSlots: number;
}

export default function StatsGrid({ balance, payoutCycle, totalPaidSlots, totalSlots }: StatsGridProps) {
  const progressPercentage = totalSlots > 0 ? (totalPaidSlots / totalSlots) * 100 : 0;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-0 mt-8 sm:mt-12">
      {/* Current balance card */}
      <div className="p-6 sm:p-8 bg-white/80 sm:border-r border-red-100/50">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
          Current Balance
        </p>
        <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">
          R {balance}
        </p>
      </div>
      
      {/* Expected total card - shows how much will be collected */}
      <div className="p-6 sm:p-8 bg-white/80 sm:border-r border-red-100/50">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
          Expected Total
        </p>
        <p className="text-2xl sm:text-3xl font-black text-slate-300 tracking-tighter">
          R {payoutCycle?.estimatedTotalAmount || "0.00"}
        </p>
      </div>

      {/* Progress card - how many payouts have been completed */}
      <div className="p-6 sm:p-8 bg-red-600 text-white sm:rounded-r-none">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-70">
          Collection Progress
        </p>
        <div className="flex items-baseline gap-2 flex-wrap">
          <p className="text-3xl sm:text-4xl font-black tracking-tighter">
            {totalPaidSlots} / {totalSlots}
          </p>
          <span className="text-xs font-bold opacity-70 tracking-widest">Paid</span>
        </div>
        {/* Progress bar */}
        {totalSlots > 0 && (
          <div className="mt-3 h-1 bg-white/20">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}