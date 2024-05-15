

import React from 'react'

const AdminAddCashBookReadyCashTable = () => {
  return (
    <>
          <div className="flex flex-col gap-2 w-full">
        <div className="bg-white rounded-lg p-5">
          <div className="w-full flex justify-end gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-gray-700 font-Inter">Quỹ đầu kỳ</span>
              <span className="text-green-500 font-bold">0</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-700 font-Inter">Tổng thu</span>
              <span className="text-green-700 font-bold">600,000</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-700 font-Inter">Tổng chi</span>
              <span className="text-red-600 font-bold">-250,000</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-700 font-Inter">Tồn quỹ</span>
              <span className="text-green-300 font-bold">350,000</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-5">
          <p className="text-black">Bottom</p>
        </div>
      </div>
    </>
  )
}

export default AdminAddCashBookReadyCashTable