import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../User/UserSlice"
import authReducer from "../Auth/AuthSlicer"
import personalAccountReducer from "../PersonalAccount/PersonalAccountSlicer"
import transactionReducer from "../Transaction/TransactionSlicer"
import jointAccountReducer from "../JointAccount/JointAccountSlicer"
import contributionScheduleSlicer from "../ContributionSchedule/ContributionScheduleSlicer"
import memberSlicer from "../Members/MemberSlicer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        personalAccount: personalAccountReducer,
        transactions: transactionReducer,
        jointAccount: jointAccountReducer,
        contributionSchedule: contributionScheduleSlicer,
        member: memberSlicer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;