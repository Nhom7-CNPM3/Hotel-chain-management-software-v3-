"use client"

import getAllNhomHangsHotel from "@/actions/GET/get-all-nhom-hang-hoa";
import { getByNameNhomHangHotel } from "@/actions/GET/get-by-name-nhom-hang-hoa";
import AdminTableDisplayAddPurchaseOrderComponent from "@/components/Tables/AdminTableDisplayAddPurchaseOrderComponent";
import TableNoDataDisplay from "@/lib/antd/TableNoDataDisplay";
import styles from "@/utils/style";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import { FaPlus, FaRegRectangleList } from "react-icons/fa6";
import { IoMdSave, IoMdSearch } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdBlock, MdClose } from "react-icons/md";
import getHangHoaByNhomHangHoaId from "@/actions/GET/get-hang-hoa-by-nhom-hang-hoa-id";
import toast from "react-hot-toast";
import getAllNhaCungCap from "@/actions/GET/get-all-nha-phan-phoi";
import { getByNameNhaCungCap } from "@/actions/GET/get-by-name-nha-phan-phoi";
import { formSchema } from '@/lib/zod/formSchemaCreatePhieuNhap'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { createPhiepNhap } from "@/actions/POST/create-phieu-nhap-and-hang-hoa-detail";

type TypeSchema = z.infer<typeof formSchema>
type OpenSubNhomHangType = 'Open' | 'Close';

type OpenNhaPhanPhoiType = 'NhaPhanPhoi'

type GetAllNhomHangHotelTypeSchema = {
    id: string
    TenNhomHangHoa: string
  }

