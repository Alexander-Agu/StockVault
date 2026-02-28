import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store/store";
import { TbReceiptYen } from "react-icons/tb";
import { CreatePersonalAccountsAsync, FetchPersonalAccountsAsync, LockAccountsAsync, type LockAccountDto } from "../../api/PersonalAccountApi";


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

        addPersonalAccount: (state, action: PayloadAction<PersonalAccount>) => {
            state.personalAccounts?.push(action.payload);
        },

        setAccountLock: (state, action:PayloadAction<number>) => {
            const personalAccount = state.personalAccounts?.find(account => account.id == action.payload )

            if (personalAccount) personalAccount.isActive = true;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.Loading = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        resetPersonalAccount: () => initialState
    }
});

export const { setPersonalAccounts, setAccountLock, addPersonalAccount, setLoading, setError, resetPersonalAccount } = personalAccountSlicer.actions;
export default personalAccountSlicer.reducer;


// Fetches ALl User Personal Accounts
export const FetchPersonalAccounts = () => 
    async (dispatch: AppDispatch): Promise<PersonalAccount[]> => {
        let accounts: PersonalAccount[] = [];
        try{
            dispatch(setLoading(true));

            const response = await FetchPersonalAccountsAsync()

            if (!response) throw new Error("Failed to fetch");

            accounts = response.data;

            dispatch(setPersonalAccounts(accounts));
        } catch {
            console.log("Again its chaai");
            return accounts;
        }finally{        
            await dispatch(setLoading(false));
            return accounts;
        }
    }

interface CreateAccount {
    title: string;
}
export const CreateAccount = (body: CreateAccount) => 
    async (dispatch: AppDispatch): Promise<boolean> => {
        let success = false;
        try{
            dispatch(setLoading(true));

            const response =  await CreatePersonalAccountsAsync(body);

            if (!response) throw new Error("Failed to fetch");
            // Capture new Personal account state after creating
            else{
                dispatch(addPersonalAccount(response.data));
                success = true;
            }
            
            
        } catch {
            console.log("Again its chaai");
            return success;
        }finally{        
            await dispatch(setLoading(false));
            return success;
        }
}


// Locks account    
export const LockAccounts = (body: LockAccountDto, accountId: string) => 
    async (dispatch: AppDispatch): Promise<boolean> => {
        let success = false;
        try{
            dispatch(setLoading(true));

            const response =  await LockAccountsAsync(body, accountId);

            if (!response) throw new Error("Failed to fetch");
            // Set lock account state after creating
            else{
                dispatch(setAccountLock(Number.parseInt(accountId)));
                success = true;
            }            
        } catch {
            console.log("Again its chaai");
            return success;
        }finally{        
            await dispatch(setLoading(false));
            return success;
        }
    }