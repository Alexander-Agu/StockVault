import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../state/store/store';
import { Outlet, useMatch, useParams } from 'react-router-dom';
import { fetchUser } from '../state/User/UserSlice';
import { FetchPersonalAccounts } from '../state/PersonalAccount/PersonalAccountSlicer';


export default function Portal() {
  const { userId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user);
  const personalAccount = useSelector((state: RootState) => state.personalAccount);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(Number(userId)));
      dispatch(FetchPersonalAccounts());
    }
  }, [userId, dispatch]);

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
        {(user.loadingUser || personalAccount.Loading) && (
          <h1>Loading...</h1>
        )}

        <Outlet />
      </main>
    </article>
  );
}
