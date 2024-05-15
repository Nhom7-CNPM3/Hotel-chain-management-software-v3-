'use server'

import AdminHeaderRightInput from "@/lib/antd/AdminHeaderRightInput"

const AdminHeader = () => {
  return (
    <section className="w-5/6 fixed z-20 bg-slate-200 pb-5 scroll-smooth">
    <header className="mx-10 flex justify-between mt-5">
        <h1 className="text-gray-700 text-2xl font-Poppins font-bold">Dashboard</h1>

        {/* Right header */}
        <div className="flex gap-3">
          <AdminHeaderRightInput/>
        </div>
    </header>
    </section>
  )
}

export default AdminHeader