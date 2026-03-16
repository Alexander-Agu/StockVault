import axios from "axios"
import { getId, getToken } from "./Api";


// const userString: string | null = sessionStorage.getItem("user");
// let data = null;

// if (userString){
//     data = JSON.parse(userString);
// }

// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: apiUrl + "/v1/JointAccount",
    // headers: {
    //     Authorization: `bearer ${token}`
    // }
});

export interface JointAccount {
    id: number;
    title: string;
    createdBy: number;
    Balance: number;
    createdAt: Date;
}

// Fetches all joint accounts the user is involved in
export const FetchJointAccountsAsync = async () => {
    const token = getToken();
    try{
        const response = await api.get("", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}

export interface JointAccountDeposit {
    amount: number;
    paymentMethodId: string;
}

// Creates a Joint account
export const JointAccountDepositAsync = async (body: JointAccountDeposit, accountId: string) => {
    const token = getToken();

    try{
        const response = await api.put(`/deposit/${accountId}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}