import { useEffect, useState } from "react";
import { 
  FaUsers, 
  FaArrowRotateRight,
  FaPlus,
  FaMoneyBillWave,
} from "react-icons/fa6";
import Transactions from "../../components/Transaction/Transaction";
import NavigateBackButton from "../../UI/NavigateBackButton";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../state/store/store";
import Members from "../../components/Members/Members";
import { FetchAccountTransactions } from "../../state/Transaction/TransactionSlicer";
import { FetchMembers } from "../../state/Members/MemberSlicer";
import { FetchSchedule } from "../../state/ContributionSchedule/ContributionScheduleSlicer";
import { CreatePayoutCycle, GetPayoutCycle } from "../../state/PayoutCycle/PayoutCycleSlicer";
import { CreatePayoutSlot, ExecutePayoutSlot, GetPayoutSlot } from "../../state/PayoutSlot/PayoutSlotSlicer";
import { FaCalendarAlt, FaExclamationTriangle, FaUserClock, FaLayerGroup } from "react-icons/fa";

export default function ViewJointAccount() {
  const jointAccount = useSelector((state: RootState) => state.jointAccount);
  const contributionSchedule = useSelector((state: RootState) => state.contributionSchedule);
  const transections = useSelector((state: RootState) => state.transactions);
  const member = useSelector((state: RootState) => state.member);
  const payoutCycleState = useSelector((state: RootState) => state.cycle);
  const payoutSlotState = useSelector((state: RootState) => state.slot);
  
  const { jointAccountId, userId } = useParams();
  
  const dispatch = useDispatch<AppDispatch>();
  const [balance, setBalance] = useState(0);
  const [isCreatingCycle, setIsCreatingCycle] = useState(false);
  const [isCreatingSlots, setIsCreatingSlots] = useState(false);
  const [isExecutingSlot, setIsExecutingSlot] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentMonthPayoutUser, setCurrentMonthPayoutUser] = useState<any>(null);

  const account = jointAccount.jointAccounts?.find(x => x.id === Number(jointAccountId));
  const schedule = contributionSchedule.schedule;
  const members = member.members;
  const payoutCycle = payoutCycleState.payoutCycle;
  // Fix: Make sure we're accessing the correct property from state
  const payoutSlots = payoutSlotState.payoutSlot || [];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Check if user is admin
  const isAdmin = useSelector((state: RootState) => {
    return state.member.members?.find(a => a.userId == Number(userId) && a.role.toLowerCase() === "admin");
  });
      
  useEffect(() => {
    const id = Number(jointAccountId);
    if (id) {
      dispatch(FetchAccountTransactions(String(id), "JOINT"));
      dispatch(FetchSchedule(id));
      dispatch(FetchMembers(id));
      fetchPayoutData(id);
    }
  }, [jointAccountId, dispatch]);

  const fetchPayoutData = async (accountId: number) => {
    try {
      setErrorMessage(null);
      const result = await dispatch(GetPayoutCycle(accountId));
      console.log("Fetched payout cycle:", result);
    } catch (error) {
      console.log("No active payout cycle found", error);
      setErrorMessage("No active payout schedule found. Create one to get started.");
    }
  };

  useEffect(() => {
    if (payoutCycle?.id) {
      console.log("Fetching slots for cycle:", payoutCycle.id);
      dispatch(GetPayoutSlot(payoutCycle.id));
    }
  }, [payoutCycle?.id, dispatch]);

  useEffect(() => {
    if (!transections?.transactions) return;
    const total = transections.transactions.reduce((sum, x) => sum + x.amountCents, 0);
    setBalance(total);
  }, [transections.transactions]);

  // Determine who gets paid in the current month
  useEffect(() => {
    console.log("Checking payouts - Slots:", payoutSlots, "Members:", members);
    
    if (payoutSlots && payoutSlots.length > 0 && members && members.length > 0) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // Find the slot that should be paid this month
      const currentSlot = payoutSlots.find(slot => {
        if (!slot.payoutDate) return false;
        const slotDate = new Date(slot.payoutDate);
        return slotDate.getMonth() === currentMonth && 
               slotDate.getFullYear() === currentYear && 
               !slot.isPaidOut;
      });
      
      console.log("Current slot found:", currentSlot);
      
      if (currentSlot) {
        // Find member by userId instead of position
        const memberForSlot = members.find(m => m.userId === currentSlot.userId);
        if (memberForSlot) {
          setCurrentMonthPayoutUser(memberForSlot);
          console.log("Set current month user:", memberForSlot);
        } else {
          setCurrentMonthPayoutUser(null);
        }
      } else {
        // Find next upcoming slot
        const upcomingSlot = payoutSlots.find(slot => !slot.isPaidOut && slot.payoutDate);
        if (upcomingSlot) {
          const memberForSlot = members.find(m => m.userId === upcomingSlot.userId);
          if (memberForSlot) {
            setCurrentMonthPayoutUser(memberForSlot);
            console.log("Set upcoming user:", memberForSlot);
          } else {
            setCurrentMonthPayoutUser(null);
          }
        } else {
          setCurrentMonthPayoutUser(null);
        }
      }
    } else {
      console.log("Missing data - Slots:", payoutSlots?.length, "Members:", members?.length);
    }
  }, [payoutSlots, members]);

  const handleCreatePayoutCycle = async () => {
    if (!account?.id || !schedule?.id) {
      setErrorMessage("Cannot create payout cycle: Missing account or schedule information");
      return;
    }

    setIsCreatingCycle(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const cycle = await dispatch(CreatePayoutCycle(account.id, schedule.id));
      console.log("Created cycle:", cycle);
      
      if (cycle) {
        setSuccessMessage("Payout cycle created successfully! You can now create slots.");
        await fetchPayoutData(account.id);
      } else {
        setErrorMessage("Failed to create payout cycle");
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating payout cycle");
      console.error(error);
    } finally {
      setIsCreatingCycle(false);
    }
  };

  const handleCreatePayoutSlots = async () => {
    if (!payoutCycle?.id) {
      setErrorMessage("No active payout cycle found. Please create a cycle first.");
      return;
    }

    setIsCreatingSlots(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const slots = await dispatch(CreatePayoutSlot(payoutCycle.id));
      console.log("Created slots:", slots);
      
      if (slots && slots.length > 0) {
        setSuccessMessage(`${slots.length} payout slots created successfully!`);
        // Force refresh slots
        await dispatch(GetPayoutSlot(payoutCycle.id));
      } else {
        setErrorMessage("Failed to create payout slots");
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating payout slots");
      console.error(error);
    } finally {
      setIsCreatingSlots(false);
    }
  };

  const handleExecutePayoutSlot = async (slotId: number) => {
    if (!payoutCycle?.id) {
      setErrorMessage("No active payout cycle found");
      return;
    }

    setIsExecutingSlot(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      console.log("Executing slot:", slotId, "for cycle:", payoutCycle.id);
      const executedSlot = await dispatch(ExecutePayoutSlot(payoutCycle.id, slotId));
      console.log("Executed slot result:", executedSlot);
      
      if (executedSlot) {
        setSuccessMessage(`Payout slot ${slotId} executed successfully!`);
        // Refresh slots after execution
        await dispatch(GetPayoutSlot(payoutCycle.id));
        // Also refresh transactions to update balance
        if (jointAccountId) {
          await dispatch(FetchAccountTransactions(String(jointAccountId), "JOINT"));
        }
        // Refresh members in case roles changed
        if (jointAccountId) {
          await dispatch(FetchMembers(Number(jointAccountId)));
        }
      } else {
        setErrorMessage("Failed to execute payout slot");
      }
    } catch (error) {
      setErrorMessage("An error occurred while executing payout slot");
      console.error(error);
    } finally {
      setIsExecutingSlot(false);
    }
  };

  // Debug logging
  useEffect(() => {
    console.log("Current state:", {
      payoutCycle,
      payoutSlots,
      payoutSlotState,
      members,
      currentMonthPayoutUser,
      totalSlots: payoutSlots?.length,
      totalPaidSlots: payoutSlots?.filter(s => s.isPaidOut).length
    });
  }, [payoutCycle, payoutSlots, payoutSlotState, members, currentMonthPayoutUser]);

  if (account == null || members == null) return null;

  const totalPaidSlots = payoutSlots?.filter(slot => slot.isPaidOut).length || 0;
  const totalSlots = payoutSlots?.length || 0;
  const progressPercentage = totalSlots > 0 ? (totalPaidSlots / totalSlots) * 100 : 0;
  const hasCycleButNoSlots = payoutCycle && (!payoutSlots || payoutSlots.length === 0);

  return (
    <div className="w-full min-h-screen bg-[#F8EEED] flex overflow-hidden font-sans text-slate-900">
      
      <section className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-10">
          
          <div className="flex justify-between items-center">
            <NavigateBackButton title="Back" />
            
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="xl:hidden flex items-center gap-2 bg-white px-4 sm:px-6 py-2 rounded-none border border-red-100 text-[10px] font-bold uppercase tracking-widest text-red-600 shadow-sm transition-all active:scale-95"
            >
              <FaUsers size={12} /> Members
            </button>
          </div>

          {/* Error and Success Messages */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-none flex items-start gap-3">
              <FaExclamationTriangle className="text-red-600 mt-0.5 flex-shrink-0" size={16} />
              <div className="flex-1">
                <p className="text-red-800 text-sm font-medium">{errorMessage}</p>
              </div>
              <button 
                onClick={() => setErrorMessage(null)}
                className="text-red-600 hover:text-red-800 flex-shrink-0"
              >
                ×
              </button>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-none flex items-start gap-3">
              <div className="flex-1">
                <p className="text-green-800 text-sm font-medium">{successMessage}</p>
              </div>
              <button 
                onClick={() => setSuccessMessage(null)}
                className="text-green-600 hover:text-green-800 flex-shrink-0"
              >
                ×
              </button>
            </div>
          )}

          {/* Header Section */}
          <div className="w-full bg-white/60 backdrop-blur-md border border-white rounded-none p-6 sm:p-10 shadow-xl shadow-red-900/5">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
              <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-auto">
                <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-[10px]">Joint Account</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none break-words">
                  {account?.title}
                </h1>
                
                {/* Who gets paid this month - Mobile Card */}
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
                          Position #{payoutSlots?.find(slot => 
                            slot.payoutDate && new Date(slot.payoutDate).getMonth() === new Date().getMonth()
                          )?.position || 
                          payoutSlots?.find(slot => !slot.isPaidOut)?.position || 
                          'Next'}
                        </p>
                      </div>
                      <div className="bg-red-600 text-white px-3 py-1 text-[10px] font-bold uppercase">
                        Up Next
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 w-full lg:w-auto">
                <div className="bg-white/40 border border-red-50 p-4 sm:p-6 rounded-none w-full sm:w-auto">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contribution</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">
                    R {schedule?.amount}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">/ {schedule?.frequency}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Link to={`deposit`} className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                    <FaPlus size={10}/> Contribute
                  </Link>

                  <Link to={`update`} className="border border-black bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 hover:text-white hover:border-red-700 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                    <FaPlus size={10}/> Update Account
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-0 mt-8 sm:mt-12">
              <div className="p-6 sm:p-8 bg-white/80 sm:border-r border-red-100/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current Balance</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">R {balance}</p>
              </div>
              
              <div className="p-6 sm:p-8 bg-white/80 sm:border-r border-red-100/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Expected Total</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-300 tracking-tighter">
                  R {payoutCycle?.estimatedTotalAmount || "0.00"}
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-red-600 text-white sm:rounded-r-none">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-70">Collection Progress</p>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p className="text-3xl sm:text-4xl font-black tracking-tighter">{totalPaidSlots} / {totalSlots}</p>
                  <span className="text-xs font-bold opacity-70 tracking-widest">Paid</span>
                </div>
                {totalSlots > 0 && (
                  <div className="mt-3 h-1 bg-white/20">
                    <div 
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Who gets paid this month - Desktop Card */}
            {currentMonthPayoutUser && (
              <div className="hidden lg:block mt-8 pt-6 border-t border-red-100/50">
                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
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
                          Position #{payoutSlots?.find(slot => !slot.isPaidOut)?.position || 'Next'} in payout order
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider">
                      Scheduled for This Month
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payout Schedule Section - Responsive */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-red-100/50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">Payout Schedule</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage payout cycles and slots</p>
                </div>
                
                {isAdmin && (
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    {!payoutCycle && (
                      <button
                        onClick={handleCreatePayoutCycle}
                        disabled={isCreatingCycle}
                        className="bg-red-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                      >
                        <FaCalendarAlt size={12} />
                        {isCreatingCycle ? "Creating..." : "Create Payout Cycle"}
                      </button>
                    )}
                    
                    {payoutCycle && hasCycleButNoSlots && (
                      <button
                        onClick={handleCreatePayoutSlots}
                        disabled={isCreatingSlots}
                        className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                      >
                        <FaLayerGroup size={12} />
                        {isCreatingSlots ? "Creating..." : "Create Payout Slots"}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {!payoutCycle ? (
                <div className="bg-white/40 border border-red-100 p-6 sm:p-8 text-center">
                  <p className="text-slate-500">No active payout cycle</p>
                  {isAdmin && (
                    <p className="text-xs text-slate-400 mt-2">Click the button above to create a new payout cycle</p>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Cycle Information - Responsive Grid */}
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
                  </div>

                  {/* Payout Slots - Responsive */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">Payout Slots</h3>
                    {payoutSlots && payoutSlots.length > 0 ? (
                      <div className="space-y-3">
                        {payoutSlots.map((slot) => {
                          // Find member by userId instead of position
                          const slotMember = members.find(m => m.userId === slot.userId);
                          const isCurrentSlot = slot.payoutDate && 
                            new Date(slot.payoutDate).getMonth() === new Date().getMonth() &&
                            !slot.isPaidOut;
                          
                          return (
                            <div 
                              key={slot.id} 
                              className={`bg-white/40 border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                                isCurrentSlot ? 'border-red-500 bg-red-50/30' : 'border-red-100'
                              }`}
                            >
                              <div className="flex-1 w-full">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                  <span className="text-sm font-bold text-slate-900">Position #{slot.position}</span>
                                  <span className={`text-xs px-2 py-1 font-bold uppercase tracking-wider ${
                                    slot.isPaidOut ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {slot.isPaidOut ? 'Paid Out' : 'Pending'}
                                  </span>
                                  {isCurrentSlot && (
                                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 font-bold uppercase tracking-wider">
                                      Current Month
                                    </span>
                                  )}
                                </div>
                                
                                {slotMember && (
                                  <p className="text-xs text-slate-600 mt-2">
                                    Member: {slotMember.name}
                                  </p>
                                )}
                                
                                {slot.payoutDate && (
                                  <p className="text-xs text-slate-500 mt-1">
                                    Payout Date: {new Date(slot.payoutDate).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                              
                              {isAdmin && !slot.isPaidOut && (
                                <button
                                  onClick={() => handleExecutePayoutSlot(slot.id)}
                                  disabled={isExecutingSlot}
                                  className="bg-green-600 text-white px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-green-700 transition-all flex items-center gap-2 disabled:opacity-50 w-full sm:w-auto justify-center"
                                >
                                  <FaMoneyBillWave size={10} />
                                  {isExecutingSlot ? "Executing..." : "Execute Payout"}
                                </button>
                              )}
                              
                              {slot.isPaidOut && (
                                <div className="text-green-600 text-xs font-bold uppercase tracking-wider w-full sm:w-auto text-center sm:text-left">
                                  ✓ Completed
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-white/40 border border-red-100 p-6 sm:p-8 text-center">
                        <p className="text-slate-500">No payout slots available</p>
                        {isAdmin && hasCycleButNoSlots && (
                          <button
                            onClick={handleCreatePayoutSlots}
                            disabled={isCreatingSlots}
                            className="mt-4 bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50 mx-auto"
                          >
                            <FaLayerGroup size={12} />
                            {isCreatingSlots ? "Creating..." : "Create Payout Slots"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <Transactions />
          </div>
        </div>
      </section>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-red-900/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Members setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
    </div>
  );
}