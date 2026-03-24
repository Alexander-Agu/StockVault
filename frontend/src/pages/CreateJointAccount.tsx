import { useState } from "react";
import { FaUsersBetweenLines, FaCalendarCheck, FaCoins, FaArrowRight } from "react-icons/fa6";
import NavigateBackButton from "../UI/NavigateBackButton";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../state/store/store";
import { CreateJointAccounts } from "../state/JointAccount/JointAccountSlicer";
import { useNavigate } from "react-router-dom";
import { CreateSchedule } from "../state/ContributionSchedule/ContributionScheduleSlicer";

export default function CreateJointAccount() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    frequency: "MONTHLY",
    startDate: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
        const id = await dispatch(CreateJointAccounts(formData.title))

        if (id > 0){

          await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay
          const response = await dispatch(CreateSchedule({
              amountCents: Number(formData.amount) * 100,
              frequency: formData.frequency,
              startDate: formData.startDate
          }, id));
        }
    } catch{
        console.log("Failed to create joint account");

    }
    
  };

  return (
    <div className="relative z-3 sm:z-0 w-full min-h-full bg-[#F8EEED] flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="w-full p-10">
        <NavigateBackButton title="Go back to accounts" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 shadow-2xl shadow-red-900/5 overflow-hidden">
        
        {/* Left Sid */}
        <div className="p-10 lg:p-14 bg-gradient-to-br from-red-600 to-rose-700 text-white flex flex-col justify-center gap-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-4">
            <FaUsersBetweenLines />
          </div>
          <h2 className="text-4xl font-black tracking-tight leading-tight">
            Start Your <br /> Joint Venture
          </h2>
          <p className="text-red-100 font-medium leading-relaxed">
            Create a transparent space for your Stokvel or savings group. 
            Our automated ledger ensures fair rotational payments, tracking every cent so you can focus on building wealth together.
          </p>
          
          <div className="mt-8 flex flex-col gap-4">
             <div className="flex items-center gap-3 text-sm font-bold">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</div>
                Transparent member tracking
             </div>
             <div className="flex items-center gap-3 text-sm font-bold">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</div>
                Automated payment reminders
             </div>
          </div>
        </div>

        {/* Right Side - The Form */}
        <form onSubmit={handleSubmit} className="p-10 lg:p-14 flex flex-col gap-6 bg-[#F8EEED]">
          
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Stokvel Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Fortune Stokvel"
                className="w-full pl-6 pr-6 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-slate-900"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Amount Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Contribution Amount (ZAR)
            </label>
            <div className="relative">
              <FaCoins className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="number"
                placeholder="500.00"
                className="w-full pl-14 pr-6 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-slate-900"
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          {/* Frequency Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Payment Frequency
            </label>
            <select
              className="w-full px-6 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            >
              <option value="WEEKLY">Weekly Payments</option>
              <option value="MONTHLY">Monthly Payments</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Rotation Start Date
            </label>
            <div className="relative">
              <FaCalendarCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="date"
                className="w-full pl-14 pr-6 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-slate-900"
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group mt-4 w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            Finalize & Create <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

      </div>
    </div>
  );
}