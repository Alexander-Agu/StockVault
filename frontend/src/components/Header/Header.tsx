import { CgMenuRight } from "react-icons/cg";
import { RiCloseLargeFill } from "react-icons/ri";
import { useEffect, useState } from 'react'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
  return (
        <header 
            className={`${isScrolled? "scrolled" : 'bg-mainBackground'}
                h-[70px] w-full  p-4
                flex items-center justify-between
                 z-[100] bg-[#F8EEED]
            `}
        >

            <a href="/" 
                className='
                    flex items-center 
                '
            >
                <div className="bg-[url('/src/assets/logo.png')] w-[50px] h-[50px]
                    bg-cover
                "></div>
                <h2 className='inter text-[1.2rem] font-bold'>StockVault</h2>
            </a>
            

            <nav
                className='
                flex items-center justify-center
                '
            >

                <div className='md:hidden' onClick={()=> setMenuOpen(true)}>
                    <CgMenuRight className="text-red-500 text-3xl" />
                </div>

                <ul
                    className={` inter ${isScrolled? "scrolled" : 'bg-[#ECECEC]'}
                    fixed top-0 right-0 h-[100vh] w-[250px] bg-[rgb(31,31,33)] text-white p-4 flex flex-col gap-4
                    transform transition-transform duration-300 ease-in-out
                    ${menuOpen ? "translate-x-0" : "translate-x-full"}

                    md:static md:translate-x-0 md:h-auto md:w-auto md:bg-transparent md:text-black md:flex-row md:gap-6 z-1
                    `}
                >
                    <li>
                        <div className='md:hidden'
                         onClick={()=> setMenuOpen(false)}>
                            <RiCloseLargeFill className="text-mainBackground text-2xl" />
                        </div>
                    </li>
                    <li>
                        <a href='#'> Home </a>
                    </li>
                    <li>
                        <a href='#'> Home </a>
                    </li>
                    <li>
                        <a href='#'> Home </a>
                    </li>
                    <li>
                        <a href='#'> Home </a>
                    </li>
                    <li>
                        <a href='#'> Home </a>
                    </li>
                </ul>
            </nav>

        </header>
  )
}