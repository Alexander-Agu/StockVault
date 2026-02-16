import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar'
import PortalHeader from '../components/PortalHeader/PortalHeader';
import Dashboard from '../components/Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../state/store/store';
import { Outlet, useMatch, useParams } from 'react-router-dom';
import { fetchUser } from '../state/User/UserSlice';
import { FetchPersonalAccounts } from '../state/PersonalAccount/PersonalAccountSlicer';


export default function Portal() {
  // const { userId } = useParams();

  const [openedPage, setOpenedPage] = useState("Dashboard");

  // Redux
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>();
  const personalAccount = useSelector((state: RootState) => state.personalAccount);
  const userId = user.user?.name;

  useEffect(()=>{
    console.log(userId)
    if (userId) {
      
      dispatch(fetchUser(Number(userId)))
      dispatch(FetchPersonalAccounts())
    }
  },[userId]);

  if (user.loadingUser || personalAccount.Loading) return <h1>LOADING....</h1>

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
        {/* Header */}
        <PortalHeader name={user.user?.name + ""} title={openedPage} />
        
        {/* Pages (dashboard/payment/etc) */}
        <Outlet />
      </main>

    </article>
  )
}
