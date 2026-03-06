import React from 'react'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from './store'
import { resetAuth } from '../Auth/AuthSlicer';
import { resetPersonalAccount } from '../PersonalAccount/PersonalAccountSlicer';
import { resetUser } from '../User/UserSlice';

export default function ResetStore() {
    const dispatch = useDispatch<AppDispatch>();

    try{
        dispatch(resetAuth());
        dispatch(resetPersonalAccount());
        dispatch(resetUser());
        sessionStorage.removeItem('user');
    } catch{}
}