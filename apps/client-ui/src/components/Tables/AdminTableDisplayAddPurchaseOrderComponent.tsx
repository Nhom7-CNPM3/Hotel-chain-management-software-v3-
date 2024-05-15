'use client'
import React, { useEffect, useState } from 'react'
import type { HangHoaPurchasesOrder, HangHoaPurchasesOrderWithslTon } from '@/types/product'
import { Button } from '@nextui-org/react'
import styles from '@/utils/style'

export default function AdminTableDisplayAddPurchaseOrderComponent ({
  dataAfterSelected,
  setTotalAmount,
  setDataAfterSelected
}: {
  dataAfterSelected: HangHoaPurchasesOrderWithslTon[]
  setTotalAmount: (e: any) => void
  setDataAfterSelected: (e: any) => void
}) {



  // useEffect để cập nhật giá trị slTon cho mỗi phần tử trong mảng dataAfterSelected
  useEffect(() => {
    // Tạo một mảng mới chứa giá trị slTon tương ứng với mỗi mục trong dataAfterSelected
    const newDataAfterSelected = dataAfterSelected.map((item) => ({
      ...item,
      slTon: 0,
    }));

    // Cập nhật dataAfterSelected với mảng mới có chứa giá trị slTon
    setDataAfterSelected(newDataAfterSelected);

  }, []);

  useEffect(() => {
    const newTotalAmount = dataAfterSelected.reduce((acc, item) => {
      return acc + (item.slTon * Number(item.GiaGocHangHoa));
    }, 0);
    setTotalAmount(newTotalAmount);
  }, [dataAfterSelected]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newQuantity = e.target.value;
    let newTotalAmount = 0;
  
    const updatedData = dataAfterSelected.map((item, i) => {
      if (i === index) {
        const newTotal = Number(newQuantity) * Number(item.GiaGocHangHoa);
        newTotalAmount += newTotal;
        return {
          ...item,
          slTon: newQuantity,
          ThanhTien: newTotal,
        };
      }
      newTotalAmount += item.slTon * Number(item.GiaGocHangHoa);
      return item;
    });
  
    setTotalAmount(newTotalAmount);
    setDataAfterSelected(updatedData)
    // Cập nhật state hoặc gọi hàm cập nhật dữ liệu tương ứng
  };

  const handleDeleteFilter = (id: string) => {
    const updatedData = dataAfterSelected.filter((item: HangHoaPurchasesOrderWithslTon) => item.id!== id);
    setDataAfterSelected(updatedData);
  }

  const handleChangeDonGia = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newDonGia = e.target.value;
    let newTotalAmount = 0;
  
    const updatedData = dataAfterSelected.map((item, i) => {
      if (i === index) {
        const newTotal = Number(item.slTon) * Number(newDonGia);
        newTotalAmount += newTotal;
        return {
          ...item,
          GiaGocHangHoa: newDonGia,
          ThanhTien: newTotal, // Cập nhật ThanhTien ở đây
        };
      }
      newTotalAmount += item.slTon * Number(item.GiaGocHangHoa);
      return item;
    });
  
    setTotalAmount(newTotalAmount);
    setDataAfterSelected(updatedData);
  };
  

  return (
    <>
    <table className='w-full'>

      <thead>
        <tr>
        <th scope="col" className="px-6 py-3">
                </th>
                <th scope="col" className="px-6 py-3 text-gray-700">
                   STT
                </th>
                <th scope="col" className="px-6 py-3 text-gray-700">
                    Mã hàng hóa
                </th>
                <th scope="col" className="px-6 py-3 text-gray-700">
                    Tên hàng
                </th>
                <th scope="col" className="px-6 py-3 text-gray-700">
                    Số lượng
                </th>
                <th scope="col" className="px-6 py-3 text-gray-700">
                    Đơn giả
                </th>
                <th scope="col" className="px-6 py-3 text-gray-700">
                    Thành tiền
                </th>
        </tr>
      </thead>
      <tbody>
        {dataAfterSelected.map((item: HangHoaPurchasesOrderWithslTon, index: number) => (
          <tr key={index}>
             <td className='px-6 py-4'>
              <Button color='danger' onClick={() => handleDeleteFilter(item.id)}>
                Delete
              </Button>
            </td>
            <td className='px-6 py-4 text-gray-700'>
              {index}
            </td>
            <td className='px-6 py-4 text-gray-700'>
              {item.id}
            </td>
            <td className='px-6 py-4 text-gray-700'>
              <p>{item.TenHangHoa} ({item.DonViTinh})</p>
            </td>
            <td className='px-6 py-4 text-gray-700'>
            <input 
              className={`${styles.formInput} w-[20%]`}
            type="number" placeholder='SL Ton' value={Number(item.slTon)} onChange={(e) => handleQuantityChange(e, index)} />
            </td>
            <td className='px-6 py-4'>
              <input 
              className={`${styles.formInput} w-[20%]`}
              type="number" placeholder='Don Gia' value={Number(item.GiaGocHangHoa)} onChange={(e)=> handleChangeDonGia(e, index)} />
            </td>   
            <td className='px-6 py-4'>
              <p className='text-gray-700'>{Number(item.slTon) * Number(item.GiaGocHangHoa)}</p>
            </td>       
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}
