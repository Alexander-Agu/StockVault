import { type FormEvent, useState } from "react";
import { FaWallet, FaArrowUp, FaStore, FaShieldHalved, FaTicket } from "react-icons/fa6";
import NavigateBackButton from "../UI/NavigateBackButton";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../state/store/store";
import { useParams } from "react-router-dom";
import { WithdrawFromPersonalAccount } from "../state/PersonalAccount/PersonalAccountSlicer";
import { formatCurrency } from "../tools/UserTools";

export default function Withdraw() {
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const dispatch = useDispatch<AppDispatch>();
  const { accountId } = useParams();
  const getAccount = personalAccount.personalAccounts?.find(x => x.id == Number(accountId));

  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || amount > (getAccount?.balance || 0)) {
      alert("Please enter a valid amount within your balance.");
      return;
    }
    
    setLoading(true);

    try{
      await dispatch(WithdrawFromPersonalAccount({
        amount: amount
      }, accountId + ""))

    setTimeout(() => {
      alert("Withdrawal successful! Your WeeCode has been sent via Email.");
      setLoading(false);
    }, 2000);
    }catch{
        console.log("Failed to fetch from account")
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8EEED] flex items-center justify-center md:p-8">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        
        <div className="flex justify-start p-4">
          <NavigateBackButton title="Go Back" />
        </div>

        <div className="w-full p-8 md:p-12">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-12 border-b border-red-100 pb-8">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <FaArrowUp className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Withdrawal</h1>
                <p className="text-slate-500 font-medium">Convert your digital balance to retail cash</p>
              </div>
            </div>

            <div className="bg-white/60 px-6 py-3 rounded-2xl border border-white flex items-center gap-3">
              <FaShieldHalved className="text-red-500" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Source</p>
                <p className="text-sm font-bold text-slate-700">{getAccount?.title || "Personal Account"}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: Financial Details */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Available Balance
                </label>
                <div className="w-full px-6 py-5 bg-white/20 border border-white rounded-2xl">
                   <p className="text-2xl font-black text-slate-900">
                     {formatCurrency(getAccount?.balance || 0)}
                   </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Withdrawal Amount (ZAR)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-6 py-5 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:outline-none transition-all text-3xl font-black text-slate-900 placeholder:text-slate-200"
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
                <p className="text-[10px] text-slate-400 ml-1 italic">* Funds must be within available balance</p>
              </div>
            </div>

            {/* Right Column: Collection Instructions */}
            <div className="flex flex-col gap-6">
              <div className="bg-red-50/50 border border-red-100 p-6 rounded-[2rem] flex flex-col gap-4">
                <div className="flex items-center gap-2 text-red-600">
                  <FaStore />
                  <span className="text-xs font-bold uppercase tracking-widest">How to collect</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-6 h-6 shrink-0 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
                    <p className="text-sm text-slate-700 leading-snug">
                      Confirm your withdrawal to receive a <strong>12-digit WeeCode</strong> via Email.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 shrink-0 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">2</div>
                    <p className="text-sm text-slate-700 leading-snug">
                      Visit any <strong>Checkers, Pick n Pay, Shoprite, or Boxer</strong> store.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 shrink-0 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">3</div>
                    <p className="text-sm text-slate-700 leading-snug">
                      Tell the cashier you are collecting a <strong>'WeeCode'</strong> and provide your number.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <button
                  disabled={loading}
                  type="submit"
                  className="group relative w-full py-5 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-xl shadow-red-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-xl"
                >
                  {loading ? "Generating Code..." : (
                    <>
                      <FaTicket /> Generate WeeCode
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}