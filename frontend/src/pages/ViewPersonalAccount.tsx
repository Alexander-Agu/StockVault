import { FaLock, FaArrowUp, FaArrowDown, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../state/store/store";
import { Link, useParams } from "react-router-dom";
import NavigateBackButton from "../UI/NavigateBackButton";
import { formatCurrency } from "../tools/UserTools";
import Transactions from "../components/Transaction/Transaction";
import { FetchAccountTransactions } from "../state/Transaction/TransactionSlicer";
import { useEffect } from "react";

export default function ViewPersonalAccount() {
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const { accountId } = useParams();
  const account = personalAccount.personalAccounts?.find(x => x.id === Number(accountId));
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  

  useEffect(() => {
    if (accountId) {
      dispatch(FetchAccountTransactions(accountId, "PERSONAL"));
    }
  }, [accountId, dispatch]);

  if (account == null) return null;

  const { id, title, balance, createdAt, lockedUntil, isActive } = account;
  
  // Savings is special: No lock UI, withdrawal always allowed
  const isSavings = title.toLowerCase().includes("savings");
  const isLocked = !isSavings && isActive;

  return (
    <div className="w-full min-h-screen bg-[#F8EEED] p-6 flex flex-col gap-8 text-slate-900 font-sans">
      <NavigateBackButton title="back" />

      {/* Main Account Card */}
      <div className="w-full bg-white/40 border border-white rounded-none p-8 shadow-xl shadow-red-900/5">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          
          {/* Left: Account Info */}
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <h2 className="text-4xl font-black tracking-tighter  text-slate-900">{title}</h2>
                <div className="flex gap-4">
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <FaPenToSquare size={16} />
                  </button>
                  <button className="text-red-400 hover:text-red-600 transition-colors">
                    <FaTrashCan size={16} />
                  </button>
                </div>
              </div>
              <p className="text-slate-500 text-xs font-mono tracking-tighter">id: {id}</p>
            </div>

            <div className="space-y-1">
              <span className="text-red-500 text-xs font-bold tracking-[0.2em]">total balance</span>
              <h1 className="text-6xl font-black tracking-tighter text-slate-900">
                {formatCurrency(balance)}
              </h1>
            </div>

            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 mt-4">
              <Link to="deposit"
                className="flex items-center gap-2 bg-red-600 text-white px-10 py-4 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 active:scale-[0.98]">
                <FaArrowDown size={12} /> deposit
              </Link>

              {(!isLocked || isSavings) && (
                <Link to="withdraw"
                  className="flex items-center gap-2 bg-white text-slate-700 px-10 py-4 rounded-none text-xs font-bold border border-red-100 hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm">
                  <FaArrowUp size={12} /> withdraw
                </Link>
              )}
            </div>
          </div>

          {/* Right: Lock Logic - Hidden for Saving */}
          {!isSavings && (
            <div className="flex flex-col justify-end min-w-[300px]">
              <div className="border-l-2 border-red-500 pl-8 space-y-6 bg-white/20 p-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-500/50 mb-4">security</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-red-50 pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">opened on</span>
                      <span className="text-sm font-black text-slate-700">{new Date(createdAt).toLocaleDateString()}</span>
                    </div>

                    {isLocked && (
                      <div className="flex justify-between items-center border-b border-red-50 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-500/50">locked until</span>
                        <span className="text-sm font-black text-red-600">{lockedUntil?.toString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {!isLocked ? (
                  <Link to="lock-account" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-red-600 transition-colors">
                    <FaLock size={10} /> lock this account
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500/40 italic">
                    <FaLock size={10} /> account restricted
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction List */}
      <div className="rounded-none border border-white bg-white/40 backdrop-blur-sm p-2 shadow-xl shadow-red-900/5">
        <Transactions />
      </div>
    </div>
  );
}