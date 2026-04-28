import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store/store";
import { CreateContributionAsync, ExecuteContributionIntoJointAccountAsync, ExecuteContributionIntoPersonalAccountAsync, FetchAllContributionAsync, type despositInterface } from "../../api/ContributionApi";

export interface Contribution {
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

interface ContributionState {
    contribution: Contribution[] | null;
    Loading: boolean;
    error: string | null;
}


const initialState: ContributionState = {
    contribution: null,
    Loading: false,
    error: null
};


const contributionSlicer =  createSlice({
    name: "contributions",
    initialState,
    reducers: {
        setContributions: (state, action: PayloadAction<Contribution[]>) => {
            state.contribution = action.payload;
        },

        addContribution: (state, action: PayloadAction<Contribution>) => {
            state.contribution?.push(action.payload);
        },

        updateContribution: (state, action: PayloadAction<Contribution>) => {
            const index = state.contribution?.findIndex(x => x.id === action.payload.id);
            if (state.contribution && index !== undefined && index !== -1) {
                state.contribution[index] = action.payload;
            }
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.Loading = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        resetContribution: () => initialState
    }
});

export const { 
    setContributions,
    addContribution,
    updateContribution,
    resetContribution,
    setLoading, setError, 
} = contributionSlicer.actions;
export default contributionSlicer.reducer;


// Creates contribution
export const CreateContribution = (accountId: number, slotId: number) => 
    async (dispatch: AppDispatch): Promise<Contribution[]> => {
        let contribution;
        dispatch(setLoading(true));
        try{
            const response = await CreateContributionAsync(accountId, slotId)

            if (!response) throw new Error("Failed to create constibutions");

            contribution = response.data;

            dispatch(setContributions(contribution));
        } catch {
            console.log("Failed to create contributions");
            return contribution;
        }finally{        
            dispatch(setLoading(false));
            return contribution;
        }
}

// Creates contribution
export const ExecuteContributionIntoJointAccount = (accountId: number, slotId: number, contributionId: number, deposit: despositInterface) => 
    async (dispatch: AppDispatch): Promise<Contribution[]> => {
        let contribution;
        dispatch(setLoading(true));
        try{
            const response = await ExecuteContributionIntoJointAccountAsync(accountId, slotId, contributionId, deposit);

            if (!response) throw new Error("Failed to execute constibutions");

            contribution = response.data;

            dispatch(updateContribution(contribution));
        } catch {
            console.log("Failed to execute contributions");
            return contribution;
        }finally{        
            dispatch(setLoading(false));
            return contribution;
        }
}

// Creates contribution
export const ExecuteContributionIntoPersonalAccount = (accountId: number, slotId: number, contributionId: number, deposit: despositInterface) => 
    async (dispatch: AppDispatch): Promise<Contribution[]> => {
        let contribution;
        dispatch(setLoading(true));
        try{
            const response = await ExecuteContributionIntoPersonalAccountAsync(accountId, slotId, contributionId, deposit);

            if (!response) throw new Error("Failed to execute constibutions");

            contribution = response.data;

            dispatch(updateContribution(contribution));
        } catch {
            console.log("Failed to execute contributions");
            return contribution;
        }finally{        
            dispatch(setLoading(false));
            return contribution;
        }
}

// Gets contributions
export const GetAllContributions = (slotId: number) => 
    async (dispatch: AppDispatch): Promise<Contribution[]> => {
        let cycle;
        dispatch(setLoading(true));
        try{
            const response = await FetchAllContributionAsync(slotId)

            if (!response) throw new Error("Failed to get payout cycle");
            
            cycle = response.data;
            dispatch(setContributions(cycle));
            console.log(cycle);
        } catch {
            console.log("Failed to get payout cycle");
            return cycle;
        }finally{        
            dispatch(setLoading(false));
            return cycle;
        }
}