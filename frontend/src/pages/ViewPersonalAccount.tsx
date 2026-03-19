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
  
  // Logic helpers
  const isSavings = title.toLowerCase().includes("savings");
  const isLocked = !isSavings && isActive; // Only standard accounts can be "locked" in this context

  return (
    <div className="w-full min-h-screen bg-[#F8EEED] p-6 flex flex-col gap-8 text-slate-900">
      <NavigateBackButton title="back" />

      {/* Main Account Card - Sharp Edges & Minimalist */}
      <div className="w-full bg-white border border-slate-200 rounded-none p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          
          {/* Left: Account Info */}
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-light tracking-tight lowercase">{title}</h2>
                <div className="flex gap-3 ml-2">
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <FaPenToSquare size={14} />
                  </button>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <FaTrashCan size={14} />
                  </button>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-mono tracking-tighter">id: {id}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 lowercase text-xs tracking-widest">total balance</span>
              <h1 className="text-5xl font-medium tracking-tighter">
                {formatCurrency(balance)}
              </h1>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Link to="deposit"
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-none text-sm font-medium hover:bg-slate-800 transition-all uppercase tracking-widest">
                <FaArrowDown size={12} /> deposit
              </Link>

              {(!isLocked || isSavings) && (
                <Link to="withdraw"
                  className="flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-none text-sm font-medium border border-slate-900 hover:bg-slate-50 transition-all uppercase tracking-widest">
                  <FaArrowUp size={12} /> withdraw
                </Link>
              )}
            </div>
          </div>

          {/* Right: Security/Lock Logic (Hidden for Savings) */}
          {!isSavings && (
            <div className="flex flex-col justify-end min-w-[280px]">
              <div className="border-l border-slate-100 pl-8 space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">security</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                      <span className="text-xs lowercase text-slate-400">opened on</span>
                      <span className="text-sm font-medium text-slate-700">{new Date(createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Show lock details only if locked */}
                    {isLocked && (
                      <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                        <span className="text-xs lowercase text-slate-400">locked until</span>
                        <span className="text-sm font-medium text-red-500">{lockedUntil?.toString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Show Lock Button only if NOT locked */}
                {!isLocked ? (
                  <Link to="lock-account" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-red-500 transition-colors">
                    <FaLock size={10} /> lock this account
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500/50">
                    <FaLock size={10} /> account restricted
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction List */}
      <div className="rounded-none border border-slate-200 bg-white p-2">
        <Transactions />
      </div>
    </div>
  );
}