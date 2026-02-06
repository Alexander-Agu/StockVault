import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch } from "../store/store";
import { FetchProfileAsync } from "../../api/UserApi";

interface User {
    name: string;
    phone: string;
    id: number;
}

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },

        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

export const { setLoading, setUser, setError } = userSlice.actions;
export default userSlice.reducer;

export const fetchUser = (id: number) => 
    async (dispatch: AppDispatch): Promise<void> => {
        try{
            dispatch(setLoading(true));

            const response = await FetchProfileAsync(id);

            if (!response) throw new Error("Failed to fetch");

            dispatch(setUser(response.data));
            
        } catch{
            dispatch(setError("Its chaai"))
        } finally{
            dispatch(setLoading(false));
        }
    };