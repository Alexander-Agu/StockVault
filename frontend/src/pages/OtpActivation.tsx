import React, { use, useRef, useState } from 'react'
import BackHomeHeader from '../components/BackHomeHeader/BackHomeHeader'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ResendEmailAsync, VerifyEmailAsync } from '../api/UserApi';

export default function OtpActivation() {
    // navigation attributes
    const navigate = useNavigate();
    const { email } = useParams();

    const [codeSent, setCodeSent] = useState(false);

    // Button states
    const [activationButtonClicked, setActivationButtonClicked] = useState(false);
    const [resendButtonClicked, setResendButtonClicked] = useState(false);
        
    const length = 6;
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];

        newOtp[index] = value.slice(-1); // only 1 char
        setOtp(newOtp);

        // move forward
        if (value && index < length - 1) {
        inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        // move backward
        if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputs.current[index - 1]?.focus();
        }
    };
    
    const handleAccountActivationAsync = async () => {
        if (otp.length !== 6 || activationButtonClicked) return;

        setActivationButtonClicked(true);

        try {
            const code = otp.join("");

            const response = await VerifyEmailAsync(email + "", code);

            if (response) {
                navigate("/sign-in");
            } else {
                setActivationButtonClicked(false);
            }

        } catch (err) {
            console.log("Failed to activate account", err);
            setActivationButtonClicked(false);
        } finally{
            setActivationButtonClicked(false);
        }
    };
    
    const HandleResendCodeAsync = async ()=> {
        if (resendButtonClicked) return;

        setResendButtonClicked(true);
        try{
            const response = await ResendEmailAsync(email + "");
            
            console.log(response)
            return response;
        } catch{
            setResendButtonClicked(false);
            return false;
        } finally{
            setResendButtonClicked(false);
        }
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

                <form action={handleAccountActivationAsync} className='flex flex-col items-center gap-6 p-2 w-full'>
                    <div className="flex gap-2">
                    {otp.map((digit, index) => (
                        <input
                        key={index}
                        ref={(el) => { inputs.current[index] = el; }}
                        value={digit}
                        maxLength={1}
                        inputMode="numeric"
                        className="digit w-[40px] h-[40px]
                            border border-[#ff00003a] text-center text-red-500
                            sm:w-[50px] sm:h-[50px]"
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                    </div>

                    <input type="submit" value={"Activate"} className='
                        bg-red-500 w-[80%] p-3 rounded-2xl
                        text-white text-[1.2rem] font-medium
                    ' />
                </form>

                <p className='text-[#00000077]'>
                        Didn't receive the code? <button onClick={()=> HandleResendCodeAsync()} className='text-red-500 font-medium'>Resend</button>
                </p>

                {
                    codeSent? <p className='text-[#ff00007e] text-[14px] absolute bottom-0'>New Code Has Been Sent</p> : ""
                }
            </div>

        </div>
    </article>
  )
}