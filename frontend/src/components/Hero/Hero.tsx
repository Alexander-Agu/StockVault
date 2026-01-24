// import { heroData } from "./HeroTools";


export default function Hero() {
  return (
    <article className="w-full h-[99.5dvh] bg-[#FAF3F3]
        bg-cover bg-no-repeat
    ">
        <div className="flex flex-col items-start w-full h-[40%] p-4">
            <div className="flex items-center justify-center gap-2 hidden">
                <div className="flex gap-1 flex-col">
                    <div className="w-[40px] h-[20px] bg-black"></div>
                    <div className="w-[40px] h-[20px] bg-red-500"></div>
                </div>

                <h1 className="text-3xl font-bold">
                    StockVault
                </h1>
            </div>

            <div>
                <h2 className="text-4xl font-medium text-red-500">
                    Save Together.
                </h2>

                <h2 className="text-4xl font-medium">
                    Grow Together.
                </h2>
            </div>

            <div className="w-full flex flex-col items-start justify-center pt-6">
                <p className="text-1xl font-semibold">
                    StockVault: modern digital stokvels. Save together with automated rules, transparency, and security. 
                </p>
            </div>

            <div className="pt-5 flex gap-2">
                <button className="p-2 bg-red-500 font-medium text-[#FAF3F3] rounded-[8px] w-[120px]">
                    Get Started
                </button>
                <button className="p-2 bg-[trasparent] font-medium text-red-500 rounded-[8px] w-[120px] border">
                    Get Started
                </button>
            </div>
        </div>

        <div
        className="w-full h-[50vh] 
            bg-[url('/src/assets/LandingPage/heroBackground.png')]
            bg-no-repeat bg-center bg-cover"
        >
            <div
                className="w-full h-full
                bg-[url('/src/assets/LandingPage/heroPeople.png')]
                bg-no-repeat bg-cover bg-contain"
            />
        </div>


    </article>
  )
}