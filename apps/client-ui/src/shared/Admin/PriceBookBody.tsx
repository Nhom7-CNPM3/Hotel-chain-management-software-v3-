'use server'

import AdminAddPriceBookButtonsComponent from '@/components/Buttons/Rooms/AdminAddPriceBookButtonsComponent'
import AdminHeader from '@/components/Layout/AdminHeader'
import AdminPriceBookTableComponent from '@/components/Tables/Rooms/AdminPriceBookTableComponent'
import React from 'react'

const PriceBookBody = () => {
  return (
    <div className="basis-5/6 bg-gray-200">
    <AdminHeader />
    <div className="h-auto">
      <div className="mx-10 mt-32 mb-9 z-0 flex justify-between">
        <h2 className="text-gray-700 font-semibold text-xl">
          Bảng giá phòng
        </h2>
        <AdminAddPriceBookButtonsComponent />
      </div>
      <div className="w-full grid place-content-center">
        <AdminPriceBookTableComponent />
      </div>
    </div>
  </div>
  )
}

export default PriceBookBody