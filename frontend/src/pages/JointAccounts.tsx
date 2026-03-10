import { useSelector } from "react-redux"
import type { RootState } from "../state/store/store"
import PersonalAccountCard from "../components/AccountCards/PersonalAccountCard";
import { useState } from "react";
import PortalHeader from "../components/PortalHeader/PortalHeader";
import CreateAccount from "../UI/CreateAccount";
import JointAccountCard from "../components/AccountCards/JointAccountCard";

export default function JointAccounts() {
    const personalAccount = useSelector((state: RootState) => state.personalAccount);
    const user = useSelector((state:RootState) => state.user);
    const [popup, setPopup] = useState(false);

  return (
    <section className="w-full h-full overflow-y-auto bg-[#F8EEED] custom-scrollbar flex flex-col gap-12">
        <PortalHeader message={`View All Accounts` + ""} title={"Joint Accounts"} name={user.user?.name + ""} />
        {/* Header & Add Button Area */}
        <CreateAccount title="Joint Account" path="create" />

        {/* Grid Layout */}
        <div className="w-full flex flex-wrap gap-6 p-7">
              <JointAccountCard 
                title="Family Vacation Fund" 
                amount={5200.00} 
                id={3}
                members={4} 
                role="Admin" 
                progress={65} 
                contribution="R500 / Monthly"
              />
              <JointAccountCard 
                title="Home Renovation" 
                amount={8750.00} 
                id={4}
                members={3} 
                role="Member" 
                progress={80} 
                contribution="R500 / Monthly"
              />
        </div>
    </section>
  )
}