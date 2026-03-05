import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../User/UserSlice"
import authReducer from "../Auth/AuthSlicer"
import personalAccountReducer from "../PersonalAccount/PersonalAccountSlicer"
import transactionReducer from "../Transaction/TransactionSlicer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        personalAccount: personalAccountReducer,
        transactions: transactionReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;