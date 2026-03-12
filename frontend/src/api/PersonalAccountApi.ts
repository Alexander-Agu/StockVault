import axios from "axios"
import { getId, getToken } from "./Api";

// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: apiUrl + "/PersonalAccount",
});


// Fetches all user accounts
export const FetchPersonalAccountsAsync = async () => {
    const token = getToken();
    const id = getId();

    try{
        const response = await api.get(`/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}

export interface CreateAccount {
    title: string;
}
// Creates a personal account
export const CreatePersonalAccountsAsync = async (body: CreateAccount) => {
    const token = getToken();
    const id = getId();

    try{
        const response = await api.post(`/create-account/${id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}


export interface LockAccountDto {
    lockDate: string;
}
// Creates a personal account
export const LockAccountsAsync = async (body: LockAccountDto, accountId: string) => {
    const token = getToken();
    const id = getId();

    try{
        const response = await api.post(`/lock/${id}/${accountId}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}

export interface PersonalAccountDeposit {
    amount: number;
    paymentMethodId: string;
}
// Creates a personal account
export const PersonalAccountDepositAsync = async (body: PersonalAccountDeposit, accountId: string) => {
    const token = getToken();
    const id = getId();

    try{
        const response = await api.put(`/deposit/${id}/${accountId}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}

export interface PersonalAccountWithdraw {
    amount: number;
}
// Creates a personal account
export const PersonalAccountWithdrawAsync = async (body: PersonalAccountWithdraw, accountId: string) => {
    const token = getToken();
    const id = getId();

    try{
        const response = await api.put(`/withdraw/${id}/${accountId}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}


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
export const FetchPersonalAccountTransactionAsync = async (accountId: string) => {
    const token = getToken();
    const id = getId();

    try{
        const response = await axios.get(`${apiUrl}/Transection/${id}/` + accountId,
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
