
import { FaLock, FaUnlock, FaArrowUp, FaArrowDown, FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store/store";
import { useNavigate, useParams } from "react-router-dom";
import NavigateBackButton from "../UI/NavigateBackButton";
// import { transactions } from "./TransactionTableTools";

export default function ViewPersonalAccount() {
  // Destructuring based on your PersonalAccountDto
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const { accountId } = useParams();
  const account = personalAccount.personalAccounts?.find(x => x.id === Number(accountId));
  const navigate = useNavigate();

  if (account == null) return;

  const { id, title, balance, createdAt, lockedUntil, isActive } = account;

  const isLocked = isActive;

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(cents / 100);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8EEED] p-4 flex flex-col gap-8">
        <NavigateBackButton title="Go Back" />

      
        <div className="w-full bg-white/40 backdrop-blur-md rounded-[2rem] p-6 border border-white/60 shadow-xl shadow-red-900/5">
            {/* Basic account data */}
            <div className="flex flex-col gap-5 justify-center center lg:flex-row lg:justify-between">

                <div className="flex flex-col gap-1">
                    <div className="flex flex-col items-start gap-3 text-right">
                    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                    <p className="text-slate-400 text-sm font-medium">Account ID: #{id}</p>       
                </div>
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Total Balance</span>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {formatCurrency(balance)}
                    </h1>
                    <div className="flex items-center gap-4 mt-4">
                        <button className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-xl   font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-200">
                            <FaArrowDown /> Deposit
                        </button>
                        <button className="flex items-center gap-2 bg-white text-slate-700 px-6 py-2 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all">
                            <FaArrowUp /> Withdraw
                        </button>
                    </div>
                </div>

                {/* Checking if account is locked */}
                <div className="">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Account Lock</h2>
                    </div>


                    <div>
                        <div className="flex gap-1 items-center pt-4 pb-5 border-b border-slate-300">
                            <h2 className="text-slate-500 font-bold tracking-widest text-xs">
                                Created At:
                            </h2>
                            <p className="text-x5 font-bold text-slate-900 tracking-tight">
                                25 Nov 2025
                            </p>
                        </div>

                        <div className="flex gap-1 items-center pt-4 pb-5 border-b border-slate-300">
                            <h2 className="text-slate-500 font-bold tracking-widest text-xs">
                                Locked Until:
                            </h2>
                            <p className="text-x5 font-bold text-slate-900 tracking-tight">
                                {
                                    !isLocked? "Account not locked" : lockedUntil.toString()
                                }
                            </p>
                        </div>
                    </div>

                    {
                        !isLocked?<button className="mt-2 flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-xl   font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-200">
                        <FaLock /> Lock Account
                    </button> : ""
                    }
                </div>               
            </div>
        </div>

      {/* SECTION 2: TRANSACTION LEDGER (Professional Table) */}
      {/* <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-slate-800 ml-2">Recent Activity</h3>
        <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] border border-white/60 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/5 text-slate-500">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Transaction</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Type</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-right">Amount</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50">
              {transactions.map((tx) => {
                const isDeposit = tx.transactionType.toLowerCase() === 'deposit';
                return (
                  <tr key={tx.id} className="hover:bg-white/40 transition-colors">
                    <td className="px-8 py-5 font-bold text-slate-900">#{tx.id}</td>
                    <td className="px-8 py-5 text-sm font-semibold">
                       <span className={`px-3 py-1 rounded-lg ${isDeposit ? 'bg-emerald-100/50 text-emerald-700' : 'bg-rose-100/50 text-rose-700'}`}>
                        {tx.transactionType}
                       </span>
                    </td>
                    <td className={`px-8 py-5 text-right font-black ${isDeposit ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isDeposit ? '+' : '-'} {formatCurrency(tx.amountCents)}
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-medium">{tx.createdAt.toString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}