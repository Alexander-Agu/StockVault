import type { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  count: number;
  icon: IconType;
  linkText: string;
  resultName: string;
  path: string;
}

export default function StatCard ({ title, count, icon: Icon, linkText, resultName, path }: StatCardProps){
  const navigate = useNavigate();
  return (
    <div className="group relative flex flex-col justify-between w-full h-48 p-5 bg-white/40 backdrop-blur-sm border border-white/60 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/60 hover:border-red-200/50">
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-white text-red-500 rounded-lg shadow-sm group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
          <Icon size={20} />
        </div>
        <span className="text-lg font-semibold text-slate-700">{title}</span>
      </div>

      <div className="flex items-baseline gap-2">
        <h2 className="text-4xl font-bold text-slate-900">
          {count.toLocaleString()}
        </h2>
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{resultName}</span>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={()=> navigate(`../${path}`)}
          className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-tight underline"
        >
          {linkText}
        </button>
      </div>
    </div>
  );
};