import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

interface JointAccountCardProps {
  title: string;
  amount: number;
  members: number;
  role: "Admin" | "Member";
  progress: number;
  contribution: string;
  id: number;
}

export default function JointAccountCard({ 
  title, 
  amount, 
  members, 
  role, 
  progress, 
  contribution,
  id 
}: JointAccountCardProps) {
  return (
    <div className="w-full bg-white border border-red-100 rounded-xl p-4 flex flex-col gap-2 relative shadow-sm">

      <div className="w-full flex items-center justify-between pb-3 border-b border-[#00000031]">

        <h2 className="font-medium text-[1.2rem] text-slate-800">
          {title}
        </h2>


        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex items-center gap-1 text-slate-400 font-bold text-[10px] uppercase">
            <FaUsers size={14} />
            <span>{members} Members</span>
          </div>
          <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-black text-slate-900 uppercase">
            {role}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-slate-400 italic mb-1">
            {contribution}
          </p>
          <div className="flex items-baseline gap-1">
            <h2 className="text-4xl font-bold text-slate-900">
              R{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
          </div>
        </div>
        
        <Link to={id + ""} className="text-red-500 text-xs font-bold underline underline-offset-4">
          View Details
        </Link>
      </div>
    </div>
  );
}