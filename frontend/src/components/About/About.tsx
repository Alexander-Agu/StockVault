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

            {
                aboutData.map((about, index) => {
                    const { title, content } = about;

                    return <div className="flex flex-col items-center justify-center text-center w-[300px]" key={index}>
                        <div className="relative w-[110px] h-[90px] flex items-center justify-center">
                            <h2 className="font-medium text-4xl text-red-500">0{index + 1}</h2>
                            <h2 className="absolute top-0 right-0 font-medium text-2xl text-[#212121]">/0{numberOfItems}</h2>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-[#212121]">
                                {title}
                            </h2>

                            <p className="text-[#737373]">
                                {content}
                            </p>
                        </div>
                    </div>
                })
            }

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