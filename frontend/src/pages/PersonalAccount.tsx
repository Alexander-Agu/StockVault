import { useSelector } from "react-redux"
import type { RootState } from "../state/store/store"
import PersonalAccountCard from "../components/AccountCards/PersonalAccountCard";
import PortalHeader from "../components/PortalHeader/PortalHeader";
import CreateAccount from "../UI/CreateAccount";
import { FaCircleInfo } from "react-icons/fa6";

export default function PersonalAccount() {
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const user = useSelector((state: RootState) => state.user);

  return (
    <section className="w-full h-full overflow-y-auto bg-[#F8EEED] custom-scrollbar flex flex-col gap-8 font-sans">
      
      <PortalHeader
        message="Manage your personal finances"
        title="Personal Accounts"
        name={user.user?.name + ""}
        path="../profile"
      />

      <div className="px-7 max-w-6xl mx-auto w-full flex flex-col gap-6">
        
        {/* Fintech Information Banner */}
        <div className="bg-white border-l-4 border-red-500 p-6 flex items-start gap-4 shadow-xl shadow-red-900/5">
          <FaCircleInfo className="text-red-500 mt-1" size={18} />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">System Account Note</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your <span className="font-bold text-slate-900">Savings Account</span> is automatically created. 
              This is a primary system account and cannot be deleted, updated, or locked. 
              Custom accounts created by you can be managed freely.
            </p>
          </div>
        </div>

        {/* Create Button Area */}
        <div className="mt-2">
          <CreateAccount title="Create New Account" path="create" />
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
          {personalAccount.personalAccounts?.map(account => {
            const { id, title, balance, isActive } = account;
            return (
              <PersonalAccountCard
                key={id}
                accountId={id.toString()}
                url={`../personal-account/${id}`}
                title={title}
                amount={balance}
                locked={isActive}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}