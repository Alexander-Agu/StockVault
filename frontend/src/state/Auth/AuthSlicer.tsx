import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store/store";
import { LoginUserAsync, RegisterUserAsync, ResendEmailAsync, VerifyEmailAsync } from "../../api/UserApi";


interface AuthState {
    id: number;
    loadingAuth: boolean;
    error: string | null;
}

const initialState: AuthState = {
    id: 0,
    loadingAuth: false,
    error: null
}

const authSlicer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loadingAuth = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

export const { setId, setLoading, setError } = authSlicer.actions;
export default authSlicer.reducer;


// User onboading api calls

// Adding a new user
interface CreateUserData {
    name: string,
    email: string,
    phone: string,
    passwordHash: string,
}

export const RegisterUser = (body: CreateUserData) =>
    async (dispatch: AppDispatch): Promise<boolean> => {
        try{
            dispatch(setLoading(true));
            setError("");

            const response = await RegisterUserAsync(body)

            if (!response) throw new Error("Ye its chaai");
            else{
                return true
            }
        } catch {
            console.log("Again its chaai");
            return false
        }finally{
            dispatch(setLoading(false));
        }
}



export const ActivateAccount = (email: string, code: string) => 
    async (dispatch: AppDispatch): Promise<boolean> => {
        try{
            dispatch(setLoading(true));

            const response = await VerifyEmailAsync(email, code);

            if (!response) throw new Error("Ye its chaai");
            else{
                return true
            }   
        } catch {
            console.log("Again its chaai");
            return false
        }finally{
            dispatch(setLoading(false));
        }
    }



export const ResendEmail = (email: string) => 
    async (dispatch: AppDispatch): Promise<boolean> => {
        try{
            dispatch(setLoading(true));

            const response = await ResendEmailAsync(email);

            if (!response) throw new Error("Ye its chaai");
            else{
                return true
            }   
        } catch {
            console.log("Again its chaai");
            return false
        }finally{
            dispatch(setLoading(false));
        }
    }


interface LoginData {
    email: string;
    password: string;
}

export const Login = (body: LoginData) => 
    async (dispatch: AppDispatch): Promise<number> => {
        try{
            dispatch(setLoading(true));

            const response = await LoginUserAsync(body);

            if (!response) throw new Error("Ye its chaai");
             
            const id = response.data.id;
            dispatch(setId(id));
            sessionStorage.setItem("user", JSON.stringify(response.data));
            return id 
        } catch {
            console.log("Again its chaai");
            return 0
        }finally{
            dispatch(setLoading(false));
        }
    }