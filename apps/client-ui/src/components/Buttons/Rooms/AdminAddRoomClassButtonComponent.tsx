'use client'

import AdminAddRoomClassButton from '@/lib/antd/AdminAddRoomClassButton'
import { useEffect, useState } from 'react'
import styles from '@/utils/style'
import { PiWarningCircleFill } from 'react-icons/pi'
import { MdClose, MdBlock } from 'react-icons/md'
import { IoMdSave } from 'react-icons/io'
import { Upload, Popover } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { formSchemaCreateRoomClasstype } from '@/lib/zod/formSchemaCreateRoomClasstype'
import { createRoomClass } from '@/actions/POST/create-room-class'
import AdminAddRoomSubFormComponent from '../../Forms/Rooms/AdminAddRoomSubFormComponent'
import AdminAddRoomFormComponent from '@/components/Forms/Rooms/AdminAddRoomFormComponent'
import  getAllRoomSubByUserId  from '@/actions/GET/get-all-room-sub'
import  getAllRoomClass  from '@/actions/GET/get-all-room-class'
import getAllRoomHotel from '@/actions/GET/get-all-room-hotel'

type OpenType = 'Room' | 'RoomClass'

type OpenSubType = 'PhongKhuVuc'


type ButtonNavActiveType = 'ThongTin' | 'MoTaChiTiet' | 'DanhSachPhong'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

type CreateRoomClassTypeSchema = z.infer<typeof formSchemaCreateRoomClasstype>

type GetRoomClassTypeSchema = {
  id: string;
  TenLoaiPhong: string;
  GiaTheoGio: number;
  GiaTheoNgay: number;
};

type GetRoomSubTypeSchema = {
  id: string;
  TenNhomKhuVuc: string;
  GhiChu: string | undefined;
};

type GetRoomHotelTypeSchema = {
  id: string;
  TenKhachSan: string;
};

const AdminAddRoomClassButtonComponent: React.FC = () => {
  const [open, setOpen] = useState<OpenType | 'screen'>('screen')
  const [openSub, setOpenSub] = useState<OpenSubType | 'screen2'>('screen2')
  const [roomSub, setRoomSub] = useState<GetRoomSubTypeSchema[]>([]);
  const [roomClass, setRoomClass] = useState<GetRoomClassTypeSchema[]>([]);
  const [roomHotel, setRoomHotel] = useState<GetRoomHotelTypeSchema[]>([]);
  
  const [buttonNavActive, setButtonNavActive] = useState<ButtonNavActiveType>(
    'ThongTin',
  )
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateRoomClassTypeSchema>({
    resolver: zodResolver(formSchemaCreateRoomClasstype),
  });

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      const fetchDataChiNhanh = async () => {
        const dataChiNhanh = await getAllRoomSubByUserId();
        setRoomSub(dataChiNhanh as unknown as GetRoomSubTypeSchema[]);
      };
      const fetchDataRoomClass = async () => {
        const dataRoomClass = await getAllRoomClass();
        setRoomClass(dataRoomClass as unknown as GetRoomClassTypeSchema[]);
      };
      const fetchDataRoomHotel = async () => {
        const dataRoomHotel = await getAllRoomHotel();
        setRoomHotel(dataRoomHotel as unknown as GetRoomHotelTypeSchema[]);
      };
      fetchDataChiNhanh();
      fetchDataRoomClass();
      fetchDataRoomHotel();
    }
