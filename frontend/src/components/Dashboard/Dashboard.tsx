import { FaWallet } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import StatCard from '../StatCard/StatCard';

interface StatItem {
  title: string;
  count: number;
  icon: any;
  linkText: string;
}

export default function Dashboard() {
  const stats: StatItem[] = [
    { title: "Savings accounts", count: 3100, icon: FaWallet, linkText: "View Details" },
    { title: "Personal accounts", count: 12345, icon: FaWallet, linkText: "View Details" },
    { title: "Joint accounts", count: 8240, icon: GiWallet, linkText: "View Details" },
  ];

  return (
    <main className="w-full h-full flex flex-col p-6 lg:p-10">
      <section className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
      </section>
    </main>
  );
}