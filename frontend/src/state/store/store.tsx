import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../User/UserSlice"
import authReducer from "../Auth/AuthSlicer"
import personalAccountReducer from "../PersonalAccount/PersonalAccountSlicer"
import transactionReducer from "../Transaction/TransactionSlicer"
import jointAccountReducer from "../JointAccount/JointAccountSlicer"
import contributionScheduleSlicer from "../ContributionSchedule/ContributionScheduleSlicer"
import memberSlicer from "../Members/MemberSlicer"
import payoutCycleSlicer from "../PayoutCycle/PayoutCycleSlicer"
import payoutSlotSlicer from "../PayoutSlot/PayoutSlotSlicer"
import contributionSlicer from "../Contribution/ContributionSlicer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        personalAccount: personalAccountReducer,
        transactions: transactionReducer,
        jointAccount: jointAccountReducer,
        contributionSchedule: contributionScheduleSlicer,
        member: memberSlicer,
        cycle: payoutCycleSlicer,
        slot: payoutSlotSlicer,
        contribution: contributionSlicer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;