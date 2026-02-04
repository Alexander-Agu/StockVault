import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BackHomeHeader from '../components/BackHomeHeader/BackHomeHeader';
import { isValidPassword } from '../tools/UserTools';
import { RegisterUserAsync } from '../api/UserApi';

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

export default function SignUp() {
    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [failed, setFailed] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    // const [confirmPassword, setConfirmPassword] = useState("");

    const [buttonClicked, setButtonClicked] = useState(false);

    const navigate = useNavigate();

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


    const HandleRegisterUserAsync = async ()=> {
        // Validate password
        if (!isValidPassword(password)) {
            setFailed(true);
            return;
        }

        if (buttonClicked) return;

        // Check if other input fields are not empty
        if (name === "" && email === "") {
            setFailed(true);
            return;
        }

        setButtonClicked(true);
        try{
            const response = await RegisterUserAsync({
                name: name,
                email: email,
                phone: phone,
                passwordHash: password
            });

            if (response != false) navigate(`/activate/${email}`)
        } catch{
            console.log("Failed to create account")
            setButtonClicked(false);
        } finally{
            setButtonClicked(false);
        }
    }

  return (
    <article className='w-full h-[100dvh]
        flex flex-col items-center bg-[#f8eeed8e]
    '>
        <BackHomeHeader />

        <div className='w-[375px] p-3 flex flex-col justify-center gap-4 flex-1 sm:w-[450px]'>
            <div className='momo-trust-sans'>
                <h2 className='text-3xl font-medium'>
                    Sign up
                </h2>

                <p className='text-[#4d4a4a] noto-sans'>
                    Start your account today and start saving
                </p>
            </div>
            <form action={HandleRegisterUserAsync} id='signup' className='flex flex-col gap-4 momo-trust-sans'>
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
                    <div className='w-full flex items-center justify-center'>
                    <p className='text-[#00000077]'>
                        Already have an account? <Link className='text-red-400 font-bold' to={"/sign-in"}>SIgnIn</Link> instead.
                    </p>
                </div>
            </form>    
        </div>


    </article>
  )
}