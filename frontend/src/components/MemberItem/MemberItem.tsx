import { 
  FaCircleCheck, 
  FaCircleXmark,
} from "react-icons/fa6";

interface MemberItemProps{
    name: string;
    paid: boolean;
}

export default function MemberItem({ name, paid }:MemberItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/40 border border-white rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
          {name.charAt(0)}
        </div>
        <span className="text-sm font-bold text-slate-700">{name}</span>
      </div>
      {paid ? (
        <FaCircleCheck className="text-emerald-500" title="Paid" />
      ) : (
        <FaCircleXmark className="text-rose-400" title="Not Paid" />
      )}
    </div>
  )
}