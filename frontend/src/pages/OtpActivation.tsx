import React, { useState } from 'react'
import BackHomeHeader from '../components/BackHomeHeader/BackHomeHeader'

export default function OtpActivation() {
    const [codeSent, setCodeSent] = useState(false);
    const inputs = document.querySelectorAll<HTMLInputElement>(".digit");
    
    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            // move forward when typed
            if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", (e) => {
            // move backward on backspace
            if (e.key === "Backspace" && input.value === "" && index > 0) {
            inputs[index - 1].focus();
            }
        });
    });  
    
    const ResendCode = ()=> {
        if (codeSent) setCodeSent(false);
        else setCodeSent(true);
    }
  return (
    <article className='bg-[#f8eeed8e] flex flex-col items-center w-full h-[100dvh]'>
        <BackHomeHeader />

        <div className='flex flex-1 w-full h-full items-center justify-center'>

            <div className='relative flex flex-col gap-6 items-center justify-center  w-[375px] h-[50dvh]
                sm:w-[500px] sm:h-[40dvh]
            '>
                <div className='flex flex-col items-center'>
                    <h2 className='text-3xl noto-sans font-bold'>
                        Activate Account
                    </h2>

                    <p className='text-[#00000088]'>
                        Enter the 6 digit OTP sent to your email
                    </p>
                </div>

                <form action="" className='flex flex-col items-center gap-6 p-2 w-full'>
                    <div className='flex gap-2'>
                        {
                            [1,2,3,4,5,6].map((x, index) => {
                                return <input maxLength={1} className="digit w-[40px] h-[40px]
                                    border border-[#ff00003a] text-center text-red-500
                                    sm:w-[50px] sm:h-[50px]
                                " />
                            })
                        }
                    </div>

                    <input type="submit" value={"Activate"} className='
                        bg-red-500 w-[80%] p-3 rounded-2xl
                        text-white text-[1.2rem] font-medium
                    ' />
                </form>

                <p className='text-[#00000077]'>
                        Didn't receive the code? <button onClick={()=> ResendCode()} className='text-red-500 font-medium'>Resend</button>
                </p>

                {
                    codeSent? <p className='text-[#ff00007e] text-[14px] absolute bottom-0'>New Code Has Been Sent</p> : ""
                }
            </div>

        </div>
    </article>
  )
}