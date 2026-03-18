import { useEffect, useState } from "react";
import { 
  FaUsers, 
  FaXmark, 
  FaArrowRotateRight,
} from "react-icons/fa6";
import Transactions from "../components/Transaction/Transaction";
import NavigateBackButton from "../UI/NavigateBackButton";
import MemberItem from "../components/MemberItem/MemberItem";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../state/store/store";
import Members from "../components/Members/Members";
import { FetchAccountTransactions } from "../state/Transaction/TransactionSlicer";
import { FetchMembers } from "../state/Members/MemberSlicer";
import { FetchSchedule } from "../state/ContributionSchedule/ContributionScheduleSlicer";

interface JointAccount {
  id: number;
  title: string;
  createdBy: number;
  balance: number;
  createdAt: Date;
}


export default function ViewJointAccount() {
  const jointAccount = useSelector((state: RootState) => state.jointAccount);
  const contributionSchedule = useSelector((state: RootState) => state.contributionSchedule);
  const transections = useSelector((state: RootState) => state.transactions);
  const member = useSelector((state: RootState) => state.member);
  const { jointAccountId } = useParams();
  
  const dispatch = useDispatch<AppDispatch>();
  const [balance, setBalance] = useState(0);


  const account = jointAccount.jointAccounts?.find(x => x.id === Number(jointAccountId));
  const schedule = contributionSchedule.schedule;
  const members = member.members;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

      
  // Fetching data
  useEffect(() => {
    const id = Number(jointAccountId);
    if (id) {
      dispatch(FetchAccountTransactions(String(id), "JOINT"));
      dispatch(FetchSchedule(id));
      dispatch(FetchMembers(id));
    }
  }, [jointAccountId]);

  // Updating the state of the total amount
  useEffect(() => {
    if (!transections?.transactions) return;

    const total = transections.transactions.reduce(
      (sum, x) => sum + x.amountCents,
      0
    );

    setBalance(total);
  }, [transections.transactions]);


  if (account == null || members == null) return null;


  return (
    <div className="w-full min-h-screen bg-[#F8EEED] flex overflow-hidden">
      
      <section className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          
          <div className="flex justify-between items-center">
            <NavigateBackButton title="Go Back" />
            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="xl:hidden flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl border border-white font-bold text-slate-700 shadow-sm"
            >
              <FaUsers /> Members
            </button>
          </div>

          {/* STOKVEL HEADER CARD */}
          <div className="w-full bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/60 shadow-xl shadow-red-900/5">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-red-500 font-black uppercase tracking-[0.2em] text-[10px]">Joint Account</span>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">{account?.title + ""}</h1>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <FaArrowRotateRight className="text-red-400" />
                  <span>Rotation turn: <strong className="text-slate-800">Tshepo</strong></span>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-200 p-4 rounded-2xl flex flex-col justify-center items-end">
                <p className="text-xs font-bold text-red-600 uppercase">Contribution</p>
                <p className="text-2xl font-black text-slate-900">R {schedule?.amountCents} <span className="text-sm font-medium text-slate-400">/ {schedule?.frequency}</span></p>
              </div>
            </div>

            {/* BALANCE STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              <div className="p-6 bg-white/60 rounded-3xl border border-white">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Current Balance</p>
                <p className="text-3xl font-black text-slate-900">R {balance}</p>
              </div>
              <div className="p-6 bg-white/60 rounded-3xl border border-white">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Expected Balance</p>
                <p className="text-3xl font-black text-slate-900">R 10,000.00</p>
              </div>
              <div className="p-6 bg-red-500 rounded-3xl text-white shadow-lg shadow-red-200">
                <p className="text-xs font-bold opacity-80 uppercase mb-1">Collection Progress</p>
                <p className="text-3xl font-black">3 / 4 <span className="text-sm opacity-80">Paid</span></p>
              </div>
            </div>
          </div>

          {/* TRANSACTIONS SECTION */}
          <div className="w-full">
             <Transactions />
          </div>
        </div>
      </section>

        {/* Members Section */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Members setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
    </div>
  );
}