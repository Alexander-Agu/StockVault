import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import BackHomeHeader from '../components/BackHomeHeader/BackHomeHeader';

interface SignInInputs {
    required: boolean;
    title: string;
    placeholder: string;
    input: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

        const inputs: SignInInputs[] = [
        {
            required: true,
            title: "Email",
            placeholder: "Enter your email",
            input: setEmail,
            value: email
        },
        {
            required: true,
            title: "Password",
            placeholder: "Create a password",
            input: setPassword,
            value: password
        },
    ];


  return (
    <article className='w-full h-[100dvh]
        flex flex-col items-center bg-[#f8eeed8e]
    '>
        <BackHomeHeader />

        <div className='w-[375px] p-3 flex flex-col justify-center gap-4 flex-1 sm:w-[450px]'>
            <div className='momo-trust-sans'>
                <h2 className='text-3xl font-medium'>
                    Sign In
                </h2>

                <p className='text-[#4d4a4a] noto-sans'>
                    Welcome back, continue saving.
                </p>
            </div>
            <form action="" id='signup' className='flex flex-col gap-4 momo-trust-sans'>
                {
                    inputs.map((data, index) => {
                        const { required, title, placeholder, input, value } = data;

                        return <div key={index}>

                            <label htmlFor={title} className='w-full flex gap-1 items-center noto-sans'>
                                <h2 className='font-medium'>
                                    {title} 
                                </h2>

                                <p className='text-red-500'>
                                    {required? "*" : ""}
                                </p>
                            </label>

                            <input type={`${title === "Password"? "password": "text"}`} 
                            id={title} placeholder={placeholder} value={value} onChange={e => input(e.target.value)}
                            className='
                                w-full h-12 p-2 border border-[#a1989854] rounded-[8px]
                                noto-sans
                            '/>
                        </div>
                    })
                }

                <a href="#" className='noto-sans text-red-500'>Forgot your password?</a>

                <input type="submit" value="Login" 
                    className='w-full p-3 bg-red-500 rounded-[8px] text-white font-bold'
                />

                <div className='w-full flex items-center justify-center'>
                    <p className='text-[#00000077]'>
                        Don't have an account? <Link className='text-red-400 font-bold' to={"/sign-up"}>SIgnUp</Link> instead.
                    </p>
                </div>
            </form>    
        </div>


    </article>
  )
}