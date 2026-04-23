import { useEffect, useState } from "react";
import { FaUsers, FaPlus } from "react-icons/fa6";
import Transactions from "../../components/Transaction/Transaction.tsx";
import NavigateBackButton from "../../UI/NavigateBackButton.tsx";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../state/store/store.tsx";
import Members from "../../components/Members/Members.tsx";
import { FetchAccountTransactions } from "../../state/Transaction/TransactionSlicer.tsx";
import { FetchMembers } from "../../state/Members/MemberSlicer.tsx";
import { FetchSchedule } from "../../state/ContributionSchedule/ContributionScheduleSlicer.ts";
import { GetPayoutCycle, type PayoutCycle } from "../../state/PayoutCycle/PayoutCycleSlicer.tsx";
import { GetPayoutSlot } from "../../state/PayoutSlot/PayoutSlotSlicer.tsx";
import AccountHeader from "./AccountHeader.tsx";
import StatsGrid from "./StatsGrid.tsx";
import NextPayoutCard from "./NextPayoutCard.tsx";
import PayoutSchedule from "./PayoutSchedule.tsx";

export default function ViewJointAccount() {
  // Get all the data from Redux store
  const jointAccount = useSelector((state: RootState) => state.jointAccount);
  const contributionSchedule = useSelector((state: RootState) => state.contributionSchedule);
  const transections = useSelector((state: RootState) => state.transactions);
  const member = useSelector((state: RootState) => state.member);
  const payoutCycleState = useSelector((state: RootState) => state.cycle);
  const payoutSlotState = useSelector((state: RootState) => state.slot);
  
  const { jointAccountId, userId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  
  // Local state
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentMonthPayoutUser, setCurrentMonthPayoutUser] = useState<any>(null);

  // Extract needed data
  const account = jointAccount.jointAccounts?.find(x => x.id === Number(jointAccountId));
  const schedule = contributionSchedule.schedule;
  const members = member.members;
  const payoutCycle: PayoutCycle | null =  payoutCycleState.payoutCycle || null;
  const payoutSlots = payoutSlotState.payoutSlot || [];

  // Check if current user is an admin
  const isAdmin = useSelector((state: RootState) => {
    return state.member.members?.find(a => a.userId == Number(userId) && a.role.toLowerCase() === "admin");
  });

  // Load initial data when page loads
  useEffect(() => {
    const id = Number(jointAccountId);
    if (id) {
      dispatch(FetchAccountTransactions(String(id), "JOINT"));
      dispatch(FetchSchedule(id));
      dispatch(FetchMembers(id));
      fetchPayoutData(id);
    }
  }, [jointAccountId, dispatch]);

  // Get payout data (cycle and slots)
  const fetchPayoutData = async (accountId: number) => {
    try {
      setErrorMessage(null);
      await dispatch(GetPayoutCycle(accountId));
    } catch (error) {
      console.log("No active payout cycle found", error);
      setErrorMessage("No active payout schedule found. Create one to get started.");
    }
  };

  // When we have a payout cycle, get its slots
  useEffect(() => {
    if (payoutCycle?.id) {
      dispatch(GetPayoutSlot(payoutCycle.id));
    }
  }, [payoutCycle?.id, dispatch]);

  // Calculate current account balance from all transactions
  useEffect(() => {
    if (!transections?.transactions) return;
    const total = transections.transactions.reduce((sum, x) => sum + x.amountCents, 0);
    setBalance(total);
  }, [transections.transactions]);

  // Figure out who should get paid this month
  useEffect(() => {
    if (payoutSlots && payoutSlots.length > 0 && members && members.length > 0) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // Look for the slot that's scheduled for this month and not paid yet
      const currentSlot = payoutSlots.find(slot => {
        if (!slot.payoutDate) return false;
        const slotDate = new Date(slot.payoutDate);
        return slotDate.getMonth() === currentMonth && 
               slotDate.getFullYear() === currentYear && 
               !slot.isPaidOut;
      });
      
      if (currentSlot) {
        const memberForSlot = members.find(m => m.userId === currentSlot.userId);
        if (memberForSlot) {
          setCurrentMonthPayoutUser(memberForSlot);
        } else {
          setCurrentMonthPayoutUser(null);
        }
      } else {
        // If no slot for this month, find the next upcoming one
        const upcomingSlot = payoutSlots.find(slot => !slot.isPaidOut && slot.payoutDate);
        if (upcomingSlot) {
          const memberForSlot = members.find(m => m.userId === upcomingSlot.userId);
          setCurrentMonthPayoutUser(memberForSlot || null);
        } else {
          setCurrentMonthPayoutUser(null);
        }
      }
    }
  }, [payoutSlots, members]);

  // Don't render if we don't have essential data
  if (account == null || members == null) return null;

  // Stats for the progress bar
  const totalPaidSlots = payoutSlots?.filter(slot => slot.isPaidOut).length || 0;
  const totalSlots = payoutSlots?.length || 0;
  
  // Determine if we should show/hide the update button
  // Hide update button if there's an active payout cycle (can't edit while paying out)
  const showUpdateButton = !payoutCycle;

  return (
    <div className="w-full min-h-screen bg-[#F8EEED] flex overflow-hidden font-sans text-slate-900">
      
      <section className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-10">
          
          {/* Top bar with back button and mobile member button */}
          <div className="flex justify-between items-center">
            <NavigateBackButton title="Back" />
            
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="xl:hidden flex items-center gap-2 bg-white px-4 sm:px-6 py-2 rounded-none border border-red-100 text-[10px] font-bold uppercase tracking-widest text-red-600 shadow-sm transition-all active:scale-95"
            >
              <FaUsers size={12} /> Members
            </button>
          </div>

          {/* Error message display */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-none">
              <p className="text-red-800 text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          {/* Success message display */}
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-none">
              <p className="text-green-800 text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {/* Main account info section */}
          <div className="w-full bg-white/60 backdrop-blur-md border border-white rounded-none p-6 sm:p-10 shadow-xl shadow-red-900/5">
            
            {/* Header with account title and action buttons */}
            <AccountHeader 
              account={account}
              schedule={schedule}
              currentMonthPayoutUser={currentMonthPayoutUser}
              payoutSlots={payoutSlots}
              showUpdateButton={showUpdateButton}
            />

            {/* Stats cards showing balance, expected total, and progress */}
            <StatsGrid 
              balance={balance}
              payoutCycle={payoutCycle}
              totalPaidSlots={totalPaidSlots}
              totalSlots={totalSlots}
            />

            {/* Card showing who's getting paid this month with execute button */}
            {currentMonthPayoutUser && (
              <NextPayoutCard 
                currentMonthPayoutUser={currentMonthPayoutUser}
                payoutSlots={payoutSlots}
                isAdmin={isAdmin}
                payoutCycle={payoutCycle}
                jointAccountId={jointAccountId}
                onSuccess={(msg) => setSuccessMessage(msg)}
                onError={(msg) => setErrorMessage(msg)}
                dispatch={dispatch}
              />
            )}

            {/* Payout schedule section - where admins manage cycles and slots */}
            <PayoutSchedule 
              payoutCycle={payoutCycle}
              payoutSlots={payoutSlots}
              members={members}
              isAdmin={isAdmin}
              account={account}
              schedule={schedule}
              onCycleCreated={() => {
                if (jointAccountId) fetchPayoutData(Number(jointAccountId));
                setSuccessMessage("Payout cycle created successfully!");
              }}
              onSlotsCreated={() => {
                if (payoutCycle?.id) dispatch(GetPayoutSlot(payoutCycle.id));
                setSuccessMessage("Payout slots created successfully!");
              }}
              onError={(msg) => setErrorMessage(msg)}
              dispatch={dispatch}
            />
          </div>

          {/* Transaction history section */}
          <div className="w-full">
            <Transactions />
          </div>
        </div>
      </section>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-red-900/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Members sidebar component */}
      <Members setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
    </div>
  );
}