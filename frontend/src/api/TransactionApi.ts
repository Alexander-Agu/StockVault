import axios from "axios"
import { getId, getToken } from "./Api";

// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: apiUrl + "/Transection",
});

export interface PersonalAccountTransactions {
    transectionId: number;
    accountId: number;
    accountType: string;
    userName: string;
    amountCents: number;
    transectionType: string;
    createdAt: Date
}


// Get transactions
export const FetchAccountTransactionAsync = async (accountId: string, accountType: string) => {
    const token = getToken();
    const id = getId();

    try{
        const response = await api.get(`/${id}/` + accountId + `/${accountType}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data.data;
    } catch{
        return false;
    }
}