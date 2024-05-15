'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/utils/style'
import { Popover, Select, Upload } from 'antd'
import { formSchemaCreateHangHoatype } from '@/lib/zod/formSchemaCreateHangHoatype'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { IoMdSave, IoMdArrowDropdown } from 'react-icons/io'
import { MdBlock, MdDeleteForever } from 'react-icons/md'
import { getByNameNhomHangHotel } from '@/actions/GET/get-by-name-nhom-hang-hoa'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { PiWarningCircleFill } from 'react-icons/pi' 
import { Textarea } from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa6'
import getAllNhomHangsHotel from '@/actions/GET/get-all-nhom-hang-hoa'
import createHangHoa from '@/actions/POST/create-hang-hoa'


type CreateHangHoaTypeSchema = z.infer<typeof formSchemaCreateHangHoatype>

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

type getNhomHangHotelSchemaType = {
  id: string
  TenNhomHangHoa: string
}

type MoreSelectValueTypes = {
  nameProduct: string
  exchangeValue: number
  idProduct: string
}


const AdminHangHoaFormComponent: any = ({
  open,
  openNhomHangHoa,
  setOpen,
  setOpenNhomHangHoa,
  buttonNavActive,
}: {
  setOpen: (e: string) => void
  setOpenNhomHangHoa: (e: string) => void
  buttonNavActive: string
  open: string
  openNhomHangHoa: string
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateHangHoaTypeSchema>({
    resolver: zodResolver(formSchemaCreateHangHoatype),
  })

  const [nhomHangHotelInput, setNhomHangHotelInput] = useState<string | undefined>('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [nhomHangHoa, setNhomHangHoa] = useState<getNhomHangHotelSchemaType[]>([]);
  // Thêm state để lưu trạng thái của các checkbox
  const [isFirstChecked, setIsFirstChecked] = useState(false)
  const [isSecondChecked, setIsSecondChecked] = useState(false)

  // Thêm state để lưu trữ các giá trị của input
  const [inputValues, setInputValues] = useState<MoreSelectValueTypes[]>([])
  const [dinhMucTonItNhat, setdinhMucTonItNhat] = useState(0)
  const [dinhMucTonNhieuNhat, setdinhMucTonNhieuNhat] = useState(999999999)

  // Hàm xử lý sự kiện khi thêm input mới
  const handleAddInput = () => {
    if (inputValues.length < 3) {
      setInputValues([
        ...inputValues,
        {
          nameProduct: '',
          exchangeValue: 0,
          idProduct: '',
        },
      ])
    }
  }

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      const fetchDataNhomHangHoa = async () => {
        const dataNhomHangHoa = await getAllNhomHangsHotel();
        setNhomHangHoa(dataNhomHangHoa as unknown as getNhomHangHotelSchemaType[]);
      };
      
      fetchDataNhomHangHoa()
    }
return () => {
  isApiSubscribed = false;
};
}, [openNhomHangHoa, open, isSubmitting]);

  const handleOpenNhomHangHoa = (e: any) => {
    e.preventDefault()
    setOpenNhomHangHoa('NhomHangHoa')
  }

  // Hàm xử lý sự kiện khi thay đổi giá trị của input
  const handleInputChange = (index: number, value: MoreSelectValueTypes) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)
  }

  // Hàm xử lý sự kiện khi nhấp vào nút xóa
  const handleRemoveInput = (index: number) => {
    const newInputValues = [...inputValues]
    newInputValues.splice(index, 1)
    setInputValues(newInputValues)
  }

  // Hàm xử lý sự kiện khi checkbox thay đổi trạng thái
  const handleFirstCheckboxChange = () => {
    setIsFirstChecked(!isFirstChecked)
    setIsSecondChecked(false)
  }

  const handleSecondCheckboxChange = () => {
    setIsSecondChecked(!isSecondChecked)
    setIsFirstChecked(false)
  }


  const isUpperCase = (str: string) => {
    if (str && str.length > 0) {
      return str.charAt(0) === str.charAt(0).toUpperCase()
    }
    return false // or handle the undefined case as per your requirement
  }

  const dataNhomHangHotelWithLabelAndValue = nhomHangHoa.map((item: getNhomHangHotelSchemaType) => ({
    value: item.TenNhomHangHoa,
    label: isUpperCase(item.TenNhomHangHoa)
      ? item.TenNhomHangHoa.toLowerCase()
      : item.TenNhomHangHoa,
  }))

  //

  // Filter Select
  const filterOptionNhomHangHoaHotel = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  //  OnChangeGroup
  const onChangeSelectNhomHangHotel = async (value: string) => {
    let data = await getByNameNhomHangHotel(value)

    if (data) {
      setNhomHangHotelInput(data?.id)
    }
  }

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  //

  const onPreviewHangHoa = async (file: UploadFile) => {
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
  const onSubmit = async (data: CreateHangHoaTypeSchema) => {
    const selectedNhomHangHotel = nhomHangHotelInput;
    const imageUrls = fileList.map((file) => file.name);
  
    let DataCreateHangHoa: any = {
      TenHangHoa: data.TenHangHoa,
      MaNhomHangHoa: nhomHangHotelInput,
      DonViTinh: data?.DonViTinh,
      GiaGocHangHoa: data.GiaGocHangHoa,
      GiaBanHangHoa: data.GiaBanHangHoa,
      SLTonKho: data.SLTonKho,
      DinhMucTonItNhat: data?.DinhMucTonItNhat || 0,
      DinhMucTonNhieuNhat: data?.DinhMucTonNhieuNhat || 999999999,
      MoTa: data?.MoTa,
      GhiChu: data?.GhiChu,
      CacLinkAnhHangHoa: imageUrls,
    };
  


    if(!selectedNhomHangHotel || imageUrls.length === 0)  {
      toast.error('Vui lòng bổ sung đầy đủ nhóm hàng và ảnh!');
    }
  
    if (selectedNhomHangHotel && imageUrls.length > 0) {
      if(inputValues.length === 0) {
        try {
            await createHangHoa(DataCreateHangHoa);
              toast.success('Thêm mới hàng hóa thành công!');
              reset();
              setOpen('screen');
        } catch (error: any) {
          toast.error(error.message);
        }
      } else if(inputValues.length > 0){
        // Kiểm tra xem có giá trị trùng nhau không
        const valueSet = new Set();
        let hasDuplicate = false;
        let hasEmptyValue = false;
        inputValues.forEach(value => {
          if (value.nameProduct === '' || value.exchangeValue === 0) {
            hasEmptyValue = true;
          }
          const valueString = `${value.nameProduct}-${value.idProduct}`;
          if (
            valueSet.has(valueString) || 
            (value.idProduct === data.id && value.idProduct !== '' && data.id !== '')
            ) {
            hasDuplicate = true;
          } else {
            valueSet.add(value.nameProduct);
          }
        });

    if (hasDuplicate) {
      toast.error('Có giá trị trùng nhau trong khi thêm đơn vị!');
    }

    if (hasEmptyValue) {
      toast.error('Có giá trị bị bỏ trống trong khi thêm đơn vị!');
    }

    if(!hasDuplicate && !hasEmptyValue) {
      let completedCount = 0;
      try {
        for (const value of inputValues) {
          let ExchangeMoneyGoc = data.GiaGocHangHoa * value.exchangeValue
          let ExchangeMoneyBan = data.GiaBanHangHoa * value.exchangeValue
          if(value.idProduct === '') {
            let DataCreateHangHoaHadInputValue: any = {
              TenHangHoa: data.TenHangHoa,
              MaNhomHangHoa: nhomHangHotelInput,
              DonViTinh: value.nameProduct,
              GiaGocHangHoa: ExchangeMoneyGoc,
              GiaBanHangHoa: ExchangeMoneyBan,
              SLTonKho: 0,
              DinhMucTonItNhat: data?.DinhMucTonItNhat || 0,
              DinhMucTonNhieuNhat: data?.DinhMucTonNhieuNhat || 999999999,
              MoTa: data?.MoTa,
              GhiChu: data?.GhiChu,
              CacLinkAnhHangHoa: imageUrls,
            };
            
            await createHangHoa(DataCreateHangHoaHadInputValue);
            completedCount++;
          if (completedCount === inputValues.length) {
            await createHangHoa(DataCreateHangHoa);
            toast.success('Thêm mới hàng hóa thành công!');
            reset();
            setOpen('screen');
          }
          } else if(value.idProduct !== '') {
            let DataCreateHangHoaHadInputValue: any = {
              id: value.idProduct,
              TenHangHoa: data.TenHangHoa,
              MaNhomHangHoa: nhomHangHotelInput,
              DonViTinh: value.nameProduct,
              GiaGocHangHoa: ExchangeMoneyGoc,
              GiaBanHangHoa: ExchangeMoneyBan,
              SLTonKho: 0,
              DinhMucTonItNhat: data?.DinhMucTonItNhat || 0,
              DinhMucTonNhieuNhat: data?.DinhMucTonNhieuNhat || 999999999,
              MoTa: data?.MoTa,
              GhiChu: data?.GhiChu,
              CacLinkAnhHangHoa: imageUrls,
            };
            
            await createHangHoa(DataCreateHangHoaHadInputValue);
            completedCount++;
          if (completedCount === inputValues.length) {
            if (data.id) {
              DataCreateHangHoa = {
                ...DataCreateHangHoa,
                id: data.id,
              };
              createHangHoa(DataCreateHangHoa);
            } else {
              createHangHoa(DataCreateHangHoa);
            }
            toast.success('Thêm mới hàng hóa thành công!');
            reset();
            setOpen('screen');
          }
          }
          
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
      } 

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

  const contentDinhMucItNhat = (
    <div>
      <p>
        Bạn có thể chọn giữa việc tự nhập khoảng định mức ít nhất hay để cập
        nhập tự động, mặc định định mức sẽ là 0
      </p>
    </div>
  )
  
  const contentDinhMucNhieuNhat = (
    <div>
      <p>
        Bạn có thể chọn giữa việc tự nhập khoảng định mức nhiều nhất hay để cập
        nhập tự động, mặc định định mức sẽ là 999.999.999 VNĐ
      </p>
    </div>
  )

  const contentMaHangHoaMore = (
    <div>
      <p>
        Đây là đơn vị cơ bản và cũng là mặc định của 1 sản phẩm lẻ, ví dụ: lon, chai, chiếc,...
      </p>
    </div>
  )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {buttonNavActive === 'Main' ? (
          <div className="container space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <label
                  htmlFor="id"
                  className={`${styles.formlabel} flex gap-1`}
                >
                  Mã hàng hóa:
                  <Popover content={content} title="Lưu ý!">
                    <PiWarningCircleFill className="size-5 text-gray-500" />
                  </Popover>
                </label>
                <div className="flex flex-col">
                  <input
                    {...register('id')}
                    type="text"
                    placeholder="Mã hàng hóa tự dộng"
                    className={`${styles.formInput}`}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="TenHangHoa"
                  className={`${styles.formlabel} flex gap-1`}
                >
                  Tên hàng hóa:
                  <span className="text-orange-500">*</span>
                </label>
                <div className="flex flex-col">
                  <input
                    {...register('TenHangHoa')}
                    type="text"
                    placeholder="Hàng hóa A"
                    className={`${styles.formInput}`}
                  />
                  {errors.TenHangHoa && (
                    <span className="text-red-500 block mt-1">
                      {`${errors.TenHangHoa.message}`}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label htmlFor="nhomHang" className={`${styles.formlabel}`}>
                  Nhóm hàng:
                  {/* <span className="text-orange-500">*</span> */}
                </label>
                <Select
                  showSearch
                  placeholder="--Lựa chọn--"
                  optionFilterProp="children"
                  onChange={onChangeSelectNhomHangHotel}
                  // onSearch={onSearchSelect}
                  filterOption={filterOptionNhomHangHoaHotel}
                  options={dataNhomHangHotelWithLabelAndValue.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  className={`${styles.formInput} px-0 w-[62%]`}
                />
                <button
                  onClick={handleOpenNhomHangHoa}
                  className="w-auto border-b border-t-0 border-x-0 border-gray-400 border-large bg-white p-[6px] hover:bg-gray-50"
                >
                  <span className="w-full">
                    <FaPlus className="size-5 text-gray-500" />
                  </span>
                </button>
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="ViTri"
                  className={`${styles.formlabel} flex gap-1`}
                >
                  Vị trí:
                  <span className="text-orange-500">*</span>
                </label>
                <div className="flex flex-col">
                  <input
                    {...register('ViTri')}
                    type="text"
                    placeholder="Kho A"
                    className={`${styles.formInput}`}
                  />
                  {errors.ViTri && (
                    <span className="text-red-500 block mt-1">
                      {`${errors.ViTri.message}`}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="GiaGocHangHoa"
                  className={`${styles.formlabel}`}
                >
                  Giá vốn:
                </label>
                <div className="flex flex-col">
                  <input
                    {...register('GiaGocHangHoa', { valueAsNumber: true })}
                    type="number"
                    className={`${styles.formInput}`}
                  />
                  {errors.GiaGocHangHoa && (
                    <span className="text-red-500 block mt-1">
                      {`${errors.GiaGocHangHoa.message}`}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="GiaBanHangHoa"
                  className={`${styles.formlabel}`}
                >
                  Giá bán:
                </label>
                <div className="flex flex-col">
                  <input
                    {...register('GiaBanHangHoa', { valueAsNumber: true })}
                    type="number"
                    className={`${styles.formInput}`}
                  />
                  {errors.GiaBanHangHoa && (
                    <span className="text-red-500 block mt-1">
                      {`${errors.GiaBanHangHoa.message}`}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label htmlFor="SLTonKho" className={`${styles.formlabel}`}>
                  Số lượng tồn:
                </label>
                <div className="flex flex-col">
                  <input
                    {...register('SLTonKho', { valueAsNumber: true })}
                    type="number"
                    className={`${styles.formInput}`}
                  />
                  {errors.SLTonKho && (
                    <span className="text-red-500 block mt-1">
                      {`${errors.SLTonKho.message}`}
                    </span>
                  )}
                </div>
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
                  onPreview={onPreviewHangHoa}
                >
                  {fileList.length < 5 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </div>

            {/* More Select */}
            <div className="relative w-full overflow-hidden">
              <input
                type="checkbox"
                checked={isFirstChecked}
                onChange={handleFirstCheckboxChange}
                className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
              />
              <div className="bg-gray-200 h-12 w-full pl-5 flex items-center">
                <h1 className="text-lg font-semibold text-gray-700">
                  Thuộc tính (Màu sắc, kích thước,...)
                </h1>
              </div>

              {/* Arrow Icon */}
              <div className="absolute top-3 right-3 text-white transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                <IoMdArrowDropdown className="text-gray-500" />
              </div>

              {/* Content */}
              <div className="bg-slate-50 overflow-y-auto transition-all duration-500 max-h-0 peer-checked:max-h-40">
                <div className="p-4">
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Alias sed asperiores, nam optio consequuntur reiciendis eius
                    eos omnis exercitationem, doloribus ipsum atque
                    necessitatibus temporibus officia architecto veritatis.
                    Mollitia, ducimus perferendis! Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Illum, quam ad ducimus
                    voluptatibus quis voluptas, aperiam ipsa repellat corrupti
                    dignissimos quod similique qui fugiat dolor. Architecto
                    animi incidunt unde blanditiis! Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Porro necessitatibus id minus
                    fugit consequuntur ex nisi corporis suscipit obcaecati
                    temporibus praesentium provident aliquam accusantium
                    accusamus, magni et at. Accusamus, inventore. Lorem ipsum
                    dolor, sit amet consectetur adipisicing elit. Perspiciatis
                    fuga dolorem tempora iusto nisi ipsam vero libero
                    dignissimos a ipsum distinctio, qui nihil neque perferendis
                    ut cumque blanditiis, rem veritatis.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative w-full overflow-hidden">
              <input
                type="checkbox"
                checked={isSecondChecked}
                onChange={handleSecondCheckboxChange}
                className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
              />
              <div className="bg-gray-200 h-12 w-full pl-5 flex items-center">
                <h1 className="text-lg font-semibold text-gray-700">
                  Đơn vị tính
                </h1>
              </div>

              {/* Arrow Icon */}
              <div className="absolute top-3 right-3 text-white transition-transform duration-500 rotate-0 peer-checked:rotate-180">
                <IoMdArrowDropdown className="text-gray-500" />
              </div>

              {/* Content */}
              <div className="bg-slate-50 overflow-y-auto transition-all duration-500 max-h-0 peer-checked:max-h-40">
                <div className="p-4">
                  <div className="flex flex-col items-start gap-2">
                    <div className='flex'>
                    <label
                      htmlFor="DonViTinh"
                      className={`${styles.formlabel}`}
                    >
                      Đơn vị cơ bản:
                    </label>
                    <Popover content={contentMaHangHoaMore} title="Lưu ý!">
                              <PiWarningCircleFill className="size-5 text-gray-500" />
                    </Popover>
                    </div>

                    <input
                      {...register('DonViTinh')}
                      type="text"
                      className={`${styles.formInput} bg-slate-50`}
                    />
                  </div>

                  {/* Button To Add more input */}
                  <div className="p-4">
                    {inputValues.map((value, index) => (
                      <div key={index} className="flex gap-2">
                        {/* Input Tên đơn vị */}
                        <div className="flex flex-col items-start gap-2 py-2">
                          <label
                            htmlFor={`DonViTinh${index}`}
                            className={`${styles.formlabel}`}
                          >
                            Tên đơn vị:
                          </label>
                          <input
                            type="text"
                            value={value.nameProduct}
                            onChange={(e) =>
                              handleInputChange(index, {
                                ...value,
                                nameProduct: e.target.value,
                              })
                            }
                            className={`${styles.formInput} bg-slate-50`}
                          />
                        </div>

                        {/* Input Giá trị quy đổi */}
                        <div className="flex flex-col items-start gap-2 py-2">
                          <label
                            htmlFor={`GiaTriQuyDoi${index}`}
                            className={`${styles.formlabel}`}
                          >
                            Giá trị quy đổi:
                          </label>
                          <input
                            type="number"
                            value={value.exchangeValue}
                            onChange={(e) =>
                              handleInputChange(index, {
                                ...value,
                                exchangeValue: parseInt(e.target.value, 10),
                              })
                            }
                            className={`${styles.formInput} bg-slate-50`}
                          />
                        </div>

                        {/* Input Mã Hàng Hóa */}
                        <div className="flex flex-col items-start gap-2 py-2">
                          <label
                            htmlFor={`MaHangHoa${index}`}
                            className={`${styles.formlabel}`}
                          >
                            Mã hàng hóa:
                          </label>
                          <input
                            type="text"
                            value={value.idProduct}
                            placeholder='Mã hàng hóa tự động'
                            onChange={(e) =>
                              handleInputChange(index, {
                                ...value,
                                idProduct: e.target.value,
                              })
                            }
                            className={`${styles.formInput} bg-slate-50`}
                          />
                        </div>

                        <button
                        type='button'
                          onClick={() => handleRemoveInput(index)}
                          className=" text-black px-4 py-2 rounded-md hover:text-red-300"
                        >
                          <span>
                            <MdDeleteForever className="size-6" />
                          </span>
                        </button>
                      </div>
                    ))}
                    {inputValues.length < 3 && (
                      <button
                        onClick={handleAddInput}
                        type='button'
                        className="bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-200"
                      >
                        <span>Thêm đơn vị</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

{buttonNavActive === 'Sub' ? (
          <div className="space-y-2">
            <div className="border rounded-lg">
              <div className="w-full p-2 bg-slate-200">
                <h3 className="text-black font-medium">Định mức vốn</h3>
              </div>

              <div className="flex p-4">
                <div className="flex items-center">
                  <label
                    htmlFor="DinhMucTonItNhat"
                    className={`${styles.formlabel} flex gap-1`}
                  >
                    Ít nhất:
                    <Popover content={contentDinhMucItNhat} title="Lưu ý!">
                      <PiWarningCircleFill className="size-5 text-gray-500" />
                    </Popover>
                  </label>
                  <div className="flex flex-col">
                    <input
                      {...register('DinhMucTonItNhat', { valueAsNumber: true })}
                      type="number"
                      value={dinhMucTonItNhat}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setdinhMucTonItNhat(parseInt(e.target.value))}
                      className={`${styles.formInput}`}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="DinhMucTonNhieuNhat"
                    className={`${styles.formlabel} flex gap-1`}
                  >
                    Nhiều nhất:
                    <Popover content={contentDinhMucNhieuNhat} title="Lưu ý!">
                      <PiWarningCircleFill className="size-5 text-gray-500" />
                    </Popover>
                  </label>
                  <div className="flex flex-col">
                    <input
                      {...register('DinhMucTonNhieuNhat', { valueAsNumber: true })}
                      type="number"
                      value={dinhMucTonNhieuNhat}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setdinhMucTonNhieuNhat(parseInt(e.target.value))}
                      className={`${styles.formInput}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Textarea 
              {...register('MoTa')}
              label="Mô tả" 
              className="w-full light" />
            </div>

            <div>
              <Textarea
                {...register('GhiChu')}
              label="Ghi chú" 
              className="w-full light" />
            </div>
          </div>
        ) : null}

        {/* Button Submit Group */}
        <div className="flex justify-end pr-5 gap-2">
          <button
            type="submit"
            // disabled={isSubmitting}
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

export default AdminHangHoaFormComponent
