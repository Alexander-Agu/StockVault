import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

interface JointAccountCardProps {
  title: string;
  balance: number;
  createdBy: number;
  createdAt: Date;
  id: number;
  path: string;
}

export default function JointAccountCard({ 
  title, 
  balance,
  createdAt,
  createdBy,
  id,
  path
}: JointAccountCardProps) {

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">

      <div className="w-full flex items-center justify-between pb-3 border-b border-slate-200">

        <h2 className="font-semibold text-lg text-slate-900">
          {title}
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-3">

          <div className="flex items-center gap-1 text-slate-400 font-semibold text-xs uppercase">
            <FaUsers size={14} />
            <span>4 Members</span>
          </div>

          <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold text-slate-700 uppercase">
            Admin
          </span>

        </div>

      </div>

      <div className="flex items-end justify-between">

        <div className="flex flex-col">

          <p className="text-xs font-semibold text-slate-400 mb-1">
            Monthly Contribution
          </p>

          <h2 className="text-3xl font-semibold text-slate-900">
            R{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>

        </div>

        <Link
          to={`${path}${id}`}
          className="text-slate-700 text-xs font-semibold hover:text-black"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}