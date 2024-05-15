'use client';

import AdminAddBillButtons from '@/lib/antd/AdminAddBillButtons';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
type OpenType = "PurchaseOrder";

const AdminAddBillButtonsComponent: React.FC = () => {
  const [open, setOpen] = useState<OpenType | "screen">("screen");
  return (
    <>
          <AdminAddBillButtons setOpen={setOpen} />

{open === "PurchaseOrder" && (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-50 backdrop-brightness-50">
        <div className="h-full grid place-content-center">
          <div className="bg-white w-[800px] h-[400px] rounded-lg mx-16 -translate-y-28 shadow-lg">
          <div className="mt-4 mx-6 flex justify-between">
            <h3 className='text-gray-800 font-bold'>Hóa đơn</h3>
            <button
              onClick={() => setOpen('screen')}
              >
              <MdClose className='text-gray-700 hover:text-red-600' />
              </button>
          </div>
          <div className="h-full">
                <p className="text-black">Table</p>
              </div>
          </div>
        </div>
      </div>
)}
    </>
  )
}

export default AdminAddBillButtonsComponent