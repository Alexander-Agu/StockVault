import axios from "axios"
import { getId, getToken } from "./Api";
import Deposit from "../pages/Deposit";


// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: apiUrl + "/Contribution/",
});


// Creates contributions
export const CreateContributionAsync = async (acountId: number, slotId: number) => {
    const token = getToken();
    try{
        const response = await api.post(`${acountId}/${slotId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}

export interface despositInterface{
    amount: number,
    paymentMethodId: string
}
// Execute contributions
export const ExecuteContributionIntoJointAccountAsync = async (acountId: number, slotId: number, contributionId: number, body: despositInterface) => {
    const token = getToken();
    try{
        const response = await api.put(`joint/${acountId}/${slotId}/${contributionId}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}

// Creates contributions
export const ExecuteContributionIntoPersonalAccountAsync = async (acountId: number, slotId: number, contributionId: number, body: despositInterface) => {
    const token = getToken();
    try{
        const response = await api.put(`personal/${acountId}/${slotId}/${contributionId}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}

// Fetches all contibution
export const FetchAllContributionAsync = async (slotId: number) => {
    const token = getToken();
    try{
        const response = await api.get(`all/${slotId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}

// Fetches a contibution
export const FetchContributionAsync = async (slotId: number, contributionId: number) => {
    const token = getToken();
    try{
        const response = await api.get(`${slotId}/${contributionId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}