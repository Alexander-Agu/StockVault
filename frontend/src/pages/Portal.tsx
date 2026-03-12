import { useEffect, useState } from 'react';
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

  const user = useSelector((state: RootState) => state.user);
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const jointAccount = useSelector((state: RootState) => state.jointAccount);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      console.log("Fetching...");

      await dispatch(fetchUser(Number(userId)));
      await dispatch(FetchPersonalAccounts());
      await dispatch(FetchJointAccounts());
    };

    fetchData();
  }, [userId, dispatch]);

  if (user.loadingUser || personalAccount.Loading || jointAccount.loading) return <h1>Loading...</h1>

  else{
    return (
      <article className="bg-[#F8EEED] min-h-[100dvh] flex">
        <Sidebar />

        <main className="
          flex-1
          w-full
          md:ml-[120px]
          lg:ml-[250px]
          xl:ml-[300px]
        ">

          <Outlet />
        </main>
      </article>
    );
  }
}
