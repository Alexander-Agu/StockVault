import { useEffect, useState } from "react";
import { 
  FaUsers, 
  FaArrowRotateRight,
} from "react-icons/fa6";
import Transactions from "../components/Transaction/Transaction";
import NavigateBackButton from "../UI/NavigateBackButton";
import { useParams } from "react-router-dom";
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
    <div className="w-full min-h-screen bg-[#F8EEED] flex overflow-hidden font-sans">
      
      <section className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          
          <div className="flex justify-between items-center">
            <NavigateBackButton title="back" />
            
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="xl:hidden flex items-center gap-2 bg-white px-6 py-2 rounded-none border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-700 shadow-sm"
            >
              <FaUsers size={12} /> members
            </button>
          </div>

          {/* HEADER SECTION: Sharp & Bold */}
          <div className="w-full bg-white border border-slate-200 rounded-none p-10 shadow-xl shadow-red-900/5">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-[10px]">joint account</span>
                <h1 className="text-5xl font-light text-slate-900 tracking-tighter lowercase">{account?.title}</h1>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium lowercase">
                  <FaArrowRotateRight className="text-red-500" size={10} />
                  <span>rotation turn: <strong className="text-slate-900 font-bold">tshepo</strong></span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-none flex flex-col items-end min-w-[200px]">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">contribution</p>
                <p className="text-2xl font-black text-slate-900 tracking-tighter">
                  R {schedule?.amountCents}
                </p>
                <p className="text-[10px] font-medium text-slate-400 lowercase">/ {schedule?.frequency}</p>
              </div>
            </div>

            {/* STATS GRID: Sharp Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mt-12 border border-slate-100">
              <div className="p-8 bg-white border-r border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">current balance</p>
                <p className="text-3xl font-medium text-slate-900 tracking-tighter">R {balance}</p>
              </div>
              
              <div className="p-8 bg-white border-r border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">expected total</p>
                <p className="text-3xl font-medium text-slate-900 tracking-tighter">R 10,000.00</p>
              </div>

              <div className="p-8 bg-red-500 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80">collection progress</p>
                <p className="text-3xl font-black tracking-tighter">3 / 4 <span className="text-xs font-normal lowercase opacity-80 ml-2 text-white">paid</span></p>
              </div>
            </div>
          </div>

          {/* TRANSACTIONS SECTION */}
          <div className="w-full">
            <Transactions />
          </div>
        </div>
      </section>

      {/* Members Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Members setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
    </div>
  );
}