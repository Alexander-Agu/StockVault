import { useState } from "react";
import { aboutData } from "./AboutTools";

export default function About() {
    let numberOfItems = aboutData.length;

  return (
    <section className="bg-[mainBacground] pt-5">
        <div className="w-full flex items-center justify-center flex-col text-center p-2">
            <h2 className="text-2xl font-bold text-red-500">
                Why StockVault?
            </h2>

            <p className="font-normal pt-5">
                StockVault: modern digital stokvels. Save together with automated rules, transparency, and security.StockVault: modern digital stokvels. Save together with automated rules, transparency, and security.
            </p>
        </div>

        <div className="flex wrap items-center justify-center flex-col p-3 gap-6">
            {
                aboutData.map((about, index) => {
                    const { title, content } = about;

                    return <div className="flex flex-col items-center justify-center text-center">
                        <div className="relative w-[110px] h-[90px] flex items-center justify-center">
                            <h2 className="font-medium text-4xl text-red-500">0{index + 1}</h2>
                            <h2 className="absolute top-0 right-0 font-medium text-2xl">/0{numberOfItems}</h2>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold w-[90%]">
                                {title}
                            </h2>

                            <p>
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