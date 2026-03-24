import heroImage from "../../assets/LandingPage/hero.png"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section className="bg-[#F8EEED] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
  bg-[size:50px_50px]">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="space-y-6">

          <div className="border-l-4 border-red-500 pl-4">
            <p className="text-sm text-[#737373] italic">
              Save Together. Grow Together.
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#212121] leading-tight">
            Modern <span className="text-red-500">Digital Stokvels</span>
            <br />
            Built for Trust
          </h1>

          <p className="text-[#737373] max-w-lg">
            Manage your stokvel online with automated savings rules,
            transparent tracking, and secure group finances.
          </p>

          <div className="flex gap-4 pt-4">
            <Link
              to="/sign-up"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium shadow-md transition"
            >
              Get Started
            </Link>

            <Link
              to="/learn-more"
              className="border border-red-500 text-red-500 px-6 py-3 rounded-xl font-medium hover:bg-red-50 transition"
            >
              Learn More
            </Link>
          </div>

        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={heroImage}
              alt="StokVault dashboard"
              className="w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}