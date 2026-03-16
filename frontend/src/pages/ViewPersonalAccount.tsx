import { FaLock, FaUnlock, FaArrowUp, FaArrowDown, FaArrowLeft, FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../state/store/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavigateBackButton from "../UI/NavigateBackButton";
import { formatCurrency } from "../tools/UserTools";
import Transactions from "../components/Transaction/Transaction";
import { FetchAccountTransactions } from "../state/Transaction/TransactionSlicer";
import { useState, useEffect } from "react";

export default function ViewPersonalAccount() {
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const { accountId } = useParams();
  const account = personalAccount.personalAccounts?.find(x => x.id === Number(accountId));
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  useEffect(() => {
    if (accountId) {
      dispatch(FetchAccountTransactions(accountId, "PERSONAL"));
    }
  }, [accountId]);

  if (account == null) return null;

  const { 
    id, 
    title, 
    balance, 
    createdAt, 
    lockedUntil, 
    isActive } = account;
  
  const isLocked = isActive;

  return (
  <div className="w-full min-h-screen bg-[#F8EEED] p-4 flex flex-col gap-8">
    <NavigateBackButton title="Go Back" />

      
    <div className="w-full bg-white/40 backdrop-blur-md rounded-[2rem] p-6 border border-white/60 shadow-xl shadow-red-900/5">
      {/* Basic account data */}
      <div className="flex flex-col gap-5 justify-center center lg:flex-row lg:justify-between">

        <div className="flex flex-col gap-1">
          <div className="flex flex-col items-start gap-3 text-right">
            <div className="flex gap-4 items-center">
              <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

              <div  className="flex gap-4 items-center">
                <button className="text-green-400 hover:text-green-700">
                  <FaPenToSquare />
                </button>

                <button className="text-red-400 hover:text-red-700">
                  <FaTrashCan />
                </button>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm font-medium">Account ID: #{id}</p>       
            </div>
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Total Balance</span>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {formatCurrency(balance)}
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <Link to={"deposit"}
                  className="flex items-center gap-2 
                  bg-red-500 text-white px-6 py-2 rounded-xl 
                  font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-200">
                  <FaArrowDown /> Deposit
                </Link>
                <Link to={"withdraw"}
                  className="flex items-center gap-2 
                    bg-white text-slate-700 px-6 py-2 rounded-xl font-bold border 
                    border-slate-200 hover:bg-slate-50 transition-all">
                  <FaArrowUp /> Withdraw
                </Link>
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
            !isLocked?<Link to={"lock-account"} className="mt-2 flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-xl   font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-200">
            <FaLock /> Lock Account
          </Link> : ""
          }
        </div>               
      </div>
    </div>

    {/* SECTION 2: TRANSACTION LEDGER */}
    <Transactions />
  </div>
  );
}
