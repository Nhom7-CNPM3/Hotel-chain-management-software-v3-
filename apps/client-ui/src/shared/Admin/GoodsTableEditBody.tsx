"use server";

import AdminAddGoodsButtonsComponent from '@/components/Buttons/AdminAddGoodsButtonsComponent'
import AdminGoodTableFormEditComponent from '@/components/Forms/AdminGoodTableFormEditComponent'
import AdminHeader from '@/components/Layout/AdminHeader'
import getAllHangHoaHotel from "@/actions/GET/get-all-hang-hoa"




export default async function GoodsTableEditwBody ({
  idHangHoa,
  HangHoaAndImagesData,
  NhomHangHoaByIdData,
  AllNhomHangHoa
}: {
  idHangHoa: string
  HangHoaAndImagesData: any
  NhomHangHoaByIdData: any
  AllNhomHangHoa: any
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
      <div className="w-full h-full container p-4">
        <AdminGoodTableFormEditComponent 
        idHangHoa={idHangHoa} 
        HangHoaAndImagesData={HangHoaAndImagesData}
        NhomHangHoaByIdData={NhomHangHoaByIdData}
        AllNhomHangHoa={AllNhomHangHoa}
        />
      </div>
    </div>
  </div>
  )
}
