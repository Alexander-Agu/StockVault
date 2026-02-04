import React from 'react'
import { sidebarItems } from './SidebarTools'
import { Link } from 'react-router-dom';
import BackHomeHeader from '../BackHomeHeader/BackHomeHeader';

export default function Sidebar() {
  return (
    <nav
      className='
        w-full fixed bottom-0 flex items-center justify-between p-3

        /* black gradient */
        bg-gradient-to-b from-black to-[#0a0a0a]

        /* depth */
        shadow-[0_-4px_20px_rgba(0,0,0,0.7)]

        /* rounded */
        rounded-t-3xl

        /* desktop */
        md:w-[120px] md:top-0 md:left-0 md:flex-col
        md:rounded-none md:rounded-r-3xl md:shadow-[4px_0_20px_rgba(0,0,0,0.7)]
        md:justify-start md:items-center

        lg:w-[250px]
        xl:w-[300px]
      '
    >

      {/* ===== LOGO AREA ===== */}
      <div className='
        hidden md:flex w-full items-center justify-center
        border-b border-red-600/30
        pb-5 mb-2
        lg:justify-start lg:px-4
      '>

        <div
          className="bg-[url('/src/assets/logored.png')] w-[48px] h-[48px] bg-cover"
        />

        <h2 className='
          hidden lg:flex flex-1 text-2xl
          text-red-500 font-bold tracking-wide
        '>
          StokVault
        </h2>
      </div>


      {/* ===== NAV ITEMS ===== */}
      {
        sidebarItems.map((data, index) => {
          const Icon = data.icon;

          return (
            <div
              key={index}
              className={`
                flex-1 flex items-center justify-center

                ${index === 0 ? "" : "border-l border-red-600/20"}

                md:flex-initial md:border-l-0 md:w-full md:h-[85px]

                ${index === sidebarItems.length - 1
                  ? ""
                  : "md:border-b md:border-red-600/20"}
              `}
            >
              <a
                href={data.path}
                className='
                  group
                  flex flex-col items-center gap-2 text-center
                  text-white/60

                  md:w-full md:h-full md:flex-col md:justify-center

                  lg:flex-row lg:justify-start lg:gap-5 lg:pl-5

                  /* smooth interactions */
                  transition-all duration-200
                  hover:text-red-500
                  hover:bg-red-500/10
                  active:scale-95
                  rounded-xl
                  px-2 py-2
                '
              >
                <Icon className='text-2xl group-hover:scale-110 transition' />

                <p className='text-[12px] lg:text-[1rem] font-medium'>
                  {data.title}
                </p>
              </a>
            </div>
          );
        })
      }


      {/* ===== PROFILE ===== */}
      <div className='hidden md:flex flex-1 relative w-full'>
        <div
          className='
            absolute bottom-6 w-full px-3 py-3

            border-t border-red-600/20

            flex items-center justify-evenly
            lg:justify-start lg:gap-4
          '
        >

          <div className='
            w-[48px] h-[48px]
            rounded-full

            /* red glow avatar */
            bg-red-500/20 text-red-500
            border border-red-500/40

            flex items-center justify-center
            font-bold text-lg
          '>
            A
          </div>

          <div className='hidden lg:block text-white/80'>
            <h2 className='text-[1.1rem] font-semibold'>
              Alexander Agu
            </h2>

            <p className='text-sm text-white/50'>
              t****@gmail.com
            </p>
          </div>
        </div>
      </div>

    </nav>
  )
}
