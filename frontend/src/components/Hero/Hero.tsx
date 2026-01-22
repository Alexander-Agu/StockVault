import { heroData } from "./HeroTools";


export default function Hero() {
  return (
    <article className="w-full h-[37dvh] bg-[url('/src/assets/LandingPage/hero2.png')]
        bg-cover bg-no-repeat p-2
    ">

    <div className="bg-white/70 w-full h-[60px] p-1 shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
        {heroData.map((data, index) => {
            const { color, content, head } = data;

            return (
            <div key={index} className="flex items-center gap-1">
                <div
                className="w-[40px] h-[20px]"
                style={{ backgroundColor: color }}
                />
                <p className={head ? "font-bold" : ""}>{content}</p>
            </div>
            );
        })}
    </div>

    <div className="mt-[10px]">
        <h1 className="w-[10rem] font-extrabold text-[1.2rem]">Welcome to StockVault</h1>
        <p className="
            w-[7rem] text-[12px] font-medium
        ">StockVault: modern digital stokvels. Save together with automated rules, transparency, and security.</p>
    </div>

    </article>
  )
}