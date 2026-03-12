import { useSelector } from "react-redux"
import type { RootState } from "../state/store/store"
import PersonalAccountCard from "../components/AccountCards/PersonalAccountCard";
import { useState } from "react";
import PortalHeader from "../components/PortalHeader/PortalHeader";
import CreateAccount from "../UI/CreateAccount";
import JointAccountCard from "../components/AccountCards/JointAccountCard";

export default function JointAccounts() {
    const jointAccount = useSelector((state: RootState) => state.jointAccount);
    const user = useSelector((state:RootState) => state.user);
    const [popup, setPopup] = useState(false);

  return (
    <section className="w-full h-full overflow-y-auto bg-[#F8EEED] custom-scrollbar flex flex-col gap-12">
        <PortalHeader message={`View All Accounts` + ""} title={"Joint Accounts"} name={user.user?.name + ""} />
        {/* Header & Add Button Area */}
        <CreateAccount title="Joint Account" path="create" />

        {/* Grid Layout */}
        <div className="w-full flex flex-wrap gap-6 p-7">
          {
            jointAccount.jointAccounts?.map(account => {
              const { id, title, createdBy, balance, createdAt } = account;

              return <JointAccountCard  
                id={id}
                title={title}
                createdAt={createdAt}
                createdBy={createdBy}
                balance={balance}
              />
            })
          }
        </div>
    </section>
  )
}