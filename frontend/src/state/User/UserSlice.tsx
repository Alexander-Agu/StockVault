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
    loadingUser: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loadingUser: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loadingUser = action.payload
        },

        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        resetUser: ()=> initialState
    }
});

export const { setLoading, setUser, setError, resetUser } = userSlice.actions;
export default userSlice.reducer;

export const fetchUser = (id: number) => 
    async (dispatch: AppDispatch): Promise<number> => {
        let userId = 0;
        dispatch(setLoading(true));
        try{
            const response = await FetchProfileAsync(id);

            if (!response) throw new Error("Failed to fetch user");
            await dispatch(setUser(response.data));

            userId = id;
            return userId;
            
        } catch{
            dispatch(setError("Failed to fetch user"))
        } finally{
            dispatch(setLoading(false));
            return userId;
        }
    };