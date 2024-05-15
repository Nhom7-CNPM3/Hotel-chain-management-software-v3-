'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const AdminGoodTableFormViewComponent = (
    {
    idHangHoa,
    HangHoaAndImagesData,
    NhomHangHoaByIdData
}: {
    idHangHoa: string
    HangHoaAndImagesData: any
    NhomHangHoaByIdData: any
}) => {
    
    const router = useRouter()
    const [mainImage, setMainImage] = useState(HangHoaAndImagesData.CacLinkAnhHangHoa[0].LinkAnh);
useEffect(() => {
  console.log(HangHoaAndImagesData.CacLinkAnhHangHoa[0].LinkAnh)

}, [])


    
    
  return (
    <>
    <div className='bg-white rounded-md p-4 flex gap-4'>
        
        {/* Images Group */}
        <div className='space-y-4'>

            {/* Main Image */}
            <div className='w-full grid place-content-center'>
                <img 
                src={mainImage} 
                alt="Product Image" 
                className='size-60'
                />
            </div>

            {/* Child Images */}
            <div className='flex gap-3 divide-x-4'>
            {HangHoaAndImagesData.CacLinkAnhHangHoa.map((curElm: { LinkAnh: string }, index: number) => {
                    return (
                        <div key={index}>
                            <img 
                            src={curElm.LinkAnh} 
                            alt="Product Image" 
                            key={index}
                            onClick={() => setMainImage(curElm.LinkAnh)}
                            className='size-28 cursor-pointer'
                            />
                        </div>
                    )
                })}
            </div>
        </div>

        {/* Content Group */}
        <div className='text-black flex flex-col'>
            <h1>{HangHoaAndImagesData.TenHangHoa}</h1>
            <h2>{NhomHangHoaByIdData.TenNhomHangHoa}</h2>
            <span>{HangHoaAndImagesData.GiaGocHangHoa}</span>
            <span>{HangHoaAndImagesData.GiaBanHangHoa}</span>
            <span>{HangHoaAndImagesData.DinhMucTonItNhat}</span>
            <span>{HangHoaAndImagesData.DinhMucTonNhieuNhat}</span>
            <span>{HangHoaAndImagesData.TrongLuong}</span>
            <span>{HangHoaAndImagesData.ViTri}</span>
            <h4>{HangHoaAndImagesData.MoTa}</h4>
            <p>{HangHoaAndImagesData.GhiChu}</p>
            <button 
            type="button" 
            onClick={() => router.push('/Admin/Goods')}
            className='text-black bg-blue-700'
            >
            Back
            </button>
        </div>
    </div>
    </>
  )
}

export default AdminGoodTableFormViewComponent