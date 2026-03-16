import { type FormEvent, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { FaWallet, FaArrowDown, FaLock, FaShieldHalved } from "react-icons/fa6";
import NavigateBackButton from "../UI/NavigateBackButton";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../state/store/store";
import { DepositIntoPersonalAccount } from "../state/PersonalAccount/PersonalAccountSlicer";
import { useParams } from "react-router-dom";
import { DepositIntoJointAccount } from "../state/JointAccount/JointAccountSlicer";

const stripeElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#0f172a",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#cbd5e1" },
    },
    invalid: { color: "#ef4444" },
  },
};

export default function Deposit() {
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const dispatch = useDispatch<AppDispatch>();
  const { accountId, jointAccountId } = useParams();

  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    if (buttonClicked) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)!,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    try{
      setButtonClicked(true);

      // Run if depositing into personal account
      if(accountId) await dispatch(DepositIntoPersonalAccount({
        amount: amount,
        paymentMethodId: paymentMethod.id
      }, accountId + ""))

      // Run if depositing into joint account
      if (jointAccountId) await dispatch(DepositIntoJointAccount({
        amount: amount,
        paymentMethodId: paymentMethod.id
      }, jointAccountId + ""))

      else console.log("Did not work")


      alert("Deposit successful!");
      setLoading(false);
    }catch{

    }finally{
      setButtonClicked(false);
    }


  };

  return (
    <div className="w-full min-h-screen bg-[#F8EEED] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        
        <div className="flex justify-start">
          <NavigateBackButton title="Go Back" />
        </div>
        <div >
          
          {/* Header */}
          <div className="flex flex-col 
            lg:flex-row lg:justify-between lg:items-center 
            gap-6 mb-12 border-b border-red-100 pb-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 
                rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <FaWallet className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Deposit Funds</h1>
                <p className="text-slate-500 font-medium">Add capital to your personal vault</p>
              </div>
            </div>

            <div className="bg-white/60 px-6 py-3 rounded-2xl border border-white">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">Test Card Number</p>
              <p className="text-lg font-mono font-bold text-slate-700">4242 4242 4242 4242</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: AMOUNT & CARD */}
            <div className="flex flex-col gap-8">

              {/* Amount */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Amount (ZAR)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-5 bg-white/80 border border-slate-200 
                    rounded-2xl focus:ring-4 focus:ring-red-500/10 
                    focus:border-red-500 focus:outline-none 
                    transition-all text-2xl font-black text-slate-900 placeholder:text-slate-200
                  "
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
              </div>

              {/* Card Number */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Card Number
                </label>
                <div className="w-full px-6 py-5 bg-white/80 border 
                  border-slate-200 rounded-2xl focus-within:ring-4 
                  focus-within:ring-red-500/10 focus-within:border-red-500 transition-all"
                >
                  <CardNumberElement options={stripeElementOptions} />
                </div>
              </div>
            </div>

            {/* Right Column: Rest of card info */}
            <div className="flex flex-col gap-8 justify-between">
              <div className="grid grid-cols-2 gap-6">

                {/* Expiry */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Expiry
                  </label>
                  <div className="w-full px-6 py-5 bg-white/80 border 
                    border-slate-200 rounded-2xl focus-within:ring-4 
                    focus-within:ring-red-500/10 focus-within:border-red-500 transition-all"
                  >
                    <CardExpiryElement options={stripeElementOptions} />
                  </div>
                </div>

                {/* CVC */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    CVC
                  </label>
                  <div className="w-full px-6 py-5 bg-white/80 border border-slate-200 rounded-2xl focus-within:ring-4 focus-within:ring-red-500/10 focus-within:border-red-500 transition-all">
                    <CardCvcElement options={stripeElementOptions} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <button
                  disabled={loading}
                  className="group relative w-full py-5 bg-red-600 hover:bg-red-700 
                    disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-xl 
                    shadow-red-500/20 transition-all active:scale-[0.98] f
                    lex items-center justify-center gap-3 text-xl"
                >
                  {loading ? "Processing..." : (
                    <>
                      Confirm Deposit
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