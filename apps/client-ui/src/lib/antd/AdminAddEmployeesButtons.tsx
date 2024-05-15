'use client'

import { Space } from 'antd'
import React from 'react'
import {FaPlus } from 'react-icons/fa6'

const AdminAddPurchaseOrderButtons: any = ({
    setOpen,
  }: {
    setOpen: (e: string) => void;
  }) => {
  return (
    <>
        <div>
      <Space>
        <button
          className=" bg-green-500 rounded-lg font-bold py-2 px-6 hover:bg-green-300 hover:text-gray-700"
          onClick={() => setOpen('Employees')}
        >
          <Space>
            <FaPlus className="size-5" />
            Thêm nhân viên
          </Space>
        </button>
      </Space>
    </div>
    </>
  )
}

export default AdminAddPurchaseOrderButtons