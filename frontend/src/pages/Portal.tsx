import Sidebar from '../components/Sidebar/Sidebar'

export default function Portal() {
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
        <div>Header</div>

        {/* Pages (dashboard/payment/etc) */}
        <div>Dashboard</div>
      </main>

    </article>
  )
}
