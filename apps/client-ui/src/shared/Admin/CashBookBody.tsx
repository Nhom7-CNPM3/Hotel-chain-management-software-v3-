'use server'

import AdminCashBookBodyContentComponents from "@/components/AdminCashBookBodyContentComponents";
import AdminHeader from "@/components/Layout/AdminHeader"


const CashBookBody = () => {
  return (
    <div className="basis-5/6 bg-gray-200">
    <AdminHeader />
    <div className="h-auto">
      <AdminCashBookBodyContentComponents/>
    </div>
  </div>
  )
}

export default CashBookBody