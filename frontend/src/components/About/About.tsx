import { aboutData, iconsData } from "./AboutTools";

export default function About() {
    let numberOfItems = aboutData.length;

  return (
    <section className="bg-[#F8EEED] pt-5 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center flex-col text-center p-2">
            <h2 className="text-2xl font-bold text-red-500">
                Why StockVault?
            </h2>

            <p className="font-normal pt-5 text-[#737373] md:w-[640px]">
                StockVault: modern digital stokvels. Save together with automated rules, transparency, and security.StockVault: modern digital stokvels. Save together with automated rules, transparency, and security.
            </p>
        </div>

        <div className="flex flex-wrap w-full items-center justify-center flex-col p-3 gap-6 sm:flex-row">
            {
                aboutData.map((about, index) => {
                    const { title, content } = about;

                    return <div className="flex flex-col items-center justify-center text-center w-[300px]">
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

        <div className="bg-[url('/src/assets/LandingPage/AboutBackground.png')] bg-no-repeat bg-center bg-cover
            w-full h-[30dvh] p-2 flex flex-col items-center justify-center gap-2
        ">
            <h2 className="text-[#F8EEED] text-center sm:w-[640px] md:text-2xl md:w-full">
                Create an account, start saving, and experience a smarter way to manage personal and group finances.
            </h2>

            <a href="#" className="w-[150px] h-12 bg-[#F8EEED] rounded-3xl flex items-center justify-center text-[#dc2626] font-medium">
                Get Started Today
            </a>
        </div>

        <div className="flex flex-wrap items-center justify-center p-5 gap-3">
            {
                iconsData.map((data, index) => {
                    const { image, title, content } = data;

                    return <div key={index} className="flex flex-col w-[300px] items-center justify-center gap-2">
                        <div className="w-[30%]">
                            <img src={image} alt={title} className="" />
                        </div>
                        

                        <div className="w-full flex flex-col items-center justify-center">
                            <h2 className="text-center font-medium text-2xl">
                                {title}
                            </h2>

                            <p className="text-center text-[#686666]">
                                {content}
                            </p>
                        </div>
                    </div>
                })
            }
        </div>
    </section>
  )
}