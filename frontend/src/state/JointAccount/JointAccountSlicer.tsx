import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store/store";
import { CreateJointAccountsAsync, FetchJointAccountsAsync, JointAccountDepositAsync, type JointAccountDeposit } from "../../api/JointAccountApi";

interface JointAccount {
    id: number;
    isAdmin: boolean;
    members: number;
    title: string;
    createdBy: number;
    balance: number;
    createdAt: Date;
}

interface JointAccountState {
    jointAccounts: JointAccount[] | null;
    loading: boolean;
    error: string | null
}

const initialState: JointAccountState = {
    jointAccounts: null,
    loading: false,
    error: null
}

const jointAccountSlicer = createSlice({
    name: "jointAccountSlicer",
    initialState,
    reducers: {
        setJointAccounts: (state, action: PayloadAction<JointAccount[]>) => {
            state.jointAccounts = action.payload;
        },

        setNewJointAccount: (state, action:PayloadAction<JointAccount>) => {
            state.jointAccounts?.push(action.payload);
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        resetJointAccountState: ()=> initialState
    }
})

export const {
    setJointAccounts,
    setNewJointAccount,
    setLoading,
    setError
} = jointAccountSlicer.actions;

export default jointAccountSlicer.reducer;

export const CreateJointAccounts = (title: string) => 
    async (dispatch: AppDispatch): Promise<number> => {
        let id = 0;
        dispatch(setLoading(true));
        try{
            const response = await CreateJointAccountsAsync(title)

            if (!response) throw new Error("Failed to create a joint account");

            id = response.data.id;

            dispatch(setNewJointAccount(response.data));
        } catch {
            console.log("Failed to create a joint account");
            return id;
        }finally{        
            dispatch(setLoading(false));
            return id;
        }
    }

export const FetchJointAccounts = () => 
    async (dispatch: AppDispatch): Promise<JointAccount[]> => {
        let accounts: JointAccount[] = [];
        dispatch(setLoading(true));
        try{
            const response = await FetchJointAccountsAsync()

            if (!response) throw new Error("Failed to fetch");

            accounts = response.data;
            console.log(response.data);

            dispatch(setJointAccounts(accounts));
        } catch {
            console.log("Again its chaai");
            return accounts;
        }finally{        
            await dispatch(setLoading(false));
            return accounts;
        }
    }

// Deposit money into personal account   
export const DepositIntoJointAccount = (body: JointAccountDeposit, accountId: string) => 
    async (dispatch: AppDispatch): Promise<boolean> => {
        let success = false;
        try{
            dispatch(setLoading(true));

            const response =  await JointAccountDepositAsync(body, accountId);

            if (!response) throw new Error("Failed to Deposit to joint account");

            else{
                success = true;
            }            
        } catch {
            console.log("Failed to deposit");
            return success;
        }finally{        
            await dispatch(setLoading(false));
            return success;
        }
}

