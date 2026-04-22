import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store/store";
import { TbReceiptYen } from "react-icons/tb";
import { CreatePayoutSlotAsync, ExecutePayoutSlotAsync, GetPayoutSlotAsync } from "../../api/PayoutSlotApi";

interface PayoutSlot {
    id: number;
    position: number;
    isPaidOut: boolean;
    payoutDate: string;
    cycleId: number;
    userId: number;
}

interface PayoutSlotState {
    payoutSlot: PayoutSlot[] | null;
    Loading: boolean;
    error: string | null;
}


const initialState: PayoutSlotState = {
    payoutSlot: null,
    Loading: false,
    error: null
};


const payoutSlotSlicer =  createSlice({
    name: "slot",
    initialState,
    reducers: {
        setPayoutSlot: (state, action: PayloadAction<PayoutSlot>) => {
            state.payoutSlot?.push(action.payload);
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.Loading = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        resetPayoutSlot: () => initialState
    }
});

export const { 
    setPayoutSlot,
    resetPayoutSlot,
    setLoading, setError, 
} = payoutSlotSlicer.actions;
export default payoutSlotSlicer.reducer;


// Creates a payout slot
export const CreatePayoutSlot = (cycleId: number) => 
    async (dispatch: AppDispatch): Promise<PayoutSlot[]> => {
        let slot;
        dispatch(setLoading(true));
        try{
            const response = await CreatePayoutSlotAsync(cycleId)

            if (!response) throw new Error("Failed to create payout slots");

            slot = response.data;

            dispatch(setPayoutSlot(slot));
        } catch {
            console.log("Failed to create payout slots");
            return slot;
        }finally{        
            dispatch(setLoading(false));
            return slot;
        }
}

// Executes a payout slot
export const ExecutePayoutSlot = (cycleId: number, slotId: number) => 
    async (dispatch: AppDispatch): Promise<PayoutSlot> => {
        let slot;
        dispatch(setLoading(true));
        try{
            const response = await ExecutePayoutSlotAsync(cycleId, slotId)

            if (!response) throw new Error("Failed to execute payout slot");

            slot = response.data;

            dispatch(setPayoutSlot(slot));
        } catch {
            console.log("Failed to create a payout cycle");
            return slot;
        }finally{        
            dispatch(setLoading(false));
            return slot;
        }
}

// Gets payout cycle
export const GetPayoutSlot = (cycleId: number) => 
    async (dispatch: AppDispatch): Promise<PayoutSlot[]> => {
        let cycle;
        dispatch(setLoading(true));
        try{
            const response = await GetPayoutSlotAsync(cycleId)

            if (!response) throw new Error("Failed to get payout slots");

            cycle = response.data;
            console.log(cycle);
        } catch {
            console.log("Failed to get payout slots");
            return cycle;
        }finally{        
            dispatch(setLoading(false));
            return cycle;
        }
}