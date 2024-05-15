'use client'

import AdminAddEmployeesButtons from '@/lib/antd/AdminAddEmployeesButtons'
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import AdminAddEmployeesFormComponent from '../Forms/AdminAddEmployeesFormComponent'

type OpenType = 'Employees'

const AdminAddEmployeesButtonsComponent: React.FC = () => {
  const [open, setOpen] = useState<OpenType | 'screen'>('screen')

  return (
    <>
      <AdminAddEmployeesButtons setOpen={setOpen} />

      {open === 'Employees' && (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-30 backdrop-brightness-50">
          <div className="h-full grid place-content-center">
            <div className="bg-white w-[800px] h-auto rounded-lg mx-16 shadow-lg">
              <div className="my-4 mx-6 flex justify-between">
                <h3 className="text-gray-800 font-bold">Thêm nhân viên</h3>
                <button onClick={() => setOpen('screen')}>
                  <MdClose className="text-gray-700 hover:text-red-600" />
                </button>
              </div>
              <div className="h-full bg-white pt-10 px-10">
                <AdminAddEmployeesFormComponent setOpen={setOpen} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminAddEmployeesButtonsComponent
