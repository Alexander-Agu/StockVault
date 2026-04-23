import axios from "axios"
import { getId, getToken } from "./Api";

// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: apiUrl + "/PayoutSlot/",
});

// Creates a payout slot
export const CreatePayoutSlotAsync = async (cycleId: number) => {
    const token = getToken();
    const id = getId();

    try {
        const response = await api.post(
            `${cycleId}`, 
            {},           
            {             
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch {
        return false;
    }
}

// Executes a payout slot
export const ExecutePayoutSlotAsync = async (cycleId: number, slotId: number) => {
    const token = getToken();
    const id = getId();

    try {
        const response = await api.put(
            `${cycleId}/${slotId}`,
            {},                    
            {                      
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch {
        return false;
    }
}

// Gets payout slots - This one is already correct!
export const GetPayoutSlotAsync = async (cycleId: number) => {
    const token = getToken();
    const id = getId();

    try {
        const response = await api.get(`${cycleId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch {
        return false;
    }
}