const PurchaseOrderBody = () => {
    const router = useRouter()
    const [openSubNhomHangHoa, setOpenSubNhomHangHoa] = useState<OpenSubNhomHangType>('Close')
    const [nhomHangHotel, setNhomHangHotel] = useState<GetAllNhomHangHotelTypeSchema[]>([])
    const [openNhaPhanPhoi, setOpenNhaPhanPhoi] = useState<OpenNhaPhanPhoiType | 'screen2'>('screen2')
    const [nhomHangHoaId, setNhomHangHoaId] = useState<string | undefined>('')
    const [nhaPhanPhoiId, setNhaPhanPhoiId] = useState<string | undefined>('')
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [dataAfterSelected, setDataAfterSelected] = useState<any[]>([]);
    const [nhaPhanPhoiData, setNhaPhanPhoiData] = useState<any[]>([])


          const {
            register,
            handleSubmit,
            formState: { errors, isSubmitting },
          } = useForm<TypeSchema>({
            resolver: zodResolver(formSchema),
          })
    
          // Submit
          const onSubmit = async (data: TypeSchema) => {
            const dataSubmit = {
              id: data.id,
              MaNhaCungCap: nhaPhanPhoiId,
              TongTienCanTra: totalAmount,
              TienDaTra: data.TienDaTra,
              Status: 'PhieuTam',
              ChiTietNoiDungNhap: dataAfterSelected
              
            }
            try {
              await createPhiepNhap(dataSubmit)
              console.log(dataSubmit)
              router.push('/Admin/ImportGoods')
              toast.success('Tạo phiếu nhập thành công!')
            } catch (error: any) {
              toast.error(error.message)
            }
          }

    // Effect
    useEffect(() => {
        let isApiSubscribed = true
        if (isApiSubscribed) {
          const fetchDataEmployeesHotel = async () => {
            const dataNhomHangHotel = await getAllNhomHangsHotel()
            setNhomHangHotel(
              (dataNhomHangHotel as unknown) as GetAllNhomHangHotelTypeSchema[],
            )
          }
          fetchDataEmployeesHotel()
        }
        return () => {
          isApiSubscribed = false
        }
      }, [openSubNhomHangHoa])

      useEffect(() => {
        let isApiSubscribed = true;
        if (isApiSubscribed) {
          const fetchData = async () => {
            const dataNhaCungCap = await getAllNhaCungCap();
            setNhaPhanPhoiData(dataNhaCungCap as unknown as any[]);
          };
          
          fetchData()
        }
    return () => {
      isApiSubscribed = false;
    };
    }, [openNhaPhanPhoi]);


      

    const isUpperCase = (str: string) => {
        if (str && str.length > 0) {
          return str.charAt(0) === str.charAt(0).toUpperCase();
        }
        return false; // or handle the undefined case as per your requirement
      }
    
      const dataNhaCungCapWithLabelAndValue = nhaPhanPhoiData.map((item: any) => ({
        value: item.TenNhaCungCap,
        label: isUpperCase(item.TenNhaCungCap)
          ? item.TenNhaCungCap.toLowerCase()
          : item.TenNhaCungCap,
      }))

          
      const dataNhomHangWithLabelAndValue = nhomHangHotel.map((item: any) => ({
        value: item.TenNhomHangHoa,
        label: isUpperCase(item.TenNhomHangHoa)
          ? item.TenNhomHangHoa.toLowerCase()
          : item.TenNhomHangHoa,
      }))

      

    //   Filter
    const filterOptionNhaCUngCap = (
        input: string,
        option?: { label: string; value: string },
      ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

      const filterOptionNhomHangHoaHotel = (
        input: string,
        option?: { label: string; value: string },
      ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

    //   OnChange
    const onChangeSelectNhomHangHoaHotel = async (value: string) => {
        let data = await getByNameNhomHangHotel(value)
    
        if (data) {
          setNhomHangHoaId(data?.id)
        }
      }


      const handleOpenNhaPhanPhoi = (e: any) => {
        e.preventDefault()
        setOpenNhaPhanPhoi('NhaPhanPhoi')
      }

      const handleChangeNhomHangHoa = async () => {
        const dataSelected = await getHangHoaByNhomHangHoaId(nhomHangHoaId ?? '');
      
        if (dataSelected) {
          const formattedData = dataSelected.map(item => {
            if ('slTon' in item) {
              // Already of the correct type
              return item;
            } else {
              // Convert to HangHoaPurchasesOrderWithslTon
              return {
                ...item,
                slTon: 0 // Set a default value for slTon
              };
            }
          });
          setDataAfterSelected(formattedData);
          setOpenSubNhomHangHoa('Close');
        } else {
          toast.error('Fail error 500, No data Selected found on Server');
          setOpenSubNhomHangHoa('Close');
        }
      };

      const onChangeSelectNhaCungCap = async (value: string) => {
        let data = await getByNameNhaCungCap(value)
    
        if (data) {
          setNhaPhanPhoiId(data?.id)
        }
      }
  return (
    <>
        <div className="basis-5/6 bg-gray-200">
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className='w-full h-full px-5 py-3 flex gap-2'
        >

        {/* LeftBody Container */}
        <div className="basis-2/3 flex flex-col gap-2 ">
            
            {/* TopButtonAndSearchBar */}
            <div className="basis-1/12 ">
                
                {/* LeftButtonAndSeachBar */}
                <div className="flex gap-3">
                    {/* Button back */}
                    <button 
                    onClick={() => router.push('/Admin/ImportGoods')}
                    className="px-2 py-1"
                    >
                        <div className="w-full h-full flex gap-1">

                        <IoArrowBackOutline className='size-8 text-gray-500 pt-2' />

                        <span className="text-center text-gray-700 text-lg font-semibold pt-2">Nhập hàng</span>
                        </div>
                    </button>

                    {/* Search group */}
                    <div className="flex pt-2">
                        <div className="bg-gray-50 rounded-l-sm size-9 grid place-content-center text-gray-400">
                            <IoMdSearch className="size-7" />
                        </div>
                    <input 
                    type="text" 
                    placeholder="Tìm hàng hóa theo tên"
                    className="bg-gray-50 h-9 text-gray-700"
                    />
                        <button 
                        type="button"
                        onClick={() => setOpenSubNhomHangHoa('Open')}
                        className="size-9"
                        >
                            <div className="bg-gray-50 rounded-r-sm size-full grid place-content-center text-gray-400">
                                <FaRegRectangleList className="size-7" />
                            </div>
                        </button>
                    </div>
                   
                    
                </div>

                
            </div>

            {/* BottomTableList */}
            <div className="basis-11/12 overflow-y-auto">
                {dataAfterSelected.length === 0 ? (
                    <TableNoDataDisplay />
                ) : (
                    <AdminTableDisplayAddPurchaseOrderComponent 
                    dataAfterSelected={dataAfterSelected}
                    setDataAfterSelected={setDataAfterSelected}
                    setTotalAmount={setTotalAmount}
                    />
                )}
            </div>
        </div>

        {/* RightBody Container */}
        <div className="basis-1/3 p-5 bg-gray-300 space-y-6">

        <div className="flex items-center">
                <label htmlFor="nhomHang" className={`${styles.formlabel}`}>
                  Nhà cung cấp:
                  <span className="text-orange-500">*</span>
                </label>
                <Select
                  showSearch
                  placeholder="--Lựa chọn--"
                  optionFilterProp="children"
                  onChange={onChangeSelectNhaCungCap}
                  // onSearch={onSearchSelect}
                  filterOption={filterOptionNhaCUngCap}
                  options={dataNhaCungCapWithLabelAndValue.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  className={`${styles.formInput} px-0 w-[62%]`}
                />
                <button
                  onClick={handleOpenNhaPhanPhoi}
                  className="w-auto border-b border-t-0 border-x-0 border-gray-400 border-large bg-white p-[6px] hover:bg-gray-50"
                >
                  <span className="w-full">
                    <FaPlus className="size-5 text-gray-500" />
                  </span>
                </button>
              </div>
            
            {/* Items Group */}
            <div className="w-[80%] flex gap-2">
              <label 
              className={`${styles.label} `}
              htmlFor="MaPhieuNhap">
                <span className="text-gray-700">Mã phiếu</span>
              </label>
              <input 
              {...register('id')}
              type="text" 
              placeholder="Mã phiếu nhập tự động" 
              className={`${styles.formInput}`}
              />
            </div>

             {/* Items Group */}
              <div className="w-[80%] flex gap-2">
              <label 
              className={`${styles.label} `}
              htmlFor="TongTienCanTra">
                <span className="text-gray-700">Tổng tiền hàng</span>
              </label>
              <input 
              disabled
              type="text" 
              value={totalAmount}
              className={`${styles.formInput}`}
              />
            </div>

                {/* Items Group */}
               <div className="w-[80%] flex gap-2">
              <label 
              className={`${styles.label} `}
              htmlFor="TienDaTra">
                <span className="text-gray-700">Tiền trả nhà cung cấp</span>
              </label>
              <input 
              {...register("TienDaTra", { valueAsNumber: true })}
              type="number" 
              className={`${styles.formInput}`}
              />
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
        </div>
        </div>
        </form>
  </div>

  {openSubNhomHangHoa === 'Open' && (
    <div className="absolute right-1 bottom-1 w-screen h-screen z-50 backdrop-brightness-50">
        <div className="px-4 py-2 h-full grid place-content-center">
             <div className="bg-white w-[600px] h-auto rounded-lg mx-16 shadow-lg">
             <div className="my-4 mx-6 flex justify-between">
                <h3 className="text-gray-800 font-bold">Thêm hàng hóa từ nhóm hàng</h3>
                <button 
                type="button"
                onClick={() => setOpenSubNhomHangHoa('Close')
                }>
                  <MdClose className="text-gray-700 hover:text-red-600" />
                </button>
              </div>
              <div className="flex items-center px-6 py-3">
            <label htmlFor="NhomHang" className={`${styles.formlabel}`}>
              Nhóm hàng:
            </label>
            <Select
              showSearch
              placeholder="--Lựa chọn--"
              optionFilterProp="children"
              onChange={onChangeSelectNhomHangHoaHotel}
              // onSearch={onSearchSelect}
              filterOption={filterOptionNhomHangHoaHotel}
              options={dataNhomHangWithLabelAndValue.map(
                (option: { label: string; value: string }) => ({
                  label: option.label,
                  value: option.value,
                }),
              )}
              className={`${styles.formInput} px-0 w-[62%] text-black`}
            />
          </div>

          {/* Button Submit Group */}
        <div className="flex justify-end pr-5 gap-2 py-5">
          <button
            type="button"
            onClick={handleChangeNhomHangHoa}
            className={`${styles.formbtn}`}
          >
            <span className="h-full grid place-content-center">
              <AiFillCheckSquare className="size-4 hover:text-gray-500" />
            </span>
            <span>Xong</span>
          </button>
          <button
            type="button"
            className={`${styles.formbtnClose}`}
            onClick={() => setOpenSubNhomHangHoa('Close')}
          >
            <span className="h-full grid place-content-center">
              <MdBlock className="size-4 hover:text-red-500" />
            </span>
            <span>Bỏ qua</span>
          </button>
        </div>
             </div>
        </div>  
    </div>
  )}
    </>
  )
}

export default PurchaseOrderBody