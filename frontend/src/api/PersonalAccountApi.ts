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
    baseURL: apiUrl,
    headers: {
        Authorization: `bearer ${token}`
    }
});


// Fetches all user accounts
export const FetchPersonalAccountsAsync = async () => {
    try{
        const response = await api.get(`/PersonalAccount/${data.id}`);

        return response.data;
    } catch{
        return false;
    }
}
