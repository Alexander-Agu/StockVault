import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store/store";
import { CreateAccount } from "../../state/PersonalAccount/PersonalAccountSlicer";

export default function CreatePersonalAccount() {
  const navigate = useNavigate();
  const personalAccount =  useSelector((state: RootState) => state.personalAccount);
  const accountDispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");

  const HandleCreateAccountAsync = async () => {
    try{
      const res = await accountDispatch(CreateAccount({title: title}));

      if (res) navigate(-1);
    } catch{
      console.log("Failed  to create account");
    }
  }

  return (
    <div className="relative z-3 sm:z-0 w-full min-h-full bg-[#F8EEED] flex items-center justify-center p-6 overflow-hidden">
      
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-200/50 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-300/30 rounded-full blur-[120px]" />

      <button 
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-10 flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-semibold"
      >
        <FaArrowLeft />
        Back to Accounts
      </button>

      <div className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/60 shadow-2xl shadow-red-900/5">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 mb-6">
            <FaWallet className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
          <p className="text-slate-600 mt-2 font-medium">Name your new personal vault</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label htmlFor="accountName" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
              Account Name
            </label>
            <input
              type="text"
              id="accountName"
              placeholder="Enter name..."
              className="w-full px-6 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:outline-none transition-all text-slate-900 font-medium placeholder:text-slate-300"
              autoFocus
              value={title}
              onChange={(e)=> setTitle(e.target.value + "")}
            />
          </div>

          <button disabled={personalAccount.Loading} onClick={()=> HandleCreateAccountAsync()}
            type="submit"
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-xl shadow-red-500/20 transition-all active:scale-[0.97] mt-2 flex items-center justify-center gap-2"
          >
            Confirm & Create
          </button>
        </form>
      </div>
    </div>
  );
}