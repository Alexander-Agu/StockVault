import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWallet } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store/store";
import { CreateAccount } from "../state/PersonalAccount/PersonalAccountSlicer";
import NavigateBackButton from "../UI/NavigateBackButton";

export default function CreatePersonalAccount() {
  const navigate = useNavigate();
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");

  const HandleCreateAccountAsync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await dispatch(CreateAccount({ title: title }));
      if (res) navigate(-1);
    } catch {
      console.log("Failed to create account");
    }
  }

  return (
    <div className="relative z-3 sm:z-0 w-full min-h-screen bg-[#F8EEED] flex items-center justify-center p-6 overflow-hidden font-sans">

      <div className="absolute top-8 left-8 z-10">
        <NavigateBackButton title="Back to accounts" />
      </div>
      
      {/* Main Card: Sharp Edges & Glassmorphism */}
      <div className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-md rounded-none p-10 border border-white shadow-2xl shadow-red-900/5">
        
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-14 h-14 bg-slate-900 rounded-none flex items-center justify-center shadow-lg shadow-red-500/10 mb-6">
            <FaWallet className="text-red-500 text-xl" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Create Account</h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">Name your new personal vault</p>
        </div>

        <form className="flex flex-col gap-8" onSubmit={HandleCreateAccountAsync}>
          <div className="flex flex-col gap-3">
            <label htmlFor="accountName" className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/60 ml-1">
              Account Name
            </label>
            <input
              type="text"
              id="accountName"
              placeholder="e.g. Vacation Fund"
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-none focus:border-red-500 focus:outline-none transition-all text-slate-900 font-bold placeholder:text-slate-200 text-lg tracking-tight"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <button 
            disabled={personalAccount.Loading || !title.trim()} 
            type="submit"
            className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-none shadow-xl shadow-red-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-xs tracking-widest disabled:bg-slate-300"
          >
            {personalAccount.Loading ? "Creating..." : "Confirm & Create"}
          </button>
        </form>
      </div>
    </div>
  );
}