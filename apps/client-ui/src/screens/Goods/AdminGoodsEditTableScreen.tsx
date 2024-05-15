"use server";

import getAllNhomHangsHotel from "@/actions/GET/get-all-nhom-hang-hoa";
import getByIdHangHoaAndImages  from "@/actions/GET/get-by-id-hang-hoa-and-images";
import getByIdNhomHangHoa from "@/actions/GET/get-by-id-nhom-hang-hoa";
import AdminNavItems from "@/components/AdminNavItems";
import GoodsTableEditBody from "@/shared/Admin/GoodsTableEditBody";

import { cookies } from "next/headers";
import toast from "react-hot-toast";

export default async function AdminGoodsEditTableScreen({idHangHoa}: {idHangHoa: string}){
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");
    const HangHoaAndImagesData = await getByIdHangHoaAndImages(idHangHoa)
    let NhomHangHoaByIdData;
    let AllNhomHangHoa;
    if(HangHoaAndImagesData){
      try {
        NhomHangHoaByIdData = await getByIdNhomHangHoa(HangHoaAndImagesData.MaNhomHangHoa);
        AllNhomHangHoa = await getAllNhomHangsHotel();
      } catch (error: any) {
        console.log(error.message)
      }
    }

    return (
      <>
        <div className="w-full h-full bg-slate-200 flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
           {HangHoaAndImagesData && <GoodsTableEditBody 
          idHangHoa={idHangHoa}
          HangHoaAndImagesData={HangHoaAndImagesData}
          NhomHangHoaByIdData={NhomHangHoaByIdData}
          AllNhomHangHoa={AllNhomHangHoa}
          />}
        </div>
      </>
    );
}

