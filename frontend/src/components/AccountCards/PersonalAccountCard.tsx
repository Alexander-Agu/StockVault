import { FaLock, FaShield } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { personalCardLinksData } from "./AccountCardTools";

interface PersonalAccountCardProps {
  title: string;
  amount: number;
  locked?: boolean;
  url: string;
  accountId: string;
}

export default function PersonalAccountCard({ title, amount, locked, url, accountId }: PersonalAccountCardProps) {
  
  const isSavings = title.toLowerCase().includes("savings");

  return (
    <div className={`w-full border p-6 flex flex-col gap-6 transition-all rounded-none relative shadow-sm h-full ${
      locked && !isSavings ? 'bg-red-50/50 border-red-200' : 'bg-white border-slate-200'
    }`}>
      
      {/* Header Area */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Account Type</h3>
          <h2 className="text-xl font-black text-slate-900 leading-none">{title}</h2>
        </div>
        {isSavings && <FaShield className="text-red-500" size={18} />}
        {locked && !isSavings && <FaLock className="text-red-400" size={16} />}
      </div>

      {/* Balance Area */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Available Balance</span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
          R {amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>
      </div>

      {/* Logic: Show Locked Info if applicable */}
      {locked && !isSavings && (
        <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-tight bg-red-100/50 p-2 border border-red-100">
          <FaLock size={10} />
          <span>Account restricted</span>
        </div>
      )}

      {/* Action Links */}
      <div className="mt-auto flex gap-2 flex-wrap pt-4 border-t border-slate-50">
        {/* If it's Savings, we only show View/Transactions. If not, we show all tools */}
        {personalCardLinksData(url, accountId).map(item => {
          const { name, path } = item;
          
          // Filter out Update/Delete/Lock from Savings view
          const forbiddenForSavings = ["update", "delete", "lock"];
          if (isSavings && forbiddenForSavings.some(f => name.toLowerCase().includes(f))) return null;

          if (!locked || name.toLowerCase() === "view")
          return (
            <Link
              to={path}
              key={name}
              className="px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all active:scale-[0.96]"
            >
              {name}
            </Link>
          )
        })}
      </div>
    </div>
  );
}