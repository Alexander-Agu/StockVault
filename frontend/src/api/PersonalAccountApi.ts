import axios from "axios"


const userString: string | null = sessionStorage.getItem("user");
let token = 0;
let data = null;

if (userString){
    data = JSON.parse(userString);

    token = data.token;
}

// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL + "/PersonalAccount";
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `bearer ${token}`
    }
});


// Fetches all user accounts
export const FetchPersonalAccountsAsync = async () => {
    try{
        const response = await api.get(`/${data.id}`);

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
    try{
        const response = await api.post(`/create-account/${data.id}`, body);

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
    try{
        const response = await api.post(`/lock/${data.id}/${accountId}`, body);

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
    try{
        const response = await api.put(`/deposit/${data.id}/${accountId}`, body);

        return response.data;
    } catch{
        return false;
    }
}
