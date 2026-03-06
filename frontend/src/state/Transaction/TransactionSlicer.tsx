import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FetchPersonalAccountTransactionAsync, type PersonalAccountTransactions } from "../../api/PersonalAccountApi";
import type { AppDispatch } from "../store/store";


interface TransactionState {
    transactions: PersonalAccountTransactions[] | null;
    Loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transactions: null,
    Loading: false,
    error: null
};


const transactionSlicer =  createSlice({
    name: "personalAccount",
    initialState,
    reducers: {
        setTransactions: (state, action: PayloadAction<PersonalAccountTransactions[]>) => {
            state.transactions = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.Loading = action.payload;
        },

        resetTransactions: () => initialState
    }
});

export const { 
    setTransactions,
    setError,
    setLoading,
    resetTransactions
} = transactionSlicer.actions;
export default transactionSlicer.reducer;


// Fetches ALl User Personal Accounts transactions
export const FetchPersonalAccountTransactions = (accountId: string) => 
    async (dispatch: AppDispatch): Promise<PersonalAccountTransactions[]> => {
        let transactions: PersonalAccountTransactions[] = [];
        try{
            dispatch(setLoading(true));

            const response = await FetchPersonalAccountTransactionAsync(accountId);

            if (!response) throw new Error("Failed to fetch");

            transactions = response;

            dispatch(setTransactions(transactions));
        } catch {
            console.log("Again its chaai");
            return transactions;
        }finally{        
            await dispatch(setLoading(false));
            return transactions;
        }
    }
