import { FaWallet } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import StatCard from '../StatCard/StatCard';
import PersonalAccountCard from "../AccountCards/PersonalAccountCard";
import JointAccountCard from "../AccountCards/JointAccountCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store/store";

interface StatItem {
  title: string;
  count: number;
  icon: any;
  linkText: string;
}

export default function Dashboard() {
  const stats: StatItem[] = [
    { title: "Savings accounts", count: 3100, icon: FaWallet, linkText: "View Savings" },
    { title: "Personal accounts", count: 12345, icon: FaWallet, linkText: "View Personal Accounts" },
    { title: "Joint accounts", count: 8240, icon: GiWallet, linkText: "View Joint Accounts" },
  ];

  const twoPersonalAccounts = useSelector((state: RootState) =>
    state.personalAccount.personalAccounts?.slice(0, 2) ?? []);

  return (
    <main className="w-full h-full overflow-y-auto bg-[#F8EEED] custom-scrollbar">
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
                    title={title}
                    id={id}
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

        </div>
      </section>
    </main>
  );
}