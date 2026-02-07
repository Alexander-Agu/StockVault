import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store/store";
import { TbReceiptYen } from "react-icons/tb";
import { FetchPersonalAccountsAsync } from "../../api/PersonalAccountApi";


interface PersonalAccount{
    id: number;
    title: string;
    balance: number;
    createdAt: Date;
    lockedUntil: Date;
    isActive: boolean;
}

interface PersonalAccountState {
    personalAccounts: PersonalAccount[] | null;
    Loading: boolean;
    error: string | null;
}


const initialState: PersonalAccountState = {
    personalAccounts: null,
    Loading: false,
    error: null
};


const personalAccountSlicer =  createSlice({
    name: "personalAccount",
    initialState,
    reducers: {
        setPersonalAccounts: (state, action: PayloadAction<PersonalAccount[]>) => {
            state.personalAccounts = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.Loading = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

export const { setPersonalAccounts, setLoading, setError } = personalAccountSlicer.actions;
export default personalAccountSlicer.reducer;


// Fetches ALl User Personal Accounts
export const FetchPersonalAccounts = () => 
    async (dispatch: AppDispatch): Promise<PersonalAccount[]> => {
        try{
            dispatch(setLoading(true));

            const response = await FetchPersonalAccountsAsync()

            if (!response) throw new Error("Failed to fetch");

            const accounts = response.data;

            dispatch(setPersonalAccounts(accounts));

            return accounts;
        } catch{
            return [];
        } finally{
            dispatch(setLoading(false));
        }
    }