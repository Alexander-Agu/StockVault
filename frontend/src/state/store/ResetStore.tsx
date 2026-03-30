import { useDispatch } from 'react-redux'
import { type AppDispatch } from './store'
import { resetAuth } from '../Auth/AuthSlicer';
import { resetPersonalAccount } from '../PersonalAccount/PersonalAccountSlicer';
import { resetUser } from '../User/UserSlice';
import { resetTransactions } from '../Transaction/TransactionSlicer';
import { resetMembers } from '../Members/MemberSlicer';
import { resetContributionSchedule } from '../ContributionSchedule/ContributionScheduleSlicer';
import { resetJointAccountState } from '../JointAccount/JointAccountSlicer';
import { useNavigate } from 'react-router-dom';

export default function useResetStore() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const logout = () => {
        try {
            dispatch(resetAuth());
            dispatch(resetPersonalAccount());
            dispatch(resetUser());
            dispatch(resetTransactions());
            dispatch(resetContributionSchedule());
            dispatch(resetMembers());
            dispatch(resetJointAccountState());
            sessionStorage.removeItem('user');
            navigate("/");
        } catch (error) {
            console.log("Failed to log out", error);
        }
    };

    return logout;
}