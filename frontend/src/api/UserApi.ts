import axios from "axios"


// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: apiUrl,
    headers: {}
});

// Sends an api request to backend to register the user
export const RegisterUserAsync = async (body: {
    name: string,
    email: string,
    phone: string,
    passwordHash: string
}) => {
    try{
        const response = await api.post("/User/register", body);
        return response.data;
    } catch{
        console.log("Failed to create account");
        return false
    }
}


// Allows user to verify their account
export const VerifyEmailAsync = async (email: string, otp: string) => {
    try{
        const response = await api.put(`/User/verify-email?email=${email}&otp=${otp}`);
        return response.data;
    } catch{
        return false;
    }
}


// Allows user to resend their varification email
export const ResendEmailAsync = async (email: string) => {
    try{
        const response = await api.put(`User/resend-email?email=${email}`);

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
    try{
        const response = await api.post("User/login", body);
        return response.data
    } catch{
        return false;
    }
}


// Fetches user data
export const FetchProfileAsync = async (userId: number) => {
    try{
        const response = await api.get(`User/profile/${userId}`);
        return response.data
    } catch{
        return false;
    }
}