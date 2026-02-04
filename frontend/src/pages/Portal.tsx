import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar'
import PortalHeader from '../components/PortalHeader/PortalHeader';


export default function Portal() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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
        <PortalHeader name='Alexander' title='Dashboard' />
        {/* Pages (dashboard/payment/etc) */}
        <div>Dashboard</div>
      </main>

    </article>
  )
}
