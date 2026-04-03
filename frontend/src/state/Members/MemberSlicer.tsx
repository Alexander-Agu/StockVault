import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store/store";
import { TbReceiptYen } from "react-icons/tb";
import { CreatePersonalAccountsAsync, FetchPersonalAccountsAsync, LockAccountsAsync, PersonalAccountDepositAsync, PersonalAccountWithdrawAsync, type LockAccountDto, type PersonalAccountDeposit, type PersonalAccountWithdraw } from "../../api/PersonalAccountApi";
import type AddMember from "../../components/AddMember/AddMember";
import { AddMembersAsync, FetchMembersAsync } from "../../api/MembersApi";


interface Member{
    userId: number;
    name: string;
    role: string;
    joinedAt: Date;
}

interface MemberState {
    members: Member[] | null;
    Loading: boolean;
    error: string | null;
}


const initialState: MemberState = {
    members: null,
    Loading: false,
    error: null
};


const memberSlicer =  createSlice({
    name: "personalAccount",
    initialState,
    reducers: {
        setMembers: (state, action: PayloadAction<Member[]>) => {
            state.members = action.payload;
        },

        setAddMember: (state, action: PayloadAction<Member>) => {
            state.members?.push(action.payload);
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.Loading = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        resetMembers: () => initialState
    }
});

export const { 
    setMembers,
    setAddMember,
    setLoading, setError, 
    resetMembers,
} = memberSlicer.actions;
export default memberSlicer.reducer;


// Fetches Members of a joint account
export const FetchMembers = (accountId: number) => 
    async (dispatch: AppDispatch): Promise<Member[]> => {
        let members: Member[] = [];
        dispatch(setLoading(true));
        try{
            const response = await FetchMembersAsync(accountId)

            if (!response) throw new Error("Failed to fetch");

            members = response.data;

            dispatch(setMembers(members));
        } catch (error) {
            console.log("Failed to fetch", error);
            dispatch(setError("Failed to fetch members"));
        } finally {        
            dispatch(setLoading(false)); // Remove await
        }
        return members;
    }


interface NewMember{
    email: string;
    role: string;
}

// Adds a member to joint account
export const AddMembers = (accountId: number, body: NewMember) => 
    async (dispatch: AppDispatch): Promise<Member[]> => {
        let members: Member[] = [];
        dispatch(setLoading(true));
        try{
            const response = await AddMembersAsync(accountId, body)

            if (!response) throw new Error("Failed to fetch");

            members = response.data;

            dispatch(setMembers(members));
        } catch (error) {
            console.log("Failed to fetch", error);
            dispatch(setError("Failed to fetch members"));
        } finally {        
            dispatch(setLoading(false)); // Remove await
        }
        return members;
    }