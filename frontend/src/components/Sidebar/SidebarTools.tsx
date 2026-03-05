import { AiFillHome } from "react-icons/ai";
import { FaWallet, FaBookOpen } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { GiWallet } from "react-icons/gi";
import type { IconType } from "react-icons";
import { FaPerson, FaPersonMilitaryRifle } from "react-icons/fa6";

interface SidebarData {
  path: string;
  title: string;
  icon: IconType;
}

export const sidebarItems: SidebarData[] = [
  {
    path: "",
    title: "Home",
    icon: AiFillHome,
  },
  {
    path: "personal-account",
    title: "Personal Accounts",
    icon: FaWallet,
  },
  {
    path: "#",
    title: "Joint Accounts",
    icon: GiWallet,
  },
  {
    path: "#",
    title: "Profile",
    icon: IoPersonSharp,
  },
];
