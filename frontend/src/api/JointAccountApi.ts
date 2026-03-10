import axios from "axios"


const userString: string | null = sessionStorage.getItem("user");
let token = 0;
let data = null;

if (userString){
    data = JSON.parse(userString);

    token = data.token;
}

// Base URL
const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: apiUrl + "/v1/JointAccount",
    headers: {
        Authorization: `bearer ${token}`
    }
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
    try{
        const response = await api.get("");

        return response.data;
    } catch{
        return false;
    }
}