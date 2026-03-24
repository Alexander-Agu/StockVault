import { FaUsers, FaCrown } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface JointAccountCardProps {
  title: string;
  balance: number;
  createdBy: number;
  createdAt: Date;
  isAdmin: boolean;
  members: number;
  id: number;
  path: string;
}

export default function JointAccountCard({ 
  title, 
  balance,
  id,
  path,
  isAdmin,
  members
}: JointAccountCardProps) {

  return (
    <div className="w-full bg-white border border-slate-200 rounded-none flex flex-col transition-all hover:border-red-500 shadow-sm hover:shadow-xl hover:shadow-red-900/5 group">
      
      {/* Visual Indicator: Red top bar for Joint/Stokvel accounts */}
      <div className="w-full h-1.5 bg-red-600" />

      <div className="p-6 flex flex-col gap-6">
        <div className="w-full flex items-start justify-between pb-4 border-b border-slate-50">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Joint Account</span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {title}
            </h2>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              <FaUsers size={12} className="text-red-500" />
              <span>{members} Members</span>
            </div>
            
            <div className="flex items-center gap-1 bg-slate-900 text-white px-2 py-1 rounded-none text-[9px] font-bold uppercase tracking-widest">
              <FaCrown size={8} className="text-red-500" />
              <span>{isAdmin? "ADMIN" : "MEMBER"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Current Balance
            </p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
              R{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
          </div>

          <Link
            to={`${path}${id}`}
            className="bg-slate-50 text-slate-900 px-4 py-2 rounded-none text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-[0.96]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}