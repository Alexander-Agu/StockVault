import { CgMenuRight } from "react-icons/cg";
import { RiCloseLargeFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Optional: add scroll shadow for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 w-full z-50 transition
        ${isScrolled ? "shadow-md" : ""}
        bg-[#F8EEED]
      `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-[70px]">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div
            className="
              bg-[url('/src/assets/logo.png')]
              w-[40px] h-[40px]
              bg-cover
            "
          />
          <span className="font-bold text-lg text-[#212121]">StokVault</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-[#444] hover:text-red-500 transition">
            Home
          </Link>
          <Link to="/sign-in" className="text-[#444] hover:text-red-500 transition">
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Get Started
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-red-500 text-3xl"
        >
          <CgMenuRight />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Side Menu */}
          <div className="relative ml-auto w-[260px] bg-[#F8EEED] h-full shadow-xl flex flex-col p-6 gap-6 transition-transform transform translate-x-0">
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-2xl text-[#dc2626]"
            >
              <RiCloseLargeFill />
            </button>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-[#212121] font-medium hover:text-red-500 transition"
            >
              Home
            </Link>

            <Link
              to="/sign-in"
              onClick={() => setMenuOpen(false)}
              className="text-[#212121] font-medium hover:text-red-500 transition"
            >
              Sign In
            </Link>

            <Link
              to="/sign-up"
              onClick={() => setMenuOpen(false)}
              className="bg-red-500 text-white text-center py-2 rounded-lg hover:bg-red-600 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}