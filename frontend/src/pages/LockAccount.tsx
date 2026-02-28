import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaWallet, FaLock, FaCircleInfo } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store/store";
import NavigateBackButton from "../UI/NavigateBackButton";
import { LockAccounts } from "../state/PersonalAccount/PersonalAccountSlicer";

export default function LockAccount() {
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const dispatch = useDispatch<AppDispatch>();
  const { accountId } = useParams();


  const HandleLockAccountAsync = async () => {
    try {
      const res = await dispatch(LockAccounts({lockDate: date}, accountId + ""));
      if (res) navigate(-1);
    } catch {
      console.log("Failed to lock account");
    }
  };

  return (
    <div className="relative z-3 sm:z-0 w-full min-h-full bg-[#F8EEED] flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute top-8 left-8 z-20">
        <NavigateBackButton title="Back to Accounts" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 border border-white shadow-[0_20px_50px_rgba(150,0,0,0.05)]">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-red-600 to-rose-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/40 rotate-3">
              <FaLock className="text-white text-3xl" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              <FaWallet className="text-red-500 text-sm" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Lock Account</h2>
          <div className="mt-3 px-4 py-2 bg-red-50 rounded-xl border border-red-100">
            <p className="text-red-700 text-sm font-semibold flex items-center justify-center gap-2">
              <FaCircleInfo className="text-xs" /> 
              Action is irreversible
            </p>
          </div>
          <p className="text-slate-500 mt-4 text-sm leading-relaxed">
            Confirming this will restrict all transactions on this account until the date specified below.
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="date" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
              Lock Duration Until
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-500/5 focus:border-red-400 focus:outline-none transition-all text-slate-900 font-semibold shadow-sm"
                autoFocus
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              disabled={personalAccount.Loading}
              onClick={() => HandleLockAccountAsync()}
              type="submit"
              className="w-full py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {personalAccount.Loading ? "Processing..." : "Confirm & Lock Account"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-4 bg-transparent hover:bg-slate-50 text-slate-500 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              Cancel Request
            </button>
          </div>
        </form>

        {/* Security Footer */}
        <p className="text-center text-[11px] text-slate-400 mt-8 font-medium">
          Secured by End-to-End Encryption
        </p>
      </div>
    </div>
  );
}