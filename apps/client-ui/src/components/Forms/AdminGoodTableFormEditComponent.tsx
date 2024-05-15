'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { formSchemaUpdateHangHoatype } from '@/lib/zod/formSchemaUpdateHangHoatype'
import { zodResolver } from '@hookform/resolvers/zod'
import updateHangHoa from '@/actions/PUT/update-hang-hoa'


type UpdateHangHoaTypeSchema = z.infer<typeof formSchemaUpdateHangHoatype>

const AdminGoodTableFormEditComponent = (
    {
    idHangHoa,
    HangHoaAndImagesData,
    NhomHangHoaByIdData,
    AllNhomHangHoa
}: {
    idHangHoa: string
    HangHoaAndImagesData: any
    NhomHangHoaByIdData: any
    AllNhomHangHoa: any
}) => {
    
    // States
    const router = useRouter()
    const [mainImage, setMainImage] = useState(HangHoaAndImagesData.CacLinkAnhHangHoa[0].LinkAnh);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<UpdateHangHoaTypeSchema>({
        resolver: zodResolver(formSchemaUpdateHangHoatype),
      })
// 

// Effects
useEffect(() => {
  // console.log(HangHoaAndImagesData.CacLinkAnhHangHoa[0].LinkAnh)
  // console.log(HangHoaAndImagesData)
  // console.log(NhomHangHoaByIdData)
  // console.log(AllNhomHangHoa)
}, [])
// 

  // Submit form
const onSubmit = async (data: UpdateHangHoaTypeSchema) => {

    let DataUpdateHangHoa: any = {
        TenHangHoa: data.TenHangHoa,
        // MaNhomHangHoa: data.MaNhomHangHoa,
        DonViTinh: data?.DonViTinh,
        // GiaGocHangHoa: data.GiaGocHangHoa,
        // GiaBanHangHoa: data.GiaBanHangHoa,
        // SLTonKho: data.SLTonKho,
        ViTri: data?.ViTri,
        TrongLuong: data?.TrongLuong,
        MoTa: data?.MoTa,
        GhiChu: data?.GhiChu,
        // CacLinkAnhHangHoa: imageUrls,
      };

      console.log(DataUpdateHangHoa)
    try {
      // await updateHangHoa(DataUpdateHangHoa)
      toast.success('Cập nhập hàng hóa thành công!')
      reset()
      router.push('/Admin/Goods')
    } catch (error:any) {
      toast.error(error.message)
    }
  }


    
    
  return (
    <>
    <div className='bg-white rounded-lg w-full h-full flex flex-col gap-4 px-20 py-12'>
        {/* Header */}
        <div className='w-full text-center'>
            <h1 className='text-gray-700 w-full'>Edit Hàng hóa</h1>
        </div>

        {/* Form */}
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-2 gap-y-4 gap-x-6 p-1'
        >
        <Input 
        {...register("TenHangHoa")}
        isRequired
        type="text" 
        label="Tên hàng hóa" 
        value={HangHoaAndImagesData.TenHangHoa}
        className='light'
        />
    {/* <Select
      {...register("MaNhomHangHoa")}
      isRequired
      defaultSelectedKeys={[NhomHangHoaByIdData.id]}
      label="Nhóm hàng hóa"
      className="w-full light text-black"
    >
        {AllNhomHangHoa.map((AllNhomHangHoa: any) => (
          <SelectItem 
          key={AllNhomHangHoa.id} 
          value={AllNhomHangHoa.id}
          className='light'
          >
            {AllNhomHangHoa.TenNhomHangHoa}
          </SelectItem>
        ))}
    </Select> */}
        <Input 
        {...register("DonViTinh")}
        isRequired
        type="text" 
        label="Đơn vị tính" 
        value={HangHoaAndImagesData.DonViTinh}
        className='light'
        />
        {/* <Input 
        {...register("GiaGocHangHoa", { valueAsNumber: true })}
        isRequired
        type="number" 
        label="Giá gốc" 
        value={HangHoaAndImagesData.GiaGocHangHoa}
        className='light'
        />
        <Input 
        {...register("GiaBanHangHoa", { valueAsNumber: true })}
        isRequired
        type="number" 
        label="Giá bán" 
        value={HangHoaAndImagesData.GiaBanHangHoa}
        className='light'
        />
        <Input 
        {...register("SLTonKho", { valueAsNumber: true })}
        isRequired
        type="number" 
        label="SL Tồn" 
        value={HangHoaAndImagesData.SLTonKho}
        className='light'
        /> */}
        <Textarea
        {...register("MoTa")}
        label="Mô tả"
        placeholder="Hãy nhập mô tả"
        value={HangHoaAndImagesData.MoTa}
        className="w-full light"
      />
    <Textarea
      {...register("GhiChu")}
      label="Ghi chú"
      placeholder="Hãy nhập ghi chú"
      value={HangHoaAndImagesData.GhiChu}
      className="w-full light"
    />
    <Input 
        {...register("TrongLuong")}
        type="text" 
        label="Trọng lượng" 
        value={HangHoaAndImagesData.TrongLuong}
        className='light'
        />
          <Input 
        {...register("ViTri")}
        type="text" 
        label="Vị trí" 
        value={HangHoaAndImagesData.ViTri}
        className='light'
        />
        </form>

        {/* Btn Submit Group */}
        <div className='space-x-3'>

            {!isSubmitting ? (
            <Button 
            type="submit"
            color="primary"
            >
            Lưu
            </Button>
            ) : (
            <Button color="primary" isLoading>
                Loading
            </Button>
            )}


            <Button 
            color="default"
            onClick={() => router.push('/Admin/Goods')}
            >
                Quay lại
            </Button>

        </div>
    </div>
    </>
  )
}

export default AdminGoodTableFormEditComponent