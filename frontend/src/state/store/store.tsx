import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../User/UserSlice"
import authReducer from "../Auth/AuthSlicer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;