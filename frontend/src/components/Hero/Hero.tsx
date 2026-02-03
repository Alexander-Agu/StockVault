// import { heroData } from "./HeroTools";
import heroImage from "../../assets/LandingPage/hero.png"


export default function Hero() {
  return (
    <section
      className="relative bg-[#F8EEED]">
      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Tabs */}
            <div
              className="inline-flex rounded-full p-1"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <button
                className="px-4 py-2 text-sm rounded-full text-[#737373]"
              >
                Services
              </button>
              <button
                className="px-4 py-2 text-sm rounded-full text-[#737373]">
                Features
              </button>
              <button
                className="px-4 py-2 text-sm rounded-full text-[#737373]"
              >
                Community
              </button>
            </div>

            {/* Tagline */}
            <div
              className="border-l-4 pl-4 border-[#dc2626]">
              <p
                className="text-sm italic text-[#737373]">
                Save Together. Grow Together.
              </p>
            </div>

            {/* Heading */}
            <h1
              className="text-4xl lg:text-5xl font-bold text-[#dc2626]">
              Welcome to
              <br />
              StokVault
            </h1>

            {/* Description */}
            <p
              className="max-w-md text-[#737373]">
              StokVault: modern digital stokvels. Save together with automated
              rules, transparency, and security.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Professional team collaborating"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}