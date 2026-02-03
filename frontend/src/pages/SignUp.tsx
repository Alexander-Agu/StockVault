import React, { useState } from 'react'

interface SignUpInputs {
    required: boolean;
    title: string;
    placeholder: string;
    input: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}


const passwordConstraints = [
    "Must be at least 8 charaters",
    "Must have at least 1 uppercase and lowercase characters",
    "Must have at least 1 number",
    "Must have at least 1 special character"
]

export default function SignUn() {
    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    const inputs: SignUpInputs[] = [
        {
            required: true,
            title: "Name",
            placeholder: "Enter your name",
            input: setName,
            value: name
        },
        {
            required: true,
            title: "Email",
            placeholder: "Enter your email",
            input: setEmail,
            value: email
        },
        {
            required: false,
            title: "Phone Number",
            placeholder: "Enter phone number",
            input: setPhone,
            value: phone
        },
        {
            required: true,
            title: "Password",
            placeholder: "Create a password",
            input: setPassword,
            value: password
        },
        // {
            // required: true,
        //     title: "Confirm Password",
        //     placeholder: "",
        //     input: setConfirmPassword,
        //     value: confirmPassword
        // },
    ];

  return (
    <article className='w-full h-[100dvh] p-3
        flex flex-col
    '>
        <div className='w-full'>
            <a href="/" className='text-2xl text-red-500 font-bold'>
                StockVault
            </a>
        </div>

        <div className='flex flex-col justify-center gap-4 flex-1'>
            <div className='momo-trust-sans'>
                <h2 className='text-3xl font-medium'>
                    Sign up
                </h2>

                <p className='text-[#4d4a4a] noto-sans'>
                    Start your account today and start saving
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

                            {
                                title == "Password"? <div className='mt-1'>
                                    <ul className='text-[13px] text-[#746d6d] noto-sans'>
                                        {
                                            passwordConstraints.map((data, index) => {
                                                return <li key={index}>
                                                    {data}
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div> : ""
                            }
                        </div>
                    })
                }

                <input type="submit" value="Create Account" 
                    className='w-full p-3 bg-red-500 rounded-[8px] text-white font-bold'
                />
            </form>    
        </div>


    </article>
  )
}