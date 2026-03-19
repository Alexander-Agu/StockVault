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
    <section className="w-full h-full overflow-y-auto bg-[#F8EEED] custom-scrollbar flex flex-col gap-10">

      {/* Header */}
      <PortalHeader
        message={`View All Accounts`}
        title={"Joint Accounts"}
        name={user.user?.name + ""}
      />

      {/* Create Button */}
      <div className="px-7">
        <CreateAccount title="Joint Account" path="create" />
      </div>

      {/* Accounts Grid */}

      <div className="w-full px-7 pb-10">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            jointAccount.jointAccounts?.map(account => {

              const { id, title, createdBy, balance, createdAt } = account;

              return (
                <JointAccountCard  
                  key={id}
                  path=""
                  id={id}
                  title={title}
                  createdAt={createdAt}
                  createdBy={createdBy}
                  balance={balance}
                />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}