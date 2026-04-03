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
    baseURL: apiUrl + "/v1/",
    // headers: {
    //     Authorization: `bearer ${token}`
    // }
});

export interface CreateContributionSchedule {
    amountCents: number;
    frequency: string;
    startDate: string;
}

// Creates a contribution schedule
export const CreateContributionScheduleAsync = async (body: CreateContributionSchedule, id: number) => {
    const token = getToken();
    try{
        const response = await api.post(`joint-accounts/${id}/contribution-schedules`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}

// Fetches a contibution schedule for an account
export const FetchContributionScheduleAsync = async (id: number) => {
    const token = getToken();
    try{
        const response = await api.get(`joint-accounts/${id}/contribution-schedules/active`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch{
        return false;
    }
}