"use server";

import AdminAddBillButtonsComponent from '@/components/Buttons/AdminAddBillButtonsComponent'
import AdminBillTableComponent from '@/components/Tables/AdminBillTableComponent'
import AdminHeader from '@/components/Layout/AdminHeader'

const BillBody = () => {
  return (
    <div className="basis-5/6 bg-gray-200">
    <AdminHeader />
    <div className="h-auto">
      <div className="mx-10 mt-32 mb-9 z-0 flex justify-between">
        <h2 className="text-gray-700 font-semibold text-xl">
          Hoá đơn
        </h2>
        <AdminAddBillButtonsComponent />
      </div>
      <div className="w-full grid place-content-center">
        <AdminBillTableComponent />
      </div>
    </div>
  </div>
  )
}

export default BillBody