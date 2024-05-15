
import { Space } from 'antd'
import React from 'react'
import { FaFileExport, FaPlus } from 'react-icons/fa6'

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
          onClick={() => setOpen('PurchaseOrder')}
        >
          <Space>
            <FaPlus className="size-5" />
            Tạo hóa đơn
          </Space>
        </button>

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
    </div>
    </>
  )
}

export default AdminAddPurchaseOrderButtons