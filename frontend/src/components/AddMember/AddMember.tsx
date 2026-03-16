import { useEffect } from "react";
import { FaUsers, FaXmark } from "react-icons/fa6";

interface AddMemberProps {
  openPage: boolean;
  setOpenPage: (open: boolean)=> void;
}

export default function AddMember({openPage, setOpenPage}: AddMemberProps) {
  useEffect(()=>{
    if (!openPage && window.innerWidth < 1024) setOpenPage(false);
  }, [openPage])
  return (
    <>
      <aside
        className={`
        fixed inset-y-0 right-0 w-80 bg-white border-l border-slate-200 z-50
        transition-transform duration-300 transform shadow-xl
        xl:translate-x-0 xl:static xl:block xl:shadow-none
        flex flex-col overflow-hidden
        ${openPage ? "translate-x-0" : "translate-x-full"}
      `}
      >

        {/* Header */}

        <div className="flex justify-between items-center p-8 pb-4 border-b border-slate-200">

          <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <FaUsers className="text-slate-700" />
            Add New Member
          </h2>

          <button
            onClick={() => setOpenPage(false)}
            className=" text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FaXmark size={22} />
          </button>

        </div>

        {/* Scrollable Content */}

        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">

          <p className="text-sm text-slate-500 leading-relaxed">
            You can only add members that have already joined the platform.
          </p>

          <form className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                New Member
              </label>

              <input
                type="text"
                placeholder="Enter member email or username"
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              Add New Member
            </button>

          </form>

        </div>
      </aside>
    </>
  )
}