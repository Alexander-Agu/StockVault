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
        <section className="w-full h-full overflow-y-auto bg-[#F8EEED] custom-scrollbar flex flex-col gap-10">

            <PortalHeader
                message={`View All Accounts`}
                title={"Personal Accounts"}
                name={user.user?.name + ""}
            />

            {/* Create Button */}
            <div className="px-7">
                <CreateAccount title="Personal Account" path="create" />
            </div>

            {/* Accounts Grid */}

            <div className="w-full px-7 pb-10">

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">

                    {personalAccount.personalAccounts?.map(account => {

                        const { id, title, balance, isActive } = account;

                        return (
                            <div key={id} className="w-full">

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

            </div>

        </section>
    )
}