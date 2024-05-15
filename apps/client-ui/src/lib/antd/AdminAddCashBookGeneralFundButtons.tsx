
import React from 'react'
import { Space } from 'antd'
import { FaFileExport } from 'react-icons/fa6'

const AdminAddCashBookGeneralFundButtons = () => {
  return (
    <>
    <Space>
        <button
          className=" bg-green-500 rounded-lg font-bold py-2 px-6 hover:bg-green-300 hover:text-gray-700"
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            <FaFileExport className="size-5" />
            Export
          </Space>
        </button>
        </Space>
        </>
  )
}

export default AdminAddCashBookGeneralFundButtons