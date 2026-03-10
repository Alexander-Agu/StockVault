import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

interface CreateAccountProps {
    title: string;
    path: string;
}

export default function CreateAccount({title, path}: CreateAccountProps) {
  return (
    <div className="flex flex-col gap-4 p-7">
        <h2 className="text-2xl font-bold  text-slate-800">{title}</h2>
        
        <Link to={path} className="group w-64 h-32 flex flex-col items-center justify-center gap-2 
            bg-white/50 hover:bg-white border-2 border-dashed border-slate-300 
            hover:border-red-500 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md">
            
            <div className="p-2 rounded-full bg-slate-100 group-hover:bg-red-50 transition-colors">
                <FaPlus className="text-slate-400 group-hover:text-red-500 text-xl" />
            </div>
            
            <span className="text-sm font-semibold text-slate-500 group-hover:text-red-600">
                Add new {title}s
            </span>
        </Link >
    </div>
  )
}