import { useSelector } from "react-redux"
import type { RootState } from "../state/store/store"
import { useState } from "react";
import PortalHeader from "../components/PortalHeader/PortalHeader";
import CreateAccount from "../UI/CreateAccount";
import JointAccountCard from "../components/AccountCards/JointAccountCard";
import { FaCircleInfo } from "react-icons/fa6";

export default function JointAccounts() {
  const jointAccount = useSelector((state: RootState) => state.jointAccount);
  const user = useSelector((state: RootState) => state.user);

  return (
    <section className="w-full h-full overflow-y-auto bg-[#F8EEED] custom-scrollbar flex flex-col gap-8 font-sans">

      <PortalHeader
        message="Manage your shared group accounts"
        title="Joint Accounts"
        name={user.user?.name + ""}
        path="../profile"
      />

      <div className="px-7 max-w-6xl mx-auto w-full flex flex-col gap-6">
        
        {/* Joint Account Rules Banner */}
        <div className="bg-white border-l-4 border-red-500 p-6 flex items-start gap-4 shadow-xl shadow-red-900/5">
          <FaCircleInfo className="text-red-500 mt-1" size={18} />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">Group Account Rules</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Whoever's turn it is to get paid, those funds will be <span className="font-bold text-slate-900">automatically transferred</span> to their Savings Account. 
              Schedules can be created but <span className="font-bold text-slate-900">cannot be changed</span>, and members cannot exit until full payment cycles have been completed.
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-2">
          <CreateAccount title="Create Joint Account" path="create" />
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
          {jointAccount.jointAccounts?.map(account => {
            const { id, title, createdBy, balance, createdAt, isAdmin, members } = account;

            return (
              <div key={id} className="w-full">
                <JointAccountCard  
                  path={``} 
                  id={id}
                  isAdmin={isAdmin}
                  members={members}
                  title={title}
                  createdAt={createdAt}
                  createdBy={createdBy}
                  balance={balance}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}