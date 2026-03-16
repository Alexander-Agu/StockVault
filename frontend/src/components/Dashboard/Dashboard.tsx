import { FaWallet } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import StatCard from '../StatCard/StatCard';
import PersonalAccountCard from "../AccountCards/PersonalAccountCard";
import JointAccountCard from "../AccountCards/JointAccountCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store/store";
import PortalHeader from "../PortalHeader/PortalHeader";

interface StatItem {
  title: string;
  count: number;
  icon: any;
  linkText: string;
  path: string;
  resultName: string;
}

export default function Dashboard() {
  const user = useSelector((state:RootState) => state.user);
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const jointAccount = useSelector((state: RootState) => state.jointAccount).jointAccounts?.slice(0, 2) ?? [];


  const stats: StatItem[] = [
    { title: "Savings accounts", count: 3100, resultName: "Rands", icon: FaWallet, linkText: "View Savings", path:"" },
    { title: "Personal accounts", count: personalAccount.personalAccounts?.length || 0,  resultName: "Total", icon: FaWallet, linkText: "View Personal Accounts", path: "personal-account" },
    { title: "Joint accounts", count: 8240,  resultName: "Total", icon: GiWallet, linkText: "View Joint Accounts", path: "" },
  ];

  const twoPersonalAccounts = personalAccount.personalAccounts?.slice(0, 2) ?? [];

  return (
    <section className="w-full h-full overflow-y-auto bg-[#F8EEED] custom-scrollbar">
      <PortalHeader message={`Welcome back, ${user.user?.name}` + ""} title={"Dashboard"} name={user.user?.name + ""} />

      <section className="p-6 lg:p-10 flex flex-col gap-10">
        {/* ACCOUNT STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              count={stat.count}
              icon={stat.icon}
              linkText={stat.linkText}
              resultName={stat.resultName}
              path={stat.path}
            />
          ))}
        </div>

        {/* ACCOUNT SUMMARY SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* PERSONAL ACCOUNTS */}
          <section className="flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#2D3339] p-4 border-b-4 border-red-600">
              <h2 className="text-white font-bold text-sm uppercase tracking-wider">Personal Accounts</h2>
            </div>
            <div className="p-5 flex flex-col gap-4">

              {
                twoPersonalAccounts.map(account => {
                  const { id, title, balance, isActive } = account

                  return <PersonalAccountCard key={id}
                    accountId={id.toString()}
                    title={title}
                    url={`personal-account/${id}`}
                    amount={balance}
                    locked={isActive}
                  />
                })
              }
            </div>
          </section>

          {/* JOINT ACCOUNTS */}
          <section className="flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#2D3339] p-4 border-b-4 border-red-600">
              <h2 className="text-white font-bold text-sm uppercase tracking-wider">Joint Accounts</h2>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {
                jointAccount.map(account => {
                  const { id, title, createdBy, balance, createdAt } = account;

                  return <JointAccountCard key={id}
                    path="joint-account/" 
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

        </div>
      </section>
    </section>
  );
}