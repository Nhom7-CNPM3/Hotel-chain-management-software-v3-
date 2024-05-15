"use server";

import AdminAddGoodsButtonsComponent from '@/components/Buttons/AdminAddGoodsButtonsComponent'
import AdminGoodTableFormViewComponent from '@/components/Tables/AdminGoodTableFormViewComponent'
import AdminHeader from '@/components/Layout/AdminHeader'
import getAllHangHoaHotel from "@/actions/GET/get-all-hang-hoa"




export default async function GoodsTableViewBody ({
  idHangHoa,
  HangHoaAndImagesData,
  NhomHangHoaByIdData
}: {
  idHangHoa: string
  HangHoaAndImagesData: any
  NhomHangHoaByIdData: any
}
) {
  const hangHoaData = await getAllHangHoaHotel();
  return (
    <div className="basis-5/6">
    <AdminHeader />
    <div className="h-auto">
      <div className="mx-10 mt-32 mb-9 z-0 flex justify-between">
        <h2 className="text-gray-700 font-semibold text-xl">
          Hàng hóa
        </h2>
        <AdminAddGoodsButtonsComponent />
      </div>
      <div className="w-full h-full grid place-content-center">
        <AdminGoodTableFormViewComponent 
        idHangHoa={idHangHoa} 
        HangHoaAndImagesData={HangHoaAndImagesData}
        NhomHangHoaByIdData={NhomHangHoaByIdData}
        />
      </div>
    </div>
  </div>
  )
}
