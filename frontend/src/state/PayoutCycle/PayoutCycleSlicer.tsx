import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store/store";
import { TbReceiptYen } from "react-icons/tb";
import { CreatePayoutCycleAsync, GetPayoutCycleAsync } from "../../api/PayoutCycleApi";

export interface PayoutCycle {
    id: number;
    cycleNumber: number;
    totalMembersAtStart: number;
    startDate: string;
    endDate: string;
    jointAccountId: number;
    scheduleId: number;
    estimatedTotalAmount: number;
    isActive: boolean;
}

interface PayoutCycleState {
    payoutCycle: PayoutCycle | null;
    Loading: boolean;
    error: string | null;
}


const initialState: PayoutCycleState = {
    payoutCycle: null,
    Loading: false,
    error: null
};


const payoutCycleSlicer =  createSlice({
    name: "cycle",
    initialState,
    reducers: {
        setPayoutCycle: (state, action: PayloadAction<PayoutCycle>) => {
            state.payoutCycle = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.Loading = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        resetPayoutCycle: () => initialState
    }
});

export const { 
    setPayoutCycle,
    resetPayoutCycle,
    setLoading, setError, 
} = payoutCycleSlicer.actions;
export default payoutCycleSlicer.reducer;


// Creates a payout cycle
export const CreatePayoutCycle = (accountId: number, scheduleId: number) => 
    async (dispatch: AppDispatch): Promise<PayoutCycle> => {
        let cycle;
        dispatch(setLoading(true));
        try{
            const response = await CreatePayoutCycleAsync(accountId, scheduleId)

            if (!response) throw new Error("Failed to create a payout cycle");

            cycle = response.data;

            dispatch(setPayoutCycle(cycle));
        } catch {
            console.log("Failed to create a payout cycle");
            return cycle;
        }finally{        
            dispatch(setLoading(false));
            return cycle;
        }
}

// Gets payout cycle
export const GetPayoutCycle = (accountId: number) => 
    async (dispatch: AppDispatch): Promise<PayoutCycle> => {
        let cycle;
        dispatch(setLoading(true));
        try{
            const response = await GetPayoutCycleAsync(accountId)

            if (!response) throw new Error("Failed to get payout cycle");
            
            cycle = response.data;
            dispatch(setPayoutCycle(cycle));
            console.log(cycle);
        } catch {
            console.log("Failed to get payout cycle");
            return cycle;
        }finally{        
            dispatch(setLoading(false));
            return cycle;
        }
}