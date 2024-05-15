
import { Space } from 'antd'
import React from 'react'
import { FaFileExport, FaPlus } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

const AdminAddPurchaseOrderButtons: any = () => {
    const router = useRouter()
  return (
    <>
        <div>
      <Space>
        <button
          className=" bg-green-500 rounded-lg font-bold py-2 px-6 hover:bg-green-300 hover:text-gray-700"
          onClick={() => router.push('/Admin/ImportGoods/New')}
        >
          <Space>
            <FaPlus className="size-5" />
            Nhập hàng
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