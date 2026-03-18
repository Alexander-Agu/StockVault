import { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../state/store/store';
import { Outlet, useMatch, useParams } from 'react-router-dom';
import { fetchUser } from '../state/User/UserSlice';
import { FetchPersonalAccounts } from '../state/PersonalAccount/PersonalAccountSlicer';
import { FetchJointAccounts } from '../state/JointAccount/JointAccountSlicer';


export default function Portal() {
  const { userId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const hasFetched = useRef(false);

  const user = useSelector((state: RootState) => state.user);
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const jointAccount = useSelector((state: RootState) => state.jointAccount);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      
      // Only fetch once
      if (hasFetched.current) {
        return;
      }

      hasFetched.current = true;

      await dispatch(fetchUser(Number(userId)));
      await dispatch(FetchPersonalAccounts());
      await dispatch(FetchJointAccounts());
    };

    fetchData();
    
    // Reset when userId actually changes
    return () => {
      hasFetched.current = false;
    };
  }, [userId]);

  // Show loading only on initial load, not on every re-render
  if (user.loadingUser && !user.user) return <h1>Loading...</h1>

  return (
    <article className="bg-[#F8EEED] min-h-[100dvh] flex">
      <Sidebar />
      <main className="flex-1 w-full md:ml-[120px] lg:ml-[250px] xl:ml-[300px]">
        <Outlet />
      </main>
    </article>
  );
}
