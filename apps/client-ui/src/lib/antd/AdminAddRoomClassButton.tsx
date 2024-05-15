'use client'

import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { MdAdd } from "react-icons/md";


const items: MenuProps['items'] = [
  {
    label: '+ Hạng phòng',
    key: 'RoomClass',
  },
  {
    label: '+ Phòng',
    key: 'Room',
  },
];

const AdminAddRoomClassButton: any = ({
  setOpen,
}: {
  setOpen: (e: string) => void;
}) => {

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setOpen(key);
  };

  return (
    <div>
        <Dropdown 
        menu={{ items, onClick }}
        >
    <button 
    className=' bg-green-500 rounded-lg font-bold py-2 px-6 hover:bg-green-300 hover:text-gray-700'
    onClick={(e) => e.preventDefault()}
    >
      <Space>
      <MdAdd className='size-5'/>
        Thêm mới
        <DownOutlined />
      </Space>
    </button>
  </Dropdown>
    </div>
  )
}

export default AdminAddRoomClassButton