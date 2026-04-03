import { Link, useParams } from "react-router-dom";
import MemberItem from "../MemberItem/MemberItem";
import { 
  FaUsers, 
  FaXmark
} from "react-icons/fa6";
import { useState } from "react";
import AddMember from "../AddMember/AddMember";
import type { RootState } from "../../state/store/store";
import { useSelector } from "react-redux";


interface MemberProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean)=> void;
}

export default function Members({isSidebarOpen, setIsSidebarOpen}: MemberProps) {
    const member = useSelector((state: RootState) => state.member);
    const members = member.members;
    
    const [openPage, setOpenPage] = useState(false);
    const { userId } = useParams();

    const isAdmin = members?.find(x => x.userId === Number(userId) && x.role.toLowerCase() === "admin");

    const admins = members?.filter(m => m.role.toLocaleLowerCase() === "admin");
    const generalMembers = members?.filter(m => m.role.toLocaleLowerCase() !== "admin");

    // Display add member bar
    if (openPage){
        return <AddMember openPage={isSidebarOpen} setOpenPage={setOpenPage} />
    }

    if (!openPage){
        return (
            <>
            <aside
                className={`
                fixed inset-y-0 right-0 w-80 bg-white border-l border-slate-200 z-50
                transition-transform duration-300 transform shadow-xl
                xl:translate-x-0 xl:static xl:block xl:shadow-none
                flex flex-col overflow-hidden
                ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
            `}
            >

                {/* Header */}

                <div className="flex justify-between items-center p-8 pb-4">

                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <FaUsers className="text-slate-700" />
                    Members
                </h2>

                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="xl:hidden text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <FaXmark size={22} />
                </button>

                </div>

                {/* Scrollable Members Area */}

                <div className="flex-1 overflow-y-auto px-8 pb-6 flex flex-col gap-8">

                {/* Admins */}

                <section>

                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                    Account Admins
                    </h3>

                    <div className="flex flex-col gap-3">
                    {admins?.map(member => (
                        <MemberItem
                        key={member.userId}
                        name={member.name}
                        paid={false}
                        />
                    ))}
                    </div>

                </section>

                {/* General Members */}

                <section>

                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                    General Members
                    </h3>

                    <div className="flex flex-col gap-3">
                    {generalMembers?.map(member => (
                        <MemberItem
                        key={member.userId}
                        name={member.name}
                        paid={false}
                        />
                    ))}
                    </div>

                </section>

                </div>

                {/* Actions */}

                <div className="p-8 pt-4 flex flex-col gap-3 border-t border-slate-200">

                <Link
                    to={"deposit"}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                    Make Payment
                </Link>

                {
                    isAdmin? <button onClick={() => (setOpenPage(true))}
                    className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                >
                    Add Member
                </button> : ""
                }

                </div>

            </aside>
            </>
        )
        }


}