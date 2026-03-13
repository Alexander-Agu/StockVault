import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { personalCardLinksData } from "./AccountCardTools";

interface PersonalAccountCardProps {
  title: string;
  amount: number;
  locked?: boolean;
  url: string
  accountId: string
}

export default function PersonalAccountCard({ title, amount, locked, url, accountId }: PersonalAccountCardProps) {

  const navigate = useNavigate();

  if (locked) {
    return (
      <div className="w-full bg-red-50 border border-red-200 rounded-xl p-5 flex flex-col gap-3 relative shadow-sm">

        <h3 className="font-semibold text-slate-800">{title}</h3>

        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-slate-400">R</span>

          <div className="bg-red-500 text-white px-3 py-1 rounded text-[10px] font-semibold uppercase tracking-wide">
            Locked
          </div>
        </div>

        <div className="flex items-center justify-between text-red-500 text-xs font-medium">

          <div className="flex items-center gap-2">
            <FaLock size={12} />
            <span>Locked until May 15, 2024</span>
          </div>

          <Link
            to={url}
            className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-md transition-all"
          >
            View
          </Link>

        </div>

        <FaLock className="absolute top-4 right-4 text-red-200" size={18} />

      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">

      <h3 className="font-semibold text-slate-800">{title}</h3>

      <h2 className="text-3xl font-semibold text-slate-900">
        R{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </h2>

      <div className="flex gap-2 pt-1 flex-wrap">

        {personalCardLinksData(url, accountId).map(item => {

          const { name, path } = item;

          return (
            <Link
              to={path}
              key={name}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-all"
            >
              {name}
            </Link>
          )
        })}

      </div>

    </div>
  );
}