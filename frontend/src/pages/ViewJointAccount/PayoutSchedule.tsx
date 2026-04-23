import { useState } from "react";
import { FaCalendarAlt, FaLayerGroup, FaRocket } from "react-icons/fa";
import { CreatePayoutCycle } from "../../state/PayoutCycle/PayoutCycleSlicer";
import { CreatePayoutSlot, GetPayoutSlot } from "../../state/PayoutSlot/PayoutSlotSlicer";

interface PayoutScheduleProps {
  payoutCycle: any;
  payoutSlots: any[];
  members: any[];
  isAdmin: any;
  account: any;
  schedule: any;
  onCycleCreated: () => void;
  onSlotsCreated: () => void;
  onError: (msg: string) => void;
  dispatch: any;
}

export default function PayoutSchedule({ 
  payoutCycle, 
  payoutSlots, 
  members, 
  isAdmin, 
  account, 
  schedule,
  onCycleCreated,
  onSlotsCreated,
  onError,
  dispatch 
}: PayoutScheduleProps) {
  const [isCreatingFull, setIsCreatingFull] = useState(false);
  const [isCreatingSlots, setIsCreatingSlots] = useState(false);
  
  const hasCycleButNoSlots = payoutCycle && (!payoutSlots || payoutSlots.length === 0);
  const hasCycleAndSlots = payoutCycle && payoutSlots && payoutSlots.length > 0;

  // One function to rule them all - creates both cycle and slots together
  const handleFullSetup = async () => {
    if (!account?.id || !schedule?.id) {
      onError("Missing account or schedule information");
      return;
    }

    setIsCreatingFull(true);

    try {
      // Step 1: Create the payout cycle
      const cycle = await dispatch(CreatePayoutCycle(account.id, schedule.id));
      
      if (!cycle) {
        onError("Failed to create payout cycle. Please try again.");
        setIsCreatingFull(false);
        return;
      }
      
      onCycleCreated();
      
      // Step 2: Now that we have a cycle, create the slots
      if (cycle && cycle.id) {
        const slots = await dispatch(CreatePayoutSlot(cycle.id));
        
        if (slots && slots.length > 0) {
          onSlotsCreated();
          await dispatch(GetPayoutSlot(cycle.id));
        } else {
          // Cycle created but slots failed - show a warning
          onError("Payout cycle created successfully, but failed to create slots. Please click 'Create Slots' to complete setup.");
        }
      }
    } catch (error) {
      onError("An error occurred during setup");
      console.error(error);
    } finally {
      setIsCreatingFull(false);
    }
  };

  // Create just the payout cycle (if needed)
  const handleCreatePayoutCycle = async () => {
    if (!account?.id || !schedule?.id) {
      onError("Missing account or schedule information");
      return;
    }

    setIsCreatingFull(true);

    try {
      const cycle = await dispatch(CreatePayoutCycle(account.id, schedule.id));
      if (cycle) {
        onCycleCreated();
      } else {
        onError("Failed to create payout cycle");
      }
    } catch (error) {
      onError("An error occurred while creating payout cycle");
      console.error(error);
    } finally {
      setIsCreatingFull(false);
    }
  };

  // Create only payout slots (for when cycle exists but slots are missing)
  const handleCreatePayoutSlots = async () => {
    if (!payoutCycle?.id) {
      onError("No active payout cycle found");
      return;
    }

    setIsCreatingSlots(true);

    try {
      const slots = await dispatch(CreatePayoutSlot(payoutCycle.id));
      if (slots && slots.length > 0) {
        onSlotsCreated();
        await dispatch(GetPayoutSlot(payoutCycle.id));
      } else {
        onError("Failed to create payout slots");
      }
    } catch (error) {
      onError("An error occurred while creating payout slots");
      console.error(error);
    } finally {
      setIsCreatingSlots(false);
    }
  };

  return (
    <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-red-100/50">
      {/* Header with title and action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">
            Payout Schedule
          </h2>
          <p className="text-xs text-slate-500 mt-1">Manage payout cycles and slots</p>
        </div>
        
        {/* Admin-only action buttons */}
        {isAdmin && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Show the main setup button when nothing exists yet */}
            {!payoutCycle && (
              <button
                onClick={handleFullSetup}
                disabled={isCreatingFull}
                className="bg-red-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center gap-2 disabled:opacity-50 w-full sm:w-auto justify-center shadow-lg shadow-red-500/20"
              >
                <FaRocket size={12} />
                {isCreatingFull ? "Setting Up..." : "Setup Complete Payout System"}
              </button>
            )}
            
            {/* Show create cycle only button if no cycle exists (as backup) */}
            {!payoutCycle && (
              <button
                onClick={handleCreatePayoutCycle}
                disabled={isCreatingFull}
                className="border border-red-600 bg-white text-red-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 transition-all flex items-center gap-2 disabled:opacity-50 w-full sm:w-auto justify-center"
              >
                <FaCalendarAlt size={12} />
                Create Cycle Only
              </button>
            )}
            
            {/* Show create slots button if cycle exists but slots are missing */}
            {payoutCycle && hasCycleButNoSlots && (
              <button
                onClick={handleCreatePayoutSlots}
                disabled={isCreatingSlots}
                className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50 w-full sm:w-auto justify-center"
              >
                <FaLayerGroup size={12} />
                {isCreatingSlots ? "Creating Slots..." : "Create Missing Slots"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Show appropriate content based on whether we have a cycle */}
      {!payoutCycle ? (
        // No cycle exists yet - show setup instructions
        <div className="bg-white/40 border border-red-100 p-6 sm:p-8 text-center">
          <p className="text-slate-500">No payout system set up yet</p>
          {isAdmin && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-slate-400">
                Click "Setup Complete Payout System" to create both the cycle and slots automatically
              </p>
              <p className="text-xs text-slate-400">
                Or use "Create Cycle Only" if you want to create slots manually
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cycle information cards */}
          <div className="bg-white/40 border border-red-100 p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cycle Number</p>
                <p className="text-base sm:text-lg font-bold text-slate-900">#{payoutCycle.cycleNumber}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Start Date</p>
                <p className="text-xs sm:text-sm font-medium text-slate-900">
                  {new Date(payoutCycle.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">End Date</p>
                <p className="text-xs sm:text-sm font-medium text-slate-900">
                  {new Date(payoutCycle.endDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Members</p>
                <p className="text-base sm:text-lg font-bold text-slate-900">{payoutCycle.totalMembersAtStart}</p>
              </div>
            </div>
            
            {/* Warning message if cycle exists but no slots */}
            {hasCycleButNoSlots && (
              <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500">
                <p className="text-xs text-yellow-800">
                  ⚠️ Cycle created but slots are missing. Click "Create Missing Slots" to complete setup.
                </p>
              </div>
            )}
          </div>

          {/* Payout slots table - only show if we have slots */}
          {hasCycleAndSlots ? (
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">Payout Schedule</h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white/40 border border-red-100">
                  <thead className="bg-red-50">
                    <tr>
                      <th className="text-left p-3 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="text-left p-3 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="text-left p-3 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        Payout Date
                      </th>
                      <th className="text-left p-3 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payoutSlots.map((slot) => {
                      const slotMember = members.find(m => m.userId === slot.userId);
                      const isCurrentSlot = slot.payoutDate && 
                        new Date(slot.payoutDate).getMonth() === new Date().getMonth() &&
                        !slot.isPaidOut;
                      
                      return (
                        <tr key={slot.id} className={`border-t border-red-100 ${
                          isCurrentSlot ? 'bg-red-50/30' : ''
                        }`}>
                          <td className="p-3 text-sm font-bold text-slate-900">
                            #{slot.position}
                          </td>
                          <td className="p-3 text-sm text-slate-700">
                            {slotMember?.name || slotMember?.user?.fullName || `Member ${slot.userId}`}
                          </td>
                          <td className="p-3 text-sm text-slate-700">
                            {slot.payoutDate ? new Date(slot.payoutDate).toLocaleDateString() : 'Not scheduled'}
                          </td>
                          <td className="p-3">
                            <span className={`text-xs px-2 py-1 font-bold uppercase tracking-wider ${
                              slot.isPaidOut ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {slot.isPaidOut ? 'Paid Out' : 'Pending'}
                            </span>
                            {isCurrentSlot && !slot.isPaidOut && (
                              <span className="ml-2 text-xs px-2 py-1 bg-red-100 text-red-700 font-bold uppercase tracking-wider">
                                Current
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // No slots created yet - show helpful message
            <div className="bg-white/40 border border-red-100 p-6 sm:p-8 text-center">
              <p className="text-slate-500">No payout slots have been created yet</p>
              {isAdmin && hasCycleButNoSlots && (
                <div className="mt-4">
                  <button
                    onClick={handleCreatePayoutSlots}
                    disabled={isCreatingSlots}
                    className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50 mx-auto"
                  >
                    <FaLayerGroup size={12} />
                    {isCreatingSlots ? "Creating Slots..." : "Create Payout Slots"}
                  </button>
                  <p className="text-xs text-slate-400 mt-2">
                    Click the button above to generate the payout schedule
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}