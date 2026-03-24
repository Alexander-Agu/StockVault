import type { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  count: number;
  icon: IconType;
  linkText: string;
  resultName: string;
  path: string;
}

export default function StatCard({ title, count, icon: Icon, linkText, resultName, path }: StatCardProps) {
  return (
    <div className="group relative flex flex-col justify-between w-full h-48 p-6 bg-white border border-slate-200 rounded-none transition-all duration-300 hover:border-red-500 shadow-sm hover:shadow-xl hover:shadow-red-900/5">
      
      {/* Header Area */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-900 rounded-none border border-slate-100 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300">
          <Icon size={20} />
        </div>
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-tight">
          {title}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex items-baseline gap-2">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
          {count.toLocaleString()}
        </h2>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {resultName}
        </span>
      </div>

      {/* Action Footer */}
      <div className="flex justify-start border-t border-slate-50 pt-3">
        <Link 
          to={path}
          className="text-[10px] font-black text-red-500 hover:text-slate-900 transition-colors uppercase tracking-[0.15em]"
        >
          {linkText} →
        </Link>
      </div>
    </div>
  );
};