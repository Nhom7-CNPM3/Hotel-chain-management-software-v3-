'use client';

import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";


interface AdminPhieuNhapTableComponentProps {
  dataPhieuNhap: any[]
}

const AdminPurchaseOrderTableComponent: React.FC<AdminPhieuNhapTableComponentProps>  = ({dataPhieuNhap}) => {
  
  return (
    <>
        <Table 
        isStriped aria-label="Example static collection table"
        className='light text-gray-700'
        >
          <TableHeader>
            <TableColumn>STT</TableColumn>
            <TableColumn className='font-bold'>Mã nhà Phiếu nhập</TableColumn>
            <TableColumn>Mã nhà cung cấp</TableColumn>
            <TableColumn>Tổng tiền cần trả</TableColumn>
            <TableColumn>Tiền đã trả</TableColumn>
          </TableHeader>
          <TableBody>
                    {dataPhieuNhap.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.MaNhaCungCap}</TableCell>
                            <TableCell>{item.TongTienCanTra}</TableCell>
                            <TableCell>{item.TienDaTra}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>

    </>
  )
}

export default AdminPurchaseOrderTableComponent