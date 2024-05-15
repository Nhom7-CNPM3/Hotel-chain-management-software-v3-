'use client'

import React from 'react'
import { Radio } from 'antd';
import { MdLocationOn } from 'react-icons/md';

const ReceptionistNavItem = () => {
  return (
    <nav className='fixed size-full'>
    <div className='w-full flex justify-between px-3 py-2 rounded-b-large bg-green-600'>
    {/* Left Group */}
    <div className='flex gap-5'>
        
        {/* Logo */}
        <div>
            <button className='size-full'>
            <span className='text-gray-700'>WeldingStore</span>
            </button>
        </div>

        <Radio.Group 
        defaultValue="a" 
        buttonStyle="solid"
        >
      <Radio.Button 
      value="a"
      className='text-[12px] font-bold bg-green-600 text-white border-green-600'
      >Xem lịch</Radio.Button>
      <Radio.Button 
      value="b"
      className='text-[12px] font-bold bg-green-600 text-white border-green-600'
      >Đặt phòng mới</Radio.Button>
    </Radio.Group>
    </div>

    {/* Right Group */}
    <div>
    <div className="flex gap-1 translate-y-1">
          <MdLocationOn className="size-4 text-white" />
            <span className='font-semibold text-[12px]'>Chi nhánh trung tâm</span>
          </div>
    </div>
    </div>
    </nav>

  )
}

export default ReceptionistNavItem