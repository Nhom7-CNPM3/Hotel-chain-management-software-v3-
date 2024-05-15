"use server";

import getByIdHangHoaAndImages  from "@/actions/GET/get-by-id-hang-hoa-and-images";
import getByIdNhomHangHoa from "@/actions/GET/get-by-id-nhom-hang-hoa";
import AdminNavItems from "@/components/AdminNavItems";
import GoodsTableViewBody from "@/shared/Admin/GoodsTableViewBody";

import { cookies } from "next/headers";
import toast from "react-hot-toast";

export default async function AdminGoodsViewTableScreen({idHangHoa}: {idHangHoa: string}){
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");
    const HangHoaAndImagesData = await getByIdHangHoaAndImages(idHangHoa)
    let NhomHangHoaByIdData;
    if(HangHoaAndImagesData){
      try {
        NhomHangHoaByIdData = await getByIdNhomHangHoa(HangHoaAndImagesData.MaNhomHangHoa);
      } catch (error: any) {
        console.log(error.message)
      }
    }

    return (
      <>
        <div className="w-full h-full bg-slate-200 flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
           {HangHoaAndImagesData && <GoodsTableViewBody 
          idHangHoa = {idHangHoa}
          HangHoaAndImagesData={HangHoaAndImagesData}
          NhomHangHoaByIdData={NhomHangHoaByIdData}
          />}
        </div>
      </>
    );
}