return () => {
  isApiSubscribed = false;
};
}, [openSub, open, isSubmitting]);


  const onSubmit = async (data: CreateRoomClassTypeSchema) => {
    const imageUrls = fileList.map((file) => file.name)
    const DataCreateRoom = {
      MaLoaiPhong: data.MaLoaiPhong,
      TenLoaiPhong: data.TenLoaiPhong,
      GiaTheoNgay: data.GiaTheoNgay,
      GiaTheoGio: data.GiaTheoGio,
      CacLinkAnh: imageUrls,
    }

    try {
      await createRoomClass(DataCreateRoom)
      toast.success('Thêm mới hạng phòng thành công!')
      reset()
      setFileList([])
      setOpen('screen')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  //

  // const [styleColor, setStyleColor] = useState<styleColorType>("green")

  // const saveImageUrlsToDatabase = async (fileList: UploadFile[]) => {
  //   try {
  //     const imageUrls = fileList.map(file => file.url); // Lấy các URL từ fileList
  //     for (const url of imageUrls) {
  //       await prisma.tbCacLinkAnh.create({
  //         data: {
  //           LinkAnh: url,
  //           LoaiPhong: {
  //             connect: { id: 'yourLoaiPhongId' } // Thay thế bằng id thực tế của LoaiPhong
  //           }
  //         },
  //       });
  //     }
  //     console.log('Đã lưu các URL hình ảnh từ fileList vào cơ sở dữ liệu.');
  //   } catch (error) {
  //     console.error('Lỗi khi lưu URL hình ảnh từ fileList:', error);
  //   }
  // };

  // // Sử dụng hàm để lấy và lưu URL của hình ảnh từ fileList
  // saveImageUrlsToDatabase(fileList)
  //   .catch((error) => {
  //     console.error('Lỗi khi lưu URL hình ảnh từ fileList:', error);
  //   })
  //   .finally(async () => {
  //     await prisma.$disconnect(); // Đóng kết nối sau khi hoàn thành
  //   });

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async (file: UploadFile) => {
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
      <AdminAddRoomClassButton setOpen={setOpen} />

      {open === 'RoomClass' ? (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-30 backdrop-brightness-50">
          <div className="h-full grid place-content-center">
            <div className="bg-gray-200 w-[800px] h-auto rounded-lg mx-16 shadow-lg">
              <div className="my-4 mx-6 flex justify-between">
                <h3 className="text-gray-800 font-bold">Thêm hạng phòng mới</h3>
                <button onClick={() => setOpen('screen')}>
                  <MdClose className="text-gray-700 hover:text-red-600" />
                </button>
              </div>
              <div className="h-full">
                {/* Top Form */}
                <div className="bg-gray-200 w-full">
                  <button
                    onClick={() => setButtonNavActive('ThongTin')}
                    className={`px-3 py-2 ${
                      buttonNavActive === 'ThongTin'
                        ? 'border-b-green-500 border-b-large text-black'
                        : ''
                    } hover:border-b-green-500 hover:border-b-large hover:text-black text-gray-500 font-bold`}
                  >
                    Thông tin
                  </button>
                  <button
                    onClick={() => setButtonNavActive('MoTaChiTiet')}
                    className={`px-3 py-2 ${
                      buttonNavActive === 'MoTaChiTiet'
                        ? 'border-b-green-500 border-b-large text-black'
                        : ''
                    } hover:border-b-green-500 hover:border-b-large hover:text-black text-gray-500 font-bold`}
                  >
                    Mô tả chi tiết
                  </button>
                  <button
                    onClick={() => setButtonNavActive('DanhSachPhong')}
                    className={`px-3 py-2 ${
                      buttonNavActive === 'DanhSachPhong'
                        ? 'border-b-green-500 border-b-large text-black'
                        : ''
                    } hover:border-b-green-500 hover:border-b-large hover:text-black text-gray-500 font-bold`}
                  >
                    Danh sách phòng
                  </button>
                </div>

                {/* Bottom Form */}
                <div className="h-auto bg-white py-10 px-3">
                  {buttonNavActive === 'ThongTin' ? (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <label
                            htmlFor="MaHangPhong"
                            className={`${styles.formlabel} flex gap-1`}
                          >
                            Mã hạng phòng:
                            <Popover content={content} title="Lưu ý!">
                              <PiWarningCircleFill className="size-5 text-gray-500" />
                            </Popover>
                          </label>
                          <input
                            {...register('MaLoaiPhong')}
                            type="text"
                            placeholder="Mã hạng phòng tự dộng"
                            className={`${styles.formInput}`}
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="TenLoaiPhong"
                            className={`${styles.formlabel}`}
                          >
                            Tên hạng phòng:
                          </label>
                          <div className="flex flex-col">
                            <input
                              {...register('TenLoaiPhong')}
                              type="text"
                              className={`${styles.formInput}`}
                            />
                            {errors.TenLoaiPhong && (
                              <span className="text-red-500 block mt-1">
                                {`${errors.TenLoaiPhong.message}`}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <label className={`${styles.formlabel}`}>
                            Giá theo giờ:
                          </label>
                          <div className="flex flex-col">
                            <input
                              {...register('GiaTheoGio', {
                                valueAsNumber: true,
                              })}
                              type="number"
                              className={`${styles.formInput}`}
                            />
                            {errors.GiaTheoGio && (
                              <span className="text-red-500 block mt-1">
                                {`${errors.GiaTheoGio.message}`}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <label className={`${styles.formlabel}`}>
                            Giá theo ngày:
                          </label>
                          <div className="flex flex-col">
                            <input
                              {...register('GiaTheoNgay', {
                                valueAsNumber: true,
                              })}
                              type="number"
                              className={`${styles.formInput}`}
                            />
                            {errors.GiaTheoNgay && (
                              <span className="text-red-500 block mt-1">
                                {`${errors.GiaTheoNgay.message}`}
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
                            onPreview={onPreview}
                          >
                            {fileList.length < 5 && '+ Upload'}
                          </Upload>
                        </ImgCrop>
                      </div>

                      {/* Button Submit Group */}
                      <div className="flex justify-end pr-5 gap-2">
                        <button
                          type="submit"
                          className={`${styles.formbtn}`}
                          disabled={isSubmitting}
                        >
                          <span className="h-full grid place-content-center">
                            <IoMdSave className="size-4 hover:text-gray-500" />
                          </span>
                          <span>Lưu</span>
                        </button>
                        {/* <button type="submit" className={`${styles.formbtn}`}>
                          <span className="h-full grid place-content-center">
                            <IoMdSave className="size-4 hover:text-gray-500" />
                          </span>
                          <span>Lưu & Thêm mới</span>
                        </button> */}
                        <button
                          onClick={() => setOpen('screen')}
                          type="button"
                          className={`${styles.formbtnClose}`}
                        >
                          <span className="h-full grid place-content-center">
                            <MdBlock className="size-4 hover:text-red-500" />
                          </span>
                          <span>Bỏ qua</span>
                        </button>
                      </div>
                    </form>
                  ) : null}

                  {buttonNavActive === 'MoTaChiTiet' ? (
                    <form className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <label
                            htmlFor="maHangPhong"
                            className={`${styles.formlabel} flex gap-1`}
                          >
                            Mã hạng phòng:
                            <Popover content={content} title="Lưu ý!">
                              <PiWarningCircleFill className="size-5 text-gray-500" />
                            </Popover>
                          </label>
                          <input
                            type="text"
                            id="maHangPhong"
                            name="maHangPhong"
                            className={`${styles.formInput}`}
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="tenHangPhong"
                            className={`${styles.formlabel}`}
                          >
                            Tên hạng phòng1:
                          </label>
                          <input
                            type="text"
                            id="tenHangPhong"
                            name="tenHangPhong"
                            className={`${styles.formInput}`}
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="giaTheoGio"
                            className={`${styles.formlabel}`}
                          >
                            Giá theo giờ1:
                          </label>
                          <input
                            type="text"
                            id="giaTheoGio"
                            name="giaTheoGio"
                            className={`${styles.formInput}`}
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="giaTheoNgay"
                            className={`${styles.formlabel}`}
                          >
                            Giá theo ngày1:
                          </label>
                          <input
                            type="text"
                            id="giaTheoNgay"
                            name="giaTheoNgay"
                            className={`${styles.formInput}`}
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
                            onPreview={onPreview}
                          >
                            {fileList.length < 5 && '+ Upload'}
                          </Upload>
                        </ImgCrop>
                      </div>

                      {/* Button Submit Group */}
                      <div className="flex justify-end pr-5 gap-2">
                        <button type="submit" className={`${styles.formbtn}`}>
                          <span className="h-full grid place-content-center">
                            <IoMdSave className="size-4 hover:text-gray-500" />
                          </span>
                          <span>Lưu</span>
                        </button>
                        <button
                          type="button"
                          className={`${styles.formbtnClose}`}
                        >
                          <span className="h-full grid place-content-center">
                            <MdBlock className="size-4 hover:text-red-500" />
                          </span>
                          <span>Bỏ qua</span>
                        </button>
                      </div>
                    </form>
                  ) : null}

                  {buttonNavActive === 'DanhSachPhong' ? (
                    <form className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <label
                            htmlFor="maHangPhong"
                            className={`${styles.formlabel} flex gap-1`}
                          >
                            Mã hạng phòng:
                            <Popover content={content} title="Lưu ý!">
                              <PiWarningCircleFill className="size-5 text-gray-500" />
                            </Popover>
                          </label>
                          <input
                            type="text"
                            id="maHangPhong"
                            name="maHangPhong"
                            className={`${styles.formInput}`}
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="tenHangPhong"
                            className={`${styles.formlabel}`}
                          >
                            Tên hạng phòng2:
                          </label>
                          <input
                            type="text"
                            id="tenHangPhong"
                            name="tenHangPhong"
                            className={`${styles.formInput}`}
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="giaTheoGio"
                            className={`${styles.formlabel}`}
                          >
                            Giá theo giờ2:
                          </label>
                          <input
                            type="text"
                            id="giaTheoGio"
                            name="giaTheoGio"
                            className={`${styles.formInput}`}
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="giaTheoNgay"
                            className={`${styles.formlabel}`}
                          >
                            Giá theo ngày2:
                          </label>
                          <input
                            type="text"
                            id="giaTheoNgay"
                            name="giaTheoNgay"
                            className={`${styles.formInput}`}
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
                            onPreview={onPreview}
                          >
                            {fileList.length < 5 && '+ Upload'}
                          </Upload>
                        </ImgCrop>
                      </div>

                      {/* Button Submit Group */}
                      <div className="flex justify-end pr-5 gap-2">
                        <button type="submit" className={`${styles.formbtn}`}>
                          <span className="h-full grid place-content-center">
                            <IoMdSave className="size-4 hover:text-gray-500" />
                          </span>
                          <span>Lưu</span>
                        </button>
                        <button
                          type="button"
                          className={`${styles.formbtnClose}`}
                        >
                          <span className="h-full grid place-content-center">
                            <MdBlock className="size-4 hover:text-red-500" />
                          </span>
                          <span>Bỏ qua</span>
                        </button>
                      </div>
                    </form>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {open === 'Room' ? (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-30 backdrop-brightness-50">
          <div className="h-full grid place-content-center">
            <div className="bg-white w-[800px] h-auto rounded-lg mx-16 shadow-lg">
              <div className="my-4 mx-6 flex justify-between">
                <h3 className="text-gray-800 font-bold">Thêm phòng mới</h3>
                <button onClick={() => setOpen('screen')}>
                  <MdClose className="text-gray-700 hover:text-red-600" />
                </button>
              </div>
              <div className="h-full bg-white pt-10 px-10">
                <AdminAddRoomFormComponent 
                setOpenSub={setOpenSub}
                setOpen={setOpen}
                roomSub={roomSub}
                roomClass={roomClass}
                roomHotel={roomHotel}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {openSub === 'PhongKhuVuc' ? (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-40 backdrop-brightness-50">
          <div className="h-full grid place-content-center">
            <div className="bg-white w-[600px] h-auto rounded-lg mx-16 shadow-lg">
              <h3 className="text-gray-800 font-bold mt-5 ml-5 mb-2">
                Khu vực
              </h3>
              <AdminAddRoomSubFormComponent setOpenSub={setOpenSub} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default AdminAddRoomClassButtonComponent
