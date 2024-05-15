'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/utils/style'
import { Popover, Select } from 'antd'
import { formSchemaCreateEmpployeetype } from '@/lib/zod/formSchemaCreateEmpployeetype'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { IoMdSave } from 'react-icons/io'
import { MdBlock } from 'react-icons/md'
import { getByNameRoomHotel } from '@/actions/GET/get-by-name-khach-san'
import createSubUser from '@/actions/POST/create-sub-user'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { PiWarningCircleFill } from 'react-icons/pi'
import getAllEmployeesHotel from '@/actions/GET/get-all-employee-hotel'

type CreateEmployeeTypeSchema = z.infer<typeof formSchemaCreateEmpployeetype>

type EmployeeRole = 'LeTan' | 'PhucVu'

type GetEmployeeHotelTypeSchema = {
  id: string
  TenKhachSan: string
}

const AdminAddEmployeesFormComponent: any = ({
  setOpen,
}: {
  setOpen: (e: string) => void
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateEmployeeTypeSchema>({
    resolver: zodResolver(formSchemaCreateEmpployeetype),
  })

  const [employeeRoles, setEmployeeRoles] = useState<string | undefined>('')
  const [hotel, setHotel] = useState<string | undefined>('')
  const [show, setShow] = useState(false)
  const [employeeHotel, setEmployeeHotel] = useState<GetEmployeeHotelTypeSchema[]>([])

  const employeeRoleSelect: { name: EmployeeRole; label: string }[] = [
    { name: 'LeTan', label: "Lễ Tân" },
    { name: 'PhucVu', label: "Phục vụ" }
  ]

  useEffect(() => {
    let isApiSubscribed = true
    if (isApiSubscribed) {
      const fetchDataEmployeesHotel = async () => {
        const dataEmployeesHotel = await getAllEmployeesHotel()
        setEmployeeHotel(
          (dataEmployeesHotel as unknown) as GetEmployeeHotelTypeSchema[],
        )
      }
      fetchDataEmployeesHotel()
    }
    return () => {
      isApiSubscribed = false
    }
  }, [open, isSubmitting])

  const isUpperCase = (str: string) => {
    if (str && str.length > 0) {
      return str.charAt(0) === str.charAt(0).toUpperCase();
    }
    return false; // or handle the undefined case as per your requirement
  }

  const dataEmployeeHotelWithLabelAndValue = employeeHotel.map((item: any) => ({
    value: item.TenKhachSan,
    label: isUpperCase(item.TenKhachSan)
      ? item.TenKhachSan.toLowerCase()
      : item.TenKhachSan,
  }))

  const dataEmployeeRoleWithLabelAndValue = employeeRoleSelect.map(
    (item: { name: EmployeeRole; label: string }) => ({
      value: item.name,
      label: item.label.charAt(0) === item.label.charAt(0).toUpperCase()
        ? item.label.toLowerCase()
        : item.label,
    }),
  );

  //

  // Filter Select
  const filterOptionEmployeeHotel = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const filterOptionEmployeeRoles = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  //

  //  OnChangeGroup
  const onChangeSelectEmployeeRoles = async (value: string) => {
    setEmployeeRoles(value)
  }

  const onChangeSelectEmployeeHotel = async (value: string) => {
    let data = await getByNameRoomHotel(value)

    if (data) {
      setHotel(data?.id)
    }
  }

  // Submit form
  const onSubmit = async (data: CreateEmployeeTypeSchema) => {
    const selectedRole: EmployeeRole | undefined = employeeRoles as EmployeeRole
    const selectedHotel = hotel 
    if (selectedRole && selectedHotel) {
      const DataCreateEmployees = {
        id: data?.id,
        name: data.name,
        email: data.email,
        MaKhachSan: hotel,
        password: data.password,
        phone_number: data.phone_number,
        role: selectedRole,
      }
      try {
        await createSubUser(DataCreateEmployees)
        toast.success('Thêm nhân viên mới thành công!')
        reset()
        setOpen('screen')
      } catch (error: any) {
        toast.error(error.message)
      }
    } else {
      toast.error('Vui lòng chọn đầy đủ vai trò và khách sạn cho nhân viên!')
    }
  }

  // Popup icon content
  const content = (
    <div>
      <p>
        Bạn có thể chọn giữa việc tự nhập mã hay để hệ thống chúng tôi tự cấp mã
        cho bạn bằng các dãy kí tự ngẫu nhiên
      </p>
    </div>
  )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <label htmlFor="id" className={`${styles.formlabel} flex gap-1`}>
              Mã nhân viên:
              <Popover content={content} title="Lưu ý!">
                <PiWarningCircleFill className="size-5 text-gray-500" />
              </Popover>
            </label>
            <div className="flex flex-col">
              <input
                {...register('id')}
                type="text"
                placeholder="Mã nhân viên tự dộng"
                className={`${styles.formInput}`}
              />
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="name" className={`${styles.formlabel} flex gap-1`}>
              Tên nhân viên:
              <span className="text-orange-500">*</span>
            </label>
            <div className="flex flex-col">
              <input
                {...register('name')}
                type="text"
                placeholder="johndoe**"
                className={`${styles.formInput}`}
              />
              {errors.name && (
                <span className="text-red-500 block mt-1">
                  {`${errors.name.message}`}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="email" className={`${styles.formlabel} flex gap-1`}>
              Email:
              <span className="text-orange-500">*</span>
            </label>
            <div className="flex flex-col">
              <input
                {...register('email')}
                type="text"
                placeholder="loginmail@gmail.com"
                className={`${styles.formInput}`}
              />
              {errors.email && (
                <span className="text-red-500 block mt-1">
                  {`${errors.email.message}`}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="password"
              className={`${styles.formlabel} flex gap-1`}
            >
              Mật khẩu:
              <span className="text-orange-500">*</span>
            </label>
            <div className="flex flex-col">
              <input
                {...register('password')}
                type={!show ? 'password' : 'text'}
                placeholder="password!@%"
                className={`${styles.formInput}`}
              />
              {!show ? (
                <AiOutlineEyeInvisible
                  className="absolute bottom-3 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute bottom-3 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
              {errors.password && (
                <span className="text-red-500 block mt-1">
                  {`${errors.password.message}`}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="phone_number"
              className={`${styles.formlabel} flex gap-1`}
            >
              Số điện thoại:
              <span className="text-orange-500">*</span>
            </label>
            <div className="flex flex-col">
              <input
                {...register('phone_number', { valueAsNumber: true })}
                type="number"
                placeholder="+8801*******"
                className={`${styles.formInput}`}
              />
              {errors.phone_number && (
                <span className="text-red-500 block mt-1">
                  {`${errors.phone_number.message}`}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="KhachSan" className={`${styles.formlabel}`}>
              Khách sạn:
              <span className="text-orange-500">*</span>
            </label>
            <Select
              showSearch
              placeholder="--Lựa chọn--"
              optionFilterProp="children"
              onChange={onChangeSelectEmployeeHotel}
              // onSearch={onSearchSelect}
              filterOption={filterOptionEmployeeHotel}
              options={dataEmployeeHotelWithLabelAndValue.map(
                (option: { label: string; value: string }) => ({
                  label: option.label,
                  value: option.value,
                }),
              )}
              className={`${styles.formInput} px-0 w-[62%]`}
            />
          </div>
          <div className="flex items-center py-2">
            <label htmlFor="hangPhong" className={`${styles.formlabel}`}>
              Vai trò:
              <span className="text-orange-500">*</span>
            </label>
            <Select
              showSearch
              placeholder="--Lựa chọn--"
              optionFilterProp="children"
              onChange={onChangeSelectEmployeeRoles}
              // onSearch={onSearchSelect}
              filterOption={filterOptionEmployeeRoles}
              options={dataEmployeeRoleWithLabelAndValue.map(
                (option: { label: string; value: string }) => ({
                  label: option.label,
                  value: option.value,
                }),
              )}
              className={`${styles.formInput} px-0 w-[62%]`}
            />
          </div>
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

export default AdminAddEmployeesFormComponent
