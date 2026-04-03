import { useEffect, useState } from "react";
import { FaUsersBetweenLines, FaCalendarCheck, FaCoins, FaArrowRight, FaCircleInfo } from "react-icons/fa6";
import NavigateBackButton from "../UI/NavigateBackButton";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../state/store/store";
import { CreateJointAccounts } from "../state/JointAccount/JointAccountSlicer";
import { useNavigate, useParams } from "react-router-dom";
import { CreateSchedule } from "../state/ContributionSchedule/ContributionScheduleSlicer";

export default function UpdateJointAccount() {
    const { jointAccountId } = useParams();

    const jointAccount = useSelector((state: RootState) => state.jointAccount)
        .jointAccounts?.find(j => j.id == Number(jointAccountId));
    const schedule = useSelector((state: RootState) => state.contributionSchedule)
        .schedule;

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        amount: 0,
        frequency: "MONTHLY",
        startDate: ""
    });

    useEffect(()=>{
        if (jointAccount != null){
            setFormData({ ...formData, title: jointAccount.title })
        }

        if (schedule != null){
            setFormData({ ...formData, amount: schedule.amountCents })
            setFormData({ ...formData, frequency: schedule.frequency })
            setFormData({ ...formData, startDate: schedule.startDate.toDateString() })
        }
    },[Number(jointAccountId)]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const id = await dispatch(CreateJointAccounts(formData.title))

            if (id > 0){
                // Check if user is trying to update the joint accounts name
                if (jointAccount?.title !== formData.title && formData.title.trim() !== ""){

                }

                // Check if user is trying to update the joint account frequency
                if (schedule?.frequency !== formData.frequency && formData.frequency.trim() !== ""){

                }
            }
        } catch{
            console.log("Failed to update joint account");
        }
        
    };

  return (
    <div className="relative z-3 sm:z-0 w-full min-h-full bg-[#F8EEED] flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="w-full p-10">
        <NavigateBackButton title="Go back to accounts" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 2.5rem] shadow-2xl shadow-red-900/5 overflow-hidden">
        
        {/* Left Sid */}
                <div className="p-10 lg:p-14 bg-slate-900 text-white flex flex-col justify-center gap-8">
                    <div className="w-16 h-16 bg-red-600 rounded-none flex items-center justify-center text-3xl shadow-lg shadow-red-500/20">
                        <FaUsersBetweenLines />
                    </div>
                    
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black tracking-tighter leading-tight">
                            Update Joint Account
                        </h2>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            Maintain your group's financial health. Adjust your Stokvel's identity or prepare for the next rotation cycle.
                        </p>
                    </div>
                    
                    {/* Restriction Banner */}
                    <div className="bg-red-500/10 border-l-4 border-red-500 p-6 space-y-2">
                        <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-[10px]">
                            <FaCircleInfo /> Important Notice
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                            You can only update the contribution schedule once the current payment rotation has fully finished. Members must complete their cycles before changes take effect.
                        </p>
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
                value={formData.title}
                type="text"
                placeholder="e.g. Fortune Stokvel"
                className="w-full pl-6 pr-6 py-4 bg-white/80 border border-slate-200 xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-slate-900"
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
                value={formData.amount}
                type="number"
                placeholder="500.00"
                className="w-full pl-14 pr-6 py-4 bg-white/80 border border-slate-200 xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-slate-900"
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
              className="w-full px-6 py-4 bg-white/80 border border-slate-200 xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
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
                value={formData.startDate}
                type="date"
                className="w-full pl-14 pr-6 py-4 bg-white/80 border border-slate-200 xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-slate-900"
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group mt-4 w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest xl shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            Update Account <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

      </div>
    </div>
  );
}