'use client'

import React from 'react'
import styles from '@/utils/style'
import { formSchemaCreateNhomHangHoatype } from '@/lib/zod/formSchemaCreateNhomHangHoatype'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { IoMdSave } from 'react-icons/io'
import { MdBlock } from 'react-icons/md'
import { createNhomHangHoa } from '@/actions/POST/create-nhom-hang-hoa'

type CreateNhomHangHoaTypeSchema = z.infer<typeof formSchemaCreateNhomHangHoatype>

const AdminAddNhomHoangHoaFormComponent: any = ({
    setOpenNhomHangHoa,
  }: {
    setOpenNhomHangHoa: (e: string) => void;
  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateNhomHangHoaTypeSchema>({
    resolver: zodResolver(formSchemaCreateNhomHangHoatype),
  })

  const onSubmit = async (data: CreateNhomHangHoaTypeSchema) => {
    const DataCreateNhomHangHoa = {
        TenNhomHangHoa: data.TenNhomHangHoa,
    }

    try {
      await createNhomHangHoa(DataCreateNhomHangHoa)
      toast.success('Thêm mới nhóm hàng hóa thành công!')
      reset()
      setOpenNhomHangHoa('screen2')
    } catch (error:any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 p-5">
          <div className="flex items-center">
            <label className={`${styles.formlabel}`}>Nhóm hàng hóa:</label>
            <input
              {...register('TenNhomHangHoa')}
              type="text"
              className={`${styles.formInput}`}
            />
            {errors.TenNhomHangHoa && (
              <span className="text-red-500 block mt-1">
                {`${errors.TenNhomHangHoa.message}`}
              </span>
            )}
          </div>
        </div>
        {/* Button Submit Group */}
        <div className="flex justify-end pr-5 gap-2 pb-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles.formbtn}`}
          >
            <span className="h-full grid place-content-center">
              <IoMdSave className="size-4 hover:text-gray-500" />
            </span>
            <span>Lưu</span>
          </button>
          <button
            type="button"
            className={`${styles.formbtnClose}`}
            onClick={() => setOpenNhomHangHoa('screen2' as "screen2" | "NhomHangHoa")}
          >
            <span className="h-full grid place-content-center">
              <MdBlock className="size-4 hover:text-red-500" />
            </span>
            <span>Bỏ qua</span>
          </button>
        </div>
      </form>
    </>
  )
}

export default AdminAddNhomHoangHoaFormComponent
