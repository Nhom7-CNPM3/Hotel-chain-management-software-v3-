'use client'

import React from 'react';
import { Space } from 'antd';
import { MdAdd } from "react-icons/md";


const AdminAddPriceBookButtons: any = ({
  setOpen,
}: {
  setOpen: (e: string) => void;
}) => {

  return (
    <div>
    <button 
    className=' bg-green-500 rounded-lg font-bold py-2 px-6 hover:bg-green-300 hover:text-gray-700'
    onClick={() => setOpen('PriceBook')}
    >
      <Space>
      <MdAdd className='size-5'/>
        Thêm bảng giá
      </Space>
    </button>
    </div>
  )
}

export default AdminAddPriceBookButtons