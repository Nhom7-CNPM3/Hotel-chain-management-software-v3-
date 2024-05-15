
import React from 'react'
import { Space } from "antd";
import { FaFileExport, FaPlus } from 'react-icons/fa6';

const AdminAddCashBookReadyCashButtons : any = ({
  setOpen,
}: {
  setOpen: (e: string) => void;
}) => {
  return (
    <>
    <Space>
        <button
          className=" bg-green-500 rounded-lg font-bold py-2 px-6 hover:bg-green-300 hover:text-gray-700"
          onClick={() => setOpen('PrepareReceipts')}
        >
          <Space>
            <FaPlus className="size-5" />
            Lập phiếu thu
          </Space>
        </button>

        <button
          className=" bg-green-500 rounded-lg font-bold py-2 px-6 hover:bg-green-300 hover:text-gray-700"
          onClick={() => setOpen('MakeAPaymentVoucher')}
        >
          <Space>
            <FaPlus className="size-5" />
            Lập phiếu chi
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
    </>
  )
}

export default AdminAddCashBookReadyCashButtons