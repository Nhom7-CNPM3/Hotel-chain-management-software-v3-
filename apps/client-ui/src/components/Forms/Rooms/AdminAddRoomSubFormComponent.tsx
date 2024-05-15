'use client'

import React from 'react'
import { BsPencil } from 'react-icons/bs'
import styles from '@/utils/style'
import { formSchemaCreateRoomSubtype } from '@/lib/zod/formSchemaCreateRoomSubtype'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { IoMdSave } from 'react-icons/io'
import { MdBlock } from 'react-icons/md'
import { createRoomClassSub } from '@/actions/POST/create-room-class-sub'

type CreateRoomSubTypeSchema = z.infer<typeof formSchemaCreateRoomSubtype>

const AdminAddRoomSubFormComponent: any = ({
    setOpenSub,
  }: {
    setOpenSub: (e: string) => void;
  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateRoomSubTypeSchema>({
    resolver: zodResolver(formSchemaCreateRoomSubtype),
  })

  const onSubmit = async (data: CreateRoomSubTypeSchema) => {
    const DataCreateRoomSub = {
      TenNhomKhuVuc: data.TenNhomKhuVuc,
      GhiChu: data.GhiChu,
    }

    try {
      await createRoomClassSub(DataCreateRoomSub)
      toast.success('Thêm mới khu vực thành công!')
      reset()
      setOpenSub('screen2')
    } catch (error:any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 p-5">
          <div className="flex items-center">
            <label className={`${styles.formlabel}`}>Khu vực:</label>
            <input
              {...register('TenNhomKhuVuc')}
              type="text"
              name="TenNhomKhuVuc"
              className={`${styles.formInput}`}
            />
            {errors.TenNhomKhuVuc && (
              <span className="text-red-500 block mt-1">
                {`${errors.TenNhomKhuVuc.message}`}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <label className={`${styles.formlabel} flex gap-3`}>
              Ghi chú:
              <BsPencil className="size-4 text-gray-500" />
            </label>
            <input
              {...register('GhiChu')}
              type="text"
              name="GhiChu"
              className={`${styles.formInput}`}
            />
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
            onClick={() => setOpenSub('screen2' as "screen2" | "PhongKhuVuc")}
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

export default AdminAddRoomSubFormComponent
