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

  const [buttonClicked, setButtonClicked] = useState(false);

  const HandleLockAccountAsync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonClicked || !date) return;

    try {
      setButtonClicked(true);
      const res = await dispatch(LockAccounts({ lockDate: date }, accountId + ""));
      if (res) navigate(-1);
    } catch {
      console.log("Failed to lock account");
    } finally {
      setButtonClicked(false);
    }
  };

  return (
    <div className="relative z-3 sm:z-0 w-full min-h-screen bg-[#F8EEED] flex items-center justify-center p-6 overflow-hidden font-sans">
      
      <div className="absolute top-8 left-8 z-20">
        <NavigateBackButton title="Back to accounts" />
      </div>

      {/* Main Security Card */}
      <div className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-md rounded-none p-10 border border-white shadow-2xl shadow-red-900/5">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-slate-900 rounded-none flex items-center justify-center shadow-lg shadow-red-500/10 mb-6">
            <FaLock className="text-red-500 text-2xl" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Lock Account</h2>
          
          <div className="mt-4 px-4 py-2 bg-red-500/10 border border-red-100 rounded-none">
            <p className="text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
              <FaCircleInfo size={12} /> 
              Action is irreversible
            </p>
          </div>
          
          <p className="text-slate-500 mt-4 text-sm font-medium leading-relaxed">
            Confirming this will restrict all transactions on this account until the date specified below.
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-8" onSubmit={HandleLockAccountAsync}>
          <div className="space-y-3">
            <label htmlFor="date" className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/60 ml-1">
              Lock duration until
            </label>
            <input
              type="date"
              id="date"
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-none focus:border-red-500 focus:outline-none transition-all text-slate-900 font-bold shadow-sm text-lg"
              autoFocus
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              disabled={personalAccount.Loading || buttonClicked}
              type="submit"
              className="w-full py-5 bg-slate-900 hover:bg-red-600 text-white font-bold rounded-none shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              {personalAccount.Loading ? "Processing..." : "Confirm & Lock Account"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-4 bg-transparent hover:bg-white/50 text-slate-400 font-bold rounded-none transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
            >
              Cancel Request
            </button>
          </div>
        </form>

        {/* Security Footer */}
        <div className="mt-10 pt-6 border-t border-red-100 flex items-center justify-center gap-2 opacity-40">
           <FaWallet className="text-slate-900" size={12} />
           <p className="text-[9px] text-slate-900 font-black uppercase tracking-widest">
             StokVault Security Protocol
           </p>
        </div>
      </div>
    </div>
  );
}