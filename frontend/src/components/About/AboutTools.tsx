import vault from "../../assets/LandingPage/vault2.png";
import people from "../../assets/LandingPage/people2.png";
import calender from "../../assets/LandingPage/calender2.png";
import cash from "../../assets/LandingPage/cash2.png";

interface AboutData {
    title: string,
    content: string
}

export const aboutData : AboutData[] = [
    {
        title: "Personal Savings Made Simple",
        content: "Create personal savings accounts to grow your money with confidence. Lock your funds until a specific date, track every transaction, and stay in control of your financial goals."
    },
    {
        title: "Powerful Stokvel Accounts",
        content: "Create or join stokvel accounts with friends, family, or colleagues. Define contribution rules, track member compliance, and enjoy automated rotational payouts — all without manual tracking or disputes."
    },
    {
        title: "Transparent & Secure",
        content: "Every transaction is recorded and auditable. Funds are protected by strict backend rules, secure authentication, and role-based access control to keep your money safe."
    },
    {
        title: "Built for Trust",
        content: "StockVault is designed to build trust between members by removing human bias and enforcing rules automatically. Everyone plays by the same rules, every time."
    },
]


interface Icons {
    image: string,
    title: string,
    content: string
}

export const iconsData: Icons[] = [
    {
        image: vault,
        title: "How StockVault Works",
        content: "Start a personal or group savings vault in minutes."
    },
    {
        image: people,
        title: "Invite Members",
        content: "Add friends, family, or stokvel members securely."
    },
    {
        image: calender,
        title: "Save Together",
        content: "Automated contributions keep everyone consistent."
    },
    {
        image: cash,
        title: "Get Paid Out",
        content: "Funds are released fairly, securely, and on time."
    },
];