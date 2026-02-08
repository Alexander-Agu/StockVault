import { useSelector } from "react-redux"
import type { RootState } from "../../state/store/store"
import { FaPlus } from "react-icons/fa6";
import PersonalAccountCard from "../AccountCards/PersonalAccountCard";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PersonalAccount() {
    const personalAccount = useSelector((state: RootState) => state.personalAccount);
    const [popup, setPopup] = useState(false);

    return (
        <section className="p-8 w-full flex flex-col gap-12">
            {/* Header & Add Button Area */}
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold  text-slate-800">Personal Accounts</h2>
                
                <Link to={"create"} className="group w-64 h-32 flex flex-col items-center justify-center gap-2 
                    bg-white/50 hover:bg-white border-2 border-dashed border-slate-300 
                    hover:border-red-500 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md">
                    
                    <div className="p-2 rounded-full bg-slate-100 group-hover:bg-red-50 transition-colors">
                        <FaPlus className="text-slate-400 group-hover:text-red-500 text-xl" />
                    </div>
                    
                    <span className="text-sm font-semibold text-slate-500 group-hover:text-red-600">
                        Add new Personal Account
                    </span>
                </Link >
            </div>

            {/* Grid Layout */}
            <div className="w-full flex flex-wrap gap-6">
                {personalAccount.personalAccounts?.map(account => {
                    const { id, title, balance, isActive } = account;

                    return (
                        <div key={id} className="min-w-[320px] flex-1 max-w-[400px]">
                            <PersonalAccountCard
                                url={`../personal-account/${id}`}
                                title={title}
                                amount={balance}
                                locked={isActive}
                            />
                        </div>
                    )
                })}
            </div>

            
        </section>
    )
}