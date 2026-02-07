import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { IoExitSharp } from "react-icons/io5";
import { useState } from "react";
import { GetFirstLetter } from "../../tools/UserTools";

interface ProfileHeaderProps{
    name: string
    title: string
}

export default function PortalHeader({ title, name }: ProfileHeaderProps) {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const HandleProfileMenuOpen = ()=> {
        if (profileMenuOpen) setProfileMenuOpen(false);
        else setProfileMenuOpen(true);
    }

  return (
    <section
    className="
        flex items-center justify-between
        w-full px-6 py-5
        bg-[#F8EEED]
        border-b border-black/5
    "
    >
    <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-4xl">
        {title}
        </h2>

        <p className="text-sm text-red-500 font-medium">
        Welcome back, {name}
        </p>
    </div>


    <div className="relative z-10 flex items-center gap-3">

        <a
        href="#"
        className="
            w-[42px] h-[42px]
            rounded-full
            bg-red-500/10 text-red-500
            border border-red-500/30
            flex items-center justify-center
            font-semibold
            hover:bg-red-500/20
            transition
        "
        >
        {GetFirstLetter(name)}
        </a>


        <nav>
        <div
            onClick={() => HandleProfileMenuOpen()}
            className="cursor-pointer text-gray-500 hover:text-red-500 transition animate-bounce text-2xl"
        >
            <FaChevronDown />
        </div>

        <ul
            className={`
            absolute top-full right-0 mt-3
            w-[220px] p-3

            bg-white text-gray-800
            rounded-xl
            border border-black/10
            shadow-xl

            transform transition-all duration-200
            ${profileMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0 pointer-events-none"
            }

            flex flex-col gap-2
            `}
        >
            <li
            onClick={() => HandleProfileMenuOpen()}
            className="self-end cursor-pointer text-gray-400 hover:text-red-500"
            >
            <IoClose className="text-xl" />
            </li>

            <li className="w-full">
            <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 transition">
                <IoPersonSharp className="text-xl text-red-500" />
                <p className="text-sm font-medium">Profile</p>
            </a>
            </li>

            <li className="w-full">
            <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 transition">
                <IoExitSharp className="text-xl text-red-500" />
                <p className="text-sm font-medium">Logout</p>
            </button>
            </li>
        </ul>
        </nav>
    </div>
    </section>
  )
}