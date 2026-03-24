import { useEffect, useState } from "react";
import { 
  FaUsers, 
  FaArrowRotateRight,
  FaPlus
} from "react-icons/fa6";
import Transactions from "../components/Transaction/Transaction";
import NavigateBackButton from "../UI/NavigateBackButton";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../state/store/store";
import Members from "../components/Members/Members";
import { FetchAccountTransactions } from "../state/Transaction/TransactionSlicer";
import { FetchMembers } from "../state/Members/MemberSlicer";
import { FetchSchedule } from "../state/ContributionSchedule/ContributionScheduleSlicer";

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
      
  useEffect(() => {
    const id = Number(jointAccountId);
    if (id) {
      dispatch(FetchAccountTransactions(String(id), "JOINT"));
      dispatch(FetchSchedule(id));
      dispatch(FetchMembers(id));
    }
  }, [jointAccountId, dispatch]);

  useEffect(() => {
    if (!transections?.transactions) return;
    const total = transections.transactions.reduce((sum, x) => sum + x.amountCents, 0);
    setBalance(total);
  }, [transections.transactions]);

  if (account == null || members == null) return null;

  return (
    <div className="w-full min-h-screen bg-[#F8EEED] flex overflow-hidden font-sans text-slate-900">
      
      <section className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          
          <div className="flex justify-between items-center">
            <NavigateBackButton title="Back" />
            
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="xl:hidden flex items-center gap-2 bg-white px-6 py-2 rounded-none border border-red-100 text-[10px] font-bold uppercase tracking-widest text-red-600 shadow-sm transition-all active:scale-95"
            >
              <FaUsers size={12} /> Members
            </button>
          </div>

          {/* Header Section */}
          <div className="w-full bg-white/60 backdrop-blur-md border border-white rounded-none p-10 shadow-xl shadow-red-900/5">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-[10px]">Joint Account</span>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{account?.title}</h1>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <FaArrowRotateRight className="text-red-500" size={10} />
                  <span>Rotation turn: <strong className="text-slate-900 font-bold">Tshepo</strong></span>
                </div>
              </div>

              <div className="flex flex-row-reverse sm:flex-col items-end gap-4 w-full">
                <div className="bg-white/40 border border-red-50 p-6 rounded-none flex flex-col items-end min-w-[220px]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contribution</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tighter">
                    R {schedule?.amountCents}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">/ {schedule?.frequency}</p>
                </div>
                
                <div className="flex flex-col gap-2 sm:flex-row-reverse">
                  <Link to={`deposit`} className="bg-red-600 text-white px-8 py-4 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 active:scale-[0.98]">
                    <FaPlus size={10}/> Contribute
                  </Link>

                  <Link to={`update`} className="border border-black bg-white text-black px-8 py-4 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 active:scale-[0.98]">
                    <FaPlus size={10}/> Update Account
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mt-12 border border-red-100/50">
              <div className="p-8 bg-white/80 border-r border-red-100/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current Balance</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">R {balance}</p>
              </div>
              
              <div className="p-8 bg-white/80 border-r border-red-100/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Expected Total</p>
                <p className="text-3xl font-black text-slate-300 tracking-tighter">R 10,000.00</p>
              </div>

              <div className="p-8 bg-red-600 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-70">Collection Progress</p>
                <div className="flex items-baseline gap-2">
                   <p className="text-4xl font-black tracking-tighter">3 / 4</p>
                   <span className="text-xs font-bold opacity-70 tracking-widest">Paid</span>
                </div>
              </div>
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