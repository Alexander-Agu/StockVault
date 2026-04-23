import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store/store";
import { CreatePayoutSlotAsync, ExecutePayoutSlotAsync, GetPayoutSlotAsync } from "../../api/PayoutSlotApi";

export interface PayoutSlot {
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

const payoutSlotSlicer = createSlice({
    name: "slot",
    initialState,
    reducers: {
        // Fix: Replace the entire array instead of pushing
        setPayoutSlots: (state, action: PayloadAction<PayoutSlot[]>) => {
            state.payoutSlot = action.payload;
        },
        
        // Keep this for adding a single slot when executing
        addPayoutSlot: (state, action: PayloadAction<PayoutSlot>) => {
            if (state.payoutSlot) {
                // Find and replace the updated slot or add new one
                const index = state.payoutSlot.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.payoutSlot[index] = action.payload;
                } else {
                    state.payoutSlot.push(action.payload);
                }
            } else {
                state.payoutSlot = [action.payload];
            }
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
    setPayoutSlots,
    addPayoutSlot,
    resetPayoutSlot,
    setLoading, 
    setError, 
} = payoutSlotSlicer.actions;
export default payoutSlotSlicer.reducer;

// Creates payout slots
export const CreatePayoutSlot = (cycleId: number) => 
    async (dispatch: AppDispatch): Promise<PayoutSlot[]> => {
        let slots;
        dispatch(setLoading(true));
        try{
            const response = await CreatePayoutSlotAsync(cycleId)

            if (!response) throw new Error("Failed to create payout slots");

            slots = response.data;
            
            // Fix: Use setPayoutSlots to replace the entire array
            dispatch(setPayoutSlots(slots));
            console.log("Created slots:", slots);
            return slots;
        } catch (error) {
            console.log("Failed to create payout slots", error);
            dispatch(setError("Failed to create payout slots"));
            return [];
        } finally {        
            dispatch(setLoading(false));
        }
}

// Executes a payout slot
export const ExecutePayoutSlot = (cycleId: number, slotId: number) => 
    async (dispatch: AppDispatch): Promise<PayoutSlot | null> => {
        let slot;
        dispatch(setLoading(true));
        try{
            const response = await ExecutePayoutSlotAsync(cycleId, slotId)
            console.log("Executed slot:", response.data);
            if (!response) throw new Error("Failed to execute payout slot");

            slot = response.data;

            dispatch(addPayoutSlot(slot));
            console.log("Executed slot:", response.data);
            return slot;
        } catch (error) {
            console.log("Failed to execute payout slot", error);
            dispatch(setError("Failed to execute payout slot"));
            return null;
        } finally {        
            dispatch(setLoading(false));
        }
}

// Gets payout slots
export const GetPayoutSlot = (cycleId: number) => 
    async (dispatch: AppDispatch): Promise<PayoutSlot[]> => {
        let slots;
        dispatch(setLoading(true));
        try{
            const response = await GetPayoutSlotAsync(cycleId)

            if (!response) throw new Error("Failed to get payout slots");

            slots = response.data;
            
            // Fix: Use setPayoutSlots to replace the entire array
            dispatch(setPayoutSlots(slots));
            console.log("Fetched slots:", slots);
            return slots;
        } catch (error) {
            console.log("Failed to get payout slots", error);
            dispatch(setError("Failed to get payout slots"));
            return [];
        } finally {        
            dispatch(setLoading(false));
        }
}