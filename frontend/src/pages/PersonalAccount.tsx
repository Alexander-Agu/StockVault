import { useSelector } from "react-redux"
import type { RootState } from "../state/store/store"
import PersonalAccountCard from "../components/AccountCards/PersonalAccountCard";
import { useState } from "react";
import PortalHeader from "../components/PortalHeader/PortalHeader";
import CreateAccount from "../UI/CreateAccount";

export default function PersonalAccount() {
    const personalAccount = useSelector((state: RootState) => state.personalAccount);
    const user = useSelector((state:RootState) => state.user);
    const [popup, setPopup] = useState(false);

    return (
        <section className="w-full h-full overflow-y-auto bg-[#F8EEED] custom-scrollbar flex flex-col gap-12">
            <PortalHeader message={`View All Accounts` + ""} title={"Personal Accounts"} name={user.user?.name + ""} />
            {/* Header & Add Button Area */}
            <CreateAccount title="Personal Account" path="create" />

            {/* Grid Layout */}
            <div className="w-full flex flex-wrap gap-6 p-7">
                {personalAccount.personalAccounts?.map(account => {
                    const { id, title, balance, isActive } = account;

                    return (
                        <div key={id} className="min-w-[320px] flex-1 max-w-[400px]">
                            <PersonalAccountCard
                                accountId={id.toString()}
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