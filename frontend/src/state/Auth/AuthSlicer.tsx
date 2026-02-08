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
        },

        resetAuth: () => initialState
    }
});

export const { setId, setLoading, setError, resetAuth } = authSlicer.actions;
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
        let success = false;

        try{
            dispatch(setLoading(true));
            setError("");

            const response = await RegisterUserAsync(body)

            if (!response) {  
                success = false;
                throw new Error("Ye its chaai");
            }else success = true
        } catch {
            console.log("Again its chaai");
            return success;
        }finally{        
            await dispatch(setLoading(false));
            return success;
        }
}



export const ActivateAccount = (email: string, code: string) => 
    async (dispatch: AppDispatch): Promise<boolean> => {
        let success = false;
        try{
            dispatch(setLoading(true));
            const response = await VerifyEmailAsync(email, code);

            if (!response) {
                success = false;
                throw new Error("Ye its chaai");
            }
            else success = true  
        } catch {
            console.log("Again its chaai");
            return success;
        }finally{        
            dispatch(setLoading(false));
            return success;
        }
    }



export const ResendEmail = (email: string) => 
    async (dispatch: AppDispatch): Promise<boolean> => {
        let success = false;
        try{
            dispatch(setLoading(true));

            const response = await ResendEmailAsync(email);

            if (!response) {
                success = false
                throw new Error("Ye its chaai");
            }
            else success = true  
        } catch {
            console.log("Again its chaai");
            return success;
        }finally{        
            dispatch(setLoading(false));
            return success;
        }
    }


interface LoginData {
    email: string;
    password: string;
}

export const Login = (body: LoginData) => 
    async (dispatch: AppDispatch): Promise<number> => {
        let id = 0;
        try{
            dispatch(setLoading(true));

            const response = await LoginUserAsync(body);

            if (!response){
                id = 0;
                throw new Error("Ye its chaai");
            } else{
                id = response.data.id;
                dispatch(setId(id));
                sessionStorage.setItem("user", JSON.stringify(response.data));               
            }
        } catch {
            console.log("Again its chaai");
            return id;
        }finally{        
            dispatch(setLoading(false));
            return id;
        }
    }