'use client'

import AdminAddGoodsButtons from '@/lib/antd/AdminAddGoodsButtons'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import AdminHangHoaFormComponent from '../Forms/AdminHangHoaFormComponent'
import AdminAddNhomHoangHoaFormComponent from '../Forms/AdminAddNhomHangHoaFormComponent'

type OpenType = 'Product' | 'Service'
type ButtonNavActiveType = 'Main' | 'Sub'
type OpenNhomHangHoaType = 'NhomHangHoa'

const AdminAddGoodsButtonsComponent: React.FC = () => {
  const [open, setOpen] = useState<OpenType | 'screen'>('screen')
  const [openNhomHangHoa, setOpenNhomHangHoa] = useState<OpenNhomHangHoaType | 'screen2'>('screen2')
    const [buttonNavActive, setButtonNavActive] = useState<ButtonNavActiveType>(
    'Main',
  )

  return (
    <>
      <AdminAddGoodsButtons setOpen={setOpen} />

      {open === 'Product' && (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-50 backdrop-brightness-50">
          <div className="h-full grid place-content-center">
            <div className="bg-white w-[800px] h-auto rounded-lg mx-16 shadow-lg">
              <div className="mt-4 mx-6 flex justify-between">
                <h3 className="text-gray-800 font-bold">Hàng hóa</h3>
                <button onClick={() => setOpen('screen')}>
                  <MdClose className="text-gray-700 hover:text-red-600" />
                </button>
              </div>
              <div className="h-full container p-4 space-y-2">
              <div className="w-full">
                  <button
                    onClick={() => setButtonNavActive('Main')}
                    className={`px-3 py-2 ${
                      buttonNavActive === 'Main'
                        ? 'border-b-green-500 border-b-large text-black'
                        : ''
                    } hover:border-b-green-500 hover:border-b-large hover:text-black text-gray-500 font-bold`}
                  >
                    Thông tin
                  </button>
                  <button
                    onClick={() => setButtonNavActive('Sub')}
                    className={`px-3 py-2 ${
                      buttonNavActive === 'Sub'
                        ? 'border-b-green-500 border-b-large text-black'
                        : ''
                    } hover:border-b-green-500 hover:border-b-large hover:text-black text-gray-500 font-bold`}
                  >
                    Mô tả chi tiết
                  </button>
                </div>
                <AdminHangHoaFormComponent 
                open={open}
                openNhomHangHoa={openNhomHangHoa}
                setOpen={setOpen} 
                setOpenNhomHangHoa={setOpenNhomHangHoa}
                buttonNavActive={buttonNavActive}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {open === 'Service' && (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-50 backdrop-brightness-50">
          <div className="h-full grid place-content-center">
            <div className="bg-white w-[800px] h-[400px] rounded-lg mx-16 -translate-y-28 shadow-lg">
              <div className="mt-4 mx-6 flex justify-between">
                <h3 className="text-gray-800 font-bold">Dịch vụ</h3>
                <button onClick={() => setOpen('screen')}>
                  <MdClose className="text-gray-700 hover:text-red-600" />
                </button>
              </div>
              <div className="h-full">
                <p className="text-black">Table</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {openNhomHangHoa === 'NhomHangHoa' ? (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-50 backdrop-brightness-50">
          <div className="h-full grid place-content-center">
            <div className="bg-white w-[600px] h-auto rounded-lg mx-16 shadow-lg">
              <h3 className="text-gray-800 font-bold mt-5 ml-5 mb-2">
                Nhóm hàng hóa
              </h3>
              <AdminAddNhomHoangHoaFormComponent setOpenNhomHangHoa={setOpenNhomHangHoa} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default AdminAddGoodsButtonsComponent
