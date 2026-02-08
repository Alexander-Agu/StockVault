import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface PersonalAccountCardProps {
  title: string;
  amount: number;
  locked?: boolean;
  url: string
}

export default function PersonalAccountCard({ title, amount, locked, url }: PersonalAccountCardProps) {
  const navigate = useNavigate();


  // If account is locked it should look like this
  if (locked) {
    return (
      <div className="w-full bg-[#FFF5F5] border border-red-100 rounded-xl p-4 flex flex-col gap-2 relative shadow-sm">
        <h3 className="font-bold text-slate-700">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-slate-400">R</span>
          <div className="bg-red-600 text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter">
            Locked
          </div>
        </div>
        <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold">
          <FaLock size={10} />
          <span>Locked until May 15, 2024</span>
        </div>
        <FaLock className="absolute top-4 right-4 text-red-200" size={18} />
      </div>
    );
  }

  // Standard Personal Account
  return (
    <div className="w-full bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      <h3 className="font-bold text-slate-800">{title}</h3>
      <h2 className="text-3xl font-black text-slate-900">
        R{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </h2>
      
      <div className="flex gap-2 pt-1">
        {["View", "Deposit", "Withdraw"].map((label) => (
          <button onClick={() => navigate(url)} 
            key={label} 
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-md transition-all active:scale-95"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}