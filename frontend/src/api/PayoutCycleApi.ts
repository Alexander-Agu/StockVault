import axios from "axios"
import { getId, getToken } from "./Api";

// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: apiUrl + "/api/PayoutCycle/",
});


// Creates a payout cycle
export const CreatePayoutCycleAsync = async (jointAccountId: number, scheduleId: number) => {
    const token = getToken();
    const id = getId();

    try{
        const response = await api.post(`${jointAccountId}/${scheduleId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}


// Gets payout cycle
export const GetPayoutCycleAsync = async (jointAccountId: number, cycleId: number) => {
    const token = getToken();
    const id = getId();

    try{
        const response = await api.get(`${jointAccountId}/${cycleId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}