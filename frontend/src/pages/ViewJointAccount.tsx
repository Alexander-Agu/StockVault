import { useState } from "react";
import { 
  FaUsers, 
  FaXmark, 
  FaArrowRotateRight,
} from "react-icons/fa6";
import Transactions from "../components/Transaction/Transaction";
import NavigateBackButton from "../UI/NavigateBackButton";
import MemberItem from "../components/MemberItem/MemberItem";

export default function ViewJointAccount() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data for members
  const admins = [
    { name: "Alexander Agu", paid: true },
    { name: "Joseph", paid: false },
  ];
  const members = [
    { name: "Daniel", paid: true },
    { name: "Tshepo", paid: true },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8EEED] flex overflow-hidden">
      
      <section className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          
          <div className="flex justify-between items-center">
            <NavigateBackButton title="Back to Hub" />
            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl border border-white font-bold text-slate-700 shadow-sm"
            >
              <FaUsers /> Members
            </button>
          </div>

          {/* STOKVEL HEADER CARD */}
          <div className="w-full bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/60 shadow-xl shadow-red-900/5">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-red-500 font-black uppercase tracking-[0.2em] text-[10px]">Joint Account</span>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Fortune Stokvel</h1>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <FaArrowRotateRight className="text-red-400" />
                  <span>Rotation turn: <strong className="text-slate-800">Tshepo</strong></span>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-200 p-4 rounded-2xl flex flex-col justify-center items-end">
                <p className="text-xs font-bold text-red-600 uppercase">Contribution</p>
                <p className="text-2xl font-black text-slate-900">R 500.00 <span className="text-sm font-medium text-slate-400">/ Monthly</span></p>
              </div>
            </div>

            {/* BALANCE STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              <div className="p-6 bg-white/60 rounded-3xl border border-white">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Current Balance</p>
                <p className="text-3xl font-black text-slate-900">R 7,000.00</p>
              </div>
              <div className="p-6 bg-white/60 rounded-3xl border border-white">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Expected Balance</p>
                <p className="text-3xl font-black text-slate-900">R 10,000.00</p>
              </div>
              <div className="p-6 bg-red-500 rounded-3xl text-white shadow-lg shadow-red-200">
                <p className="text-xs font-bold opacity-80 uppercase mb-1">Collection Progress</p>
                <p className="text-3xl font-black">3 / 4 <span className="text-sm opacity-80">Paid</span></p>
              </div>
            </div>
          </div>

          {/* TRANSACTIONS SECTION */}
          <div className="w-full">
             <Transactions />
          </div>
        </div>
      </section>

        {/* Members Section */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 right-0 w-80 bg-white/80 backdrop-blur-2xl border-l border-white/60 z-50
        transition-transform duration-300 transform p-8 shadow-2xl
        lg:translate-x-0 lg:static lg:block lg:shadow-none
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FaUsers className="text-red-500" /> Members
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400">
            <FaXmark size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {/* Admins Group */}
          <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Account Admins</h3>
            <div className="flex flex-col gap-3">
              {admins.map((admin, index) => (
                <MemberItem key={index} name={admin.name} paid={admin.paid} />
              ))}
            </div>
          </section>

          {/* Members Group */}
          <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">General Members</h3>
            <div className="flex flex-col gap-3">
              {members.map((member, index) => (
                <MemberItem key={index} name={member.name} paid={member.paid} />
              ))}
            </div>
          </section>
        </div>

        <button className="mt-12 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
            Make Payment
        </button>
        
        {/* This will soon be visible only by the admin */}
        <button className="mt-12 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
            Add Member
        </button>
      </aside>
    </div>
  );
}