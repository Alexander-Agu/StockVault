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
  const user = useSelector((state: RootState) => state.user);
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const jointAccounts = useSelector((state: RootState) => state.jointAccount);
  
  // Limiting to 2 items for a clean summary view
  const jointAccountSummary = jointAccounts.jointAccounts?.slice(0, 2) ?? [];
  const savingsAccount = personalAccount.personalAccounts?.find(x => x.title.toLowerCase() === "savings account");
  const twoPersonalAccounts = personalAccount.personalAccounts?.slice(0, 2) ?? [];

  const stats: StatItem[] = [
    { 
      title: "Savings balance", 
      count: savingsAccount?.balance || 0, 
      resultName: "Rands", 
      icon: FaWallet, 
      linkText: "View Savings", 
      path: `personal-account/${savingsAccount?.id}` 
    },
    { 
      title: "Personal accounts", 
      count: personalAccount.personalAccounts?.length || 0,  
      resultName: "Total", 
      icon: FaWallet, 
      linkText: "View Personal Accounts", 
      path: "personal-account" 
    },
    { 
      title: "Joint accounts", 
      count: jointAccounts.jointAccounts?.length || 0,  
      resultName: "Total", 
      icon: GiWallet, 
      linkText: "View Joint Accounts", 
      path: "joint-account" 
    },
  ];

  return (
    <section className="w-full h-full overflow-y-auto bg-[#F8EEED] custom-scrollbar font-sans">
      <PortalHeader 
        message={`Welcome back, ${user.user?.name}`} 
        title="Dashboard" 
        name={user.user?.name + ""} 
        path="profile"
      />

      <section className="p-6 lg:p-10 flex flex-col gap-10">
        
        {/* Quick Stats Grid */}
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

        {/* Account Summary Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pb-20">
          
          {/* Personal Accounts Summary */}
          <section className="flex flex-col rounded-none border border-slate-200 bg-white shadow-xl shadow-red-900/5">
            <div className="bg-[#2D3339] p-4 border-b-4 border-red-600">
              <h2 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Personal Accounts</h2>
            </div>
            
            <div className="p-6 flex flex-col gap-4 bg-white/50">
              {twoPersonalAccounts.length > 0 ? (
                twoPersonalAccounts.map(account => {
                  const { id, title, balance, isActive } = account;
                  return (
                    <PersonalAccountCard 
                      key={id}
                      accountId={id.toString()}
                      title={title}
                      url={`personal-account/${id}`}
                      amount={balance}
                      locked={isActive}
                    />
                  );
                })
              ) : (
                <p className="p-4 text-xs italic text-slate-400">No personal accounts found.</p>
              )}
            </div>
          </section>

          {/* Joint Accounts Summary */}
          <section className="flex flex-col rounded-none border border-slate-200 bg-white shadow-xl shadow-red-900/5">
            <div className="bg-[#2D3339] p-4 border-b-4 border-red-600">
              <h2 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Joint Accounts</h2>
            </div>
            
            <div className="p-6 flex flex-col gap-4 bg-white/50">
              {jointAccountSummary.length > 0 ? (
                jointAccountSummary.map(account => {
                  const { id, title, createdBy, balance, createdAt } = account;
                  return (
                    <JointAccountCard 
                      key={id}
                      path="joint-account/" 
                      id={id}
                      title={title}
                      createdAt={createdAt}
                      createdBy={createdBy}
                      balance={balance}
                    />
                  );
                })
              ) : (
                <p className="p-4 text-xs italic text-slate-400">No joint accounts found.</p>
              )}
            </div>
          </section>

        </div>
      </section>
    </section>
  );
}