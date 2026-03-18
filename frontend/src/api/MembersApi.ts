import axios from "axios"
import { getId, getToken } from "./Api";


// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: apiUrl + "/v1/",
});

export interface AddMember {
    email: string,
    role: string
}


// Fetches all jMembers
export const FetchMembersAsync = async (accountId: number) => {
    const token = getToken();
    try{
        const response = await api.get(`joint-accounts/${accountId}/members`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}