import axios from "axios"
import { getToken } from "./Api";


const userString: string | null = sessionStorage.getItem("user");
if (userString){
    const data = JSON.parse(userString);
}

// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: apiUrl,
});

// Sends an api request to backend to register the user
export const RegisterUserAsync = async (body: {
    name: string,
    email: string,
    phone: string,
    passwordHash: string
}) => {
    const token = getToken();
    console.log(token);

    try{
        const response = await api.post("/User/register", body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch{
        console.log("Failed to create account");
        return false
    }
}


// Allows user to verify their account
export const VerifyEmailAsync = async (email: string, otp: string) => {
    const token = getToken();

    try{
        const response = await api.put(`/User/verify-email?email=${email}&otp=${otp}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch{
        return false;
    }
}


// Allows user to resend their varification email
export const ResendEmailAsync = async (email: string) => {
    const token = getToken();

    try{
        const response = await api.put(`/User/resend-email?email=${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        console.log("Failed to resend email");
        return false;
    }
}


// Logs user into their account
export const LoginUserAsync = async (body: {
    email: string,
    password: string
}) => {
    const token = getToken();

    try{
        const response = await api.post("/User/login", body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    } catch{
        return false;
    }
}


// Fetches user data
export const FetchProfileAsync = async (userId: number) => {
    const token = getToken();
    
    try{
        const response = await api.get(`/User/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    } catch{
        return false;
    }
}