'use client'

import AdminHangHoaTable from '@/lib/NextUi/AdminHangHoaTable'

interface AdminGoodsTableComponentProps {
  hangHoaData: any
}

const AdminGoodsTableComponent: React.FC<AdminGoodsTableComponentProps> = ({ hangHoaData }) => {
  
  return (
    <>
    <AdminHangHoaTable hangHoaData={hangHoaData} />
    </>
  )
}

export default AdminGoodsTableComponent