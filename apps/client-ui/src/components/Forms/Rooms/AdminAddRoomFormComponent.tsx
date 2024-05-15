'use client'

import React, { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import styles from '@/utils/style'
import { Upload, Select } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { formSchemaCreateRoomtype } from '@/lib/zod/formSchemaCreateRoomtype'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { IoMdSave } from 'react-icons/io'
import { FaPlus } from 'react-icons/fa6'
import { MdBlock } from 'react-icons/md'
import { getByNameRoomClassPrice } from '@/actions/GET/get-by-name-room-class'
import { getByNameRoomSub } from '@/actions/GET/get-by-name-room-sub'
import  createRoom  from '@/actions/POST/create-room'
import { getByNameRoomHotel } from '@/actions/GET/get-by-name-khach-san'

type CreateRoomTypeSchema = z.infer<typeof formSchemaCreateRoomtype>

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const AdminAddRoomFormComponent: any = ({
  setOpenSub,
  setOpen,
  roomSub,
  roomClass,
  roomHotel,
}: {
  setOpenSub: (e: string) => void
  setOpen: (e: string) => void
  roomSub: any[]
  roomClass: any[]
  roomHotel: any[]
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateRoomTypeSchema>({
    resolver: zodResolver(formSchemaCreateRoomtype),
  })

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [giaTheoNgay, setGiaTheoNgay] = useState<string | undefined>('')
  const [giaTheoGio, setGiaTheoGio] = useState<string | undefined>('')
  const [valueInputRoomClass, setValueInputRoomClass] = useState<string | undefined>('')
  const [khuVuc, setKhuVuc] = useState<string | undefined>('')
  const [hotel, setHotel] = useState<string | undefined>('')

  const handleOpenSub = (e: any) => {
    e.preventDefault()
    setOpenSub('PhongKhuVuc')
  }

  const isUpperCase = (str: string) =>
    str.charAt(0) === str.charAt(0).toUpperCase()

  const dataSubWithLabelAndValue = roomSub.map((item: any) => ({
    value: item.TenNhomKhuVuc,
    label: isUpperCase(item.TenNhomKhuVuc)
      ? item.TenNhomKhuVuc.toLowerCase()
      : item.TenNhomKhuVuc,
  }))

  const dataRoomClassWithLabelAndValue = roomClass.map((item: any) => ({
    value: item.TenLoaiPhong,
    label: isUpperCase(item.TenLoaiPhong)
      ? item.TenLoaiPhong.toLowerCase()
      : item.TenLoaiPhong,
  }))

  const dataRoomHotelWithLabelAndValue = roomHotel.map((item: any) => ({
    value: item.TenKhachSan,
    label: isUpperCase(item.TenKhachSan)
      ? item.TenKhachSan.toLowerCase()
      : item.TenKhachSan,
  }))

  //

  // Filter Select
  const filterOptionRoomSub = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const filterOptionRoomClass = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const filterOptionRoomHotel = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  //

  //  OnChangeGroup
  const onChangeSelectRoomClass = async (value: string) => {
    let data = await getByNameRoomClassPrice(value)
    if (data) {
      setValueInputRoomClass(data?.id)
      setGiaTheoGio(data?.GiaTheoGio.toString())
      setGiaTheoNgay(data?.GiaTheoNgay.toString())
    }
  }

  const onChangeSelectRoomSub = async (value: string) => {
    let data = await getByNameRoomSub(value)

    if (data) {
      setKhuVuc(data?.id)
    }
  }

  const onChangeSelectRoomHotel = async (value: string) => {
    let data = await getByNameRoomHotel(value)

    if (data) {
      setHotel(data?.id)
    }
  }

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  //

  const onPreviewRoom = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as FileType)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  // Submit form
  const onSubmit = async (data: CreateRoomTypeSchema) => {
    const imageUrls = fileList.map((file) => file.name)
    const DataCreateRoom = {
      TenPhong: data.TenPhong,
      MaNhomKhuVucPhong: khuVuc,
      MaLoaiPhong: valueInputRoomClass,
      MaKhachSan: hotel,
      GhiChu: data?.GhiChu,
      CacLinkAnhPhong: imageUrls,
    }
    try {
      console.log(DataCreateRoom)
      await createRoom(DataCreateRoom)
      toast.success('Thêm mới phòng thành công!')
      reset()
      setOpen('screen')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <label
              htmlFor="tenPhong"
              className={`${styles.formlabel} flex gap-1`}
            >
              Tên phòng:
              <span className="text-orange-500">*</span>
            </label>
            <div className="flex flex-col">
              <input
                {...register('TenPhong')}
                type="text"
                className={`${styles.formInput}`}
              />
              {errors.TenPhong && (
                <span className="text-red-500 block mt-1">
                  {`${errors.TenPhong.message}`}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="giaTheoGio" className={`${styles.formlabel}`}>
              Giá theo giờ:
            </label>
            <input
              type="number"
              id="giaTheoGio"
              name="giaTheoGio"
              value={giaTheoGio || ''}
              onChange={(e) => setGiaTheoGio(e.target.value)}
              disabled={true}
              className={`${styles.formInput} bg-gray-100 rounded-md`}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="moTa" className={`${styles.formlabel} flex gap-3`}>
              Ghi chú:
              <BsPencil className="size-4 text-gray-500" />
            </label>
            <input
              type="text"
              {...register('GhiChu')}
              className={`${styles.formInput}`}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="giaTheoNgay" className={`${styles.formlabel}`}>
              Giá theo ngày:
            </label>
            <input
              type="number"
              id="giaTheoNgay"
              name="giaTheoNgay"
              value={giaTheoNgay || ''}
              onChange={(e) => {
                setGiaTheoNgay(e.target.value)
              }}
              disabled={true}
              className={`${styles.formInput} bg-gray-100 rounded-md`}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="khuVuc" className={`${styles.formlabel}`}>
              Khu vực:
            </label>
            <Select
              showSearch
              placeholder="--Lựa chọn--"
              optionFilterProp="children"
              onChange={onChangeSelectRoomSub}
              // onSearch={onSearchSelect}
              filterOption={filterOptionRoomSub}
              options={dataSubWithLabelAndValue.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
              className={`${styles.formInput} px-0 w-[52%]`}
            />
            <button
              onClick={handleOpenSub}
              className="w-auto border-b border-t-0 border-x-0 border-gray-400 border-large bg-white p-[6px] hover:bg-gray-50"
            >
              <span className="w-full">
                <FaPlus className="size-5 text-gray-500" />
              </span>
            </button>
          </div>
          <div className="flex items-center">
            <label htmlFor="KhachSan" className={`${styles.formlabel}`}>
              Khách sạn:
            </label>
            <Select
              showSearch
              placeholder="--Lựa chọn--"
              optionFilterProp="children"
              onChange={onChangeSelectRoomHotel}
              // onSearch={onSearchSelect}
              filterOption={filterOptionRoomHotel}
              options={dataRoomHotelWithLabelAndValue.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
              className={`${styles.formInput} px-0 w-[62%]`}
            />
          </div>
          <div className="flex items-center py-2">
            <label htmlFor="hangPhong" className={`${styles.formlabel}`}>
              Hạng phòng:
              <span className="text-orange-500">*</span>
            </label>
            <Select
              showSearch
              placeholder="--Lựa chọn--"
              optionFilterProp="children"
              onChange={onChangeSelectRoomClass}
              // onSearch={onSearchSelect}
              filterOption={filterOptionRoomClass}
              options={dataRoomClassWithLabelAndValue.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
              className={`${styles.formInput} px-0 w-[62%]`}
            />
          </div>
        </div>

        {/* Upload Image Group */}
        <div className="flex items-center">
          <ImgCrop rotationSlider modalTitle="Edit Image">
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreviewRoom}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </div>

        {/* Button Submit Group */}
        <div className="flex justify-end pr-5 gap-2">
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
            onClick={() => setOpen('screen')}
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

export default AdminAddRoomFormComponent
