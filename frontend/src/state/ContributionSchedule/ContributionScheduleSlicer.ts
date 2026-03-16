import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store/store";
import { CreateJointAccountsAsync, FetchJointAccountsAsync, JointAccountDepositAsync, type JointAccountDeposit } from "../../api/JointAccountApi";
import { CreateContributionScheduleAsync, type CreateContributionSchedule } from "../../api/ContributionSchedule";

interface ContributionSchedule {
    id: number;
    amountCents: number;
    frequency: string;
    isActive: boolean;
    startDate: Date;
}

interface ContributionScheduleState {
    schedule: ContributionSchedule | null;
    loading: boolean;
    error: string | null
}

const initialState: ContributionScheduleState = {
    schedule: null,
    loading: false,
    error: null
}

const contributionScheduleSlicer = createSlice({
    name: "contributionScheduleSlicer",
    initialState,
    reducers: {
        setContributionSchedule: (state, action: PayloadAction<ContributionSchedule>) => {
            state.schedule = action.payload;
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
    setContributionSchedule,
    setLoading,
    setError
} = contributionScheduleSlicer.actions;

export default contributionScheduleSlicer.reducer;

export const CreateSchedule = (body: CreateContributionSchedule ,id: number) => 
    async (dispatch: AppDispatch): Promise<ContributionSchedule> => {
        let schedule;
        dispatch(setLoading(true));
        try{
            const response = await CreateContributionScheduleAsync(body, id);

            if (!response) throw new Error("Failed to create a joint account");

            schedule = response.data ;

            dispatch(setContributionSchedule(response.data));
        } catch {
            console.log("Failed to create a joint account");
            return schedule;
        }finally{        
            dispatch(setLoading(false));
            return schedule;
        }
    }