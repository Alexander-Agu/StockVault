import { Link } from "react-router-dom";
import { aboutData, iconsData } from "./AboutTools";

export default function About() {

  const numberOfItems = aboutData.length;

  return (
    <section className="bg-[#F8EEED] py-16 flex flex-col items-center">

      {/* HEADER */}
      <div className="w-full flex items-center justify-center flex-col text-center px-6">
        <h2 className="text-3xl font-bold text-red-500">
          Why StokVault?
        </h2>

        <p className="font-normal pt-5 text-[#737373] max-w-[640px]">
          StokVault is a modern digital platform for managing stokvels.
          Save together with automated rules, transparent tracking,
          and secure group finances.
        </p>
      </div>


      {/* NUMBERED FEATURES */}
      <div className="flex flex-wrap w-full items-center justify-center gap-10 px-6 mt-14">

        {aboutData.map((about, index) => {

          const { title, content } = about;

          return (
            <div
              key={index}
              className="
              flex flex-col items-center text-center
              w-[280px]
              bg-white
              p-6
              rounded-2xl
              shadow-sm
              hover:shadow-lg hover:-translate-y-1
              transition
              "
            >

              {/* Number */}
              <div className="relative w-[120px] h-[90px] flex items-center justify-center mb-4">

                <h2 className="font-bold text-5xl text-red-500">
                  0{index + 1}
                </h2>

                <span className="absolute top-1 right-2 text-sm font-medium text-[#444]">
                  /0{numberOfItems}
                </span>

              </div>

              {/* Divider */}
              <div className="w-12 h-[2px] bg-red-500 mb-4"></div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#212121]">
                {title}
              </h3>

              {/* Content */}
              <p className="text-[#737373] text-sm mt-2 leading-relaxed">
                {content}
              </p>

            </div>
          )
        })}

      </div>


      {/* CTA SECTION */}
      <div
        className="
        bg-[url('/src/assets/LandingPage/AboutBackground.png')]
        bg-no-repeat bg-center bg-cover
        w-full
        mt-20
        py-20
        px-6
        flex flex-col items-center justify-center gap-4
        text-center
        "
      >

        <h2 className="text-[#F8EEED] text-xl md:text-2xl max-w-[700px]">
          Create an account, start saving, and experience a smarter
          way to manage personal and group finances.
        </h2>

        <Link
          to="/sign-up"
          className="
          w-[180px]
          h-12
          bg-[#F8EEED]
          rounded-3xl
          flex items-center justify-center
          text-red-500
          font-medium
          hover:scale-105
          transition
          "
        >
          Get Started Today
        </Link>

      </div>


      {/* ICON FEATURES */}
      <div className="flex flex-wrap items-center justify-center px-6 py-16 gap-8 max-w-[1200px]">

        {iconsData.map((data, index) => {

          const { image, title, content } = data;

          return (
            <div
              key={index}
              className="
              flex flex-col
              w-[260px]
              items-center
              text-center
              gap-3
              bg-white
              p-6
              rounded-2xl
              shadow-sm
              hover:shadow-lg
              transition
              "
            >

              <div className="w-[60px]">
                <img
                  src={image}
                  alt={title}
                  className="w-full object-contain"
                />
              </div>

              <h3 className="font-semibold text-lg text-[#212121]">
                {title}
              </h3>

              <p className="text-[#686666] text-sm">
                {content}
              </p>

            </div>
          )

        })}

      </div>

    </section>
  )
}