import { Link } from "react-router-dom";
import { FaPlus, FaUserClock } from "react-icons/fa6";

interface AccountHeaderProps {
  account: any;
  schedule: any;
  currentMonthPayoutUser: any;
  payoutSlots: any[];
  showUpdateButton: boolean;
}

export default function AccountHeader({ 
  account, 
  schedule, 
  currentMonthPayoutUser, 
  payoutSlots,
  showUpdateButton 
}: AccountHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
      {/* Left side - Account title and mobile payout card */}
      <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-auto">
        <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-[10px]">
          Joint Account
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none break-words">
          {account?.title}
        </h1>
        
        {/* Mobile version of who gets paid - shows on small screens */}
        {currentMonthPayoutUser && (
          <div className="lg:hidden mt-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-4 rounded-none">
            <div className="flex items-center gap-2 mb-2">
              <FaUserClock className="text-red-600" size={14} />
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                This Month's Payout
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-slate-900">
                  {currentMonthPayoutUser.user?.fullName || 
                   currentMonthPayoutUser.user?.email || 
                   currentMonthPayoutUser.name ||
                   `Member ${currentMonthPayoutUser.id}`}
                </p>
                <p className="text-xs text-slate-600">
                  Position #{payoutSlots?.find(slot => !slot.isPaidOut)?.position || 'Next'}
                </p>
              </div>
              <div className="bg-red-600 text-white px-3 py-1 text-[10px] font-bold uppercase">
                Up Next
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right side - Contribution amount and action buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 w-full lg:w-auto">
        {/* Contribution card */}
        <div className="bg-white/40 border border-red-50 p-4 sm:p-6 rounded-none w-full sm:w-auto">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Contribution
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">
            R {schedule?.amount}
          </p>
          <p className="text-[10px] font-medium text-slate-400">/ {schedule?.frequency}</p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Link to={`deposit`} className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
            <FaPlus size={10}/> Contribute
          </Link>

          {/* Update button - only shows if there's no active payout cycle */}
          {showUpdateButton && (
            <Link to={`update`} className="border border-black bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 hover:text-white hover:border-red-700 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
              <FaPlus size={10}/> Update Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}