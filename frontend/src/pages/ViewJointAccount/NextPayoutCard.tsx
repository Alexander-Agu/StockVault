import { useState } from "react";
import { FaUserClock, FaMoneyBillWave } from "react-icons/fa6";
import { ExecutePayoutSlot, GetPayoutSlot, type PayoutSlot } from "../../state/PayoutSlot/PayoutSlotSlicer";
import { FetchAccountTransactions } from "../../state/Transaction/TransactionSlicer";
import { FetchMembers } from "../../state/Members/MemberSlicer";
import type { PayoutCycle } from "../../state/PayoutCycle/PayoutCycleSlicer";

interface NextPayoutCardProps {
  currentMonthPayoutUser: any;
  payoutSlots: PayoutSlot[];
  isAdmin: any;
  payoutCycle: PayoutCycle | null;
  jointAccountId?: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  dispatch: any;
}

export default function NextPayoutCard({ 
  currentMonthPayoutUser, 
  payoutSlots, 
  isAdmin, 
  payoutCycle,
  jointAccountId,
  onSuccess,
  onError,
  dispatch 
}: NextPayoutCardProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  
  // Get the current slot that needs to be paid
  const currentSlot = payoutSlots?.find(slot => slot.cycleId == payoutCycle?.id && slot.position == payoutCycle.cycleNumber);

  // Handle the payout execution
  const handleExecutePayout = async () => {
    if (!payoutCycle?.id || !currentSlot?.id) {
      onError("No pending payout slot found");
      return;
    }

    setIsExecuting(true);

    try {
      const executedSlot = await dispatch(ExecutePayoutSlot(payoutCycle.id, currentSlot.id));
      
      if (executedSlot) {
        onSuccess(`Successfully paid out to ${currentMonthPayoutUser.user?.fullName || 'member'}!`);
        
        // Refresh all data after successful payout
        await dispatch(GetPayoutSlot(payoutCycle.id));
        if (jointAccountId) {
          await dispatch(FetchAccountTransactions(String(jointAccountId), "JOINT"));
          await dispatch(FetchMembers(Number(jointAccountId)));
        }
      } else {
        onError("Failed to execute payout. Make sure the account has enough balance.");
      }
    } catch (error: any) {
      onError(error?.message || "An error occurred while processing the payout");
      console.error(error);
    } finally {
      setIsExecuting(false);
    }
  };

  // Find the position number for display
  const position = payoutSlots?.find(slot => !slot.isPaidOut)?.position || 'Next';

  return (
    <>
      {/* Desktop version - horizontal layout */}
      <div className="hidden sm:block mt-8 pt-6 border-t border-red-100/50">
        <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left side - User info */}
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3">
                <FaUserClock className="text-white" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1">
                  Next Payout Recipient
                </p>
                <p className="text-xl font-black text-slate-900">
                  {currentMonthPayoutUser.user?.fullName || 
                   currentMonthPayoutUser.user?.email || 
                   currentMonthPayoutUser.name ||
                   `Member ${currentMonthPayoutUser.id}`}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Position #{position} in payout order
                </p>
              </div>
            </div>
            
            {/* Execute button (only for admins) */}
            {isAdmin && currentSlot && !currentSlot.isPaidOut && (
              <button
                onClick={handleExecutePayout}
                disabled={isExecuting}
                className="bg-red-600 text-white px-6 py-3 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20 active:scale-[0.98]"
              >
                <FaMoneyBillWave size={12} />
                {isExecuting ? "Processing..." : "Execute Payout"}
              </button>
            )}
            
            {/* Status badge for non-admins */}
            {!isAdmin && currentSlot && !currentSlot.isPaidOut && (
              <div className="bg-yellow-100 text-yellow-700 px-4 py-2 text-[10px] font-bold uppercase tracking-wider">
                Pending Payout
              </div>
            )}

            {currentSlot?.isPaidOut && (
              <div className="bg-green-100 text-green-700 px-4 py-2 text-[10px] font-bold uppercase tracking-wider">
                ✓ Already Paid
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile version - stacked vertical layout with button at bottom */}
      <div className="sm:hidden mt-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-4 rounded-none">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-red-600 p-2">
            <FaUserClock className="text-white" size={14} />
          </div>
          <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
            Next Payout
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-base font-bold text-slate-900">
            {currentMonthPayoutUser.user?.fullName || 
             currentMonthPayoutUser.user?.email || 
             currentMonthPayoutUser.name ||
             `Member ${currentMonthPayoutUser.id}`}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Position #{position} in payout order
          </p>
        </div>
        
        {/* Execute button for mobile - full width */}
        {isAdmin && currentSlot && !currentSlot.isPaidOut && (
          <button
            onClick={handleExecutePayout}
            disabled={isExecuting}
            className="w-full bg-red-600 text-white px-4 py-3 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20 active:scale-[0.98]"
          >
            <FaMoneyBillWave size={12} />
            {isExecuting ? "Processing..." : "Execute Payout"}
          </button>
        )}
        
        {/* Status for non-admins on mobile */}
        {!isAdmin && currentSlot && !currentSlot.isPaidOut && (
          <div className="bg-yellow-100 text-yellow-700 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-center">
            Pending Payout
          </div>
        )}

        {currentSlot?.isPaidOut && (
          <div className="bg-green-100 text-green-700 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-center">
            ✓ Already Paid
          </div>
        )}
      </div>
    </>
  );
}